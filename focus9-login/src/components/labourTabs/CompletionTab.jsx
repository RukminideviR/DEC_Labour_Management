import { useState, useEffect } from "react";
import CameraGPS from "../../components/CameraGPS";
import { saveDraft, getDraft } from "../../store/labourDraftStore";

function CompletionTab({ onSuccess, targetQty }) {

  const [formData, setFormData] = useState({
    completedQty: "",
    photos: [],
    remarks: "",
    gps: null,
  });

  const [errors, setErrors] = useState({});

  /* ---------- Load draft ---------- */
  useEffect(() => {
    const draft = getDraft();
    if (draft.completion) setFormData(draft.completion);
  }, []);

  /* ---------- Camera capture ---------- */
  const handleCapture = ({ photos, gps }) => {
    setFormData(prev => ({
      ...prev,
      photos,
      gps
    }));

    setErrors(prev => ({ ...prev, photos: "" }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: "" }));
  };

  /* ---------- Validation ---------- */
  const validate = () => {
    const newErrors = {};
    const completedQty = Number(formData.completedQty);

    if (!completedQty || completedQty <= 0) {
      newErrors.completedQty = "Completed Quantity must be greater than zero";
    } else if (completedQty > targetQty) {
      newErrors.completedQty = `Completed Quantity cannot exceed Target Qty (${targetQty})`;
    }

    if (formData.photos.length < 1) {
      newErrors.photos = "At least one work completion photo is required";
    }

    if (completedQty < targetQty && !formData.remarks.trim()) {
      newErrors.remarks = "Remarks are mandatory for partial completion";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ---------- Submit ---------- */
  const handleSubmit = () => {
    if (!validate()) return;

    saveDraft({ completion: formData });
    onSuccess();
  };

  return (
    <div>

      {/* Completed Quantity */}
      <div className="mb-2">
        <label>Completed Quantity *</label>
        <input
          type="number"
          name="completedQty"
          value={formData.completedQty}
          onChange={handleChange}
          className={`form-control ${errors.completedQty ? "is-invalid" : ""}`}
          max={targetQty}
        />
        {errors.completedQty && (
          <div className="invalid-feedback">{errors.completedQty}</div>
        )}
        <small className="text-muted">Target Qty: {targetQty}</small>
      </div>

      {/* Camera */}
      <div className="mb-2">
        <label>
          Work Completion Photos <span className="text-danger">*</span>
        </label>

        <CameraGPS maxPhotos={1} onCapture={handleCapture} />

        {errors.photos && (
          <div className="text-danger small mt-1">{errors.photos}</div>
        )}
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
          className={`form-control ${errors.remarks ? "is-invalid" : ""}`}
        />
        {errors.remarks && (
          <div className="invalid-feedback">{errors.remarks}</div>
        )}
      </div>

      <button className="btn btn-primary mt-2 w-100" onClick={handleSubmit}>
        Save Work Completion
      </button>
    </div>
  );
}

export default CompletionTab;
