import { useState } from "react";
import TimeInTab from "../components/labourTabs/TimeInTab";
import WorkAllocationTab from "../components/labourTabs/WorkAllocationTab";
import CompletionTab from "../components/labourTabs/CompletionTab";
import TimeOutTab from "../components/labourTabs/TimeOutTab";
import QCTab from "../components/labourTabs/QCTab";

function LabourEntry() {
  const [activeTab, setActiveTab] = useState("timein");
  const [status, setStatus] = useState("NEW");

  return (
    <div className="container py-2">
      <ul className="nav nav-tabs mb-3">
        <li className="nav-item">
          <button className={`nav-link ${activeTab==="timein" && "active"}`}
            onClick={()=>setActiveTab("timein")}>
            Time In
          </button>
        </li>

        <li className="nav-item">
          <button className={`nav-link ${activeTab==="allocation" && "active"}`}
            disabled={status==="NEW"}
            onClick={()=>setActiveTab("allocation")}>
            Work Allocation
          </button>
        </li>

        <li className="nav-item">
          <button className={`nav-link ${activeTab==="completion" && "active"}`}
            disabled={status!=="ALLOCATED"}
            onClick={()=>setActiveTab("completion")}>
            Completion
          </button>
        </li>

        <li className="nav-item">
          <button className={`nav-link ${activeTab==="timeout" && "active"}`}
            disabled={status!=="COMPLETED"}
            onClick={()=>setActiveTab("timeout")}>
            Time Out
          </button>
        </li>

        <li className="nav-item">
          <button className={`nav-link ${activeTab==="qc" && "active"}`}
            disabled={status!=="TIME_OUT"}
            onClick={()=>setActiveTab("qc")}>
            QC
          </button>
        </li>
      </ul>

      {activeTab==="timein" &&
        <TimeInTab onSuccess={()=>{
          setStatus("TIME_IN_DONE");
          setActiveTab("allocation");
        }} />}

      {activeTab==="allocation" &&
        <WorkAllocationTab onSuccess={()=>{
          setStatus("ALLOCATED");
          setActiveTab("completion");
        }} />}

      {activeTab==="completion" &&
        <CompletionTab onSuccess={()=>{
          setStatus("COMPLETED");
          setActiveTab("timeout");
        }} />}

      {activeTab==="timeout" &&
        <TimeOutTab onSuccess={()=>{
          setStatus("TIME_OUT");
          setActiveTab("qc");
        }} />}

      {activeTab==="qc" &&
        <QCTab onSuccess={()=>{
          setStatus("QC_DONE");
          alert("QC Completed");
        }} />}
    </div>
  );
}

export default LabourEntry;
