const Message = require("../models/Message");
const User = require("../models/User");

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
        async () => {

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
            `Disconnected:
            ${socket.id}`
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

  });

};

module.exports =
initializeSocket;