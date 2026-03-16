import { useState } from "react";
import api from "../api/axios";
import { FaPaperPlane, FaFileSignature, FaQuoteLeft, FaPlusCircle } from "react-icons/fa";
import "./CreateRequest.css";

function CreateRequest() {
  const [documentType, setDocumentType] = useState("");
  const [purpose, setPurpose] = useState("");
  const [loading, setLoading] = useState(false);

  const submitRequest = async () => {
    if (!documentType || !purpose) {
      alert("All fields are required");
      return;
    }

    setLoading(true);
    try {
      await api.post("/requests", {
        documentType,
        purpose
      });

      alert("Request submitted successfully");
      setDocumentType("");
      setPurpose("");
    } catch (error) {
      alert("Error submitting request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cr-wrapper">
      <div className="cr-card">
        <div className="cr-header">
          <div className="cr-icon-circle">
            <FaPlusCircle />
          </div>
          <h2>Create New Request</h2>
          <p>Fill in the details to apply for a new document</p>
        </div>

        <div className="cr-form">
          {/* Document Selection */}
          <div className="cr-input-group">
            <label><FaFileSignature className="cr-label-icon" /> Select Document Type</label>
            <select
              className="cr-select"
              value={documentType}
              onChange={(e) => setDocumentType(e.target.value)}
            >
              <option value="">Choose a document...</option>
              <option value="Bonafide">Bonafide Certificate</option>
              <option value="TransferCertificate">Transfer Certificate</option>
              <option value="MigrationCertificate">Migration Certificate</option>
              <option value="CharacterCertificate">Character Certificate</option>
              <option value="ConductCertificate">Conduct Certificate</option>
              <option value="ProvisionalCertificate">Provisional Certificate</option>
              <option value="DegreeCertificate">Degree Certificate</option>
              <option value="DuplicateMarksheet">Duplicate Marksheet</option>
              <option value="Scholarship">Scholarship Certificate</option>
              <option value="FeeReceipt">Fee Receipt</option>
              <option value="FeeStructure">Fee Structure</option>
              <option value="IncomeCertificate">Income Certificate</option>
              <option value="InternshipPermission">Internship Permission Letter</option>
              <option value="InternshipCompletion">Internship Completion Certificate</option>
              <option value="ExperienceCertificate">Experience Certificate</option>
              <option value="IDCardReissue">ID Card Reissue</option>
            </select>
          </div>

          {/* Purpose Input */}
          <div className="cr-input-group">
            <label><FaQuoteLeft className="cr-label-icon" /> Purpose of Request</label>
            <input
              className="cr-input"
              placeholder="e.g. For Higher Studies / Passport"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <button 
            className={`cr-submit-btn ${loading ? "loading" : ""}`} 
            onClick={submitRequest}
            disabled={loading}
          >
            {loading ? "Submitting..." : (
              <><FaPaperPlane /> Submit Request</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateRequest;