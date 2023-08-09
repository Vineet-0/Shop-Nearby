import { createRoot } from "react-dom/client";
import Base from "./core/Base";
import Home from "./core/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import PrivateRoute from "./auth/helper/PrivateRoutes";
import AdminRoute from "./auth/helper/AdminRoutes";
import AdminDashBoard from "./user/AdminDashBoard";
import AddCategory from "./admin/AddCategory";
import ManageCategories from "./admin/ManageCategories";
import AddProduct from "./admin/AddProduct";
import ManageProducts from "./admin/ManageProducts";
import UpdateProduct from "./admin/UpdateProduct";
import UpdateCategory from "./admin/UpdateCategory";
import Cart from "./core/Cart";
import PaymentConfirmation from "./core/PaymentConfirmation";
import Profile from "./user/Profile";
import Shop from "./core/Shop";
import store from "./redux/store";
import { Provider } from "react-redux";
import ProductPage from "./core/ProductPage";
import { Toaster } from "react-hot-toast";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/shop",
    element: <Shop />,
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
    path: "/products/:productId",
    element: <ProductPage />,
  },
  {
    path: "/admin/category/update/:categoryId",
    element: (
      <AdminRoute>
        <UpdateCategory />
      </AdminRoute>
    ),
  },
  {
    path: "/payment-confirmed",
    element: (
      <PrivateRoute>
        <PaymentConfirmation />
      </PrivateRoute>
    ),
  },
  {
    path: "/user/profile",
    element: (
      <PrivateRoute>
        <Profile />
      </PrivateRoute>
    ),
  },
]);

const container = document.getElementById("app");
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <Toaster position="top-right" reverseOrder={false} />
    <RouterProvider router={appRouter} />
  </Provider>
);
