import { useState } from "react";
import api from "../api/axios";
import "./UploadDocument.css";

function UploadDocument({ requestId, onUploaded }) {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const uploadFile = async () => {
    if (!file) {
      alert("Please select a PDF file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);

      await api.post(`/requests/upload/${requestId}`, formData);

      alert("PDF uploaded successfully");

      // ✅ REMOVE REQUEST FROM LIST
      if (onUploaded) {
        onUploaded(requestId);
      }

    } catch (error) {
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="upload-section">
      <p className="upload-title">
        📄 Your PDF has been generated. Upload final issued document below.
      </p>

      <label className="file-label">
        {file ? file.name : "Choose PDF file"}
        <input
          type="file"
          accept="application/pdf"
          hidden
          onChange={(e) => setFile(e.target.files[0])}
        />
      </label>

      <button
        className="upload-btn"
        onClick={uploadFile}
        disabled={uploading}
      >
        {uploading ? "Uploading..." : "Upload PDF"}
      </button>
    </div>
  );
}

export default UploadDocument;
