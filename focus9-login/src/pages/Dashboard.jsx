import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
import CalendarView from "../components/CalendarView";
import api from "../api/api";
import "./Dashboard.css";
import logoImage from "../assets/Logo.jpg.jpeg";
import logOut from "../assets/shutdown.png";

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
        
        {/* HEADER */}
        <div className="sidebar-header">
          <div className="logo-area">
            <img src={logoImage} alt="DEC Logo" className="company-logo" />
            {sidebarOpen && (
              <div className="company-name">DEC Labour System</div>
            )}
          </div>

          <button
  className="sidebar-toggle"
  onClick={() => setSidebarOpen(!sidebarOpen)}
  aria-label="Toggle sidebar"
>
  {sidebarOpen ? "‹" : "›"}
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
  className={`nav-item ${activeTab === "labour" ? "active" : ""}`}
  onClick={() => {
    setActiveTab("labour");
    navigate("/labour/new");
  }}
>
  🧑‍🏭 {sidebarOpen && "Labour Entry"}
</button>


          {/* <button
            className={`nav-item ${activeTab === "tasks" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("tasks");
              navigate("/labour/new");
            }}
          >
            🧾 {sidebarOpen && "Tasks"}
          </button> */}

          <button
            className={`nav-item ${activeTab === "settings" ? "active" : ""}`}
            onClick={() => setActiveTab("settings")}
          >
            ⚙️ {sidebarOpen && "Settings"}
          </button>
        </nav>

        {/* USER INFO (👈 ABOVE FOOTER LINE) */}
        <div className="user-info">
          <div className="user-avatar">
            {user?.username?.charAt(0)?.toUpperCase()}
          </div>

          {sidebarOpen && (
            <div className="user-details">
              <div className="user-name">{user?.username}</div>
              <div className="company-code">
                Company: {user?.companyId}
              </div>
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className="sidebar-footer">
          <button
  className="theme-btn"
  onClick={() => setDarkMode(!darkMode)}
>
  <span>{darkMode ? "🌙" : "☀️"}</span>
  {sidebarOpen && (
    <span>{darkMode ? "Dark" : "Light"}</span>
  )}
</button>


          <button className="logout-btn" onClick={handleLogout}>
            <img src={logOut} alt="Logout" className="logout-icon" />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="main-content">
        {activeTab === "calendar" && (
          <>
            <h2>DEC Labour Management</h2>

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
