function WelcomeBanner({ name }) {
  return (
    <div className="bg-blue-500 text-white p-8 rounded-lg mb-6">

      <h2 className="text-3xl font-bold mb-2">
        Welcome Back, {name}
      </h2>

      <p>
        Here's what's happening today.
      </p>

    </div>
  );
}

export default WelcomeBanner;