import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import LoginPage from "./pages/public/login";
import HomePage from "./pages/public/home";
import DashboardPage from "./pages/admin/dashboard";

import AdminLayout from "./components/layout/admin";
import Education from "./pages/admin/education";
import Portfolio from "./pages/admin/portfolios";
import Skills from "./pages/admin/skillls";
import { useSelector } from "react-redux";
import { authName } from "./redux/slice/auth";
import Register from "./pages/public/register";
import Userpage from "./pages/admin/user";
import OneEducation from "./pages/admin/one-education";
import Experience from "./pages/admin/experience";
import NotClientUser from "./pages/admin/noneUser";
import Messeges from "./pages/admin/messeges";
import Chat from "./pages/Chat";
import Account from "./pages/public/account";
import Contact from "./pages/public/contact";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state[authName]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/account" element={<Account />} />
        <Route path="/contact" element={<Contact />} />

        <Route
          path="/"
          element={
            isAuthenticated && user?.role === "admin" ? (
              <AdminLayout />
            ) : (
              <Navigate to="/login" />
            )
          }>
          {/* <Route path="/" element={<AdminLayout />}> */}
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="users" element={<Userpage />} />
          <Route path="skills" element={<Skills />} />
          <Route path="experiences" element={<Experience />} />
          <Route path="education" element={<Education />} />
          <Route path="education/:educationId" element={<OneEducation />} />
          <Route path="portfolios" element={<Portfolio />} />
          <Route path="notClient" element={<NotClientUser />} />
          <Route path="messeges" element={<Messeges />} />
          <Route path="messeges/:messageId" element={<Chat />} />
          <Route
            path="user"
            element={
              isAuthenticated && user?.role === "user" ? (
                <Userpage />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
