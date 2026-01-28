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
  });

  const [error, setError] = useState("");

  /* ---------- Camera ---------- */
  const handleCapture = ({ photos }) => {
    setFormData((prev) => ({
      ...prev,
      qcPhotos: photos || [],
    }));
  };

  /* ---------- Change ---------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /* ---------- Submit ---------- */
  const handleSubmit = async () => {
    setError("");

    if (!formData.qcPhotos.length) {
      setError("At least one QC photo is mandatory");
      return;
    }

    if (!formData.qcExecutiveId) {
      setError("QC Executive selection is mandatory");
      return;
    }

    /* ---------- Save QC ---------- */
    const qcData = {
      qcPhotos: formData.qcPhotos,
      qcExecutiveId: formData.qcExecutiveId,
      qcRemarks: formData.qcRemarks,
      completedQty,
      qcTime: new Date().toISOString(),
    };

    saveDraft({ qc: qcData });

    const draft = getDraft();

    let finalPayload;
    try {
      finalPayload = buildCreateDoc(draft);
    } catch (err) {
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

      const apiResponse = await postLabourDocument(finalPayload, sessionId);

      if (apiResponse.result === 1 || apiResponse.data) {
        alert("Labour timesheet submitted successfully!");
        clearDraft();
        navigate("/dashboard");
      } else {
        setError(apiResponse.message || "Submission failed");
      }
    } catch (err) {
      setError(`Failed to submit: ${err.message}`);
    }
  };

  return (
    <div>
      {error && <div className="alert alert-danger">{error}</div>}

      {/* QC Photo */}
      <div className="mb-2">
        <label>
          QC Photo <span className="text-danger">*</span>
        </label>
        <CameraGPS maxPhotos={1} onCapture={handleCapture} />
      </div>

      {/* QC Executive */}
      <div className="mb-2">
        <label>
          QC Executive <span className="text-danger">*</span>
        </label>
        <select
          name="qcExecutiveId"
          value={formData.qcExecutiveId}
          onChange={handleChange}
          className="form-control"
        >
          <option value="">Select QC Executive</option>
          {qcExecutives.map((qc) => (
            <option key={qc.QC__Id} value={qc.QC__Id}>
              {qc.QC__Name}
            </option>
          ))}
        </select>
      </div>

      {/* QC Remarks */}
      <div className="mb-2">
        <label>QC Remarks</label>
        <textarea
          name="qcRemarks"
          value={formData.qcRemarks}
          onChange={handleChange}
          className="form-control"
        />
      </div>

      <button className="btn btn-success w-100 mt-2" onClick={handleSubmit}>
        Submit QC
      </button>
    </div>
  );
}

export default QCTab;
