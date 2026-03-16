import { useState } from "react";
import api from "../api/axios";
import { FaCloudUploadAlt, FaFilePdf, FaCheckCircle, FaSpinner, FaFileImport } from "react-icons/fa";
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
    formData.append("document", file);

    try {
      setUploading(true);
      await api.post(`/requests/upload/${requestId}`, formData);
      alert("PDF uploaded successfully");

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
    <div className="ud-premium-container">
      <div className="ud-header-section">
        <div className="ud-icon-glow">
          <FaFileImport />
        </div>
        <div className="ud-text">
          <h4 className="ud-main-title">Issue Final Document</h4>
          <p className="ud-sub-title">Upload the signed PDF to complete request</p>
        </div>
      </div>

      <div className="ud-action-area">
        <label className={`ud-dropzone ${file ? "ud-file-active" : ""}`}>
          <div className="ud-dropzone-content">
            {file ? (
              <FaCheckCircle className="ud-status-icon ud-success-pop" />
            ) : (
              <FaFilePdf className="ud-status-icon ud-pdf-icon" />
            )}
            <span className="ud-filename-text">
              {file ? file.name : "Tap to browse PDF file"}
            </span>
          </div>
          <input
            type="file"
            accept="application/pdf"
            hidden
            onChange={(e) => setFile(e.target.files[0])}
          />
        </label>

        <button
          className={`ud-premium-btn ${uploading ? "ud-loading" : ""}`}
          onClick={uploadFile}
          disabled={uploading || !file}
        >
          {uploading ? (
            <><FaSpinner className="ud-spin-icon" /> Sending...</>
          ) : (
            <><FaCloudUploadAlt /> Upload & Finish</>
          )}
        </button>
      </div>
    </div>
  );
}

export default UploadDocument;