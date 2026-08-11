import { useEffect, useState } from "react";
import {
  Mail,
  Briefcase,
  UserRound,
  MessageCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { getAssignedTherapist } from "../../services/therapistService";

import LoadingSpinner from "../../components/ui/LoadingSpinner";
import EmptyState from "../../components/ui/EmptyState";
import ErrorState from "../../components/ui/ErrorState";

import { showError } from "../../utils/toast";

function MyTherapist() {
  const [therapist, setTherapist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const loadTherapist = async () => {
    try {
      setLoading(true);
      setError(false);

      const data = await getAssignedTherapist();

      setTherapist(data);
    } catch (err) {
      console.error(
        "Failed to load assigned therapist:",
        err
      );

      // No therapist assigned yet is a valid state.
      // The API may return 404 when there is no assignment.
      if (err?.response?.status === 404) {
        setTherapist(null);
        setError(false);
        return;
      }

      setError(true);

      showError(
        err?.response?.data?.message ||
          "Unable to load your therapist."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadTherapist();
  }, []);

  if (loading) {
    return (
      <LoadingSpinner
        fullScreen
        label="Loading your therapist..."
      />
    );
  }

  if (error) {
    return (
      <ErrorState
        title="Unable to load your therapist"
        description="We couldn't load your therapist information right now. Please try again."
        onRetry={loadTherapist}
        retryText="Reload Therapist"
      />
    );
  }

  if (!therapist) {
    return (
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">
            My Therapist
          </h1>

          <p className="mt-2 text-gray-500">
            View your assigned therapist's profile.
          </p>
        </div>

        <EmptyState
          icon={UserRound}
          title="No therapist assigned yet"
          description="Your intake information has been received. An administrator will review your information and assign a suitable therapist to you soon."
        />

        <div className="mt-6 rounded-2xl bg-blue-50 px-6 py-4 text-center">
          <p className="font-semibold text-blue-700">
            Assignment Pending
          </p>

          <p className="mt-1 text-sm text-blue-600">
            You'll be able to view your therapist's profile
            and communicate with them once the assignment is
            complete.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          My Therapist
        </h1>

        <p className="mt-2 text-gray-500">
          View your assigned therapist's profile.
        </p>
      </div>

      <div className="rounded-3xl bg-white p-8 shadow-sm">
        <div className="flex flex-col items-center">
          <div className="flex h-28 w-28 items-center justify-center rounded-full bg-blue-100">
            <UserRound className="h-14 w-14 text-blue-600" />
          </div>

          <h2 className="mt-5 text-3xl font-bold">
            {therapist.user.name}
          </h2>

          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <span className="rounded-full bg-blue-100 px-4 py-1 text-blue-700">
              {therapist.specialization}
            </span>

            <span
              className={`rounded-full px-4 py-1 ${
                therapist.availability
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {therapist.availability
                ? "Available"
                : "Unavailable"}
            </span>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border p-5">
            <Mail className="mb-3 text-blue-600" />

            <p className="text-sm text-gray-500">
              Email
            </p>

            <p className="font-semibold">
              {therapist.user.email}
            </p>
          </div>

          <div className="rounded-2xl border p-5">
            <Briefcase className="mb-3 text-green-600" />

            <p className="text-sm text-gray-500">
              Experience
            </p>

            <p className="font-semibold">
              {therapist.experience} Years
            </p>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border p-6">
          <h3 className="mb-2 text-lg font-semibold text-slate-700">
            About Therapist
          </h3>

          <p className="text-gray-600">
            {therapist.bio}
          </p>
        </div>

        <div className="mt-8 flex gap-4">
          <button
            onClick={() =>
              navigate("/client/messages")
            }
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
          >
            <MessageCircle size={18} />
            Message Therapist
          </button>

          <button
            onClick={() =>
              navigate("/client/sessions")
            }
            className="rounded-xl border px-6 py-3 hover:bg-gray-50"
          >
            View Sessions
          </button>
        </div>
      </div>
    </div>
  );
}

export default MyTherapist;