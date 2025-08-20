import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Animal from "./pages/Animal";
import Staff from "./pages/Staff";
import Feeding from "./pages/Feeding";

function App() {
  return (
    <>
      <RouterProvider router={appRouter} />
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
]);
