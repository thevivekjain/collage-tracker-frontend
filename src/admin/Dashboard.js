import React, { useEffect, useState } from "react";
import {
  PieChart, Pie, Cell, Tooltip, Legend,
  BarChart, Bar, XAxis, YAxis, ResponsiveContainer
} from "recharts";
import { 
  FaClock, FaCheckCircle, FaTimesCircle, FaExclamationTriangle, FaListAlt 
} from "react-icons/fa";
import api from "../api/axios";
import "./Dashboard.css";

function Dashboard() {
  const [allRequests, setAllRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState(null);

  useEffect(() => {
    api.get("/requests/all")
      .then((res) => setAllRequests(res.data))
      .catch(() => alert("Failed to load dashboard data"))
      .finally(() => setLoading(false));
  }, []);

  // ---------- LOGIC (UNTOUCHED) ----------
  const pending = allRequests.filter(r => r.status === "Pending");
  const completed = allRequests.filter(r => r.status === "Completed");
  const rejected = allRequests.filter(r => r.status === "Rejected");
  const delayed = allRequests.filter(
    r => r.status === "Pending" && r.deadline && new Date(r.deadline) < new Date()
  );

  const toggleFilter = (type) => {
    setFilter(prev => (prev === type ? null : type));
  };

  const getFilteredRequests = () => {
    if (filter === "pending") return pending;
    if (filter === "completed") return completed;
    if (filter === "rejected") return rejected;
    if (filter === "delayed") return delayed;
    return [];
  };

  // ---------- CHART DATA (Doughnut & Slim Bar) ----------
  const chartData = [
    { name: "Pending", value: pending.length },
    { name: "Completed", value: completed.length },
    { name: "Rejected", value: rejected.length },
    { name: "Delayed", value: delayed.length }
  ];

  const COLORS = ["#f1c40f", "#2ecc71", "#e74c3c", "#e67e22"];

  return (
    <div className="ct-dashboard-container">
      <div className="ct-dashboard-header">
        <h2><FaListAlt /> Admin Dashboard</h2>
        <p>Real-time analytics and request management</p>
      </div>

      {loading ? (
        <div className="ct-loader">Loading Dashboard...</div>
      ) : (
        <>
          {/* ---------- STATS CARDS ---------- */}
          <div className="ct-stats-grid">
            <div className={`ct-stat-card delayed ${filter === "delayed" ? "active" : ""}`} onClick={() => toggleFilter("delayed")}>
              <div className="ct-stat-icon"><FaClock /></div>
              <div className="ct-stat-info">
                <h3>Delayed</h3>
                <p>{delayed.length}</p>
              </div>
            </div>

            <div className={`ct-stat-card pending ${filter === "pending" ? "active" : ""}`} onClick={() => toggleFilter("pending")}>
              <div className="ct-stat-icon"><FaExclamationTriangle /></div>
              <div className="ct-stat-info">
                <h3>Pending</h3>
                <p>{pending.length}</p>
              </div>
            </div>

            <div className={`ct-stat-card completed ${filter === "completed" ? "active" : ""}`} onClick={() => toggleFilter("completed")}>
              <div className="ct-stat-icon"><FaCheckCircle /></div>
              <div className="ct-stat-info">
                <h3>Completed</h3>
                <p>{completed.length}</p>
              </div>
            </div>

            <div className={`ct-stat-card rejected ${filter === "rejected" ? "active" : ""}`} onClick={() => toggleFilter("rejected")}>
              <div className="ct-stat-icon"><FaTimesCircle /></div>
              <div className="ct-stat-info">
                <h3>Rejected</h3>
                <p>{rejected.length}</p>
              </div>
            </div>
          </div>

          {/* ---------- DATA TABLE ---------- */}
          {filter && (
            <div className="ct-table-section animate-slide">
              <h3 className="ct-table-title">
                Viewing: <span>{filter.toUpperCase()}</span> Requests
              </h3>
              <div className="ct-table-wrapper">
                <table className="ct-modern-table">
                  <thead>
                    <tr>
                      <th>Req ID</th>
                      <th>Document</th>
                      <th>Student</th>
                      <th>Status</th>
                      <th>Role At</th>
                      <th>Action/Reason</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getFilteredRequests().length > 0 ? (
                      getFilteredRequests().map((req) => (
                        <tr key={req._id}>
                          <td><strong>#{req.requestId}</strong></td>
                          <td>{req.documentType}</td>
                          <td>{req.studentId?.name || "N/A"}</td>
                          <td><span className={`ct-badge ${req.status.toLowerCase()}`}>{req.status}</span></td>
                          <td>{filter === "delayed" ? req.currentStep : "—"}</td>
                          <td>
                            {req.status === "Rejected"
                              ? req.history?.slice().reverse().find(h => h.status === "Rejected")?.reason || "No Reason"
                              : "—"}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr><td colSpan="6" style={{textAlign:'center'}}>No data available</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ---------- ANALYTICS CHARTS ---------- */}
          <div className="ct-charts-container">
            <div className="ct-chart-card">
              <h4>Status Distribution (Doughnut)</h4>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={chartData}
                    innerRadius={65} /* Doughnut Effect */
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {chartData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i]} stroke="none" />
                    ))}
                  </Pie>
                  <Tooltip borderRadius={10} />
                  <Legend iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="ct-chart-card">
              <h4>Requests Metrics (Slim Bars)</h4>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip cursor={{fill: '#f1f5f9'}} />
                  <Bar dataKey="value" barSize={25} radius={[10, 10, 0, 0]}>
                    {chartData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;