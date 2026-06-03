const Message = require("../models/Message");
const User = require("../models/User");

const onlineUsers = new Map();

let io;

const initSocket = (socketIO) => {

  io = socketIO;

  io.on("connection", (socket) => {

    console.log(
      `User Connected: ${socket.id}`
    );

    socket.on(
      "join_conversation",
      (conversationId) => {

        socket.join(
          conversationId
        );

        console.log(
          `Joined Room: ${conversationId}`
        );

      }
    );

    socket.on(
      "leave_conversation",
      (conversationId) => {

        socket.leave(
          conversationId
        );

      }
    );

    socket.on(
      "send_message",
      async (data) => {

        try {

          const savedMessage =
            await Message.create({
              conversation:
                data.conversationId,
              sender:
                data.senderId,
              message:
                data.message,
            });

          const populatedMessage =
            await Message.findById(
              savedMessage._id
            ).populate(
              "sender",
              "name role"
            );

          io.to(
            data.conversationId
          ).emit(
            "receive_message",
            populatedMessage
          );

        } catch (error) {

          console.log(error);

        }

      }
    );

    socket.on(
      "register-user",
      (userId) => {

        onlineUsers.set(
          userId,
          socket.id
        );

      }
    );

    socket.on(
      "user_online",
      async (userId) => {

        socket.userId =
          userId;

        await User.findByIdAndUpdate(
          userId,
          {
            isOnline: true,
          }
        );

        io.emit(
          "user_status_changed",
          {
            userId,
            isOnline: true,
          }
        );

      }
    );

    socket.on(
      "typing",
      (data) => {

        socket.to(
          data.conversationId
        ).emit(
          "user_typing",
          data
        );

      }
    );

    socket.on(
      "stop_typing",
      (data) => {

        socket.to(
          data.conversationId
        ).emit(
          "user_stop_typing",
          data
        );

      }
    );

    socket.on(
      "disconnect",
      async () => {

        for (const [
          userId,
          socketId,
        ] of onlineUsers.entries()) {

          if (
            socketId === socket.id
          ) {

            onlineUsers.delete(
              userId
            );

          }

        }

        if (socket.userId) {

          await User.findByIdAndUpdate(
            socket.userId,
            {
              isOnline: false,
              lastSeen:
                new Date(),
            }
          );

          io.emit(
            "user_status_changed",
            {
              userId:
                socket.userId,
              isOnline:
                false,
            }
          );

        }

        console.log(
          `Disconnected: ${socket.id}`
        );

      }
    );

  });

};

const getIO = () => io;

const getOnlineUsers =
  () => onlineUsers;

module.exports = {
  initSocket,
  getIO,
  getOnlineUsers,
};