const prompts = [
  {
    emoji: "😔",
    text: "I'm feeling anxious",
  },
  {
    emoji: "😴",
    text: "Help me sleep better",
  },
  {
    emoji: "😞",
    text: "I feel lonely",
  },
  {
    emoji: "😫",
    text: "I'm feeling stressed",
  },
  {
    emoji: "🧘",
    text: "Guide me through a breathing exercise",
  },
  {
    emoji: "😊",
    text: "Give me today's motivation",
  },
];

const SuggestedPrompts = ({ onSelect }) => {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100">
      <h2 className="mb-4 text-lg font-semibold text-gray-800">
        Suggested Prompts
      </h2>

      <div className="flex flex-wrap gap-3">
        {prompts.map((prompt, index) => (
          <button
            key={index}
            onClick={() => onSelect(prompt.text)}
            className="rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 transition-all hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600"
          >
            {prompt.emoji} {prompt.text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SuggestedPrompts;