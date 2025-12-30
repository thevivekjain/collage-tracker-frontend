import { useState } from "react";
import api from "../api/axios";
import "./CreateStaff.css";

function CreateStaff() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    const { name, email, password, role } = form;

    if (!name || !email || !password || !role) {
      alert("All fields are required");
      return;
    }

    try {
      await api.post("/auth/register-staff", form);
      alert("Staff registered successfully");

      setForm({
        name: "",
        email: "",
        password: "",
        role: ""
      });
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Failed to register staff"
      );
    }
  };

  return (
    <div className="create-staff-page">
      <div className="create-staff-card">
        <h2>Create Staff</h2>

        <input
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          name="email"
          type="email"
          placeholder="Official Email"
          value={form.email}
          onChange={handleChange}
        />

        <input
          name="password"
          type="password"
          placeholder="Temporary Password"
          value={form.password}
          onChange={handleChange}
        />

        <select
          name="role"
          value={form.role}
          onChange={handleChange}
        >
          <option value="">Select Role</option>
          <option value="clerk">Clerk</option>
          <option value="hod">HOD</option>
          <option value="office">Office</option>
          <option value="accounts">Accounts</option>
          <option value="principal">Principal</option>
        </select>

        <button onClick={handleSubmit}>
          Create User
        </button>
      </div>
    </div>
  );
}

export default CreateStaff;
