import TopBar from "../../components/dashboard/TopBar";
import WelcomeBanner from "../../components/dashboard/WelcomeBanner";
import StatCard from "../../components/dashboard/StatCard";

function Dashboard() {
  return (
    <div>

      <TopBar title="Admin Dashboard" />

      <WelcomeBanner name="Admin" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <StatCard
          title="Total Clients"
          value="120"
        />

        <StatCard
          title="Therapists"
          value="18"
        />

        <StatCard
          title="Sessions"
          value="95"
        />

        <StatCard
          title="Revenue"
          value="₹85,000"
        />

      </div>

    </div>
  );
}

export default Dashboard;