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

    labourAllotmentNo: "",
    photo: null,
    gps: null,
    inTime: new Date().toISOString()
  });

  const [error, setError] = useState("");

  /* ---------- Camera ---------- */
  const handleCapture = ({ photos, gps }) => {
    setFormData(prev => ({
      ...prev,
      photo: photos?.[0] || null,
      gps
    }));
  };

  /* ---------- Submit ---------- */
  const handleSubmit = () => {
    if (
      !formData.site ||
      !formData.engineer ||
      !formData.contractType ||
      !formData.contractor ||
      !formData.labour ||
      !formData.skill
    ) {
      setError("Please fill all mandatory fields");
      return;
    }

    if (!formData.photo || !formData.gps) {
      setError("Photo & GPS are mandatory");
      return;
    }

    saveDraft({ timeIn: formData });
    onSuccess();
  };

  return (
    <div>
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Date */}
      <label>Date</label>
      <input className="form-control mb-2" value={formData.date} disabled />

      {/* Site */}
      <label>Site *</label>
      <select
        className="form-control mb-2"
        onChange={e =>
          setFormData(p => ({
            ...p,
            site: sites[e.target.value]
          }))
        }
      >
        <option value="">Select Site</option>
        {sites.map((s, i) => (
          <option key={s.Site__Id} value={i}>
            {s.Site__Name}
          </option>
        ))}
      </select>

      {/* Engineer */}
      <label>Site Engineer *</label>
      <select
        className="form-control mb-2"
        onChange={e =>
          setFormData(p => ({
            ...p,
            engineer: engineers[e.target.value]
          }))
        }
      >
        <option value="">Select Engineer</option>
        {engineers.map((e, i) => (
          <option key={e.Engineer__Id} value={i}>
            {e.Engineer__Name}
          </option>
        ))}
      </select>

      {/* Contract Type */}
      <label>Contract Type *</label>
      <select
        className="form-control mb-2"
        onChange={e =>
          setFormData(p => ({
            ...p,
            contractType: contractTypes[e.target.value]
          }))
        }
      >
        <option value="">Select Contract Type</option>
        {contractTypes.map((c, i) => (
          <option key={c.Contract_Type__Id} value={i}>
            {c.Contract_Type__Name}
          </option>
        ))}
      </select>

      {/* Contractor */}
      <label>Contractor *</label>
      <select
        className="form-control mb-2"
        onChange={e =>
          setFormData(p => ({
            ...p,
            contractor: contractors[e.target.value]
          }))
        }
      >
        <option value="">Select Contractor</option>
        {contractors.map((c, i) => (
          <option key={c.VendorAC__Id} value={i}>
            {c.VendorAC__Name}
          </option>
        ))}
      </select>

      {/* Labour */}
      <label>Labour *</label>
      <select
        className="form-control mb-2"
        onChange={e =>
          setFormData(p => ({
            ...p,
            labour: labours[e.target.value]
          }))
        }
      >
        <option value="">Select Labour</option>
        {labours.map((l, i) => (
          <option key={l.Labour__Id} value={i}>
            {l.Labour__Name}
          </option>
        ))}
      </select>

      {/* Skill */}
      <label>Skill *</label>
      <select
        className="form-control mb-2"
        onChange={e =>
          setFormData(p => ({
            ...p,
            skill: skills[e.target.value]
          }))
        }
      >
        <option value="">Select Skill</option>
        {skills.map((s, i) => (
          <option key={s.Labour_Skill__Id} value={i}>
            {s.Labour_Skill__Name}
          </option>
        ))}
      </select>

      {/* In Time */}
      <label>In Time</label>
      <input
        className="form-control mb-2"
        value={new Date().toLocaleTimeString()}
        disabled
      />

      {/* Camera */}
      <CameraGPS maxPhotos={1} onCapture={handleCapture} />

      <button className="btn btn-primary w-100 mt-3" onClick={handleSubmit}>
        Save Time In
      </button>
    </div>
  );
}

export default TimeInTab;