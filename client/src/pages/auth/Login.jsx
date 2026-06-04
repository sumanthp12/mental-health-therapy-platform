import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/authService";
import { useAuth }
from "../../context/AuthContext";

function Login() {

  const navigate =
  useNavigate();

  const { login } = useAuth();
  

  const [email, setEmail] =
  useState("");

  const [password, setPassword] =
  useState("");

  const [loading, setLoading] =
  useState(false);

  const handleLogin =
  async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const data =
      await loginUser(
        email,
        password
      );

      login(
      data.user,
      data.token
    );

      if (
        data.user.role ===
        "admin"
      ) {

        navigate(
          "/admin/dashboard"
        );

      } else if (
        data.user.role ===
        "therapist"
      ) {

        navigate(
          "/therapist/dashboard"
        );

      } else {

        navigate(
          "/client/dashboard"
        );
      }

    } catch (error) {

      alert(
        error?.response?.data?.message ||
        "Login Failed"
      );

    } finally {

      setLoading(false);

    }

  };

  return (
    <div
      className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-slate-100
      "
    >
      <form
        onSubmit={
          handleLogin
        }
        className="
        bg-white
        p-8
        rounded-3xl
        shadow-xl
        w-full
        max-w-md
        "
      >
        <h1
          className="
          text-3xl
          font-bold
          mb-6
          "
        >
          Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
          className="
          w-full
          border
          p-3
          rounded-xl
          mb-4
          "
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          className="
          w-full
          border
          p-3
          rounded-xl
          mb-6
          "
        />

        <button
          type="submit"
          className="
          w-full
          bg-blue-600
          text-white
          py-3
          rounded-xl
          "
        >
          {
            loading
            ? "Logging in..."
            : "Login"
          }
        </button>

      </form>
    </div>
  );
}

export default Login;