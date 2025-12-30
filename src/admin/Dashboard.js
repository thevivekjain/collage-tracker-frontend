import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer
} from "recharts";

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

  // ---------- FILTER LOGIC ----------
  const pending = allRequests.filter(r => r.status === "Pending");
  const completed = allRequests.filter(r => r.status === "Completed");
  const rejected = allRequests.filter(r => r.status === "Rejected");

  const delayed = allRequests.filter(
    r =>
      r.status === "Pending" &&
      r.deadline &&
      new Date(r.deadline) < new Date()
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

  // ---------- CHART DATA ----------
  const chartData = [
    { name: "Pending", value: pending.length },
    { name: "Completed", value: completed.length },
    { name: "Rejected", value: rejected.length },
    { name: "Delayed", value: delayed.length }
  ];

  const COLORS = ["#f1c40f", "#2ecc71", "#e74c3c", "#e67e22"];

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>

      {loading && <p>Loading data...</p>}

      {!loading && (
        <>
          {/* ---------- STATS CARDS ---------- */}
          <div className="stats-cards">
            <div
              className={`card teal ${filter === "delayed" ? "active" : ""}`}
              onClick={() => toggleFilter("delayed")}
            >
              <h3>Delayed</h3>
              <p>{delayed.length}</p>
            </div>

            <div
              className={`card gray ${filter === "pending" ? "active" : ""}`}
              onClick={() => toggleFilter("pending")}
            >
              <h3>Pending</h3>
              <p>{pending.length}</p>
            </div>

            <div
              className={`card green ${filter === "completed" ? "active" : ""}`}
              onClick={() => toggleFilter("completed")}
            >
              <h3>Completed</h3>
              <p>{completed.length}</p>
            </div>

            <div
              className={`card red ${filter === "rejected" ? "active" : ""}`}
              onClick={() => toggleFilter("rejected")}
            >
              <h3>Rejected</h3>
              <p>{rejected.length}</p>
            </div>
          </div>

          {/* ---------- REQUEST LIST ---------- */}
          {filter && (
            <>
              <h3 className="section-title">
                {filter.charAt(0).toUpperCase() + filter.slice(1)} Requests
              </h3>

              {getFilteredRequests().length === 0 ? (
                <p>No requests found</p>
              ) : (
                <table className="delayed-table">
                  <thead>
                    <tr>
                      <th>Request ID</th>
                      <th>Document</th>
                      <th>Student</th>
                      <th>Status</th>
                      <th>Delayed At</th>
                      <th>Reason</th>
                    </tr>
                  </thead>

                  <tbody>
                    {getFilteredRequests().map((req) => (
                      <tr key={req._id}>
                        <td>{req.requestId}</td>
                        <td>{req.documentType}</td>
                        <td>{req.studentId?.name}</td>

                        <td>
                          <span className={`badge ${req.status.toLowerCase()}`}>
                            {req.status}
                          </span>
                        </td>

                        {/* ✅ DELAYED ROLE */}
                        <td>
                          {filter === "delayed"
                            ? req.currentStep
                            : "—"}
                        </td>

                        {/* ✅ REASON ONLY FOR REJECTED */}
                        <td>
                          {req.status === "Rejected"
                            ? req.history
                                ?.slice()
                                .reverse()
                                .find(h => h.status === "Rejected")?.reason ||
                              "Reason not provided"
                            : "—"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </>
          )}

          {/* ---------- ANALYTICS CHARTS ---------- */}
          <div className="charts-section">
            <h3>Request Analytics</h3>

            <div className="charts-grid">
              <div className="chart-box">
                <h4>Status Distribution</h4>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={chartData}
                      dataKey="value"
                      nameKey="name"
                      outerRadius={100}
                      label
                    >
                      {chartData.map((_, i) => (
                        <Cell key={i} fill={COLORS[i]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="chart-box">
                <h4>Requests Count</h4>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <XAxis dataKey="name" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Bar dataKey="value">
                      {chartData.map((_, i) => (
                        <Cell key={i} fill={COLORS[i]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;
