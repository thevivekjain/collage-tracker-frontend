import { useState } from "react";
import api from "../api/axios";
import "./CreateRequest.css";

function CreateRequest() {
  const [documentType, setDocumentType] = useState("");
  const [purpose, setPurpose] = useState("");

  const submitRequest = async () => {
    if (!documentType || !purpose) {
      alert("All fields are required");
      return;
    }

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
    }
  };

  return (
    <div className="form-container">
      <h2>Create Request</h2>


      <select
  value={documentType}
  onChange={(e) => setDocumentType(e.target.value)}
>
  <option value="">Select Document</option>

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


      <input
        placeholder="Purpose (e.g. Higher studies)"
        value={purpose}
        onChange={(e) => setPurpose(e.target.value)}
      />

      <button onClick={submitRequest}>Submit</button>
    </div>
  );
}

export default CreateRequest;
