function TopBar({ title }) {
  return (
    <div className="bg-white p-5 rounded-lg shadow mb-6">

      <h1 className="text-3xl font-bold">
        {title}
      </h1>

    </div>
  );
}

export default TopBar;