import { UserCircleIcon } from "@heroicons/react/24/outline";

function ConversationItem({
  conversation,
  active = false,
  onClick,
  currentUserId,
}) {
  const participant =
    conversation?.participants?.find(
      (user) => user._id !== currentUserId
    ) || conversation?.participants?.[0];

  // eslint-disable-next-line no-unused-vars
  const latestMessage =
  conversation?.messages?.length > 0
    ? conversation.messages[conversation.messages.length - 1]
    : null;

const lastMessage =
  conversation.lastMessage?.message || "Loading Chats...";

const lastTime = conversation.lastMessage?.createdAt
  ? new Date(conversation.lastMessage.createdAt).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })
  : "";

  return (
    <div
      onClick={onClick}
      className={`flex items-center justify-between px-4 py-3 cursor-pointer border-b transition ${
        active
          ? "bg-blue-50 border-l-4 border-l-blue-600"
          : "hover:bg-gray-50"
      }`}
    >
      <div className="flex items-center gap-3 flex-1 overflow-hidden">
        <UserCircleIcon className="w-12 h-12 text-blue-500 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900 truncate">
              {participant?.name || "Unknown User"}
            </h3>

            {lastTime && (
              <span className="text-xs text-gray-400 flex-shrink-0 ml-2">
                {lastTime}
              </span>
            )}
          </div>

          <p className="text-sm text-gray-500 truncate mt-1">
            {lastMessage}
          </p>
        </div>

        {conversation?.unreadCount > 0 && (
          <span className="mt-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {conversation.unreadCount}
          </span>
        )}
      </div>
    </div>
  );
}

export default ConversationItem;