import { UserCircleIcon } from "@heroicons/react/24/outline";

function ChatHeader({
  conversation,
  currentUserId,
}) {
  if (!conversation) {
    return (
      <div className="h-16 border-b bg-white flex items-center justify-center text-gray-400">
        Select a conversation
      </div>
    );
  }

  const participant =
    conversation.participants.find(
      (user) => user._id !== currentUserId
    ) || conversation.participants[0];

  return (
    <div className="h-20 px-6 border-b bg-white flex items-center gap-4">

      <UserCircleIcon className="h-12 w-12 text-blue-500" />

      <div>
        <h2 className="text-lg font-semibold text-gray-900">
          {participant?.name}
        </h2>

        <p className="text-sm text-gray-500">
          {participant?.email}
        </p>
      </div>

    </div>
  );
}

export default ChatHeader;