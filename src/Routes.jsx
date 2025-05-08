import { createBrowserRouter } from "react-router-dom";
import {
  Home,
  Menu,
  Address,
  DetailFood,
  DetailBlog,
  BlogMain,
  News,
  PaymentPage,
  Admin,
  OrderFail,
  OrderSuccess,
  Login,
  ForgotPassword,
  CustomerProfile,
  AuthenticationCode,
  ResetPassword,
  UnAuthor,
  ErrorBoundary,
} from "@/pages";
import { AdminLayout, MainLayout, CheckRole } from "./components";
import { Navbar, Footer, Newsletter } from "./components";
import { element } from "prop-types";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "menu",
        element: <Menu />,
      },
      {
        path: "news",
        element: <News />,
      },
      {
        path: "address",
        element: <Address />,
      },
      {
        path: "blogs",
        element: <BlogMain />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "forgotpassword",
        element: <ForgotPassword />,
      },
      {
        path: "authenticationcode",
        element: <AuthenticationCode />,
      },
      {
        path: "resetpassword",
        element: <ResetPassword />,
      },
      {
        path: "customerprofile",
        element: <CustomerProfile />,
      },
      {
        path: "blogs/:id",
        element: <DetailBlog />,
      },
      {
        path: " detailfood/:id",
        element: <DetailFood />,
      },
      {
        path: "payment",
        element: <PaymentPage />,
      },
      {
        path: "order-success",
        element: <OrderSuccess />,
      },
      {
        path: "order-fail",
        element: <OrderFail />,
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <CheckRole role="ADMIN">
        <AdminLayout />
      </CheckRole>
    ),
    children: [
      {
        index: true,
        element: <Admin />,
      },
    ],
  },
]);

export default router;
