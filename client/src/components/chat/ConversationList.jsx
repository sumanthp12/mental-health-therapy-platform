import ConversationItem from "./ConversationItem";

function ConversationList({
  conversations = [],
  selectedConversation,
  onSelect,
  currentUserId,
}) {
  return (
    <div className="w-90 border-r bg-white flex flex-col h-full">
      <div className="p-6 border-b">
        <h2 className="text-2xl font-bold">Messages</h2>
      </div>

      <div className="flex-1 overflow-y-auto">
        {conversations.length === 0 ? (
          <div className="p-6 text-gray-500 text-center">
            No conversations found
          </div>
        ) : (
          conversations.map((conversation) => (
            <ConversationItem
              key={conversation._id}
              conversation={conversation}
              currentUserId={currentUserId}
              active={selectedConversation?._id === conversation._id}
              onClick={() => onSelect(conversation)}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default ConversationList;