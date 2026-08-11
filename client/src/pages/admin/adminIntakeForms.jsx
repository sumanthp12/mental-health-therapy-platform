import { useEffect, useState } from "react";
import { Eye, CheckCircle2, X } from "lucide-react";

import TopBar from "../../components/dashboard/TopBar";
import { getUsers } from "../../services/userService";

import LoadingSpinner from "../../components/ui/LoadingSpinner";
import EmptyState from "../../components/ui/EmptyState";
import ErrorState from "../../components/ui/ErrorState";

import { showSuccess, showError } from "../../utils/toast";

function IntakeForms() {
  const [intakeForms, setIntakeForms] = useState([]);
  const [therapists, setTherapists] = useState([]);
  const [selectedTherapists, setSelectedTherapists] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [assigningFormId, setAssigningFormId] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedForm, setSelectedForm] = useState(null);

  const fetchIntakeForms = async () => {
      try {
        const token = localStorage.getItem("token");

        const [intakeResponse, usersResponse] = await Promise.all([
          fetch("http://localhost:8000/api/intake", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
          getUsers(),
        ]);

        if (!intakeResponse.ok) {
          const errorData = await intakeResponse.json().catch(() => ({}));

          throw new Error(
            errorData?.message || "Unable to load intake forms."
          );
        }

        const intakeData = await intakeResponse.json();

        const usersData = usersResponse?.users || usersResponse || [];

        const enrichedIntakeForms = intakeData.map((form) => {
          const clientId =
            typeof form.client === "object"
              ? form.client?._id
              : form.client;

          const clientUser = usersData.find(
            (user) => user._id === clientId
          );

          return {
            ...form,

            client:
              form.client?.name
                ? form.client
                : clientUser || form.client,

            assignment:
              form.assignment ||
              clientUser?.assignment ||
              null,

            therapist:
              form.therapist ||
              clientUser?.therapist ||
              null,
          };
        });

        setIntakeForms(enrichedIntakeForms);
      } catch (err) {
          console.error("Failed to fetch intake forms:", err);

          setError(true);

          showError(
            err?.message ||
              "Unable to load intake forms."
          );

          throw err;
        }
      };

  const fetchTherapists = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          "http://localhost:8000/api/therapists",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));

          throw new Error(
            errorData?.message ||
              "Unable to load therapists."
          );
        }

        const therapistData = await response.json();

        setTherapists(therapistData);

        return therapistData;
      } catch (err) {
        console.error("Failed to fetch therapists:", err);

        showError(
          err?.message ||
            "Unable to load therapists."
        );

        throw err;
      }
    };

const assignTherapist = async (form) => {
  try {
    const therapistId = selectedTherapists[form._id];

    if (!therapistId) {
      showError("Please select a therapist.");
      return;
    }

    setAssigningFormId(form._id);

    const token = localStorage.getItem("token");

    const response = await fetch(
      "http://localhost:8000/api/assignments",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          intakeFormId: form._id,
          therapistId,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data?.message ||
          "Unable to assign therapist."
      );
    }

    showSuccess("Therapist assigned successfully!");

    setSelectedTherapists({});

    await fetchIntakeForms();
    await fetchTherapists();
  } catch (err) {
    console.error("Unable to assign therapist:", err);

    showError(
      err?.message ||
        "Unable to assign therapist."
    );
  } finally {
    setAssigningFormId(null);
  }
};

  const handleViewDetails = (form) => {
    setSelectedForm(form);
    setShowViewModal(true);
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(false);

        await Promise.all([
          fetchTherapists(),
          fetchIntakeForms(),
        ]);
      } catch (err) {
        console.error("Failed to load intake page:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <div className="space-y-6">

      <TopBar title="Intake Forms" />

      {/* Intake Forms */}

      <div className="rounded-2xl border bg-white p-6 shadow-sm">

        <div className="mb-6">

          <h2 className="text-xl font-bold text-gray-900">
            Submitted Intake Forms
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Manage therapist assignments for submitted intake forms.
          </p>

        </div>

        {loading ? (
          <LoadingSpinner
            fullScreen
            label="Loading intake forms..."
          />
        ) : error ? (
          <ErrorState
            title="Unable to load intake forms"
            description="We couldn't load the intake forms right now. Please try again."
            onRetry={async () => {
              try {
                setLoading(true);
                setError(false);

                await Promise.all([
                  fetchTherapists(),
                  fetchIntakeForms(),
                ]);
              // eslint-disable-next-line no-unused-vars
              } catch (err) {
                setError(true);
              } finally {
                setLoading(false);
              }
            }}
            retryText="Reload Intake Forms"
          />
        ) : intakeForms.length === 0 ? (
          <EmptyState
            title="No intake forms found"
            description="Submitted intake forms will appear here."
          />
        ) : (

          <div className="overflow-x-auto">

            <table className="w-full min-w-[900px] border-collapse">

              <thead>

                <tr className="border-b bg-gray-50">

                  <th className="px-5 py-4 text-left text-sm font-semibold text-gray-700">
                    Client
                  </th>

                  <th className="px-5 py-4 text-left text-sm font-semibold text-gray-700">
                    Concern
                  </th>

                  <th className="px-5 py-4 text-left text-sm font-semibold text-gray-700">
                    Therapist
                  </th>

                  <th className="px-5 py-4 text-left text-sm font-semibold text-gray-700">
                    Action
                  </th>

                  <th className="px-5 py-4 text-left text-sm font-semibold text-gray-700">
                    Status
                  </th>

                  <th className="px-5 py-4 text-left text-sm font-semibold text-gray-700">
                    Details
                  </th>

                </tr>

              </thead>

              <tbody>

                {intakeForms.map((form) => {

                  const isAssigned =
                    form.status?.toLowerCase() === "assigned" ||
                    Boolean(form.assignment);

                    const assignedTherapist =
                    form.therapist?.name ||
                    form.assignment?.therapist?.user?.name ||
                    null;

                  return (

                    <tr
                      key={form._id}
                      className="border-b last:border-b-0 hover:bg-gray-50 transition"
                    >

                      {/* Client */}

                      <td className="px-5 py-5">

                        <div>

                          <p className="font-semibold text-gray-900">
                            {form.client?.name || "Unknown Client"}
                          </p>

                          <p className="mt-1 text-sm text-gray-500">
                            {form.client?.email || "No email"}
                          </p>

                        </div>

                      </td>

                      {/* Concern */}

                      <td className="px-5 py-5">

                        <span className="font-medium text-gray-700">
                          {form.concern || "—"}
                        </span>

                      </td>

                      {/* Therapist */}

                      <td className="px-5 py-5">

                        {isAssigned ? (

                          <div className="flex items-center gap-2">

                            <CheckCircle2
                              size={18}
                              className="text-green-600"
                            />

                            <span className="font-medium text-gray-800">
                              {assignedTherapist || "Assigned"}
                            </span>

                          </div>

                        ) : (

                          <select
                            value={
                              selectedTherapists[form._id] || ""
                            }
                            onChange={(e) =>
                              setSelectedTherapists((prev) => ({
                                ...prev,
                                [form._id]: e.target.value,
                              }))
                            }
                            className="rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                          >

                            <option value="">
                              Select Therapist
                            </option>

                            {therapists.map((therapist) => (

                              <option
                                key={therapist._id}
                                value={therapist._id}
                              >
                                {therapist.user?.name}
                              </option>

                            ))}

                          </select>

                        )}

                      </td>

                      {/* Action */}

                      <td className="px-5 py-5">

                        {!isAssigned && (

                          <button
                            onClick={() => assignTherapist(form)}
                            disabled={assigningFormId === form._id}
                            className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            {assigningFormId === form._id
                              ? "Assigning..."
                              : "Assign"}
                          </button>

                        )}

                        {isAssigned && (

                          <span className="text-sm font-medium text-gray-400">
                            Completed
                          </span>

                        )}

                      </td>

                      {/* Status */}

                      <td className="px-5 py-5">

                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                            isAssigned
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {form.status || "Pending"}
                        </span>

                      </td>

                      {/* View Details */}

                      <td className="px-5 py-5">

                        <button
                          onClick={() => handleViewDetails(form)}
                          className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                        >

                          <Eye size={17} />

                          View Details

                        </button>

                      </td>

                    </tr>

                  );
                })}

              </tbody>

            </table>

          </div>

        )}

      </div>

      {/* View Details Modal */}

      {showViewModal && selectedForm && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

          <div className="flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl bg-white">

            {/* Header */}

            <div className="flex items-center justify-between border-b px-8 py-6">

              <div>

                <h2 className="text-3xl font-bold text-gray-900">
                  Client Details
                </h2>

                <p className="mt-1 text-gray-500">
                  Complete client intake information
                </p>

              </div>

              <button
                onClick={() => setShowViewModal(false)}
                className="rounded-full p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
              >

                <X size={28} />

              </button>

            </div>

            {/* Body */}

            <div className="flex-1 space-y-8 overflow-y-auto p-8">

              {/* Client Information */}

              <div>

                <h3 className="mb-5 text-xl font-semibold text-gray-900">
                  Client Information
                </h3>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">

                  <div>

                    <p className="text-sm text-gray-500">
                      Client Name
                    </p>

                    <p className="mt-1 text-lg font-semibold">
                      {selectedForm.client?.name || "-"}
                    </p>

                  </div>

                  <div>

                    <p className="text-sm text-gray-500">
                      Email
                    </p>

                    <p className="mt-1 font-semibold">
                      {selectedForm.client?.email || "-"}
                    </p>

                  </div>

                  <div>

                    <p className="text-sm text-gray-500">
                      Status
                    </p>

                    <span
                      className={`mt-2 inline-flex rounded-full px-3 py-1 text-sm font-medium ${
                        selectedForm.status?.toLowerCase() === "assigned"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {selectedForm.status || "Pending"}
                    </span>

                  </div>

                  <div>

                    <p className="text-sm text-gray-500">
                      Assigned Therapist
                    </p>

                      <p className="mt-1 font-semibold">
            {selectedForm.therapist?.name ||
                selectedForm.assignment?.therapist?.user?.name ||
                "Not Assigned"}
            </p>

                  </div>

                </div>

              </div>

              {/* Divider */}

              <div className="border-t" />

              {/* Intake Assessment */}

              <div className="rounded-2xl border bg-gray-50 p-6">

                <h3 className="mb-6 text-xl font-semibold text-gray-900">
                  Intake Assessment
                </h3>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">

                  <div>

                    <p className="text-sm text-gray-500">
                      Age
                    </p>

                    <p className="font-semibold">
                      {selectedForm.age || "-"}
                    </p>

                  </div>

                  <div>

                    <p className="text-sm text-gray-500">
                      Gender
                    </p>

                    <p className="font-semibold">
                      {selectedForm.gender || "-"}
                    </p>

                  </div>

                  <div>

                    <p className="text-sm text-gray-500">
                      Preferred Language
                    </p>

                    <p className="font-semibold">
                      {selectedForm.preferredLanguage || "-"}
                    </p>

                  </div>

                  <div>

                    <p className="text-sm text-gray-500">
                      Preferred Therapist Gender
                    </p>

                    <p className="font-semibold">
                      {selectedForm.preferredTherapistGender || "-"}
                    </p>

                  </div>

                </div>

                <div className="mt-8">

                  <p className="text-sm text-gray-500">
                    Primary Concern
                  </p>

                  <p className="mt-2 font-medium">
                    {selectedForm.concern || "-"}
                  </p>

                </div>

                <div className="mt-6">

                  <p className="text-sm text-gray-500">
                    Symptoms
                  </p>

                  <p className="mt-2 leading-relaxed">
                    {selectedForm.symptoms || "-"}
                  </p>

                </div>

                <div className="mt-6">

                  <p className="text-sm text-gray-500">
                    Emergency Contact
                  </p>

                  <p className="mt-2 font-medium">
                    {selectedForm.emergencyContact || "-"}
                  </p>

                </div>

                <div className="mt-6">

                  <p className="text-sm text-gray-500">
                    Notes
                  </p>

                  <p className="mt-2 leading-relaxed">
                    {selectedForm.notes || "-"}
                  </p>

                </div>

              </div>

            </div>

            {/* Footer */}

            <div className="flex justify-end border-t px-8 py-5">

              <button
                onClick={() => setShowViewModal(false)}
                className="rounded-xl border px-6 py-3 font-medium transition hover:bg-gray-100"
              >
                Close
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default IntakeForms;