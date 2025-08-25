import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Animal from "./pages/Animal";
import Staff from "./pages/Staff";
import Feeding from "./pages/Feeding";
import { Toaster } from "react-hot-toast";
import { use, useEffect } from "react";
import { SelectedCategoryContext, UserContext } from "./contexts/all.context";
import Error from "./pages/Error";
import Auth from "./pages/Auth";
import { GET_USER_DETAILS } from "./apis/local.apis";
function App() {
  const { setCategory } = use(SelectedCategoryContext);
  const { user, setUser } = use(UserContext);
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

    if (Object.keys(user).length == 0) getUserDetails();
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
