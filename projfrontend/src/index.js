import { createRoot } from "react-dom/client";
import Base from "./core/Base";
import Home from "./core/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./user/Signup";
import Signin from "./user/Signin";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/signin",
    element: <Signin />,
  },
]);

const container = document.getElementById("app");
const root = createRoot(container);
root.render(<RouterProvider router={appRouter} />);
