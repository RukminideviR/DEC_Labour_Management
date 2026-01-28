import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
import { getCompanies, loginUser } from "../api/focusApi";
import "./Login.css";

import decImage from "../assets/dec_image.png";
import decLogo from "../assets/Logo.jpg.jpeg";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [companyId, setCompanyId] = useState("");
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [companiesLoading, setCompaniesLoading] = useState(true);
  const [error, setError] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  // Fetch companies on component mount
  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      setCompaniesLoading(true);
      setError("");
      const companiesData = await getCompanies();
      setCompanies(companiesData);
    } catch (err) {
      console.error('Failed to fetch companies:', err);
      setError('Failed to load companies. Please refresh the page.');
    } finally {
      setCompaniesLoading(false);
    }
  };

  const validate = () => {
    if (!username.trim()) {
      setError("Please enter your username");
      return false;
    }
    if (!password.trim()) {
      setError("Please enter your password");
      return false;
    }
    if (!companyId) {
      setError("Please select a company");
      return false;
    }
    return true;
  };

 const handleLogin = async () => {
    if (!validate()) return;

    try {
      setLoading(true);
      setError("");

      const res = await loginUser(username, password, companyId);

      localStorage.setItem("token", res.Token);
      localStorage.setItem("sessionId", res.fSessionId);
      localStorage.setItem("employeeId", res.EmployeeId);
      localStorage.setItem("companyId", companyId);

      login({
        username,
        employeeId: res.EmployeeId,
        companyId,
        sessionId: res.fSessionId,
        token: res.Token,
      });

      navigate("/dashboard");
    } catch {
      setError("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="login-page-mobile">
      <div className="banner">
        <img src={decImage} alt="Banner" className="banner-image" />
        <img src={decLogo} alt="Logo" className="logo-image" />
      </div>

      <div className="login-form-mobile">
        <h2>Login</h2>

        {error && <div className="error-message">{error}</div>}

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={loading}
        />

        <div className="password-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
          <span
            className="toggle-password"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide" : "Show"}
          </span>
        </div>

        {/* COMPANY ID SELECT */}
        <select
          value={companyId}
          onChange={(e) => setCompanyId(e.target.value)}
          disabled={loading || companiesLoading}
        >
          <option value="">
            {companiesLoading ? "Loading companies..." : "Select Company"}
          </option>
          {companies.map((c) => (
            <option key={c.CompanyId} value={c.CompanyId}>
              {c.CompanyName}
            </option>
          ))}
        </select>

        <button onClick={handleLogin} disabled={loading || companiesLoading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <div className="login-footer-mobile">DEC Labour Management</div>
      </div>
    </div>
  );
}
