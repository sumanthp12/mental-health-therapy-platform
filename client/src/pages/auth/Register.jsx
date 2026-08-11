import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../services/authService";

import { showError } from "../../utils/toast";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password, confirmPassword } = formData;

    if (!name || !email || !password || !confirmPassword) {
        const message = "Please fill in all fields.";

        setError(message);
        showError(message);

        return;
      }

    if (password.length < 6) {
        const message =
          "Password must be at least 6 characters.";

        setError(message);
        showError(message);

        return;
      }

    if (password !== confirmPassword) {
      const message = "Passwords do not match.";

      setError(message);
      showError(message);

      return;
    }

    try {
      setLoading(true);
      setError("");

      await registerUser(name, email, password);

      navigate("/login", {
        state: {
          message: "Account created successfully. Please log in.",
        },
      });
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        "Unable to create your account. Please try again.";

      setError(message);
      showError(message);
    } finally {
      setLoading(false);
    }
  };

  const passwordStrength =
    formData.password.length === 0
      ? 0
      : formData.password.length < 6
      ? 1
      : formData.password.length < 10
      ? 2
      : 3;

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
        <div className="grid lg:grid-cols-2">

          {/* Left Side */}
          <div className="hidden lg:flex relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500 p-12 text-white">
            <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-white/10" />
            <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-white/10" />

            <div className="relative z-10 flex flex-col justify-between w-full">
              
              {/* Brand */}
              <div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-xl font-bold">
                    M
                  </div>

                  <div>
                    <h1 className="text-xl font-bold">
                      Mindful Connect
                    </h1>

                    <p className="text-sm text-blue-100">
                      Mental Wellness Platform
                    </p>
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="max-w-md">
                <p className="text-sm font-medium text-blue-100 mb-4">
                  YOUR WELLNESS JOURNEY STARTS HERE
                </p>

                <h2 className="text-4xl xl:text-5xl font-bold leading-tight mb-6">
                  Take the first step toward better mental wellbeing.
                </h2>

                <p className="text-lg text-blue-50 leading-relaxed">
                  Create your account and connect with the right
                  support for your mental wellness journey.
                </p>

                <div className="mt-10 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center">
                      ✓
                    </div>
                    <span className="text-blue-50">
                      Personalized therapist support
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center">
                      ✓
                    </div>
                    <span className="text-blue-50">
                      Secure and private communication
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center">
                      ✓
                    </div>
                    <span className="text-blue-50">
                      AI-powered wellness support
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-sm text-blue-100">
                Your wellbeing matters.
              </p>
            </div>
          </div>

          {/* Right Side */}
          <div className="px-6 py-10 sm:px-10 lg:px-12 xl:px-16">
            
            <div className="max-w-md mx-auto">

              {/* Mobile Brand */}
              <div className="lg:hidden flex items-center gap-3 mb-8">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white flex items-center justify-center font-bold">
                  M
                </div>

                <div>
                  <h1 className="font-bold text-lg text-slate-900">
                    Mindful Connect
                  </h1>

                  <p className="text-xs text-slate-500">
                    Mental Wellness Platform
                  </p>
                </div>
              </div>

              {/* Heading */}
              <div className="mb-8">
                <p className="text-sm font-semibold text-blue-600 mb-2">
                  GET STARTED
                </p>

                <h2 className="text-3xl font-bold text-slate-900">
                  Create your account
                </h2>

                <p className="mt-2 text-slate-500">
                  Start your personalized mental wellness journey.
                </p>
              </div>

              {/* Error */}
              {error && (
                <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">

                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Full name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    autoComplete="name"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Email address
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    autoComplete="email"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Password
                  </label>

                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Create a password"
                      autoComplete="new-password"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 pr-20 text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword((prev) => !prev)
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-500 hover:text-blue-600"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>

                  {/* Password strength */}
                  {formData.password && (
                    <div className="mt-2">
                      <div className="flex gap-1">
                        {[1, 2, 3].map((level) => (
                          <div
                            key={level}
                            className={`h-1.5 flex-1 rounded-full ${
                              level <= passwordStrength
                                ? "bg-blue-500"
                                : "bg-slate-200"
                            }`}
                          />
                        ))}
                      </div>

                      <p className="mt-1 text-xs text-slate-500">
                        {passwordStrength === 1 &&
                          "Use at least 6 characters."}

                        {passwordStrength === 2 &&
                          "Good password. Add more characters for better security."}

                        {passwordStrength === 3 &&
                          "Strong password."}
                      </p>
                    </div>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Confirm password
                  </label>

                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm your password"
                      autoComplete="new-password"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 pr-20 text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword((prev) => !prev)
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-500 hover:text-blue-600"
                    >
                      {showConfirmPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-3.5 font-semibold text-white shadow-lg shadow-blue-200 transition hover:from-blue-700 hover:to-cyan-600 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Creating account...
                    </span>
                  ) : (
                    "Create Account"
                  )}
                </button>
              </form>

              {/* Login */}
              <p className="mt-8 text-center text-sm text-slate-500">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-semibold text-blue-600 hover:text-blue-700"
                >
                  Sign in
                </Link>
              </p>

              {/* Privacy */}
              <p className="mt-6 text-center text-xs leading-relaxed text-slate-400">
                By creating an account, you agree to use Mindful
                Connect responsibly and respect the privacy of others.
              </p>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;