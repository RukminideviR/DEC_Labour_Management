import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TimeInTab from "../components/labourTabs/TimeInTab";
import WorkAllocationTab from "../components/labourTabs/WorkAllocationTab";
import CompletionTab from "../components/labourTabs/CompletionTab";
import TimeOutTab from "../components/labourTabs/TimeOutTab";
import QCTab from "../components/labourTabs/QCTab";
import "./LabourEntry.css";

function LabourEntry() {
  const [activeTab, setActiveTab] = useState("timein");
  const [status, setStatus] = useState("NEW");

  const navigate = useNavigate();

  /* ================= ACTION BUTTON FUNCTIONS ================= */

  const handleNew = () => {
    if (window.confirm("Create new entry? Unsaved data will be lost.")) {
      setStatus("NEW");
      setActiveTab("timein");
      window.location.reload(); 
    }
  };

  const handleSave = () => {
    alert(`Saving data from ${activeTab.toUpperCase()} tab`);
    // Later → API call based on activeTab
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleClose = () => {
    if (window.confirm("Are you sure you want to close?")) {
      navigate("/dashboard"); // change if your route is different
    }
  };

  /* ================= UI ================= */

  return (
    <div className="labour-container">

      {/* 🔹 HEADER */}
      <div className="labour-header">
        <div className="doc-number">
          <label>Document No</label>
          <input type="text" value="LA/AAY/1" disabled />
        </div>

        <div className="header-actions">
          <button title="New" onClick={handleNew}>
            <i className="bi bi-plus-circle"></i>
          </button>

          <button
            title="Save"
            onClick={handleSave}
            disabled={status === "NEW"}
          >
            <i className="bi bi-save"></i>
          </button>

          <button title="Refresh" onClick={handleRefresh}>
            <i className="bi bi-arrow-clockwise"></i>
          </button>

          <button title="Close" onClick={handleClose}>
            <i className="bi bi-x-circle"></i>
          </button>
        </div>
      </div>

      {/* 🔹 BODY */}
      <div className="labour-body">

        {/* LEFT – VERTICAL TABS */}
        <div className="labour-tabs">
          <button
            className={activeTab === "timein" ? "active" : ""}
            onClick={() => setActiveTab("timein")}
          >
            Time In
          </button>

          <button
            disabled={status === "NEW"}
            className={activeTab === "allocation" ? "active" : ""}
            onClick={() => setActiveTab("allocation")}
          >
            Work Allocation
          </button>

          <button
            disabled={status !== "ALLOCATED"}
            className={activeTab === "completion" ? "active" : ""}
            onClick={() => setActiveTab("completion")}
          >
            Completion
          </button>

          <button
            disabled={status !== "COMPLETED"}
            className={activeTab === "timeout" ? "active" : ""}
            onClick={() => setActiveTab("timeout")}
          >
            Time Out
          </button>

          <button
            disabled={status !== "TIME_OUT"}
            className={activeTab === "qc" ? "active" : ""}
            onClick={() => setActiveTab("qc")}
          >
            QC
          </button>
        </div>

        {/* RIGHT – TAB CONTENT */}
        <div className="labour-content">
          {activeTab === "timein" && (
            <TimeInTab
              onSuccess={() => {
                setStatus("TIME_IN_DONE");
                setActiveTab("allocation");
              }}
            />
          )}

          {activeTab === "allocation" && (
            <WorkAllocationTab
              onSuccess={() => {
                setStatus("ALLOCATED");
                setActiveTab("completion");
              }}
            />
          )}

          {activeTab === "completion" && (
            <CompletionTab
              onSuccess={() => {
                setStatus("COMPLETED");
                setActiveTab("timeout");
              }}
            />
          )}

          {activeTab === "timeout" && (
            <TimeOutTab
              onSuccess={() => {
                setStatus("TIME_OUT");
                setActiveTab("qc");
              }}
            />
          )}

          {activeTab === "qc" && (
            <QCTab
              onSuccess={() => {
                setStatus("QC_DONE");
                alert("QC Completed");
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default LabourEntry;
