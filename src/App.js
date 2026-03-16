import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import Unauthorized from "./components/Unauthorized";

import HomeRedirect from "./components/HomeRedirect";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Login from "./auth/Login";
import Register from "./auth/Register";

import CreateRequest from "./student/CreateRequest";
import MyRequests from "./student/MyRequests";
import Timeline from "./student/Timeline";

import AssignedRequests from "./staff/AssignedRequests";
import Dashboard from "./admin/Dashboard";
import CreateStaff from "./admin/CreateStaff"; 
import ManageStaff from "./admin/ManageStaff";
import AllRequests from "./staff/AllRequests";
import ManageStudents from "./admin/ManageStudents";

import Chatbot from "./components/Chatbot";

function App() {
  return (
    <Router>

      <Routes>

        {/* ================= PUBLIC ROUTES ================= */}
        <Route path="/" element={<HomeRedirect />} />
        <Route path="/about" element={<About/>} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* ================= STUDENT ROUTES ================= */}
        <Route
          path="/student/create"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <>
                <Navbar />
                <CreateRequest />
                <Chatbot />
              </>
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/my-requests"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <>
                <Navbar />
                <MyRequests />
                <Chatbot />
              </>
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/timeline/:id"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <>
                <Navbar />
                <Timeline />
                <Chatbot />
              </>
            </ProtectedRoute>
          }
        />

        {/* ================= STAFF ROUTES ================= */}
        <Route
          path="/staff/assigned"
          element={
            <ProtectedRoute allowedRoles={["clerk","hod","office","accounts","principal"]}>
              <>
                <Navbar />
                <AssignedRequests />
                <Chatbot />
              </>
            </ProtectedRoute>
          }
        />

        {/* ================= ADMIN ROUTES ================= */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <>
                <Navbar />
                <Dashboard />
                <Chatbot />
              </>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/create-staff"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <>
                <Navbar />
                <CreateStaff />
                <Chatbot />
              </>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/manage-staff"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <>
                <Navbar />
                <ManageStaff />
                <Chatbot />
              </>
            </ProtectedRoute>
          }
        />

        <Route
          path="/office/all-requests"
          element={
            <ProtectedRoute allowedRoles={["office","admin"]}>
              <>
                <Navbar />
                <AllRequests />
                <Chatbot />
              </>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/manage-students"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <>
                <Navbar />
                <ManageStudents />
                <Chatbot />
              </>
            </ProtectedRoute>
          }
        />

      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
