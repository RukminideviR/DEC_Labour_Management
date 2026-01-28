import { useState } from "react";
import CameraGPS from "../../components/CameraGPS";
import dummyMasters from "../../data/dummyMasters";
import { saveDraft } from "../../store/labourDraftStore";

function TimeInTab({ onSuccess }) {

  const {
    sites,
    engineers,
    contractTypes,
    contractors,
    labours,
    skills
  } = dummyMasters;

  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    site: null,
    engineer: null,
    contractType: null,
    contractor: null,
    labour: null,
    skill: null,
    photo: null,
    gps: null,
    inTime: new Date().toISOString()
  });

  const [errors, setErrors] = useState({});

  /* ---------- Camera ---------- */
  const handleCapture = ({ photos, gps }) => {
    setFormData(prev => ({
      ...prev,
      photo: photos?.[0] || null,
      gps
    }));

    setErrors(prev => ({
      ...prev,
      photo: "",
      gps: ""
    }));
  };

  /* ---------- VALIDATION ---------- */
  const validate = () => {
    const newErrors = {};

    if (!formData.site) newErrors.site = "Please select Site";
    if (!formData.engineer) newErrors.engineer = "Please select Site Engineer";
    if (!formData.contractType) newErrors.contractType = "Please select Contract Type";
    if (!formData.contractor) newErrors.contractor = "Please select Contractor";
    if (!formData.labour) newErrors.labour = "Please select Labour";
    if (!formData.skill) newErrors.skill = "Please select Skill";

    if (!formData.photo) newErrors.photo = "Photo is mandatory";
    if (!formData.gps) newErrors.gps = "GPS is mandatory";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  /* ---------- Submit ---------- */
  const handleSubmit = () => {
    if (!validate()) return;

    saveDraft({ timeIn: formData });
    onSuccess();
  };

  return (
    <div>

      {/* Date */}
      <label>Date</label>
      <input className="form-control mb-2" value={formData.date} disabled />

      {/* Site */}
      <label>Site *</label>
      <select
        className={`form-control mb-1 ${errors.site ? "is-invalid" : ""}`}
        onChange={e => {
          setFormData(p => ({ ...p, site: sites[e.target.value] }));
          setErrors(p => ({ ...p, site: "" }));
        }}
      >
        <option value="">Select Site</option>
        {sites.map((s, i) => (
          <option key={s.Site__Id} value={i}>
            {s.Site__Name}
          </option>
        ))}
      </select>
      {errors.site && <div className="invalid-feedback">{errors.site}</div>}

      {/* Engineer */}
      <label>Site Engineer *</label>
      <select
        className={`form-control mb-1 ${errors.engineer ? "is-invalid" : ""}`}
        onChange={e => {
          setFormData(p => ({ ...p, engineer: engineers[e.target.value] }));
          setErrors(p => ({ ...p, engineer: "" }));
        }}
      >
        <option value="">Select Engineer</option>
        {engineers.map((e, i) => (
          <option key={e.Engineer__Id} value={i}>
            {e.Engineer__Name}
          </option>
        ))}
      </select>
      {errors.engineer && <div className="invalid-feedback">{errors.engineer}</div>}

      {/* Contract Type */}
      <label>Contract Type *</label>
      <select
        className={`form-control mb-1 ${errors.contractType ? "is-invalid" : ""}`}
        onChange={e => {
          setFormData(p => ({ ...p, contractType: contractTypes[e.target.value] }));
          setErrors(p => ({ ...p, contractType: "" }));
        }}
      >
        <option value="">Select Contract Type</option>
        {contractTypes.map((c, i) => (
          <option key={c.Contract_Type__Id} value={i}>
            {c.Contract_Type__Name}
          </option>
        ))}
      </select>
      {errors.contractType && <div className="invalid-feedback">{errors.contractType}</div>}

      {/* Contractor */}
      <label>Contractor *</label>
      <select
        className={`form-control mb-1 ${errors.contractor ? "is-invalid" : ""}`}
        onChange={e => {
          setFormData(p => ({ ...p, contractor: contractors[e.target.value] }));
          setErrors(p => ({ ...p, contractor: "" }));
        }}
      >
        <option value="">Select Contractor</option>
        {contractors.map((c, i) => (
          <option key={c.VendorAC__Id} value={i}>
            {c.VendorAC__Name}
          </option>
        ))}
      </select>
      {errors.contractor && <div className="invalid-feedback">{errors.contractor}</div>}

      {/* Labour */}
      <label>Labour *</label>
      <select
        className={`form-control mb-1 ${errors.labour ? "is-invalid" : ""}`}
        onChange={e => {
          setFormData(p => ({ ...p, labour: labours[e.target.value] }));
          setErrors(p => ({ ...p, labour: "" }));
        }}
      >
        <option value="">Select Labour</option>
        {labours.map((l, i) => (
          <option key={l.Labour__Id} value={i}>
            {l.Labour__Name}
          </option>
        ))}
      </select>
      {errors.labour && <div className="invalid-feedback">{errors.labour}</div>}

      {/* Skill */}
      <label>Skill *</label>
      <select
        className={`form-control mb-1 ${errors.skill ? "is-invalid" : ""}`}
        onChange={e => {
          setFormData(p => ({ ...p, skill: skills[e.target.value] }));
          setErrors(p => ({ ...p, skill: "" }));
        }}
      >
        <option value="">Select Skill</option>
        {skills.map((s, i) => (
          <option key={s.Labour_Skill__Id} value={i}>
            {s.Labour_Skill__Name}
          </option>
        ))}
      </select>
      {errors.skill && <div className="invalid-feedback">{errors.skill}</div>}

      {/* In Time */}
      <label>In Time</label>
      <input
        className="form-control mb-2"
        value={new Date().toLocaleTimeString()}
        disabled
      />

      {/* Camera */}
      <CameraGPS maxPhotos={1} onCapture={handleCapture} />
      {(errors.photo || errors.gps) && (
        <div className="text-danger mt-2">
          {errors.photo || errors.gps}
        </div>
      )}

      <button className="btn btn-primary w-100 mt-3" onClick={handleSubmit}>
        Save Time In
      </button>
    </div>
  );
}

export default TimeInTab;
