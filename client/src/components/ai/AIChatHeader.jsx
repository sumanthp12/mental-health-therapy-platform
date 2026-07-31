const AIChatHeader = () => {
  return (
    <div className="rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-6 text-white shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            AI Wellness Assistant
          </h1>

          <p className="mt-1 text-sm text-blue-100">
            Your personal mental wellness companion.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-full bg-white/20 px-3 py-1">
          <span className="h-2.5 w-2.5 rounded-full bg-green-400 animate-pulse"></span>

          <span className="text-sm font-medium">
            Online
          </span>
        </div>
      </div>

      <div className="mt-5 rounded-xl bg-white/15 p-4 backdrop-blur-sm">
        <p className="text-sm leading-6 text-blue-50">
          This AI assistant provides emotional support, coping strategies,
          and wellness guidance. It is not a replacement for a licensed
          mental health professional.
        </p>
      </div>
    </div>
  );
};

export default AIChatHeader;