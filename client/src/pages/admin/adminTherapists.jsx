import { useEffect, useState } from "react";
import TopBar from "../../components/dashboard/TopBar";
import DataTable from "../../components/dashboard/DataTable";

function Therapists() {

  const [therapists, setTherapists] = useState([]);

  const columns = [
    "Name",
    "Specialization",
    "Experience",
  ];

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

    const therapistUsers = await response.json();

    const formatted = therapistUsers.map((therapist) => ({
      Name: therapist.user?.name,
      Specialization: therapist.specialization,
      Experience: `${therapist.experience} Years`,
    }));

    setTherapists(formatted);
  } catch (error) {
    console.error(error);
  }
};

useEffect(() => {
  const timer = setTimeout(() => {
    fetchTherapists();
  }, 0);

  return () => clearTimeout(timer);
}, []);

  return (
    <div>

      <TopBar title="Therapists" />

      <DataTable
        title="All Therapists"
        columns={columns}
        data={therapists}
      />

    </div>
  );
}

export default Therapists;