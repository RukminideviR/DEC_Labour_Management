import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
import "./Login.css";

import decImage from "../assets/dec_image.png";
import decLogo from "../assets/dec_logo.png";

// ===== FIXED TOKEN =====
const FIXED_TOKEN =
  "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIzMTIzYTU5MC0xMDQyLTRjMzctODY2Mi00ODBjMGNlYTMwM2IiLCJ2YWxpZCI6IjEiLCJGb2N1cyBDZElkIjoiOTk4OTEzMzUyNSIsIkNvbXBhbnkgTmFtZSI6IkRFQyBJbmZyYSIsIkV4cGlyeSI6IjIzLTAzLTIwMjYiLCJleHAiOjE3NzQyMzYzNjAsImlzcyI6Imh0dHBzOi8vcmVqb3ljZWdyb3VwLmNvbSIsImF1ZCI6IlJlam95Y2UgVGVjaG5vbG9naWVzIn0.mkblrNhpBYkXRxh1ualbM-q09HexxRNbTHAaS7r1dsg";

// ===== STATIC COMPANY DATA =====
const companies = [
  { CompanyId: "36", CompanyName: "DEC Infrastructure & Projects India Pvt. Ltd -2025-26", CompanyCode: "010" },
  { CompanyId: "72", CompanyName: "DEC Infrastructure & Projects India Pvt. Ltd -2024-25", CompanyCode: "020" },
  { CompanyId: "108", CompanyName: "DEC Infrastructure & Projects India Pvt. Ltd -2023-24", CompanyCode: "030" },
  { CompanyId: "144", CompanyName: "DEC Infrastructure & Projects India Pvt. Ltd - 2022-23", CompanyCode: "040" },
  { CompanyId: "180", CompanyName: "DEC Infrastructure & Projects India Pvt. Ltd - 2021-22", CompanyCode: "050" },
  { CompanyId: "1368", CompanyName: "DEC INDUSTRIES PRIVATE LIMITED - 2024-25", CompanyCode: "120" },
  { CompanyId: "1404", CompanyName: "DEC INDUSTRIES PRIVATE LIMITED - 2023-24", CompanyCode: "130" },
  { CompanyId: "1440", CompanyName: "DEC INDUSTRIES PRIVATE LIMITED - 2022-23", CompanyCode: "140" },
  { CompanyId: "1476", CompanyName: "DEC INDUSTRIES PRIVATE LIMITED - 2021-22", CompanyCode: "150" },
  { CompanyId: "2628", CompanyName: "DEC Infrastructure Employees Gratuity Trust", CompanyCode: "210" },
  { CompanyId: "3924", CompanyName: "DEC INDUSTRIES Employees Gratuity Trust - 2021-23", CompanyCode: "310" },
  { CompanyId: "5220", CompanyName: "DEC Agro Products - 2023-25", CompanyCode: "410" },
  { CompanyId: "6516", CompanyName: "DEC Developers & Logistics LLP - 2021-26", CompanyCode: "510" },
  { CompanyId: "6552", CompanyName: "DEC Developers & Maintainance Block1", CompanyCode: "520" },
  { CompanyId: "6588", CompanyName: "DEC Developers & Maintainance Block2", CompanyCode: "530" },
  { CompanyId: "6624", CompanyName: "DEC Developers & Maintainance Block3", CompanyCode: "540" },
  { CompanyId: "6660", CompanyName: "Test DEC Infrastructure  -2025-26", CompanyCode: "550" },
  { CompanyId: "6696", CompanyName: "Test DEC Infrastructure 2024-25", CompanyCode: "560" },
  { CompanyId: "6732", CompanyName: "DEC INDUSTRIES PRIVATE LIMITED 2025-26", CompanyCode: "570" },
  { CompanyId: "6768", CompanyName: "Test DEC INDUSTRIES - 2024-25", CompanyCode: "580" },
  { CompanyId: "6804", CompanyName: "Test DEC Developers- 2021-25", CompanyCode: "590" },
  { CompanyId: "6804", CompanyName: "Test DEC Developers- 2021-25", CompanyCode: "591" },
  { CompanyId: "7812", CompanyName: "DEC Foundation", CompanyCode: "610" },
  { CompanyId: "8028", CompanyName: "Test DEC Infrastructure 3010 -2025-26", CompanyCode: "670" },
  { CompanyId: "8064", CompanyName: "Test DEC INDUSTRIES - 2024-25", CompanyCode: "680" },
  { CompanyId: "8100", CompanyName: "Test DEC INDUSTRIES 2025-26", CompanyCode: "690" },
  { CompanyId: "9108", CompanyName: "DECIP-HGIEL (JV)", CompanyCode: "710" }
];

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [companyId, setCompanyId] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  // Save fixed token to localStorage immediately
  localStorage.setItem("token", FIXED_TOKEN);

  const handleLogin = () => {
    if (!username || !password || !companyId) {
      alert("Please fill all fields");
      return;
    }

    if (username !== "su" || password !== "su") {
      alert("Invalid credentials");
      return;
    }

    // simulate API response
    const sessionId = "23092025185036133721"; // example
    const employeeId = 0;

    const userData = {
      username,
      employeeId,
      companyId,
      sessionId,
    };

    login(userData);
    navigate("/dashboard");
  };

  return (
    <div className="login-page-mobile">
      <div className="banner">
        <img src={decImage} alt="Banner" className="banner-image" />
        <img src={decLogo} alt="Logo" className="logo-image" />
      </div>

      <div className="login-form-mobile">
        <h2>Login</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <div className="password-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
        >
          <option value="">Select Company</option>
          {companies.map((c) => (
            <option key={c.CompanyId} value={c.CompanyId}>
              {c.CompanyName}
            </option>
          ))}
        </select>

        <button onClick={handleLogin}>Login</button>

        <div className="login-footer-mobile">DEC Labour Management</div>
      </div>
    </div>
  );
}
