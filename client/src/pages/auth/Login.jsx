import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, CheckCircle2, ShieldCheck } from "lucide-react";
import { loginUser } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      const data = await loginUser(email, password);

      login(data.user, data.token);

      if (data.user.role === "admin") {
        navigate("/admin/dashboard");
      } else if (data.user.role === "therapist") {
        navigate("/therapist/dashboard");
      } else {
        navigate("/client/dashboard");
      }
    } catch (error) {
      setError(
        error?.response?.data?.message ||
          "Unable to sign in. Please check your credentials and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-6xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-[28px] bg-white shadow-[0_25px_70px_rgba(15,23,42,0.12)] lg:grid-cols-2">
          
          {/* LEFT BRAND PANEL */}
          <div className="relative hidden min-h-[700px] overflow-hidden bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500 p-10 text-white lg:flex lg:flex-col lg:justify-between xl:p-14">
            
            {/* Decorative circles */}
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10" />
            <div className="absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-white/10" />
            <div className="absolute right-20 top-1/2 h-32 w-32 rounded-full bg-white/5" />

            {/* Brand */}
            <div className="relative z-10 flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 text-2xl font-bold shadow-lg backdrop-blur-sm">
                M
              </div>

              <div>
                <h2 className="text-xl font-bold tracking-tight">
                  Mindful Connect
                </h2>
                <p className="text-sm text-blue-100">
                  Mental Wellness Platform
                </p>
              </div>
            </div>

            {/* Main content */}
            <div className="relative z-10 max-w-xl">
              <p className="mb-5 text-sm font-semibold uppercase tracking-[0.18em] text-blue-100">
                YOUR WELLNESS JOURNEY
              </p>

              <h1 className="text-4xl font-bold leading-[1.12] tracking-tight xl:text-5xl">
                Welcome back to a healthier state of mind.
              </h1>

              <p className="mt-6 max-w-lg text-lg leading-8 text-blue-50">
                Continue your mental wellness journey with personalized
                therapist support, secure communication, and AI-powered
                wellness guidance.
              </p>

              {/* Benefits */}
              <div className="mt-10 space-y-5">
                <div className="flex items-center gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15">
                    <CheckCircle2 size={20} />
                  </div>

                  <span className="text-base font-medium">
                    Personalized therapist support
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15">
                    <CheckCircle2 size={20} />
                  </div>

                  <span className="text-base font-medium">
                    Secure and private communication
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15">
                    <CheckCircle2 size={20} />
                  </div>

                  <span className="text-base font-medium">
                    AI-powered wellness support
                  </span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="relative z-10 flex items-center gap-2 text-sm text-blue-100">
              <ShieldCheck size={18} />
              <span>Your wellbeing and privacy matter to us.</span>
            </div>
          </div>

          {/* RIGHT LOGIN PANEL */}
          <div className="flex min-h-[700px] items-center p-7 sm:p-10 lg:p-12 xl:p-16">
            <div className="mx-auto w-full max-w-md">
              
              {/* Mobile brand */}
              <div className="mb-10 flex items-center gap-3 lg:hidden">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-xl font-bold text-white shadow-lg">
                  M
                </div>

                <div>
                  <h2 className="font-bold text-slate-900">
                    Mindful Connect
                  </h2>
                  <p className="text-xs text-slate-500">
                    Mental Wellness Platform
                  </p>
                </div>
              </div>

              {/* Heading */}
              <div className="mb-8">
                <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-600">
                  WELCOME BACK
                </p>

                <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                  Sign in to your account
                </h2>

                <p className="mt-3 text-base leading-6 text-slate-500">
                  Continue your personalized mental wellness journey.
                </p>
              </div>

              {/* Error */}
              {error && (
                <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                  {error}
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleLogin} className="space-y-5">
                
                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Email address
                  </label>

                  <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                {/* Password */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-semibold text-slate-700"
                    >
                      Password
                    </label>

                    <button
                      type="button"
                      className="text-sm font-medium text-blue-600 transition hover:text-blue-700"
                      onClick={() =>
                        alert(
                          "Password reset functionality will be available soon."
                        )
                      }
                    >
                      Forgot password?
                    </button>
                  </div>

                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="current-password"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 pr-12 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Login button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-3.5 text-base font-semibold text-white shadow-lg shadow-blue-200 transition duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-200 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                >
                  {loading ? "Signing you in..." : "Sign In"}
                </button>
              </form>

              {/* Register */}
              <div className="mt-8 text-center text-sm text-slate-500">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="font-semibold text-blue-600 transition hover:text-blue-700"
                >
                  Create one
                </Link>
              </div>

              {/* Security note */}
              <div className="mt-8 flex items-center justify-center gap-2 text-xs text-slate-400">
                <ShieldCheck size={16} />
                <span>Secure and private access</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;