import { labourEntries } from "../data/dummyLabourList";
import { useNavigate } from "react-router-dom";

const statusLabel = {
  TIME_IN_DONE: "Needs Allocation",
  ALLOCATED: "Needs Completion",
  COMPLETED: "Needs Time Out",
  TIME_OUT: "QC Pending",
  QC_DONE: "Completed"
};

const statusColor = {
  TIME_IN_DONE: "primary",
  ALLOCATED: "warning",
  COMPLETED: "info",
  TIME_OUT: "danger",
  QC_DONE: "success"
};

function LabourList() {
  const navigate = useNavigate();

  return (
    <div className="container py-2">
      <h5 className="mb-3">Labour Entries</h5>

      {labourEntries.map(item => (
        <div
          key={item.id}
          className="card mb-2"
          onClick={() => navigate(`/labour/${item.id}`)}
          style={{ cursor: "pointer" }}
        >
          <div className="card-body py-2">
            <div className="d-flex justify-content-between">
              <strong>{item.labour}</strong>
              <span className={`badge bg-${statusColor[item.status]}`}>
                {statusLabel[item.status]}
              </span>
            </div>
            <div className="text-muted small">
              {item.site} • {item.date}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default LabourList;
