import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Animal from "./pages/Animal";
import Staff from "./pages/Staff";
import Feeding from "./pages/Feeding";
import { Toaster } from "react-hot-toast";
import { use, useEffect } from "react";
import {
  SelectedCategoryContext,
  TotalAnimalsContext,
  TotalStaff,
  UserContext,
} from "./contexts/all.context";
import Error from "./pages/Error";
import Auth from "./pages/Auth";
import { GET_ANIMALS, GET_STAFF, GET_USER_DETAILS } from "./apis/local.apis";
import axios from "axios";
function App() {
  const { setCategory } = use(SelectedCategoryContext);
  const { user, setUser } = use(UserContext);
  const { setAnimalList } = use(TotalAnimalsContext);
  const { setStaffList } = use(TotalStaff);
  useEffect(() => {
    if (location.pathname == "/") {
      setCategory("dashboard");
    } else {
      setCategory(location.pathname.split("/").at(-1));
    }

    const getUserDetails = async () => {
      let res = await fetch(GET_USER_DETAILS, {
        method: "GET",
        credentials: "include",
      });
      if (res.status == 200) {
        res = await res.json();
        setUser(res);
      }
      return;
    };
    const getAllAnimalsAndStaff = async () => {
      let res = await Promise.allSettled([
        axios.get(GET_ANIMALS),
        axios.get(GET_STAFF),
      ]);
      setAnimalList([...res[0].value.data.details]);
      setStaffList([...res[1].value.data.staff]);
    };
    if (Object.keys(user).length == 0) getUserDetails();
    getAllAnimalsAndStaff();
  }, []);
  return (
    <>
      <RouterProvider router={appRouter} />
      <Toaster />
    </>
  );
}

export default App;

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "/animal",
        element: <Animal />,
      },
      {
        path: "/staff",
        element: <Staff />,
      },
      {
        path: "/feeding",
        element: <Feeding />,
      },
    ],
  },
  {
    path: "/auth",
    element: <Auth />,
  },
  {
    path: "*",
    element: <Error />,
  },
]);
