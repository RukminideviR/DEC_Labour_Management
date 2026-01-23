import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CameraGPS from "../../components/CameraGPS";
import dummyMasters from "../../data/dummyMasters";
import { postLabourDocument } from "../../api/focusApi";

import { saveDraft, getDraft, clearDraft } from "../../store/labourDraftStore";
import { buildCreateDoc } from "../../builders/buildCreateDoc";

function QCTab({ completedQty }) {
  const navigate = useNavigate();

  const qcExecutives = dummyMasters.qcExecutives || [];

  const [formData, setFormData] = useState({
    qcPhotos: [],
    qcExecutiveId: "",
    qcRemarks: "",
    approvedQty: 0,
  });

  const [error, setError] = useState("");

  const handleCapture = ({ photos }) => {
    setFormData((prev) => ({
      ...prev,
      qcPhotos: photos || [],
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setError("");

    console.log("DEBUG: handleSubmit called");
    console.log("DEBUG: formData", formData);

    if (!formData.qcPhotos.length) {
      setError("At least one QC photo is mandatory");
      console.log("ERROR: No QC photos");
      return;
    }

    if (!formData.qcExecutiveId) {
      setError("QC Executive selection is mandatory");
      console.log("ERROR: No QC Executive");
      return;
    }

    console.log("All validations passed");

    const qcData = {
      ...formData,
      completedQty,
      qcTime: new Date().toISOString(),
    };
    console.log(" Saving QC data:", qcData);
    saveDraft({ qc: qcData });

    const draft = getDraft();
    console.log("FULL DRAFT RETRIEVED FROM STORAGE:", draft);

    let finalPayload;
    try {
      finalPayload = buildCreateDoc(draft);
      console.log("FULL ERP PAYLOAD (FINAL DATA STRUCTURE)", finalPayload);
      console.log(" HEADER:", finalPayload.data[0].Header);
      console.log("BODY:", finalPayload.data[0].Body);
    } catch (err) {
      console.error("ERROR in buildCreateDoc:", err);
      setError("Error building ERP payload: " + err.message);
      return;
    }

    try {
  const sessionId = localStorage.getItem("sessionId");

  if (!sessionId) {
    setError("Session expired. Please login again.");
    navigate("/login");
    return;
  }

  setError(""); 

  
  const apiResponse = await postLabourDocument(finalPayload, sessionId);

  console.log("API SUCCESS:", apiResponse);

  if (apiResponse.result === 1 || apiResponse.data) {
    alert("Labour timesheet submitted successfully!");
    clearDraft(); 
    navigate("/dashboard");
  } else {
    setError(`API Error: ${apiResponse.message || "Unknown error"}`);
    console.error("API returned error:", apiResponse);
  }
} catch (error) {
  console.error("API Call Failed:", error);
  setError(`Failed to submit: ${error.message}`);
}

  };

  return (
    <div>
      {error && <div className="alert alert-danger">{error}</div>}

      <CameraGPS maxPhotos={1} onCapture={handleCapture} />

      <select
        name="qcExecutiveId"
        value={formData.qcExecutiveId}
        onChange={handleChange}
        className="form-control mb-2"
      >
        <option value="">Select QC Executive</option>
        {qcExecutives.map((qc) => (
          <option key={qc.QC__Id} value={qc.QC__Id}>
            {qc.QC__Name}
          </option>
        ))}
      </select>

      <button className="btn btn-success w-100" onClick={handleSubmit}>
        Submit QC
      </button>
    </div>
  );
}

export default QCTab;
