import { useEffect, useMemo, useState } from "react";
import {
  Search,
  Plus,
  Mail,
  BriefcaseMedical,
  Clock3,
  Pencil,
  Trash2,
  UserRound,
} from "lucide-react";
import {
  getTherapists,
  createTherapist,
  updateTherapist,
  deleteTherapist,
} from "../../services/therapistService";
import TopBar from "../../components/dashboard/TopBar";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import EmptyState from "../../components/ui/EmptyState";
import ErrorState from "../../components/ui/ErrorState";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import { showSuccess, showError } from "../../utils/toast";

function Therapists() {
  const [therapists, setTherapists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [therapistToDelete, setTherapistToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    specialization: "",
    experience: "",
    bio: "",
    availability: true,
  });
  const [saving, setSaving] = useState(false);
  const [editingTherapist, setEditingTherapist] = useState(null);

  const fetchTherapists = async () => {
    try {
      setLoading(true);
      setError(false);

      const data = await getTherapists();

      setTherapists(data || []);
    } catch (err) {
      console.error("Failed to fetch therapists:", err);

      setError(true);

      showError(
        err?.response?.data?.message ||
          "Unable to load therapists."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchTherapists();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCreateTherapist = async (e) => {
      e.preventDefault();

      try {
        setSaving(true);

        const payload = {
          ...formData,
          experience: Number(formData.experience),
        };

        if (editingTherapist) {
          await updateTherapist(editingTherapist._id, payload);

          showSuccess("Therapist updated successfully!");
        } else {
          await createTherapist(payload);

          showSuccess("Therapist created successfully!");
        }

        setShowModal(false);

        setEditingTherapist(null);

        setFormData({
          name: "",
          email: "",
          password: "",
          specialization: "",
          experience: "",
          bio: "",
          availability: true,
        });

        fetchTherapists();

      } catch (err) {
        console.error("Unable to save therapist:", err);

        showError(
          err?.response?.data?.message ||
            "Unable to save therapist."
        );
      } finally {
        setSaving(false);
      }
    };


const handleEditClick = (therapist) => {
  setEditingTherapist(therapist);

  setFormData({
    name: therapist.user?.name || "",
    email: therapist.user?.email || "",
    password: "",
    specialization: therapist.specialization || "",
    experience: therapist.experience || "",
    bio: therapist.bio || "",
    availability: therapist.availability,
  });

  setShowModal(true);
};

const handleDeleteClick = (therapist) => {
    setTherapistToDelete(therapist);
    setShowDeleteDialog(true);
  };

  const handleDeleteTherapist = async () => {
    if (!therapistToDelete) return;

    try {
      setDeleting(true);

      await deleteTherapist(therapistToDelete._id);

      showSuccess("Therapist deleted successfully!");

      setShowDeleteDialog(false);
      setTherapistToDelete(null);

      await fetchTherapists();
    } catch (err) {
      console.error("Unable to delete therapist:", err);

      showError(
        err?.response?.data?.message ||
          "Unable to delete therapist."
      );
    } finally {
      setDeleting(false);
    }
  };

  const filteredTherapists = useMemo(() => {
    return therapists.filter((therapist) => {
      const name =
        therapist.user?.name?.toLowerCase() || "";

      const specialization =
        therapist.specialization?.toLowerCase() || "";

      return (
        name.includes(search.toLowerCase()) ||
        specialization.includes(search.toLowerCase())
      );
    });
  }, [search, therapists]);

  return (
    <div className="space-y-6">

      <TopBar title="Therapists" />

      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 text-white">

        <div className="flex items-center justify-between">

          <div>

            <h1 className="text-3xl font-bold">
              Therapist Management
            </h1>

            <p className="mt-2 text-blue-100">
              Manage all therapists in your platform.
            </p>

          </div>

          <button
            className="
              flex
              items-center
              gap-2
              bg-white
              text-blue-600
              px-5
              py-3
              rounded-xl
              font-semibold
              hover:shadow-lg
              transition
            "
          onClick={() => setShowModal(true)} >
            <Plus size={18} /> 

            Add Therapist

          </button>

        </div>

      </div>

      <div className="grid grid-cols-4 gap-6">

        <div className="bg-white rounded-2xl shadow-sm p-5">

          <p className="text-gray-500">
            Total Therapists
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {therapists.length}
          </h2>

        </div>

        <div className="bg-white rounded-2xl shadow-sm p-5">

          <p className="text-gray-500">
            Available
          </p>

          <h2 className="text-3xl font-bold text-green-600 mt-2">
            {
              therapists.filter(
                (t) => t.availability
              ).length
            }
          </h2>

        </div>

        <div className="bg-white rounded-2xl shadow-sm p-5">

          <p className="text-gray-500">
            Unavailable
          </p>

          <h2 className="text-3xl font-bold text-red-500 mt-2">
            {
              therapists.filter(
                (t) => !t.availability
              ).length
            }
          </h2>

        </div>

        <div className="bg-white rounded-2xl shadow-sm p-5">

          <p className="text-gray-500">
            Specializations
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {
              new Set(
                therapists.map(
                  (t) => t.specialization
                )
              ).size
            }
          </h2>

        </div>

      </div>

      <div className="bg-white rounded-2xl shadow-sm p-5">

        <div className="relative">

          <Search
            size={18}
            className="
              absolute
              left-4
              top-3.5
              text-gray-400
            "
          />

          <input
            type="text"
            placeholder="Search therapist..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="
              w-full
              pl-11
              pr-4
              py-3
              border
              rounded-xl
              outline-none
              focus:ring-2
              focus:ring-blue-500
            "
          />

        </div>

      </div>

      {/* Therapist Cards */}
            {loading ? (
              <LoadingSpinner
                fullScreen
                label="Loading therapists..."
              />
              ) : error ? (
              <ErrorState
                title="Unable to load therapists"
                description="We couldn't load the therapist list right now. Please try again."
                onRetry={fetchTherapists}
                retryText="Reload Therapists"
              />
      ) : filteredTherapists.length === 0 ? (
        <EmptyState
          icon={UserRound}
          title="No therapists found"
          description="Try changing your search or add a new therapist."
        />
      ) : (
        <div className="grid lg:grid-cols-2 gap-6">
          {filteredTherapists.map((therapist) => (
            <div
              key={therapist._id}
              className="
                bg-white
                rounded-3xl
                shadow-sm
                p-6
                hover:shadow-lg
                transition
              "
            >
              <div className="flex justify-between items-start">

                <div className="flex gap-4">

                  <div
                    className="
                      h-16
                      w-16
                      rounded-full
                      bg-blue-100
                      flex
                      items-center
                      justify-center
                      text-blue-600
                      text-xl
                      font-bold
                    "
                  >
                    {therapist.user?.name
                      ?.charAt(0)
                      ?.toUpperCase()}
                  </div>

                  <div>

                    <h2 className="text-xl font-bold">
                      {therapist.user?.name}
                    </h2>

                    <div className="flex items-center gap-2 mt-1 text-gray-500">
                      <Mail size={15} />

                      <span className="text-sm">
                        {therapist.user?.email}
                      </span>
                    </div>

                  </div>

                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    therapist.availability
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {therapist.availability
                    ? "Available"
                    : "Unavailable"}
                </span>

              </div>

              <div className="mt-6 space-y-3">

                <div className="flex items-center gap-3">

                  <BriefcaseMedical
                    size={18}
                    className="text-blue-600"
                  />

                  <span className="font-medium">
                    {therapist.specialization}
                  </span>

                </div>

                <div className="flex items-center gap-3">

                  <Clock3
                    size={18}
                    className="text-orange-500"
                  />

                  <span>
                    {therapist.experience} Years Experience
                  </span>

                </div>

                <p className="text-gray-500 leading-relaxed">
                  {therapist.bio || "No bio added."}
                </p>

              </div>

              <div className="flex gap-3 mt-6">

                <button
                  onClick={() => handleEditClick(therapist)}
                  className="
                    flex-1
                    flex
                    items-center
                    justify-center
                    gap-2
                    bg-blue-600
                    hover:bg-blue-700
                    text-white
                    py-3
                    rounded-xl
                    transition
                  "
                >
                  <Pencil size={16} />

                  Edit
                </button>

                <button
                  className="
                    flex-1
                    flex
                    items-center
                    justify-center
                    gap-2
                    bg-red-500
                    hover:bg-red-600
                    text-white
                    py-3
                    rounded-xl
                    transition
                  "
                  onClick={() => handleDeleteClick(therapist)}
                >
                  <Trash2 size={16} />

                  Delete
                </button>

              </div>

            </div>
          ))}
        </div>
      )}
      {/* ================= ADD THERAPIST MODAL ================= */}

{showModal && (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">

    <div className="bg-white rounded-3xl shadow-2xl w-1/2 max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">

      {/* Header */}

      <div className="flex items-center justify-between p-6 border-b shrink-0">

        <div>
          <h2 className="text-2xl font-bold">
            {editingTherapist ? "Edit Therapist" : "Add Therapist"}
          </h2>

          <p className="text-gray-500 text-sm mt-1">
            {editingTherapist
            ? "Update therapist information."
            : "Create a new therapist account."}
          </p>
        </div>

        <button
          onClick={() => setShowModal(false)}
          className="text-2xl text-gray-400 hover:text-red-500"
        >
          ×
        </button>

      </div>

      {/* Form */}

      <form
        onSubmit={handleCreateTherapist}
        className="flex flex-col flex-1 min-h-0 overflow-y-auto p-6 space-y-4"
      >

        <div className="grid grid-cols-2 gap-4">

          <div>

            <label className="text-sm font-medium">
              Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full mt-2 border rounded-xl px-4 py-3"
            />

          </div>

          <div>

            <label className="text-sm font-medium">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full mt-2 border rounded-xl px-4 py-3"
            />

          </div>

        </div>

        <div className="grid grid-cols-2 gap-4">

          <div>

            <label className="text-sm font-medium">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="w-full mt-2 border rounded-xl px-4 py-3"
            />

          </div>

          <div>

            <label className="text-sm font-medium">
              Experience (Years)
            </label>

            <input
              type="number"
              name="experience"
              value={formData.experience}
              onChange={handleInputChange}
              required
              className="w-full mt-2 border rounded-xl px-4 py-3"
            />

          </div>

        </div>

        <div>

          <label className="text-sm font-medium">
            Specialization
          </label>

          <input
            type="text"
            name="specialization"
            value={formData.specialization}
            onChange={handleInputChange}
            placeholder="Anxiety, Depression..."
            required
            className="w-full mt-2 border rounded-xl px-4 py-3"
          />

        </div>

        <div>

          <label className="text-sm font-medium">
            Bio
          </label>

          <textarea
            rows="4"
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
            className="w-full mt-2 border rounded-xl px-4 py-3 resize-none"
          />

        </div>

        <div className="flex items-center gap-3">

          <input
            type="checkbox"
            name="availability"
            checked={formData.availability}
            onChange={handleInputChange}
          />

          <label>
            Available for new clients
          </label>

        </div>

        <div className="flex justify-end gap-3 pt-4 border-t">

          <button
            type="button"
            onClick={() => setShowModal(false)}
            className="px-6 py-3 rounded-xl border"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={saving}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold"
          >
            {saving
              ? editingTherapist
                ? "Updating..."
                : "Creating..."
              : editingTherapist
                ? "Update Therapist"
                : "Create Therapist"}
          </button>

        </div>

      </form>

    </div>
  </div>
)}
<ConfirmDialog
      open={showDeleteDialog}
      title="Delete therapist?"
      description={
        therapistToDelete
          ? `Are you sure you want to delete ${therapistToDelete.user?.name || "this therapist"}? This action cannot be undone.`
          : "Are you sure you want to delete this therapist?"
      }
      confirmText={deleting ? "Deleting..." : "Delete Therapist"}
      cancelText="Cancel"
      onConfirm={handleDeleteTherapist}
      onCancel={() => {
        if (!deleting) {
          setShowDeleteDialog(false);
          setTherapistToDelete(null);
        }
      }}
      loading={deleting}
    />
    </div>
  );
}

export default Therapists;