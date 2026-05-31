import TopBar from "../../components/dashboard/TopBar";
import DataTable from "../../components/dashboard/DataTable";

function Clients() {

  const columns = [
    "Name",
    "Email",
    "Status",
  ];

  const data = [
    {
      Name: "Rahul",
      Email: "rahul@gmail.com",
      Status: "Active",
    },
    {
      Name: "Priya",
      Email: "priya@gmail.com",
      Status: "Pending",
    },
  ];

  return (
    <div>

      <TopBar title="Clients" />

      <DataTable
        title="All Clients"
        columns={columns}
        data={data}
      />

    </div>
  );
}

export default Clients;