import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider, useNavigate } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage.tsx";
import ProblemPage from "./pages/ProblemPage.tsx";
import Blog from "./pages/Blog.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import HistoryPage from "./pages/HistoryPage.tsx";
import SignupPage from "./pages/SignupPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import LandingPageLayout from "./pages/LandingPage.tsx";
import UserLayout from "./pages/UserLayout.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import DoctorList from "./pages/DoctorList.tsx";
import Protected from "./components/AuthLayout.tsx";
import Home from "./pages/Home.tsx";
import SchedulePages from "./pages/SchedulePages.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPageLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "signup",
        element: <SignupPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
    ],
  },
  {
    path: "user/",
    element: <UserLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: (
          <Protected authentication={true}>
            <Home />
          </Protected>
        ),
      },
      {
        path: "problem",
        element: (
          <Protected authentication={true}>
            <ProblemPage />
          </Protected>
        ),
      },
      {
        path: "blog",
        element: (
          <Protected authentication={true}>
            <Blog />
          </Protected>
        ),
      },
      {
        path: "dashboard",
        element: (
          <Protected authentication={true}>
            <Dashboard />
          </Protected>
        ),
      },
      {
        path: "history",
        element: (
          <Protected authentication={true}>
            <HistoryPage />
          </Protected>
        ),
      },
      {
        path: "doctorList",
        element: (
          <Protected authentication={true}>
            <DoctorList />
          </Protected>
        ),
      },

      {
        path: "schedule",
        element: (
          <Protected authentication={true}>
            <SchedulePages />
          </Protected>
        ),
      },
      
      
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  // </React.StrictMode>
);
