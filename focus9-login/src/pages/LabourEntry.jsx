import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TimeInTab from "../components/labourTabs/TimeInTab";
import WorkAllocationTab from "../components/labourTabs/WorkAllocationTab";
import CompletionTab from "../components/labourTabs/CompletionTab";
import TimeOutTab from "../components/labourTabs/TimeOutTab";
import QCTab from "../components/labourTabs/QCTab";
import { getNextDocNo, loadLabourDoc } from "../api/focusApi";
import "./LabourEntry.css";

function LabourEntry() {
  const DEFAULT_DOC_NO = "LA/AAY/1";
  
  const [activeTab, setActiveTab] = useState("timein");
  const [status, setStatus] = useState("NEW");
  const [mode, setMode] = useState("NEW"); // NEW or EDIT
  const [docNo, setDocNo] = useState(DEFAULT_DOC_NO); // Default to LA/AAY/1
  const [loading, setLoading] = useState(true);
  const [loadedData, setLoadedData] = useState(null); // Store loaded transaction data
  const [isDocNoChanged, setIsDocNoChanged] = useState(false); // Track if user changed DocNo
  const [originalDocNo, setOriginalDocNo] = useState(DEFAULT_DOC_NO); // Track original DocNo for comparison

  const navigate = useNavigate();

  /* ================= SCREEN INITIALIZATION ================= */

  useEffect(() => {
    const initializeScreen = async () => {
      try {
        setLoading(true);
        
        // Get session from AuthContext or localStorage
        const sessionId = localStorage.getItem("sessionId") || "";
        
        if (!sessionId) {
          console.error("No session found. Redirecting to login.");
          navigate("/login");
          return;
        }

        // Try to fetch next continuous Document No from Focus, fallback to default
        let nextDocNo = DEFAULT_DOC_NO;
        try {
          const apiDocNo = await getNextDocNo(sessionId);
          if (apiDocNo) {
            nextDocNo = apiDocNo;
          }
        } catch (e) {
          console.warn("Using default document number: " + DEFAULT_DOC_NO);
        }
        
        console.log("DocNo:", nextDocNo);
        
        setDocNo(nextDocNo);
        setOriginalDocNo(nextDocNo);
        setMode("NEW");
        setStatus("NEW");
        setActiveTab("timein");
        setIsDocNoChanged(false);
        setLoadedData(null);
        
      } catch (error) {
        console.error("Error initializing screen:", error);
        alert("Error loading screen. Please refresh.");
      } finally {
        setLoading(false);
      }
    };

    initializeScreen();
  }, [navigate]);

  /* ================= DOCUMENT NO CHANGE HANDLER ================= */

  const handleDocNoChange = async (event) => {
    const newDocNo = event.target.value;
    setDocNo(newDocNo);

    // Mark as changed if different from original
    if (newDocNo !== originalDocNo) {
      setIsDocNoChanged(true);

      // Only try to load if user stopped typing (using debounce concept)
      // For now, we load on blur instead
    } else {
      setIsDocNoChanged(false);
      setMode("NEW");
      setLoadedData(null);
    }
  };

  /* ================= DOCUMENT NO BLUR HANDLER (LOAD DATA) ================= */

  const handleDocNoBlur = async () => {
    if (!isDocNoChanged || docNo === originalDocNo) {
      // User didn't actually change it or reverted to original
      setMode("NEW");
      setLoadedData(null);
      return;
    }

    try {
      setLoading(true);
      const sessionId = localStorage.getItem("sessionId") || "";

      // Try to load the document from Focus
      const loadedDocument = await loadLabourDoc(docNo, sessionId);

      if (loadedDocument) {
        // Document exists → EDIT mode
        console.log("Loaded existing document:", loadedDocument);
        setLoadedData(loadedDocument);
        setMode("EDIT");
        setStatus("EDIT"); // Mark as EDIT
        setActiveTab("timein");
      } else {
        // Document not found → stay in NEW mode with user-entered DocNo
        console.log("Document not found. Staying in NEW mode.");
        setMode("NEW");
        setLoadedData(null);
      }
    } catch (error) {
      console.error("Error loading document:", error);
      alert("Document not found. Staying in NEW mode with entered DocNo.");
      setMode("NEW");
      setLoadedData(null);
    } finally {
      setLoading(false);
    }
  };

  /* ================= ACTION BUTTON FUNCTIONS ================= */

  const handleNew = async () => {
    if (window.confirm("Create new entry? Unsaved data will be lost.")) {
      try {
        setLoading(true);
        const sessionId = localStorage.getItem("sessionId") || "";

        // Fetch next continuous Document No
        const nextDocNo = await getNextDocNo(sessionId);
        
        // Reset all state to NEW
        setDocNo(nextDocNo);
        setOriginalDocNo(nextDocNo);
        setMode("NEW");
        setStatus("NEW");
        setActiveTab("timein");
        setIsDocNoChanged(false);
        setLoadedData(null);
        
        console.log("New entry initialized with DocNo:", nextDocNo);
      } catch (error) {
        console.error("Error creating new entry:", error);
        alert("Error creating new entry.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSave = () => {
    if (mode === "NEW") {
      alert(`Creating new Labour Entry with DocNo: ${docNo}`);
      // TODO: Call API to create new document
      // Later → API call to postLabourDocument with all tab data
    } else if (mode === "EDIT") {
      alert(`Updating Labour Entry: ${docNo}`);
      // TODO: Call API to update existing document
      // Later → API call to postLabourDocument (update mode)
    }
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleClose = () => {
    if (window.confirm("Are you sure you want to close?")) {
      navigate("/dashboard");
    }
  };

  /* ================= RENDER ================= */

  if (loading) {
    return <div className="labour-container"><p>Loading...</p></div>;
  }

  return (
    <div className="labour-container">

      {/* 🔹 HEADER */}
      <div className="labour-header">
        <div className="doc-number">
          <label>Document No</label>
          <input 
            type="text" 
            value={docNo} 
            onChange={handleDocNoChange}
            onBlur={handleDocNoBlur}
            placeholder="Enter or change DocNo to edit"
            title={mode === "NEW" ? "New Entry" : "Edit Mode - Loaded from Focus"}
            style={{
              backgroundColor: mode === "EDIT" ? "#fff3cd" : "#ffffff",
              borderColor: mode === "EDIT" ? "#ff9800" : "#ccc"
            }}
          />
          <small style={{ marginTop: "4px", fontSize: "12px", color: mode === "EDIT" ? "#ff9800" : "#666" }}>
            {mode === "NEW" ? "🟢 NEW MODE" : "🟠 EDIT MODE"}
          </small>
        </div>

       <div className="header-actions">
  <button className="action-btn" onClick={handleNew}>
    <i className="bi bi-plus-circle"></i>
    <span>New</span>
  </button>

  <button
    className="action-btn"
    onClick={handleSave}
    disabled={!docNo}
  >
    <i className="bi bi-save"></i>
    <span>Save</span>
  </button>

  <button className="action-btn" onClick={handleRefresh}>
    <i className="bi bi-arrow-clockwise"></i>
    <span>Refresh</span>
  </button>

  <button className="action-btn danger" onClick={handleClose}>
    <i className="bi bi-x-circle"></i>
    <span>Close</span>
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
              data={loadedData}
              mode={mode}
              onSuccess={() => {
                setStatus("TIME_IN_DONE");
                setActiveTab("allocation");
              }}
            />
          )}

          {activeTab === "allocation" && (
            <WorkAllocationTab
              data={loadedData}
              mode={mode}
              onSuccess={() => {
                setStatus("ALLOCATED");
                setActiveTab("completion");
              }}
            />
          )}

          {activeTab === "completion" && (
            <CompletionTab
              data={loadedData}
              mode={mode}
              onSuccess={() => {
                setStatus("COMPLETED");
                setActiveTab("timeout");
              }}
            />
          )}

          {activeTab === "timeout" && (
            <TimeOutTab
              data={loadedData}
              mode={mode}
              onSuccess={() => {
                setStatus("TIME_OUT");
                setActiveTab("qc");
              }}
            />
          )}

          {activeTab === "qc" && (
            <QCTab
              data={loadedData}
              mode={mode}
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
