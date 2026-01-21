import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
import CalendarView from "../components/CalendarView";
import api from "../api/api";
import "./Dashboard.css";
import logoImage from "../assets/Logo.jpg.jpeg";

function Dashboard() {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState("calendar");

  const handleLogout = async () => {
    try {
      if (user?.sessionId) {
        await api.post("/Login/Logout", {
          data: [{ SessionId: user.sessionId }],
          result: 1,
          message: "",
        });
      }
    } finally {
      logout();
      navigate("/");
    }
  };

  return (
    <div className={`dashboard-wrapper ${darkMode ? "dark" : "light"}`}>
      {/* SIDEBAR */}
      <aside className={`sidebar ${sidebarOpen ? "expanded" : "collapsed"}`}>
        <div className="sidebar-header">
          <img src={logoImage} alt="DEC Logo" className="company-logo" />

          {sidebarOpen && (
            <div className="company-info">
              <div className="company-name">DEC Labour Workflow System</div>
              <div className="company-user">Logged in as</div>
              <div className="company-username">
                {user?.username || "mobile"}
              </div>
            </div>
          )}

          <button
            className="sidebar-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰
          </button>
        </div>

        {/* NAVIGATION */}
        <nav className="sidebar-nav">
          <button
            className={`nav-item ${activeTab === "calendar" ? "active" : ""}`}
            onClick={() => setActiveTab("calendar")}
          >
            📅 {sidebarOpen && "Calendar"}
          </button>

          <button
            className={`nav-item ${activeTab === "tasks" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("tasks");
              navigate("/labour/new");
            }}
          >
            🧾 {sidebarOpen && "Tasks"}
          </button>

          <button
            className={`nav-item ${activeTab === "settings" ? "active" : ""}`}
            onClick={() => setActiveTab("settings")}
          >
            ⚙️ {sidebarOpen && "Settings"}
          </button>
        </nav>

        {/* FOOTER */}
        <div className="sidebar-footer">
          <button
            className="theme-btn"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "🌙 Dark" : "☀️ Light"}
          </button>

          <button className="logout-btn" onClick={handleLogout}>
            ⏻ {sidebarOpen && "Logout"}
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="main-content">
        {activeTab === "calendar" && (
          <>
            <h2>Today’s Overview</h2>

            <div className="task-cards">
              <div
                className="task-card"
                onClick={() => navigate("/labour/new")}
              >
                ➕ New Labour Entry
              </div>
              <div className="task-card">📋 Work Status</div>
              <div className="task-card">✔ QC Summary</div>
            </div>

            <CalendarView />
          </>
        )}

        {activeTab === "settings" && (
          <>
            <h2>Settings</h2>
            <p>Application preferences</p>
          </>
        )}
      </main>
    </div>
  );
}

export default Dashboard;
