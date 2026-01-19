import { useState } from "react";
import CameraGPS from "../../components/CameraGPS";
import { saveDraft } from "../../store/labourDraftStore";

/* =========================
   SITE ENGINEER MASTER
========================= */
const engineers = [
  { id: 1, name: "Engineer Anil" },
  { id: 2, name: "Engineer Sunil" },
  { id: 3, name: "Engineer Rakesh" },
];

function TimeOutTab({ onSuccess }) {
  const [formData, setFormData] = useState({
    outTime: new Date().toISOString(),
    photo: null,
    gps: null,
    engineerId: "",
  });

  const [error, setError] = useState("");

  /* ---------- Camera + GPS ---------- */
  const handleCapture = ({ photos, gps }) => {
    setFormData((prev) => ({
      ...prev,
      photo: photos?.[0] || null,
      gps,
    }));
  };

  /* ---------- Change ---------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /* ---------- Submit ---------- */
  const handleSubmit = () => {
    setError("");

    if (!formData.photo) {
      setError("Photo is mandatory");
      return;
    }

    if (!formData.gps) {
      setError("GPS not captured");
      return;
    }

    if (!formData.engineerId) {
      setError("Site Engineer confirmation is required");
      return;
    }

    const payload = {
      outTime: formData.outTime,
      engineerId: formData.engineerId,
      gps: formData.gps,
      photo: formData.photo,
    };

    console.log("TIME OUT SAVED:", payload);

    // Save to global draft store
    saveDraft({ timeOut: payload });

    onSuccess(); // move to QC tab
  };

  return (
    <div>
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Out Time */}
      <label>Out Time</label>
      <input
        type="text"
        className="form-control mb-2"
        disabled
        value={new Date(formData.outTime).toLocaleTimeString()}
      />

      {/* Photo */}
      <label>
        Photo Out <span className="text-danger">*</span>
      </label>
      <CameraGPS maxPhotos={1} onCapture={handleCapture} />

      {/* Engineer */}
      <label className="mt-2">
        Site Engineer Confirmation <span className="text-danger">*</span>
      </label>
      <select
        name="engineerId"
        value={formData.engineerId}
        onChange={handleChange}
        className="form-control"
      >
        <option value="">Select Engineer</option>
        {engineers.map((e) => (
          <option key={e.id} value={e.id}>
            {e.name}
          </option>
        ))}
      </select>

      <button
        className="btn btn-primary w-100 mt-3"
        onClick={handleSubmit}
      >
        Confirm Time Out
      </button>
    </div>
  );
}

export default TimeOutTab;
