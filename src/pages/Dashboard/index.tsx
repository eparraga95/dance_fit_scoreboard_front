import { FunctionComponent } from "react";
import Sidebar from "../../components/Sidebar";
import { DashboardContainer } from "./styles";
import { useDashboard } from "../../providers/Dashboard";
import { Outlet } from "react-router-dom";

interface DashboardProps {}

const Dashboard: FunctionComponent<DashboardProps> = () => {
  const { sideBarStatus } = useDashboard();

  return (
    <main>
      <Sidebar />
      <DashboardContainer isopen={sideBarStatus}>
        <Outlet />
      </DashboardContainer>
    </main>
  );
};

export default Dashboard;