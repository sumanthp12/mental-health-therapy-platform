import { useEffect, useState } from "react";
import TopBar from "../../components/dashboard/TopBar";

function IntakeForms() {

    const [intakeForms, setIntakeForms] = useState([]);
    const [therapists, setTherapists] = useState([]);
    const [selectedTherapists, setSelectedTherapists] = useState({});

    const fetchIntakeForms = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await fetch(
            "http://localhost:8000/api/intake",
            {
                headers: {
                Authorization: `Bearer ${token}`,
                },
            }
            );

            const intakeData = await response.json();

            setIntakeForms(intakeData);

        } catch (error) {
            console.error(error);
        }
        };

        const assignTherapist = async (form) => {
                    try {
                        console.log("Selected Therapists Object:", selectedTherapists);

                        const therapistId = selectedTherapists[form._id];

                        console.log("Current Form ID:", form._id);
                        console.log("Therapist ID:", therapistId);

                        if (!therapistId) {
                        alert("Please select a therapist");
                        return;
                        }

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
                        })
                        }
                        );

                        const data = await response.json();

                        console.log(data);

                        alert("Therapist assigned successfully!");

                        setSelectedTherapists({});

                        await fetchIntakeForms();
                        await fetchTherapists();

                    } catch (error) {
                        console.error(error);
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

                const therapistData = await response.json();

                setTherapists(therapistData);

                return therapistData;

            } catch (error) {
                console.error(error);
            }
            };

        useEffect(() => {
            const loadData = async () => {
                const therapistList = await fetchTherapists();
                await fetchIntakeForms(therapistList);
            };

            loadData();
        }, []);

            console.log("Intake Forms:", intakeForms);
            console.log("Therapists:", therapists);

            console.log(therapists[0]);
            console.log(therapists[0]?.user);
            console.log(therapists[0]?.user?.name);

  return (
    <div>
      <TopBar title="Intake Forms" />

      <div className="bg-white rounded-lg shadow p-6 mt-6">
    <h2 className="text-xl font-bold mb-4">
        Submitted Intake Forms
    </h2>

    <table className="w-full border-collapse">
        <thead>
            <tr className="bg-gray-100">
                <th className="p-3 border text-left">Client</th>
                <th className="p-3 border text-left">Concern</th>
                <th className="p-3 border text-left">Therapist</th>
                <th className="p-3 border text-left">Action</th>
                <th className="p-3 border text-left">Status</th>
            </tr>
        </thead>

        <tbody>
            {intakeForms.map((form) => (
                <tr key={form._id}>
                    <td className="p-3 border">{form.client.name}</td>

                    <td className="p-3 border">{form.concern}</td>

                    <td className="p-3 border">
                        <select
                            value={selectedTherapists[form._id] || ""}
                            onChange={(e) =>
                                setSelectedTherapists((prev) => ({
                                    ...prev,
                                    [form._id]: e.target.value,
                                }))
                            }
                            className="border rounded p-2"
                        >
                            <option value="">Select Therapist</option>

                            {therapists.map((therapist) => (
                                <option
                                    key={therapist._id}
                                    value={therapist._id}
                                >
                                    {therapist.user.name}
                                </option>
                            ))}
                        </select>
                    </td>

                    <td className="p-3 border">
                        <button
                            onClick={() => assignTherapist(form)}
                            className="bg-blue-600 text-white px-3 py-1 rounded"
                        >
                            Assign
                        </button>
                    </td>

                    <td className="p-3 border">{form.status}</td>
                </tr>
            ))}
        </tbody>
    </table>
</div>
    </div>
  );
}

export default IntakeForms;