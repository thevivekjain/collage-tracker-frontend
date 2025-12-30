import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import "./Timeline.css";

function Timeline() {
  const { id } = useParams(); // 👈 URL se id
  const [timeline, setTimeline] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/requests/timeline/${id}`)
      .then((res) => {
        setTimeline(res.data);
      })
      .catch((err) => {
        alert("Failed to load timeline");
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Loading timeline...</p>;
  if (!timeline) return <p>No timeline found</p>;

  return (
    <div className="timeline-page">
      <h2>{timeline.documentType} Timeline</h2>

      <p><strong>Status:</strong> {timeline.status}</p>
      <p><strong>Current Step:</strong> {timeline.currentStep}</p>

      <div className="timeline-list">
        {timeline.history.map((h, index) => (
          <div key={index} className="timeline-item">
            <p><strong>Role:</strong> {h.role}</p>
            <p><strong>Status:</strong> {h.status}</p>

            {h.reason && (
              <p className="reject-text">
                <strong>Reason:</strong> {h.reason}
              </p>
            )}

            <p className="date">
              {new Date(h.actionDate).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Timeline;
