function Navbar() {
  return (
    <div className="bg-white shadow rounded-lg p-4 mb-6">

      <div className="flex justify-between items-center">

        {/* Search */}

        <input
          type="text"
          placeholder="Search..."
          className="border rounded-lg px-4 py-2 w-80"
        />

        {/* Right Side */}

        <div className="flex items-center gap-6">

          <button className="text-xl">
            🔔
          </button>

          <div className="flex items-center gap-2">

            <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center">
              A
            </div>

            <div>
              <p className="font-semibold">
                Admin
              </p>

              <p className="text-sm text-gray-500">
                Administrator
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Navbar;