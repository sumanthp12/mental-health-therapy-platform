import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  Check,
  Eye,
  EyeOff,
  KeyRound,
  LockKeyhole,
  Mail,
  ShieldCheck,
  User,
} from "lucide-react";

import ErrorState from "../../components/ui/ErrorState";

import {
  showSuccess,
  showError,
} from "../../utils/toast";

const API_BASE_URL = "http://localhost:8000/api";


const getToken = () => {
  return localStorage.getItem("token");
};

const apiRequest = async (endpoint, options = {}) => {
  const token = getToken();

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token
        ? { Authorization: `Bearer ${token}` }
        : {}),
      ...(options.headers || {}),
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Something went wrong"
    );
  }

  return data;
};


function SectionHeader({
  icon,
  title,
  description,
}) {
  return (
    <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
        {icon}
      </div>

      <div>
        <h2 className="text-base font-bold text-slate-900">
          {title}
        </h2>

        <p className="mt-0.5 text-xs text-slate-500">
          {description}
        </p>
      </div>
    </div>
  );
}

function FormInput({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  icon,
  disabled = false,
  rightElement,
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold text-slate-700">
        {label}
      </label>

      <div className="relative">
        <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
          {icon}
        </div>

        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={`h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-10 text-sm text-slate-800 outline-none transition ${
            disabled
              ? "cursor-not-allowed opacity-80"
              : "focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
          }`}
        />

        {rightElement}
      </div>
    </div>
  );
}


function PasswordInput({
  label,
  value,
  onChange,
  placeholder,
  visible,
  onToggle,
}) {
  return (
    <FormInput
      label={label}
      value={value}
      onChange={onChange}
      type={visible ? "text" : "password"}
      placeholder={placeholder}
      icon={<LockKeyhole size={17} />}
      rightElement={
        <button
          type="button"
          onClick={onToggle}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-blue-600"
          aria-label={
            visible
              ? "Hide password"
              : "Show password"
          }
        >
          {visible ? (
            <EyeOff size={17} />
          ) : (
            <Eye size={17} />
          )}
        </button>
      }
    />
  );
}

function Profile() {
  const navigate = useNavigate();


  const [profile, setProfile] = useState(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [currentPassword, setCurrentPassword] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [
    showCurrentPassword,
    setShowCurrentPassword,
  ] = useState(false);

  const [
    showNewPassword,
    setShowNewPassword,
  ] = useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  const [loading, setLoading] = useState(true);

  const [profileError, setProfileError] =
    useState(false);

  const [savingProfile, setSavingProfile] =
    useState(false);

  const [changingPassword, setChangingPassword] =
    useState(false);


  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);
      setProfileError(false);

      const data = await apiRequest(
        "/users/profile"
      );

      setProfile(data);

      setName(data.name || "");
      setEmail(data.email || "");
    } catch (error) {
      console.error(
        "Failed to fetch profile:",
        error
      );

      setProfileError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchProfile();
  }, [fetchProfile]);

  const passwordStrength = useMemo(() => {
    if (!newPassword) {
      return {
        label: "",
        percentage: 0,
      };
    }

    let score = 0;

    if (newPassword.length >= 8) score += 1;
    if (/[A-Z]/.test(newPassword)) score += 1;
    if (/[a-z]/.test(newPassword)) score += 1;
    if (/[0-9]/.test(newPassword)) score += 1;
    if (/[^A-Za-z0-9]/.test(newPassword))
      score += 1;

    if (score <= 2) {
      return {
        label: "Weak",
        percentage: 40,
      };
    }

    if (score <= 4) {
      return {
        label: "Good",
        percentage: 70,
      };
    }

    return {
      label: "Strong",
      percentage: 100,
    };
  }, [newPassword]);

  const handleProfileUpdate = async (event) => {
    event.preventDefault();

    if (!name.trim()) {
      showError("Name is required");
      return;
    }

    if (!email.trim()) {
      showError("Email is required");
      return;
    }

    try {
      setSavingProfile(true);

      const data = await apiRequest(
        "/users/profile",
        {
          method: "PUT",
          body: JSON.stringify({
            name: name.trim(),
            email: email.trim(),
          }),
        }
      );

      setProfile(data.user);

      setName(data.user?.name || name);
      setEmail(data.user?.email || email);

      // Keep logged-in user data updated if stored locally.
      const storedUser =
        localStorage.getItem("user");

      if (storedUser) {
        try {
          const parsedUser =
            JSON.parse(storedUser);

          localStorage.setItem(
            "user",
            JSON.stringify({
              ...parsedUser,
              name:
                data.user?.name || name,
              email:
                data.user?.email || email,
            })
          );
        } catch {
          // Ignore malformed local user data.
        }
      }

      showSuccess(
        data.message ||
          "Profile updated successfully"
      );
    } catch (error) {
      console.error(
        "Profile update failed:",
        error
      );

      showError(
        error.message ||
          "Unable to update profile"
      );
    } finally {
      setSavingProfile(false);
    }
  };

  const handlePasswordChange = async (
    event
  ) => {
    event.preventDefault();

    if (!currentPassword) {
      showError(
        "Enter your current password"
      );
      return;
    }

    if (!newPassword) {
      showError("Enter a new password");
      return;
    }

    if (newPassword.length < 6) {
      showError(
        "New password must be at least 6 characters"
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      showError(
        "Passwords do not match"
      );
      return;
    }

    if (currentPassword === newPassword) {
      showError(
        "New password must be different from current password"
      );
      return;
    }

    try {
      setChangingPassword(true);

      const data = await apiRequest(
        "/users/change-password",
        {
          method: "PUT",
          body: JSON.stringify({
            currentPassword,
            newPassword,
          }),
        }
      );

      showSuccess(
        data.message ||
          "Password changed successfully"
      );

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      setShowCurrentPassword(false);
      setShowNewPassword(false);
      setShowConfirmPassword(false);
    } catch (error) {
      console.error(
        "Password change failed:",
        error
      );

      showError(
        error.message ||
          "Unable to change password"
      );
    } finally {
      setChangingPassword(false);
    }
  };


  if (loading) {
    return (
      <div className="min-h-full bg-slate-50 px-5 py-5 lg:px-7 lg:py-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 flex items-start justify-between">
            <div>
              <div className="mb-2 h-3 w-20 animate-pulse rounded bg-slate-200" />

              <div className="mb-2 h-8 w-40 animate-pulse rounded bg-slate-200" />

              <div className="h-4 w-72 animate-pulse rounded bg-slate-200" />
            </div>

            <div className="h-11 w-24 animate-pulse rounded-xl bg-slate-200" />
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            <div className="h-[430px] animate-pulse rounded-2xl border border-slate-200 bg-white" />

            <div className="h-[430px] animate-pulse rounded-2xl border border-slate-200 bg-white" />
          </div>
        </div>
      </div>
    );
  }


  if (profileError) {
    return (
      <div className="min-h-full bg-slate-50 px-5 py-5 lg:px-7 lg:py-6">
        <div className="mx-auto max-w-6xl">
          <ErrorState
            title="Unable to load your profile"
            description="We couldn't load your account information right now. Please try again."
            onRetry={fetchProfile}
            retryText="Reload Profile"
          />
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-full bg-slate-50 px-5 py-5 lg:px-7 lg:py-6">
      <div className="mx-auto max-w-6xl">

        {/* Page heading */}
        <div className="mb-6 flex items-start justify-between">
          <div>
            <div className="mb-1 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-blue-600">
              <User size={15} />
              Account
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-slate-950">
              My Profile
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Manage your account information and security.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-blue-200 hover:text-blue-600"
          >
            <ArrowLeft size={17} />
            Back
          </button>
        </div>

        {/* Two-column layout */}
        <div className="grid gap-5 lg:grid-cols-2">

          <section className="flex min-h-[430px] flex-col rounded-2xl border border-slate-200 bg-white shadow-sm">

            <SectionHeader
              icon={<User size={20} />}
              title="Personal Information"
              description="Update your account details."
            />

            <form
              onSubmit={handleProfileUpdate}
              className="flex flex-1 flex-col p-5"
            >
              <div className="space-y-5">

                <FormInput
                  label="Full Name"
                  value={name}
                  onChange={(event) =>
                    setName(event.target.value)
                  }
                  placeholder="Enter your full name"
                  icon={<User size={17} />}
                />

                <FormInput
                  label="Email Address"
                  value={email}
                  onChange={(event) =>
                    setEmail(event.target.value)
                  }
                  placeholder="Enter your email"
                  type="email"
                  icon={<Mail size={17} />}
                />

                {/* Account type */}
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                    Account Type
                  </label>

                  <div className="flex h-16 items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3">

                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-blue-600 shadow-sm">
                      <ShieldCheck size={18} />
                    </div>

                    <div className="flex-1">
                      <p className="text-sm font-semibold text-slate-800">
                        Your account role
                      </p>

                      <p className="text-xs text-slate-500">
                        This cannot be changed.
                      </p>
                    </div>

                    <span className="rounded-full bg-white px-3 py-1 text-xs font-bold capitalize text-slate-700 shadow-sm">
                      {profile?.role || "User"}
                    </span>

                  </div>
                </div>
              </div>

              {/* Save button */}
              <div className="mt-auto pt-5">
                <button
                  type="submit"
                  disabled={savingProfile}
                  className="flex h-11 w-full items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-sm font-bold text-white shadow-md shadow-blue-200 transition hover:from-blue-700 hover:to-cyan-600 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {savingProfile ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Saving...
                    </span>
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </div>
            </form>
          </section>

          <section className="flex min-h-[430px] flex-col rounded-2xl border border-slate-200 bg-white shadow-sm">

            <SectionHeader
              icon={<KeyRound size={20} />}
              title="Security"
              description="Change your account password."
            />

            <form
              onSubmit={handlePasswordChange}
              className="flex flex-1 flex-col p-5"
            >
              <div className="space-y-5">

                <PasswordInput
                  label="Current Password"
                  value={currentPassword}
                  onChange={(event) =>
                    setCurrentPassword(
                      event.target.value
                    )
                  }
                  placeholder="Enter current password"
                  visible={showCurrentPassword}
                  onToggle={() =>
                    setShowCurrentPassword(
                      (value) => !value
                    )
                  }
                />

                <PasswordInput
                  label="New Password"
                  value={newPassword}
                  onChange={(event) =>
                    setNewPassword(
                      event.target.value
                    )
                  }
                  placeholder="Enter new password"
                  visible={showNewPassword}
                  onToggle={() =>
                    setShowNewPassword(
                      (value) => !value
                    )
                  }
                />

                <PasswordInput
                  label="Confirm New Password"
                  value={confirmPassword}
                  onChange={(event) =>
                    setConfirmPassword(
                      event.target.value
                    )
                  }
                  placeholder="Confirm new password"
                  visible={showConfirmPassword}
                  onToggle={() =>
                    setShowConfirmPassword(
                      (value) => !value
                    )
                  }
                />

                {/* Password strength */}
                {newPassword && (
                  <div className="pt-0.5">

                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-500">
                        Password strength
                      </span>

                      <span className="text-xs font-bold text-slate-700">
                        {passwordStrength.label}
                      </span>
                    </div>

                    <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 transition-all duration-300"
                        style={{
                          width: `${passwordStrength.percentage}%`,
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* Password match */}
                {confirmPassword && (
                  <div
                    className={`flex items-center gap-2 text-xs font-medium ${
                      newPassword ===
                      confirmPassword
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    <Check size={14} />

                    {newPassword ===
                    confirmPassword
                      ? "Passwords match"
                      : "Passwords do not match"}
                  </div>
                )}
              </div>

              {/* Change password button */}
              <div className="mt-auto pt-6">
                <button
                  type="submit"
                  disabled={changingPassword}
                  className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-slate-950 text-sm font-bold text-white shadow-md transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {changingPassword ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Changing Password...
                    </>
                  ) : (
                    <>
                      <KeyRound size={17} />
                      Change Password
                    </>
                  )}
                </button>
              </div>
            </form>
          </section>
        </div>

        {/* Security note */}
        <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-400">
          <ShieldCheck size={14} />

          <span>
            Your account information is protected and only accessible to authorized users.
          </span>
        </div>
      </div>
    </div>
  );
}

export default Profile;