import { useEffect, useState } from "react";
import TopBar from "../../components/dashboard/TopBar";
import DataTable from "../../components/dashboard/DataTable";

function IntakeForms() {
  const columns = [
    "Client",
    "Age",
    "Gender",
    "Concern",
    "Status",
    ];

    const [intakeForms, setIntakeForms] = useState([]);

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

            const formatted = intakeData.map((form) => ({
            Client: form.client?.name,
            Age: form.age,
            Gender: form.gender,
            Concern: form.concern,
            Status: form.status || "Pending",
            }));

            setIntakeForms(formatted);

        } catch (error) {
            console.error(error);
        }
        };

        useEffect(() => {
        const timer = setTimeout(() => {
            fetchIntakeForms();
        }, 0);

        return () => clearTimeout(timer);
        }, []);


  return (
    <div>
      <TopBar title="Intake Forms" />

      <DataTable
        title="Submitted Intake Forms"
        columns={columns}
        data={intakeForms}
      />
    </div>
  );
}

export default IntakeForms;