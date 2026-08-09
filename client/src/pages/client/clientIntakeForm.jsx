import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  Heart,
  ShieldCheck,
} from "lucide-react";

const API_URL = "http://localhost:8000/api";

const initialForm = {
  age: "",
  gender: "",
  concern: "",
  symptoms: "",
  preferredTherapistGender: "No Preference",
  preferredLanguage: "English",
  emergencyContact: "",
  notes: "",
};

function ClientIntakeForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialForm);
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const totalSteps = 3;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    setSubmitError("");
  };

  const validateStep = () => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.age) {
        newErrors.age = "Please enter your age.";
      } else if (
        Number(formData.age) < 13 ||
        Number(formData.age) > 120
      ) {
        newErrors.age = "Please enter a valid age.";
      }

      if (!formData.gender) {
        newErrors.gender = "Please select your gender.";
      }
    }

    if (step === 2) {
      if (!formData.concern.trim()) {
        newErrors.concern =
          "Please tell us what you would like support with.";
      }

      if (!formData.symptoms.trim()) {
        newErrors.symptoms =
          "Please describe the symptoms or difficulties you are experiencing.";
      }
    }

    if (step === 3) {
      if (!formData.emergencyContact.trim()) {
        newErrors.emergencyContact =
          "Please provide an emergency contact.";
      }
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateStep()) return;

    setStep((prev) => Math.min(prev + 1, totalSteps));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1));
    setErrors({});
    setSubmitError("");

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateStep()) return;

    try {
      setLoading(true);
      setSubmitError("");

      const token = localStorage.getItem("token");

      if (!token) {
        setSubmitError(
          "Your session has expired. Please login again."
        );
        return;
      }

      const response = await fetch(`${API_URL}/intake`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          age: Number(formData.age),
          gender: formData.gender,
          concern: formData.concern.trim(),
          symptoms: formData.symptoms.trim(),
          preferredTherapistGender:
            formData.preferredTherapistGender,
          preferredLanguage: formData.preferredLanguage,
          emergencyContact:
            formData.emergencyContact.trim(),
          notes: formData.notes.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to submit intake form."
        );
      }

      setSubmitted(true);
    } catch (error) {
      setSubmitError(
        error.message ||
          "Something went wrong while submitting your intake form."
      );
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-3xl items-center justify-center">
          <div className="w-full rounded-3xl bg-white p-8 text-center shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:p-12">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-50">
              <CheckCircle2
                size={42}
                className="text-green-500"
              />
            </div>

            <h1 className="mt-7 text-3xl font-bold tracking-tight text-slate-900">
              Intake Form Submitted
            </h1>

            <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-slate-500">
              Thank you for sharing this information with us.
              Our team will review your responses and assign a
              suitable therapist based on your needs and
              preferences.
            </p>

            <div className="mx-auto mt-8 max-w-lg rounded-2xl bg-blue-50 p-5">
              <div className="flex items-start gap-3 text-left">
                <ShieldCheck
                  size={22}
                  className="mt-0.5 shrink-0 text-blue-600"
                />

                <div>
                  <p className="font-semibold text-blue-900">
                    What happens next?
                  </p>

                  <p className="mt-1 text-sm leading-6 text-blue-700">
                    An administrator will review your intake
                    information and assign a therapist. You
                    will then be able to view your therapist,
                    communicate with them, and attend
                    scheduled sessions.
                  </p>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigate("/client/dashboard")}
              className="mt-8 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-7 py-3.5 font-semibold text-white shadow-lg shadow-blue-200 transition hover:-translate-y-0.5 hover:shadow-xl"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        
        {/* Header */}
        <div className="mb-8">
          <button
            type="button"
            onClick={() => navigate("/client/dashboard")}
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-blue-600"
          >
            <ArrowLeft size={17} />
            Back to Dashboard
          </button>

          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-100">
              <ClipboardList
                size={27}
                className="text-blue-600"
              />
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                GETTING TO KNOW YOU
              </p>

              <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Your Intake Form
              </h1>

              <p className="mt-2 max-w-2xl text-base leading-6 text-slate-500">
                Help us understand your needs so we can connect
                you with the right therapist.
              </p>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-700">
              Step {step} of {totalSteps}
            </span>

            <span className="text-sm text-slate-400">
              {Math.round((step / totalSteps) * 100)}% complete
            </span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 transition-all duration-300"
              style={{
                width: `${(step / totalSteps) * 100}%`,
              }}
            />
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs font-medium">
            <span
              className={
                step >= 1
                  ? "text-blue-600"
                  : "text-slate-400"
              }
            >
              About You
            </span>

            <span
              className={
                step >= 2
                  ? "text-blue-600"
                  : "text-slate-400"
              }
            >
              Your Wellbeing
            </span>

            <span
              className={
                step >= 3
                  ? "text-blue-600"
                  : "text-slate-400"
              }
            >
              Preferences
            </span>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl bg-white shadow-[0_20px_60px_rgba(15,23,42,0.07)]"
        >
          <div className="p-6 sm:p-8 lg:p-10">
            
            {/* STEP 1 */}
            {step === 1 && (
              <div>
                <div className="mb-8">
                  <div className="flex items-center gap-3">
                    <Heart
                      size={24}
                      className="text-blue-600"
                    />

                    <h2 className="text-2xl font-bold text-slate-900">
                      Tell us about yourself
                    </h2>
                  </div>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    This information helps our team understand
                    your basic background.
                  </p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  {/* Age */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Age
                    </label>

                    <input
                      type="number"
                      name="age"
                      min="13"
                      max="120"
                      value={formData.age}
                      onChange={handleChange}
                      placeholder="Enter your age"
                      className={`w-full rounded-xl border bg-slate-50 px-4 py-3.5 outline-none transition ${
                        errors.age
                          ? "border-red-300 focus:ring-4 focus:ring-red-100"
                          : "border-slate-200 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                      }`}
                    />

                    {errors.age && (
                      <p className="mt-2 text-sm text-red-500">
                        {errors.age}
                      </p>
                    )}
                  </div>

                  {/* Gender */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Gender
                    </label>

                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className={`w-full rounded-xl border bg-slate-50 px-4 py-3.5 outline-none transition ${
                        errors.gender
                          ? "border-red-300 focus:ring-4 focus:ring-red-100"
                          : "border-slate-200 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                      }`}
                    >
                      <option value="">
                        Select your gender
                      </option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Non-binary">
                        Non-binary
                      </option>
                      <option value="Prefer not to say">
                        Prefer not to say
                      </option>
                    </select>

                    {errors.gender && (
                      <p className="mt-2 text-sm text-red-500">
                        {errors.gender}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <div>
                <div className="mb-8">
                  <div className="flex items-center gap-3">
                    <Heart
                      size={24}
                      className="text-blue-600"
                    />

                    <h2 className="text-2xl font-bold text-slate-900">
                      Tell us about your wellbeing
                    </h2>
                  </div>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    There are no right or wrong answers. Share
                    whatever you feel comfortable sharing.
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Concern */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      What would you like support with?
                    </label>

                    <textarea
                      name="concern"
                      value={formData.concern}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Tell us what brings you to Mindful Connect..."
                      className={`w-full resize-none rounded-xl border bg-slate-50 px-4 py-3.5 outline-none transition ${
                        errors.concern
                          ? "border-red-300 focus:ring-4 focus:ring-red-100"
                          : "border-slate-200 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                      }`}
                    />

                    {errors.concern && (
                      <p className="mt-2 text-sm text-red-500">
                        {errors.concern}
                      </p>
                    )}
                  </div>

                  {/* Symptoms */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      What symptoms or difficulties are you experiencing?
                    </label>

                    <textarea
                      name="symptoms"
                      value={formData.symptoms}
                      onChange={handleChange}
                      rows={5}
                      placeholder="Describe how you have been feeling recently..."
                      className={`w-full resize-none rounded-xl border bg-slate-50 px-4 py-3.5 outline-none transition ${
                        errors.symptoms
                          ? "border-red-300 focus:ring-4 focus:ring-red-100"
                          : "border-slate-200 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                      }`}
                    />

                    {errors.symptoms && (
                      <p className="mt-2 text-sm text-red-500">
                        {errors.symptoms}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <div>
                <div className="mb-8">
                  <div className="flex items-center gap-3">
                    <Heart
                      size={24}
                      className="text-blue-600"
                    />

                    <h2 className="text-2xl font-bold text-slate-900">
                      Your preferences
                    </h2>
                  </div>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    These preferences help us find a therapist
                    who is a good fit for you.
                  </p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  {/* Therapist Gender */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Preferred therapist gender
                    </label>

                    <select
                      name="preferredTherapistGender"
                      value={
                        formData.preferredTherapistGender
                      }
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                    >
                      <option value="No Preference">
                        No Preference
                      </option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Non-binary">
                        Non-binary
                      </option>
                    </select>
                  </div>

                  {/* Language */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Preferred language
                    </label>

                    <select
                      name="preferredLanguage"
                      value={formData.preferredLanguage}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                    >
                      <option value="English">English</option>
                      <option value="Kannada">Kannada</option>
                      <option value="Hindi">Hindi</option>
                      <option value="Tamil">Tamil</option>
                      <option value="Telugu">Telugu</option>
                      <option value="Malayalam">
                        Malayalam
                      </option>
                    </select>
                  </div>
                </div>

                <div className="mt-6 space-y-6">
                  {/* Emergency contact */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Emergency contact
                    </label>

                    <input
                      type="text"
                      name="emergencyContact"
                      value={formData.emergencyContact}
                      onChange={handleChange}
                      placeholder="Name and phone number"
                      className={`w-full rounded-xl border bg-slate-50 px-4 py-3.5 outline-none transition ${
                        errors.emergencyContact
                          ? "border-red-300 focus:ring-4 focus:ring-red-100"
                          : "border-slate-200 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                      }`}
                    />

                    {errors.emergencyContact && (
                      <p className="mt-2 text-sm text-red-500">
                        {errors.emergencyContact}
                      </p>
                    )}
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Anything else you'd like us to know?
                    </label>

                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Optional additional information..."
                      className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                    />
                  </div>
                </div>

                {/* Privacy note */}
                <div className="mt-7 rounded-2xl bg-blue-50 p-5">
                  <div className="flex items-start gap-3">
                    <ShieldCheck
                      size={22}
                      className="mt-0.5 shrink-0 text-blue-600"
                    />

                    <div>
                      <p className="font-semibold text-blue-900">
                        Your information is private
                      </p>

                      <p className="mt-1 text-sm leading-6 text-blue-700">
                        Your responses will only be used by our
                        care team to understand your needs and
                        help assign an appropriate therapist.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Submit error */}
            {submitError && (
              <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                {submitError}
              </div>
            )}
          </div>

          {/* Footer actions */}
          <div className="flex flex-col-reverse gap-3 border-t border-slate-100 bg-slate-50/70 p-6 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
            <div>
              {step > 1 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50"
                >
                  <ArrowLeft size={18} />
                  Back
                </button>
              )}
            </div>

            {step < totalSteps ? (
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-7 py-3.5 font-semibold text-white shadow-lg shadow-blue-200 transition hover:-translate-y-0.5 hover:shadow-xl"
              >
                Continue
                <ArrowRight size={18} />
              </button>
            ) : (
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-7 py-3.5 font-semibold text-white shadow-lg shadow-blue-200 transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading
                  ? "Submitting..."
                  : "Submit Intake Form"}
                {!loading && <CheckCircle2 size={18} />}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ClientIntakeForm;