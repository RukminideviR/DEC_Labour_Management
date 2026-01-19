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
    block: null,        // master
    floor: null,        // master
    grid: "",
    workCode: null,     // master
    targetQty: "",
    rate: 0,
    amount: 0
  });

  const [error, setError] = useState("");

  /* =========================
     HANDLE CHANGE
  ========================= */
  const handleChange = (name, value) => {
    setFormData(prev => {
      let updated = { ...prev, [name]: value };

      // Rate always from Work Code master
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
  };

  /* =========================
     SUBMIT
  ========================= */
  const handleSubmit = () => {
    if (
      !formData.block ||
      !formData.floor ||
      !formData.workCode ||
      !formData.targetQty
    ) {
      setError("Please fill all mandatory fields");
      return;
    }

    if (Number(formData.targetQty) <= 0) {
      setError("Target quantity must be greater than zero");
      return;
    }

    setError("");

    console.log("WORK ALLOCATION DATA", formData);

    // Save to global draft store
    saveDraft({ workAllocation: formData });

    onSuccess(formData);
  };

  return (
    <div>
      {error && <div className="alert alert-danger">{error}</div>}

      {/* 11. Block */}
      <label>Block *</label>
      <select
        className="form-control mb-2"
        onChange={e =>
          handleChange("block", blockMaster[e.target.value])
        }
      >
        <option value="">Select Block</option>
        {blockMaster.map((b) => (
          <option key={`block-${b.Block__Id}`} value={blockMaster.indexOf(b)}>
            {b.Block__Name}
          </option>
        ))}
      </select>

      {/* Grid */}
      <label>Grid</label>
      <input
        className="form-control mb-2"
        value={formData.grid}
        onChange={e => handleChange("grid", e.target.value)}
      />

      {/* 14. Floor */}
      <label>Location / Floor *</label>
      <select
        className="form-control mb-2"
        onChange={e =>
          handleChange("floor", floorMaster[e.target.value])
        }
      >
        <option value="">Select Floor</option>
        {floorMaster.map((f) => (
          <option key={`floor-${f.Floor__Id}`} value={floorMaster.indexOf(f)}>
            {f.Floor__Name}
          </option>
        ))}
      </select>

      {/* 17. Work Code */}
      <label>Work Code *</label>
      <select
        className="form-control mb-2"
        onChange={e =>
          handleChange("workCode", workCodeMaster[e.target.value])
        }
      >
        <option value="">Select Work Code</option>
        {workCodeMaster.map((w) => (
          <option key={`workcode-${w.WorkCode}`} value={workCodeMaster.indexOf(w)}>
            {w.WorkCode} - {w.WorkName}
          </option>
        ))}
      </select>

      {/* 18. Target Qty */}
      <label>Target Quantity *</label>
      <input
        type="number"
        className="form-control mb-2"
        value={formData.targetQty}
        onChange={e => handleChange("targetQty", e.target.value)}
      />

      {/* 20. Rate */}
      <label>Rate (From Contract)</label>
      <input className="form-control mb-2" value={formData.rate} disabled />

      {/* 21. Amount */}
      <label>Amount</label>
      <input className="form-control mb-3" value={formData.amount} disabled />

      <button className="btn btn-primary w-100" onClick={handleSubmit}>
        Save & Continue
      </button>
    </div>
  );
}

export default WorkAllocationTab;
