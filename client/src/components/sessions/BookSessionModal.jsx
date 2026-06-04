function BookSessionModal({
  open,
  onClose,
}) {

  if (!open)
    return null;

  return (

    <div
      className="
      fixed
      inset-0
      bg-black/50
      flex
      items-center
      justify-center
      "
    >

      <div
        className="
        bg-white
        rounded-3xl
        p-8
        w-[500px]
        "
      >

        <h2
          className="
          text-2xl
          font-bold
          mb-5
          "
        >
          Book Session
        </h2>

        <input
          placeholder="Date"
          className="
          w-full
          border
          p-3
          rounded-xl
          mb-4
          "
        />

        <input
          placeholder="Time"
          className="
          w-full
          border
          p-3
          rounded-xl
          mb-4
          "
        />

        <button
          className="
          bg-blue-600
          text-white
          px-5
          py-3
          rounded-xl
          "
        >
          Submit
        </button>

        <button
            onClick={onClose}
            className="
                bg-gray-200
                px-4
                py-2
                rounded-xl
            "
            >
            Close
            </button>

      </div>

    </div>

  );

}

export default
BookSessionModal;