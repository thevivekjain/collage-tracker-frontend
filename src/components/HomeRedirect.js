import { Navigate } from "react-router-dom";
import HomePage from "../pages/HomePage";  

function HomeRedirect() {
  const user = JSON.parse(localStorage.getItem("user"));

  // NOT LOGGED-IN → show homepage
  if (!user) return <HomePage />;

  // LOGGED-IN → redirect based on role
  const role = user.role;

  if (role === "student")
    return <Navigate to="/student/my-requests" replace />;

  if (["clerk","hod","office","accounts","principal"].includes(role))
    return <Navigate to="/staff/assigned" replace />;

  if (role === "admin")
    return <Navigate to="/admin/dashboard" replace />;

  //return <HomePage />;
}

export default HomeRedirect;

// import { Navigate } from "react-router-dom";
// import HomePage from "../pages/HomePage";

// function HomeRedirect() {
//   const user = JSON.parse(localStorage.getItem("user"));

//   if (!user) {
//     return <HomePage />;   // your landing page
//   }

//   const role = user.role;

//   if (role === "student") return <Navigate to="/student/my-requests" />;
//   if (role === "clerk" || role === "hod" || role === "office" || role === "accounts" || role === "principal")
//     return <Navigate to="/staff/assigned" />;
//   if (role === "admin") return <Navigate to="/admin/dashboard" />;

//   return <HomePage />;
// }

// export default HomeRedirect;