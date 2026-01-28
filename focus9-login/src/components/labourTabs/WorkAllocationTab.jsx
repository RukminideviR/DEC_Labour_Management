import { useState } from "react";
import { saveDraft } from "../../store/labourDraftStore";

/* =========================
   MASTER DATA
========================= */

const blockMaster = [
  { Block__Id: 1, Block__Name: "Tower A" },
  { Block__Id: 2, Block__Name: "Tower B" }
];

const floorMaster = [
  { Floor__Id: 1, Floor__Name: "Ground Floor" },
  { Floor__Id: 2, Floor__Name: "First Floor" }
];

const workCodeMaster = [
  { WorkCode: "BRK-001", WorkName: "Brick Work 230mm", Rate: 550 },
  { WorkCode: "PL-002", WorkName: "Internal Plaster 12mm", Rate: 120 }
];

function WorkAllocationTab({ onSuccess }) {

  const [formData, setFormData] = useState({
    block: null,
    floor: null,
    grid: "",
    workCode: null,
    targetQty: "",
    rate: 0,
    amount: 0
  });

  const [errors, setErrors] = useState({});

  /* =========================
     HANDLE CHANGE
  ========================= */
  const handleChange = (name, value) => {
    setFormData(prev => {
      let updated = { ...prev, [name]: value };

      if (name === "workCode" || name === "targetQty") {
        const wc = workCodeMaster.find(
          w => w.WorkCode === updated.workCode?.WorkCode
        );

        const rate = wc ? wc.Rate : 0;
        updated.rate = rate;
        updated.amount = rate * Number(updated.targetQty || 0);
      }

      return updated;
    });

    // Clear field error on change
    setErrors(prev => ({ ...prev, [name]: "" }));
  };

  /* =========================
     VALIDATION
  ========================= */
  const validate = () => {
    const newErrors = {};

    if (!formData.block) newErrors.block = "Please select Block";
    if (!formData.floor) newErrors.floor = "Please select Floor";
    if (!formData.workCode) newErrors.workCode = "Please select Work Code";

    if (!formData.targetQty) {
      newErrors.targetQty = "Please enter Target Quantity";
    } else if (Number(formData.targetQty) <= 0) {
      newErrors.targetQty = "Target Quantity must be greater than zero";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* =========================
     SUBMIT
  ========================= */
  const handleSubmit = () => {
    if (!validate()) return;

    saveDraft({ workAllocation: formData });
    onSuccess(formData);
  };

  return (
    <div>

      {/* Block */}
      <label>Block *</label>
      <select
        className={`form-control mb-1 ${errors.block ? "is-invalid" : ""}`}
        onChange={e =>
          handleChange("block", blockMaster[e.target.value])
        }
      >
        <option value="">Select Block</option>
        {blockMaster.map((b, i) => (
          <option key={b.Block__Id} value={i}>
            {b.Block__Name}
          </option>
        ))}
      </select>
      {errors.block && <div className="invalid-feedback">{errors.block}</div>}

      {/* Grid */}
      <label>Grid</label>
      <input
        className="form-control mb-2"
        value={formData.grid}
        onChange={e => handleChange("grid", e.target.value)}
      />

      {/* Floor */}
      <label>Location / Floor *</label>
      <select
        className={`form-control mb-1 ${errors.floor ? "is-invalid" : ""}`}
        onChange={e =>
          handleChange("floor", floorMaster[e.target.value])
        }
      >
        <option value="">Select Floor</option>
        {floorMaster.map((f, i) => (
          <option key={f.Floor__Id} value={i}>
            {f.Floor__Name}
          </option>
        ))}
      </select>
      {errors.floor && <div className="invalid-feedback">{errors.floor}</div>}

      {/* Work Code */}
      <label>Work Code *</label>
      <select
        className={`form-control mb-1 ${errors.workCode ? "is-invalid" : ""}`}
        onChange={e =>
          handleChange("workCode", workCodeMaster[e.target.value])
        }
      >
        <option value="">Select Work Code</option>
        {workCodeMaster.map((w, i) => (
          <option key={w.WorkCode} value={i}>
            {w.WorkCode} - {w.WorkName}
          </option>
        ))}
      </select>
      {errors.workCode && (
        <div className="invalid-feedback">{errors.workCode}</div>
      )}

      {/* Target Qty */}
      <label>Target Quantity *</label>
      <input
        type="number"
        className={`form-control mb-1 ${errors.targetQty ? "is-invalid" : ""}`}
        value={formData.targetQty}
        onChange={e => handleChange("targetQty", e.target.value)}
      />
      {errors.targetQty && (
        <div className="invalid-feedback">{errors.targetQty}</div>
      )}

      {/* Rate */}
      <label>Rate (From Contract)</label>
      <input className="form-control mb-2" value={formData.rate} disabled />

      {/* Amount */}
      <label>Amount</label>
      <input className="form-control mb-3" value={formData.amount} disabled />

      <button className="btn btn-primary w-100" onClick={handleSubmit}>
        Save & Continue
      </button>
    </div>
  );
}

export default WorkAllocationTab;
