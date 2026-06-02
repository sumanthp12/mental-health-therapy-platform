const Message =
require("../models/Message");

const initializeSocket = (io) => {

  io.on("connection", (socket) => {

    console.log(
      `User Connected: ${socket.id}`
    );

    // Join conversation room

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

    // Leave room

    socket.on(
      "leave_conversation",
      (conversationId) => {

        socket.leave(
          conversationId
        );

      }
    );

    // Send realtime message

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
      "disconnect",
      () => {

        console.log(
          `Disconnected: ${socket.id}`
        );

      }
    );

  });

};

module.exports =
initializeSocket;