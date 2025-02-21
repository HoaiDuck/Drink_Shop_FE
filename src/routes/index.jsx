import { createBrowserRouter } from "react-router-dom";

import Navbar from "@/components/Layout/Navbar";
import {
  LoginForm,
  Account,
  Home,
  Register,
  UnAuthor,
  LayoutStructure,
} from "@/pages";
import {
  Dashboard,
  AccountList,
  Role,
  Request,
  Error,
  Products,
  Bill,
  ItemDetails,
  Cart,
  Workspace,
  PersonalBag,
  Property,
  CategoryPage,
  VisitedWorkspace,
  RequestManage,
  SettingTerm,
  ManageRequest,
} from "@/pages";
import { PrivateRoute } from "@/components/Layout"; // Import ProtectedRoute
import { DashboardLayout } from "@/components/LayoutAdmin";
const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutStructure />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "Account",
        element: <Account />,
        children: [
          { path: "PersonalBag", element: <PersonalBag /> },
          { path: "Workspace", element: <Workspace /> },
        ],
      },
      {
        path: "Product",
        element: (
          <PrivateRoute action="manage" subject="Item">
            <Products />
          </PrivateRoute>
        ),
      },
      {
        path: "Property",
        element: <Property />,
      },
      {
        path: "category/:categoryId",
        element: <CategoryPage />,
      },

      {
        path: "unauthorized",
        element: <UnAuthor />,
      },
      {
        path: "itemDetails/:id",
        element: <ItemDetails />,
      },
      {
        path: "Artist/:id",
        element: <VisitedWorkspace />,
      },
      {
        path: "Cart",
        element: <Cart />,
      },
      {
        path: "Bill",
        element: <Bill />,
      },
      {
        path: "Request",
        element: <RequestManage />,
        children: [
          { index: true, element: <ManageRequest /> },
          { path: "SettingTerm", element: <SettingTerm /> },
        ],
      },
    ],
  },
  //{
  //     path: "register",
  //     element: <RegisterPage />,
  //},
  {
    path: "Login",
    element: <LoginForm />,
  },
  {
    path: "Register",
    element: <Register />,
  },

  {
    path: "/Admin",
    element: (
      <PrivateRoute action="manage" subject="Dashboard">
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "Role",
        element: <Role />,
      },
      {
        path: "Request",
        element: <Request />,
      },
      {
        path: "Account",
        element: <AccountList />,
      },
    ],
  },
]);

export default router;
