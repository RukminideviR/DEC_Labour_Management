import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CameraGPS from "../../components/CameraGPS";
import dummyMasters from "../../data/dummyMasters";

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

  // Capture photos from CameraGPS
  const handleCapture = ({ photos }) => {
    setFormData((prev) => ({
      ...prev,
      qcPhotos: photos || [],
    }));
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit QC & generate full ERP payload
  const handleSubmit = () => {
    setError("");

    console.log("🔍 DEBUG: handleSubmit called");
    console.log("🔍 DEBUG: formData", formData);

    if (!formData.qcPhotos.length) {
      setError("At least one QC photo is mandatory");
      console.log("❌ ERROR: No QC photos");
      return;
    }

    if (!formData.qcExecutiveId) {
      setError("QC Executive selection is mandatory");
      console.log("❌ ERROR: No QC Executive");
      return;
    }

    console.log("✅ All validations passed");

    // 1️⃣ Save QC into draft (overwrite only QC)
    const qcData = {
      ...formData,
      completedQty,
      qcTime: new Date().toISOString(),
    };
    console.log("💾 Saving QC data:", qcData);
    saveDraft({ qc: qcData });

    // 2️⃣ Read full draft (includes timeIn, workAllocation, etc.)
    const draft = getDraft();
    console.log("📦 FULL DRAFT RETRIEVED FROM STORAGE:", draft);

    // 3️⃣ Build full ERP payload (Header / Body / Footer)
    try {
      const finalPayload = buildCreateDoc(draft);
      console.log("✅✅✅ FULL ERP PAYLOAD (FINAL DATA STRUCTURE) ✅✅✅", finalPayload);
      console.log("📊 HEADER:", finalPayload.data[0].Header);
      console.log("📋 BODY:", finalPayload.data[0].Body);
    } catch (err) {
      console.error("❌ ERROR in buildCreateDoc:", err);
      setError("Error building ERP payload: " + err.message);
      return;
    }

    alert("QC completed & ERP payload generated - Check Console!");

    // Navigate back to dashboard
    // navigate("/dashboard");
  };

  return (
    <div>
      {error && <div className="alert alert-danger">{error}</div>}

      <CameraGPS maxPhotos={2} onCapture={handleCapture} />

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
