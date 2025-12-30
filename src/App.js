import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Unauthorized from "./components/Unauthorized";

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


function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/register" element={<Register />} />

        {/* STUDENT */}
        <Route
          path="/student/create"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <CreateRequest />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/my-requests"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <MyRequests />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/timeline/:id"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <Timeline />
            </ProtectedRoute>
          }
        />

        {/* STAFF */}
        <Route
          path="/staff/assigned"
          element={
            <ProtectedRoute
              allowedRoles={[
                "clerk",
                "hod",
                "office",
                "accounts",
                "principal"
              ]}
            >
              <AssignedRequests />
            </ProtectedRoute>
          }
        />

        {/* ADMIN */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/create-staff"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <CreateStaff />
            </ProtectedRoute>
          }
        />

        <Route
  path="/admin/manage-staff"
  element={
    <ProtectedRoute allowedRoles={["admin"]}>
      <ManageStaff />
    </ProtectedRoute>
  }
/>



<Route
  path="/office/all-requests"
  element={
    <ProtectedRoute allowedRoles={["office", "admin"]}>
      <AllRequests />
    </ProtectedRoute>
  }
/>



<Route
  path="/admin/manage-students"
  element={
    <ProtectedRoute allowedRoles={["admin"]}>
      <ManageStudents />
    </ProtectedRoute>
  }
/>

      </Routes>
    </Router>
  );
}

export default App;
