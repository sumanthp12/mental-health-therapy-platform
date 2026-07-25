import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { User, Brain, NotebookPen, Phone, Calendar } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

function TherapistClientDetails() {

    const { assignmentId } = useParams();
    const { token } = useAuth();
    const [assignment, setAssignment] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchAssignment = async () => {
            try {
                const response = await fetch(
                `http://localhost:8000/api/assignments/${assignmentId}`,
                {
                    headers: {
                    Authorization: `Bearer ${token}`,
                    },
                }
                );

                const data = await response.json();

                if (response.ok) {
                setAssignment(data);
                } else {
                console.error(data);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
            };

            useEffect(() => {
                if (token) {
                    // eslint-disable-next-line react-hooks/set-state-in-effect
                    fetchAssignment();
                }
                // eslint-disable-next-line react-hooks/exhaustive-deps
                }, [token]);

                if (loading) {
                    return (
                        <div className="p-6">
                        Loading...
                        </div>
                    );
                    }

                    if (!assignment) {
                        return (
                            <div className="p-6">
                            Client not found.
                            </div>
                        );
                        }

  return (
  <div className="space-y-4">
    <button
        onClick={() => navigate("/therapist/clients")}
        className="mb-6 flex items-center gap-2 text-blue-600 hover:text-blue-700"
        >
        ← Back to Clients
    </button>
    {/* Header */}

    <div className="bg-white rounded-xl shadow p-6">

        <h1 className="text-3xl font-bold">
            {assignment.client.name}
        </h1>

        <p className="text-gray-500 mt-1">
            {assignment.client.email}
        </p>

        <span className="inline-block mt-4 px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm">
            {assignment.status}
        </span>

    </div>

    <div className="bg-white rounded-xl shadow p-6">

        <h2 className="flex items-center gap-2 text-xl font-semibold">
            <User size={22}/>
            Personal Information
        </h2>

        <div className="grid grid-cols-2 gap-6">

            <div>
                <p className="text-gray-500 text-sm">Age</p>
                <p className="font-medium">
                    {assignment.intakeForm.age}
                </p>
            </div>

            <div>
                <p className="text-gray-500 text-sm">Gender</p>
                <p className="font-medium">
                    {assignment.intakeForm.gender}
                </p>
            </div>

            <div>
                <p className="text-gray-500 text-sm">Email</p>
                <p className="font-medium">
                    {assignment.client.email}
                </p>
            </div>

            <div>
                <p className="text-gray-500 text-sm">Preferred Language</p>
                <p className="font-medium">
                    {assignment.intakeForm.preferredLanguage}
                </p>
            </div>

        </div>

    </div>

    <div className="bg-white rounded-xl shadow p-6">

        <h2 className="flex items-center gap-2 text-xl font-semibold">
            <Brain size={22}/>
            Therapy Information
        </h2>

        <div className="space-y-5">

            <div>
                <p className="text-gray-500 text-sm">
                    Primary Concern
                </p>

                <p className="font-medium">
                    {assignment.intakeForm.concern}
                </p>
            </div>

            <div>
                <p className="text-gray-500 text-sm">
                    Symptoms
                </p>

                <p className="font-medium">
                    {assignment.intakeForm.symptoms}
                </p>
            </div>

            <div>
                <p className="text-gray-500 text-sm">
                    Preferred Therapist Gender
                </p>

                <p className="font-medium">
                    {assignment.intakeForm.preferredTherapistGender}
                </p>
            </div>

        </div>

    </div>

    <div className="bg-white rounded-xl shadow p-6">

        <h2 className="flex items-center gap-2 text-xl font-semibold">
            <Phone size={22}/>
            Emergency Contact
        </h2>

        <p className="font-medium">
            {assignment.intakeForm.emergencyContact}
        </p>

    </div>

    <div className="bg-white rounded-xl shadow p-6">

        <h2 className="flex items-center gap-2 text-xl font-semibold">
            <NotebookPen size={22}/>
            Notes
        </h2>

        <p>
            {assignment.intakeForm.notes}
        </p>

    </div>

    <div className="bg-white rounded-xl shadow p-6">

        <h2 className="flex items-center gap-2 text-xl font-semibold">
            <Calendar size={22}/>
            Assignment Details
        </h2>

        <div className="grid grid-cols-2 gap-6">

            <div>
                <p className="text-gray-500 text-sm">
                    Status
                </p>

                <span className="px-3 py-0.5 rounded-full bg-green-100 text-green-700 font-medium capitalize">
                    {assignment.status}
                </span>
            </div>

            <div>
                <p className="text-gray-500 text-sm">
                    Assigned On
                </p>

                <p className="font-medium">
                    {new Date(assignment.assignedAt).toLocaleDateString(
                        "en-IN",
                        {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                        }
                    )}
                </p>
            </div>

        </div>

    </div>

    <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-2xl font-bold mb-6">Actions</h2>

        <button
            onClick={() =>
            navigate(`/therapist/messages?id=${assignment.client._id}`)
            }
            className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition"
        >
            Send Message
        </button>
        </div>

</div>
);
}

export default TherapistClientDetails;