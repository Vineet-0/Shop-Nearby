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
import AddCategory from "./admin/AddCategory";
import ManageCategories from "./admin/ManageCategories";
import AddProduct from "./admin/AddProduct";
import ManageProducts from "./admin/ManageProducts";
import UpdateProduct from "./admin/UpdateProduct";
import UpdateCategory from "./admin/UpdateCategory";
import Cart from "./core/Cart";

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
    path: "/cart",
    element: <Cart />,
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
  {
    path: "/admin/create/category",
    element: (
      <AdminRoute>
        <AddCategory />
      </AdminRoute>
    ),
  },
  {
    path: "/admin/categories",
    element: (
      <AdminRoute>
        <ManageCategories />
      </AdminRoute>
    ),
  },
  {
    path: "/admin/create/product",
    element: (
      <AdminRoute>
        <AddProduct />
      </AdminRoute>
    ),
  },
  {
    path: "/admin/products",
    element: (
      <AdminRoute>
        <ManageProducts />
      </AdminRoute>
    ),
  },
  {
    path: "/admin/product/update/:productId",
    element: (
      <AdminRoute>
        <UpdateProduct />
      </AdminRoute>
    ),
  },
  {
    path: "/admin/category/update/:categoryId",
    element: (
      <AdminRoute>
        <UpdateCategory />
      </AdminRoute>
    ),
  },
]);

const container = document.getElementById("app");
const root = createRoot(container);
root.render(<RouterProvider router={appRouter} />);
