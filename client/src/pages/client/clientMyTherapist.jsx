import { useEffect, useState } from "react";
import { Mail, Briefcase, UserRound, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getAssignedTherapist } from "../../services/therapistService";

function MyTherapist() {
  const [therapist, setTherapist] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const loadTherapist = async () => {
      try {
        const data = await getAssignedTherapist();
        setTherapist(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadTherapist();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!therapist) {
    return (
      <div className="rounded-xl bg-white p-10 text-center shadow">
        <h2 className="text-2xl font-bold">
          No Therapist Assigned
        </h2>
        <p className="mt-2 text-gray-500">
          An administrator will assign a therapist soon.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-8">

      <div>
        <h1 className="text-3xl font-bold">
          My Therapist
        </h1>

        <p className="text-gray-500 mt-2">
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
              {therapist.availability ? "Available" : "Unavailable"}
            </span>
          </div>

        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">

          <div className="rounded-2xl border p-5">
            <Mail className="mb-3 text-blue-600" />
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-semibold">{therapist.user.email}</p>
          </div>

          <div className="rounded-2xl border p-5">
            <Briefcase className="mb-3 text-green-600" />
            <p className="text-sm text-gray-500">Experience</p>
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
            onClick={() => navigate("/client/messages")}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
          >
            <MessageCircle size={18} />
            Message Therapist
          </button>

          <button
            onClick={() => navigate("/client/sessions")}
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