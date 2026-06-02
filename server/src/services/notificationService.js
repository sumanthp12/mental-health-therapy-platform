const Notification =
require(
  "../models/Notification"
);

const createNotification =
async ({
  recipient,
  title,
  message,
  type,
}) => {

  return await
  Notification.create({
    recipient,
    title,
    message,
    type,
  });

};

module.exports = {
  createNotification,
};