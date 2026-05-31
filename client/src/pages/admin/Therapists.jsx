import TopBar from "../../components/dashboard/TopBar";
import DataTable from "../../components/dashboard/DataTable";

function Therapists() {

  const columns = [
    "Name",
    "Specialization",
    "Experience",
  ];

  const data = [
    {
      Name: "Dr. Sarah",
      Specialization: "Anxiety",
      Experience: "5 Years",
    },
    {
      Name: "Dr. John",
      Specialization: "Depression",
      Experience: "8 Years",
    },
  ];

  return (
    <div>

      <TopBar title="Therapists" />

      <DataTable
        title="All Therapists"
        columns={columns}
        data={data}
      />

    </div>
  );
}

export default Therapists;