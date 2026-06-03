const Notification =
require(
  "../models/Notification"
);

const {
  sendNotificationToUser,
} = require(
  "../socket/chatSocket"
);

const createNotification =
async ({
  recipient,
  title,
  message,
  type,
}) => {

  const notification =
    await Notification.create({
      recipient,
      title,
      message,
      type,
    });

  sendNotificationToUser(
    recipient,
    notification
  );

  return notification;

};

module.exports = {
  createNotification,
};