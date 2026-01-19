import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
import api from "../api/api";

function Dashboard() {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      if (user?.sessionId) {
        await api.post("/Login/Logout", {
          data: [
            {
              SessionId: user.sessionId,
            },
          ],
          result: 1,
          message: "",
        });
      }
    } catch (e) {
      console.error("Logout API failed", e);
    } finally {
      logout();
      navigate("/");
    }
  };

  return (
    <div className="container py-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h6 className="mb-0">Labour Management</h6>
        <button
          className="btn btn-sm btn-outline-danger"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      <div className="card mb-3">
        <div className="card-body py-2">
          <p className="mb-1">
            <strong>User:</strong> {user?.username}
          </p>
          <p className="mb-1">
            <strong>EmployeeId:</strong> {user?.employeeId}
          </p>
          <p className="mb-0">
            <strong>Company Code:</strong> {user?.companyCode}
          </p>
        </div>
      </div>

      <button
        className="btn btn-primary w-100 mb-3"
        onClick={() => navigate("/labour/new")}
      >
        ➕ New Labour Entry
      </button>

      <button
        className="btn btn-outline-secondary w-100 mb-3"
        onClick={() => navigate("/labour/list")}
      >
        📋 Labour Entries List
      </button>

      <button
        className="btn btn-outline-dark w-100"
        onClick={() => navigate("/qc")}
      >
        ✔ QC Tasks
      </button>
    </div>
  );
}

export default Dashboard;
