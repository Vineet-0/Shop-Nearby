import { createRoot } from "react-dom/client";
import Base from "./core/Base";
import Home from "./core/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import PrivateRoute from "./auth/helper/PrivateRoutes";
import AdminRoute from "./auth/helper/AdminRoutes";
import UserDashBoard from "./user/UserDashBoard";
import AdminDashBoard from "./user/AdminDashBoard";

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
  {
    path: "/user/dashboard",
    element: (
      <PrivateRoute>
        <UserDashBoard />
      </PrivateRoute>
    ),
  },
  {
    path: "/admin/dashboard",
    element: (
      <AdminRoute>
        <AdminDashBoard />
      </AdminRoute>
    ),
  },
]);

const container = document.getElementById("app");
const root = createRoot(container);
root.render(<RouterProvider router={appRouter} />);
