import { useState, useEffect } from "react";
import CameraGPS from "../../components/CameraGPS";
import { saveDraft, getDraft } from "../../store/labourDraftStore";

function CompletionTab({ onSuccess, targetQty }) {
  const [formData, setFormData] = useState({
    completedQty: "",
    photos: [], // base64 images
    remarks: "",
    gps: null,
  });

  const [error, setError] = useState("");

  /* ---------- Load draft ---------- */
  useEffect(() => {
    const draft = getDraft();
    if (draft.completion) setFormData(draft.completion);
  }, []);

  /* ---------- Camera capture ---------- */
  const handleCapture = ({ photos, gps }) => {
    setFormData((prev) => ({
      ...prev,
      photos, // max 2 handled by CameraGPS
      gps,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const removePhoto = (index) => {
    setFormData((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index),
    }));
  };

  /* ---------- Submit ---------- */
  const handleSubmit = () => {
    const completedQty = Number(formData.completedQty);

    if (!completedQty || completedQty <= 0) {
      setError("Completed Quantity must be greater than zero");
      return;
    }

    if (completedQty > targetQty) {
      setError(`Completed Quantity cannot exceed Target Qty (${targetQty})`);
      return;
    }

    if (formData.photos.length < 1) {
      setError("At least one work completion photo is required");
      return;
    }

    if (completedQty < targetQty && !formData.remarks.trim()) {
      setError("Remarks are mandatory for partial completion");
      return;
    }

    setError("");

    console.log("Completion Saved:", formData);

    // Save to global draft store
    saveDraft({ completion: formData });

    onSuccess();
  };

  return (
    <div>
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Completed Quantity */}
      <div className="mb-2">
        <label>Completed Quantity</label>
        <input
          type="number"
          name="completedQty"
          value={formData.completedQty}
          onChange={handleChange}
          className="form-control"
          max={targetQty}
        />
        <small className="text-muted">Target Qty: {targetQty}</small>
      </div>

      {/* Camera */}
      <div className="mb-2">
        <label>
          Work Completion Photos <span className="text-danger">*</span>
        </label>

        <CameraGPS maxPhotos={1} onCapture={handleCapture} />
      </div>

     
      {/* Remarks */}
      <div className="mb-2">
        <label>
          Remarks {Number(formData.completedQty) < targetQty && "(Required)"}
        </label>
        <textarea
          name="remarks"
          value={formData.remarks}
          onChange={handleChange}
          className="form-control"
        />
      </div>

      <button className="btn btn-primary mt-2" onClick={handleSubmit}>
        Save Work Completion
      </button>
    </div>
  );
}

export default CompletionTab;