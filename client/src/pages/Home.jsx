import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";

const Home = () => {
  return (
    <div className="w-full min-h-screen">
      <div className="fixed left-0 top-0 h-full w-[15%] z-10 bg-white border-r">
        <SideBar />
      </div>
      <div className="ml-[15%] w-[85%] h-screen overflow-y-auto bg-[hsl(40,20%,97%)]">
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
