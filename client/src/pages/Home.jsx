import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";

const Home = () => {
  return (
    <div className="w-full min-h-screen flex">
      <SideBar />
      <div className="w-5/6 border min-h-screen bg-[hsl(40,20%,97%)] ">
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
