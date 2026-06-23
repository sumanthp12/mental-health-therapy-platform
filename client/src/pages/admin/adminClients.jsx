import { useEffect, useState } from "react";
import TopBar from "../../components/dashboard/TopBar";
import DataTable from "../../components/dashboard/DataTable";

function Clients() {

  const columns = [
  "Name",
  "Email",
  "Status",
];

const [clients, setClients] = useState([]);


const fetchClients = async () => {
  try {

    const token =
      localStorage.getItem("token");

    const response = await fetch(
      "http://localhost:8000/api/users",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const users =
      await response.json();

    const clientUsers =
      users.filter(
        (user) => user.role === "client"
      );

    const formatted = clientUsers.map((user) => ({
      Name: user.name,
      Email: user.email,
      Status: "Active",
    }));

    setClients(formatted);

  } catch (error) {

    console.error(error);

  }
};

useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchClients();
  }, []);


  return (
    <div>

      <TopBar title="Clients" />

      <DataTable
        title="All Clients"
        columns={columns}
        data={clients}
      />

    </div>
  );
}

export default Clients;