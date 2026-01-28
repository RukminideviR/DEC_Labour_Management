# 📋 DEC LABOUR MANAGEMENT SYSTEM - COMPLETE APPLICATION DOCUMENTATION

**Version:** 1.0.0  
**Last Updated:** January 24, 2026  
**Project Location:** `DEC_Labour_Management_App/focus9-login`

---

## 📑 TABLE OF CONTENTS

1. [Application Overview](#application-overview)
2. [Project Structure](#project-structure)
3. [Core Technologies & Dependencies](#core-technologies--dependencies)
4. [File-by-File Detailed Breakdown](#file-by-file-detailed-breakdown)
5. [API Integration Guide](#api-integration-guide)
6. [Data Flow & Architecture](#data-flow--architecture)
7. [CSS Styling Guide](#css-styling-guide)
8. [How Each Page/Component Works](#how-each-pagecomponent-works)
9. [Key Concepts & Workflows](#key-concepts--workflows)
10. [State Management](#state-management)
11. [Authentication Flow](#authentication-flow)
12. [Labour Entry Workflow](#labour-entry-workflow)

---

## APPLICATION OVERVIEW

### **Purpose**
The DEC Labour Management System is a React-based web application designed to manage labour timesheet entries, work allocations, and quality checks in a construction/real estate project environment. It integrates with the **Focus9 ERP system** to manage labour-related transactions.

### **Core Features**
- ✅ User Authentication (Login)
- ✅ Dashboard with Calendar View
- ✅ Labour Entry with 5-Tab Workflow (Time In → Work Allocation → Completion → Time Out → QC)
- ✅ Labour List View
- ✅ GPS & Photo Capture
- ✅ Real-time Data Persistence (Draft Management)
- ✅ Integration with Focus9 ERP API

### **User Journey**
```
Login → Dashboard → Labour Entry (New or Edit) → Fill 5 Tabs → Save to Focus9 ERP → Confirmation
```

---

## PROJECT STRUCTURE

```
focus9-login/
├── public/
│   ├── index.html              # Main HTML entry point
│   ├── manifest.json           # PWA configuration
│   ├── robots.txt              # SEO configuration
│   └── favicon.ico
│
├── src/
│   ├── App.js                  # Main routing component
│   ├── App.css                 # Global app styles
│   ├── index.js                # React entry point
│   ├── index.css               # Global CSS
│   ├── setupProxy.js           # API proxy configuration
│   ├── setupTests.js           # Testing configuration
│   ├── reportWebVitals.js      # Performance monitoring
│   │
│   ├── auth/                   # Authentication module
│   │   └── AuthContext.js      # Auth state & context provider
│   │
│   ├── api/                    # API integration
│   │   ├── api.js              # Axios base configuration
│   │   └── focusApi.js         # Focus9 API endpoints
│   │
│   ├── pages/                  # Page components
│   │   ├── Login.jsx           # Login page
│   │   ├── Login.css           # Login styling
│   │   ├── Dashboard.jsx       # Dashboard page
│   │   ├── Dashboard.css       # Dashboard styling
│   │   ├── LabourEntry.jsx     # Labour entry main component
│   │   ├── LabourEntry.css     # Labour entry styling
│   │   └── LabourList.jsx      # Labour list page
│   │
│   ├── components/             # Reusable components
│   │   ├── CalendarView.jsx    # Calendar component
│   │   ├── CalendarView.css    # Calendar styling
│   │   ├── CameraGPS.jsx       # Camera & GPS capture
│   │   └── labourTabs/         # Labour entry tabs
│   │       ├── TimeInTab.jsx           # Tab 1: Entry start
│   │       ├── WorkAllocationTab.jsx   # Tab 2: Allocation
│   │       ├── CompletionTab.jsx       # Tab 3: Completion
│   │       ├── TimeOutTab.jsx          # Tab 4: Exit
│   │       └── QCTab.jsx               # Tab 5: Quality Check
│   │
│   ├── builders/               # Payload builders
│   │   └── buildCreateDoc.js   # ERP document builder
│   │
│   ├── data/                   # Mock/dummy data
│   │   ├── dummyMasters.js     # Master data (sites, skills, etc.)
│   │   └── dummyLabourList.js  # Sample labour entries
│   │
│   ├── store/                  # State management
│   │   └── labourDraftStore.js # Local storage draft management
│   │
│   ├── utils/                  # Utility functions
│   │   ├── focusDate.js        # Date conversion utilities
│   │   └── geoUtil.js          # Geolocation utilities
│   │
│   ├── hooks/                  # Custom React hooks
│   │   └── useGPS.js           # GPS capture hook
│   │
│   ├── styles/                 # Global styles
│   │   └── theme.css           # Color theme & CSS variables
│   │
│   └── assets/                 # Images & static files
│       ├── dec_image.png       # Banner image
│       ├── Logo.jpg.jpeg       # Company logo
│       └── shutdown.png        # Logout icon
│
├── package.json                # Dependencies & scripts
├── package-lock.json           # Dependency lock file
└── .gitignore                  # Git ignore rules
```

---

## CORE TECHNOLOGIES & DEPENDENCIES

### **Package.json Analysis**

```json
{
  "name": "focus9-login",
  "version": "0.1.0",
  "proxy": "http://103.252.144.86",  // Focus9 API proxy
  "dependencies": {
    "react": "^19.2.3",                 // UI framework
    "react-dom": "^19.2.3",             // DOM rendering
    "react-router-dom": "^7.11.0",      // Routing
    "axios": "^1.13.2",                 // HTTP client
    "bootstrap": "^5.3.8"               // UI components
  },
  "scripts": {
    "start": "react-scripts start",     // Dev server
    "build": "react-scripts build",     // Production build
    "test": "react-scripts test"        // Run tests
  }
}
```

### **Key Libraries**

| Library | Version | Purpose |
|---------|---------|---------|
| React | 19.2.3 | Core UI framework |
| React Router | 7.11.0 | Client-side routing |
| Axios | 1.13.2 | HTTP requests |
| Bootstrap | 5.3.8 | CSS framework & components |
| React Scripts | 5.0.1 | Build tooling |

### **Browser APIs Used**
- **Geolocation API** - GPS capture
- **MediaDevices API** - Camera access
- **LocalStorage API** - Client-side data persistence
- **Canvas API** - Photo capture

---

## FILE-BY-FILE DETAILED BREAKDOWN

### 1️⃣ **App.js** (Main Router)

**Purpose:** Root component that manages all routing and authentication

**What It Does:**
- Sets up React Router with routes for Login, Dashboard, LabourEntry, and LabourList
- Implements `ProtectedRoute` component to restrict access to authenticated users
- Wraps entire app with `AuthProvider` for global auth state

**Key Concepts:**
- **Protected Routes:** Routes that check if user is logged in
- **Navigation:** Routes allow navigation without page reload
- **Context Provider:** AuthProvider wraps all routes to provide auth context

**Code Breakdown:**

```javascript
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import LabourEntry from "./pages/LabourEntry";
import { AuthProvider, AuthContext } from "./auth/AuthContext";
import { useContext } from "react";

// This component checks if user exists
function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/" />;  // Redirect if no user
}

function App() {
  return (
    <AuthProvider>  {/* Makes auth available globally */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          
          {/* Only accessible if logged in */}
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/labour/new" element={<ProtectedRoute><LabourEntry /></ProtectedRoute>} />
          <Route path="/labour/list" element={<ProtectedRoute><LabourList /></ProtectedRoute>} />
          
          {/* Catch-all: redirect unknown routes to login */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
```

**What to Tell Someone:**
> "App.js is the brain of the router. It decides which page to show based on the URL. If the URL is `/dashboard`, it shows the Dashboard. If the user isn't logged in, it kicks them back to the login page. All this is wrapped in AuthProvider, which makes login information available everywhere in the app."

---

### 2️⃣ **index.js** (React Entry Point)

**Purpose:** Initializes React application

**What It Does:**
- Renders the main `App` component into the DOM
- Loads Bootstrap CSS for styling
- Loads global theme CSS

**Code:**

```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';  // Bootstrap styles
import "./styles/theme.css";  // Custom theme

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

**What to Tell Someone:**
> "index.js is where React starts. It finds an element with id='root' in index.html and renders the entire App there. We also load Bootstrap here for pre-built UI components."

---

### 3️⃣ **auth/AuthContext.js** (Authentication State Management)

**Purpose:** Global authentication state using React Context API

**What It Does:**
- Creates `AuthContext` - a global state container
- Provides `login()` function to set user data
- Provides `logout()` function to clear user data
- Stores user in localStorage for persistence

**Concepts:**
- **Context API:** Global state without prop drilling
- **LocalStorage:** Persists data across page refreshes
- **Provider Pattern:** Makes data available to entire app

**Code:**

```javascript
import { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Read stored user from localStorage or set null
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  const login = (userData) => {
    setUser(userData);  // Update state
    localStorage.setItem("user", JSON.stringify(userData));  // Persist
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}  {/* All components inside can access auth data */}
    </AuthContext.Provider>
  );
}
```

**What to Tell Someone:**
> "AuthContext is like a global mailbox. When someone logs in, we put their info in this mailbox. Every component in the app can check this mailbox to see 'who is logged in?'. If they log out, we clear the mailbox. We also save to localStorage so if they refresh the page, they stay logged in."

---

### 4️⃣ **api/api.js** (Axios Configuration)

**Purpose:** Base HTTP client configuration

**What It Does:**
- Creates Axios instance with default baseURL
- Sets default headers (Content-Type, Accept, Authorization token)
- All API calls go through this instance

**Why It Matters:**
- Centralized configuration
- Same headers for all requests
- Easy to change baseURL in one place

**Code:**

```javascript
import axios from "axios";

const FIXED_TOKEN = "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...";

const api = axios.create({
  baseURL: "/Focus9Api/v2",  // All requests prepend this
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: FIXED_TOKEN,
  },
});

export default api;
```

**What to Tell Someone:**
> "api.js is like a pre-configured phone. When we make API calls, instead of typing the full URL and headers every time, we just use this phone. It automatically adds the base URL, headers, and token to every call. If we need to change servers, we change it here and all calls update automatically."

---

### 5️⃣ **api/focusApi.js** (Focus9 API Functions)

**Purpose:** All Focus9 ERP API endpoints

**What It Does:**
- `getCompanies()` - Fetch list of companies
- `loginUser()` - Authenticate user
- `getNextDocNo()` - Get next Labour document number
- `loadLabourDoc()` - Load existing labour transaction
- `postLabourDocument()` - Create/Update labour transaction

**Key Endpoints:**

```javascript
// 1. Get Companies
export const getCompanies = async () => {
  const response = await api.get('/Company/GetList');
  return response.data.data || [];
};

// 2. Login
export const loginUser = async (username, password, companyId) => {
  const response = await api.post('/Login/Login', {
    username,
    Password: password,
    CompanyId: companyId
  });
  return response.data.data[0];  // Returns token, sessionId, etc.
};

// 3. Get Next Document Number
export const getNextDocNo = async (sessionId) => {
  const endpoint = `/api/Focus9Api/v1/Screens/GetNextNumber?ScreenName=${encodeURIComponent("Labour Weekly-Monthly TimeSheet")}&sessionId=${sessionId}`;
  const response = await axios.get(endpoint, {
    headers: { "Content-Type": "application/json", Accept: "application/json" }
  });
  return response.data.data || response.data;
};

// 4. Load Existing Document
export const loadLabourDoc = async (docNo, sessionId) => {
  const endpoint = `/api/Focus9Api/v1/Screens/LoadDoc?ScreenName=${encodeURIComponent("Labour Weekly-Monthly TimeSheet")}&DocumentNo=${encodeURIComponent(docNo)}&sessionId=${sessionId}`;
  const response = await axios.get(endpoint, {
    headers: { "Content-Type": "application/json", Accept: "application/json" }
  });
  return response.data.data || response.data;
};

// 5. Post Labour Document (Create/Update)
export const postLabourDocument = async (payload, sessionId) => {
  const endpoint = `/api/Focus9Api/v1/Screens/PostDoc?ScreenName=${encodeURIComponent("Labour Weekly-Monthly TimeSheet")}&sessionId=${sessionId}`;
  const response = await axios.post(endpoint, payload, {
    headers: { "Content-Type": "application/json", Accept: "application/json", Authorization: FIXED_TOKEN }
  });
  return response.data;
};
```

**What to Tell Someone:**
> "focusApi.js contains all the doors to the Focus9 ERP system. When we need to login, get company list, or save labour data, we use functions from here. Each function calls a specific API endpoint and returns the response."

---

### 6️⃣ **pages/Login.jsx** (Login Page)

**Purpose:** User authentication interface

**What It Does:**
1. Renders login form with Username, Password, Company dropdown
2. Fetches companies from Focus9 on component load
3. Validates input and calls `loginUser()` API
4. Stores token, sessionId, and user data in localStorage
5. Updates AuthContext with user data
6. Redirects to Dashboard on successful login

**State Management:**

```javascript
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const [companyId, setCompanyId] = useState("");
const [companies, setCompanies] = useState([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState("");
```

**Key Flow:**

```
User fills form → Click Login → Validate fields → Call loginUser() API
↓
Success: Store token + sessionId + user data → Update AuthContext → Navigate to Dashboard
↓
Error: Show error message
```

**Data Stored in LocalStorage:**

```javascript
localStorage.setItem("token", loginResponse.Token);
localStorage.setItem("sessionId", loginResponse.fSessionId);
localStorage.setItem("employeeId", loginResponse.EmployeeId);
localStorage.setItem("companyId", companyId);
localStorage.setItem("user", JSON.stringify(userData));
```

**What to Tell Someone:**
> "Login.jsx is the entry point to the app. User enters username, password, and selects a company. We validate these, call the login API, and if successful, we save the session info (token, sessionId) to localStorage. This keeps the user logged in even after a page refresh. Then we move them to the Dashboard."

---

### 7️⃣ **pages/Login.css** (Login Styling)

**Purpose:** Mobile-first styling for login page

**Key Styles:**

```css
/* Mobile responsive layout */
.login-page-mobile {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Arial', sans-serif;
  width: 100%;
  min-height: 100vh;
  background: #f5f5f5;
}

/* Banner with logo */
.banner {
  position: relative;
  width: 100%;
  max-width: 500px;
  height: 200px;
}

.banner-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
}

/* Logo positioned below banner */
.logo-image {
  position: absolute;
  bottom: -30px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 2px solid #fff;
}

/* Form container */
.login-form-mobile {
  margin-top: 50px;
  width: 90%;
  max-width: 400px;
  background: #fff;
  padding: 30px 20px 40px 20px;
  border-radius: 15px;
  box-shadow: 0px 0px 15px rgba(0,0,0,0.15);
}

/* Input fields */
.login-form-mobile input,
.login-form-mobile select {
  width: 100%;
  padding: 12px 15px;
  margin-bottom: 20px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 1rem;
}

/* Button */
.login-form-mobile button {
  width: 100%;
  padding: 12px;
  background: #0d47a1;
  color: #fff;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s;
}

.login-form-mobile button:hover:not(:disabled) {
  background: #094a8f;
}

/* Password toggle */
.password-wrapper {
  position: relative;
  width: 100%;
}

.password-wrapper input {
  width: 100%;
  padding-right: 40px;  /* Space for eye icon */
}

.toggle-password {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  font-size: 12px;
}
```

**What to Tell Someone:**
> "Login.css makes the login page look good and work on mobile. It positions the DEC logo and banner at the top, centers the form, styles the input fields, and makes the 'Show/Hide' password button. The layout is flexible so it works on any screen size."

---

### 8️⃣ **pages/Dashboard.jsx** (Main Dashboard)

**Purpose:** Central hub after login - sidebar navigation and main content area

**What It Does:**
1. Displays sidebar with navigation (Calendar, Labour Entry, Settings)
2. Toggles sidebar collapse/expand
3. Shows user info and logout button
4. Dark/Light mode toggle
5. Displays content based on active tab (Calendar view)

**State:**

```javascript
const [sidebarOpen, setSidebarOpen] = useState(true);
const [darkMode, setDarkMode] = useState(false);
const [activeTab, setActiveTab] = useState("calendar");
```

**Navigation Buttons:**

```
📅 Calendar     (Shows CalendarView component)
🧑‍🏭 Labour Entry  (Navigates to /labour/new)
⚙️ Settings      (Shows settings panel)
☀️ Light/Dark   (Toggles theme)
Logout          (Calls logout API and clears auth)
```

**Logout Flow:**

```javascript
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
    logout();  // Clear auth context
    navigate("/");  // Go to login
  }
};
```

**What to Tell Someone:**
> "Dashboard.jsx is the main hub after login. It has a collapsible sidebar on the left with navigation options. Users can click 'Labour Entry' to go to the labour entry form, click 'Calendar' to see a calendar view, or click the logout button. It also has a dark/light mode toggle. The sidebar shows the logged-in user's name and company."

---

### 9️⃣ **pages/Dashboard.css** (Dashboard Styling)

**Purpose:** Advanced styling for sidebar, navigation, and themes

**Key Sections:**

```css
/* Main layout - flex with sidebar and content */
.dashboard-wrapper {
  display: flex;
  height: 100vh;
  font-family: "Segoe UI", sans-serif;
}

/* Light/Dark themes */
.dashboard-wrapper.dark {
  background: #0f152a;
  color: #e5e7eb;
}

.dashboard-wrapper.light {
  background: #f4f6f8;
  color: #1f2937;
}

/* Sidebar */
.sidebar {
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease;
  width: 140px;  /* or 90px when collapsed */
}

.light .sidebar {
  background: #3663f8;  /* Blue */
}

.dark .sidebar {
  background: #020617;  /* Dark blue */
}

/* Sidebar header with logo */
.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 16px;
  margin-top: 15px;
}

.company-logo {
  width: 50px;
  height: 60px;
  border-radius: 10px;
}

.company-name {
  font-weight: 700;
  font-size: 14px;
  color: #f4f6f8;
}

/* Navigation buttons */
.nav-item {
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  border: none;
  background: transparent;
  color: white;
  cursor: pointer;
  text-align: left;
  font-size: 14px;
}

.nav-item.active {
  background: rgba(255, 255, 255, 0.15);  /* Highlight active tab */
}

/* User info section */
.user-info {
  padding: 12px;
  display: flex;
  align-items: center;
  gap: 10px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  margin-top: auto;  /* Push to bottom */
}

.user-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #ffffff;
  color: #3663f8;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
}

/* Footer section */
.sidebar-footer {
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
}

/* Main content area */
.main-content {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}
```

**What to Tell Someone:**
> "Dashboard.css creates the sidebar layout with smooth animations. The sidebar has a blue background (in light mode), shows the company logo and user name, and has navigation buttons. The main content area takes up the remaining space. The CSS uses flexbox to organize everything vertically, and the sidebar can collapse or expand smoothly."

---

### 🔟 **pages/LabourEntry.jsx** (Main Labour Entry Component)

**Purpose:** Orchestrates the 5-tab labour entry workflow

**What It Does:**
1. Manages document number state (auto-generated on load)
2. Fetches next DocNo from Focus9 on component mount
3. Allows user to change DocNo to edit existing transaction
4. Manages mode (NEW vs EDIT)
5. Displays 5 tabs based on status progression
6. Each tab fills a specific part of the labour transaction

**State Variables:**

```javascript
const [activeTab, setActiveTab] = useState("timein");
const [status, setStatus] = useState("NEW");
const [mode, setMode] = useState("NEW");  // NEW or EDIT
const [docNo, setDocNo] = useState("");  // Auto-generated
const [loading, setLoading] = useState(true);
const [loadedData, setLoadedData] = useState(null);  // Loaded transaction
const [isDocNoChanged, setIsDocNoChanged] = useState(false);
const [originalDocNo, setOriginalDocNo] = useState("");
```

**Key Flows:**

**1. Screen Initialization (useEffect):**
```
Component mounts
↓
Get sessionId from localStorage
↓
Call getNextDocNo() API
↓
Display next DocNo (e.g., "LA/AAY/5")
↓
Set mode = "NEW"
↓
User can now fill data
```

**2. Document No Change (handleDocNoChange + handleDocNoBlur):**
```
User edits DocNo field
↓
handleDocNoChange() updates state
↓
User leaves field (onBlur event)
↓
handleDocNoBlur() calls loadLabourDoc() API
↓
If document exists: Load data → Set mode = "EDIT" → Yellow highlight
↓
If not found: Stay in NEW mode → Show error message
```

**3. New Button (handleNew):**
```
User clicks "New" button
↓
Confirm dialog appears
↓
Fetch next DocNo from API
↓
Reset all tabs to empty
↓
Set mode = "NEW"
↓
User ready to fill new entry
```

**4. Save Button (handleSave):**
```
User clicks "Save"
↓
If mode = "NEW": Create new transaction
↓
If mode = "EDIT": Update existing transaction
↓
Call postLabourDocument() API
↓
Send all tab data as one payload
```

**Tab Navigation Logic:**

```
Time In (always enabled)
    ↓ (after filling, click "Save & Continue")
Work Allocation (enabled after TimeIn saved)
    ↓
Completion (enabled after allocation)
    ↓
Time Out (enabled after completion)
    ↓
QC (enabled after time out)
    ↓ (final "Save" creates/updates transaction)
Success message
```

**What to Tell Someone:**
> "LabourEntry.jsx is the command center for labour entry. When it loads, it fetches the next document number from Focus9 and shows it in the DocNo field. The user can keep that number and create a new entry, or they can change it to edit an existing entry. Then they fill 5 tabs in sequence - each tab captures a different part of the labour process (time in, what work was done, how much was completed, time out, and quality check). When all tabs are filled, clicking Save uploads everything to Focus9 ERP."

---

### 1️⃣1️⃣ **pages/LabourEntry.css** (Labour Entry Styling)

**Purpose:** Multi-tab interface with horizontal tabs and content area

**Key Layouts:**

```css
/* Main container */
.labour-container {
  background: #ffffff;
  border-radius: 8px;
  padding: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  height: 100%;
  display: flex;
  flex-direction: column;
}

/* Header section - document number and action buttons */
.labour-header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-bottom: 2px solid #e5e7eb;
  padding-bottom: 10px;
  margin-bottom: 12px;
  gap: 20px;
  flex-wrap: nowrap;
}

.doc-number {
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex-shrink: 0;
}

.doc-number label {
  font-size: 11px;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
}

.doc-number input {
  width: 160px;
  padding: 6px 10px;
  font-size: 13px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  background: #f9fafb;
  color: #1f2937;
}

.doc-number input[style*="background: #fff3cd"] {
  background-color: #fff3cd !important;  /* Yellow for EDIT mode */
  border-color: #ff9800 !important;
}

/* Action buttons */
.header-actions {
  display: flex;
  gap: 6px;
  align-items: center;
  flex-shrink: 0;
  margin-left: auto;
}

.header-actions button {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: #6b7280;
  padding: 5px;
  transition: all 0.3s ease;
}

.header-actions button:hover {
  color: #0d6efd;
  transform: scale(1.1);
}

.header-actions button:disabled {
  color: #d1d5db;
  cursor: not-allowed;
  opacity: 0.5;
}

/* Body layout */
.labour-body {
  display: flex;
  flex-direction: column;
  gap: 0;
  flex: 1;
  width: 100%;
  overflow: hidden;
}

/* Horizontal tabs */
.labour-tabs {
  display: flex;
  flex-direction: row;
  width: 100%;
  border-bottom: 2px solid #e5e7eb;
  padding: 0;
  gap: 0;
  overflow: hidden;
  background: #f9fafb;
}

.labour-tabs button {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  padding: 12px 10px;
  margin: 0;
  border: none;
  background: #f0f1f3;
  border-bottom: 3px solid #d1d5db;
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
  color: #374151;
  white-space: nowrap;
  text-align: center;
}

.labour-tabs button.active {
  background: #0d6efd;
  color: #ffffff;
  border-bottom-color: #0d6efd;
  font-weight: 600;
}

.labour-tabs button:disabled {
  background: #e5e7eb;
  color: #9ca3af;
  border-bottom-color: #d1d5db;
  cursor: not-allowed;
  opacity: 0.65;
}

/* Content area */
.labour-content {
  flex: 1;
  padding: 16px;
  overflow-y: auto;
  overflow-x: hidden;
  background: #ffffff;
}
```

**What to Tell Someone:**
> "LabourEntry.css styles the labour entry form. The top part has a header with the Document Number field and action buttons (New, Save, Refresh, Close). Below that are 5 horizontal tabs - when you click a tab, it becomes blue. The content area below the tabs shows the form for that tab. As you progress through tabs, disabled tabs become grey, and you can only click on tabs that are enabled by the workflow."

---

### 1️⃣2️⃣ **components/labourTabs/TimeInTab.jsx** (Tab 1: Entry Start)

**Purpose:** Capture labour entry start information

**Fields Captured:**
1. **Date** - Current date (auto-filled, disabled)
2. **Site** * - Select from site master (required)
3. **Site Engineer** * - Select from engineer master (required)
4. **Contract Type** * - Daily Rate or Rate Contract (required)
5. **Contractor** * - Select from contractor master (required)
6. **Labour** * - Select from labour master (required)
7. **Skill** * - Select from skill master (required)
8. **Labour Allotment No** - Reference number (optional)
9. **Photo** * - Capture entry photo with camera (required)
10. **GPS** * - Auto-capture geolocation (required)
11. **In Time** - Auto-set to current time (hidden)

**State:**

```javascript
const [formData, setFormData] = useState({
  date: new Date().toISOString().split("T")[0],
  site: null,
  engineer: null,
  contractType: null,
  contractor: null,
  labour: null,
  skill: null,
  labourAllotmentNo: "",
  photo: null,
  gps: null,
  inTime: new Date().toISOString()
});
```

**Validation:**
- All marked with * are mandatory
- Photo and GPS must be captured
- Cannot proceed without photo

**On Submit:**
- Save form data to draft store
- Call `onSuccess()` callback
- Move to next tab

**What to Tell Someone:**
> "TimeInTab is the first step. It records when a labour worker arrives at the site. We capture their site location, who the engineer is, what kind of contract they have, and take a photo of them with GPS location. This data helps track who worked where and when. All the mandatory fields are marked with *."

---

### 1️⃣3️⃣ **components/labourTabs/WorkAllocationTab.jsx** (Tab 2: Work Details)

**Purpose:** Define what work the labour will do

**Fields Captured:**
1. **Block** * - Project block/building (required)
2. **Grid** - Grid reference (optional)
3. **Location / Floor** * - Which floor (required)
4. **Work Code** * - Type of work (required)
5. **Target Quantity** * - How much work to do (required)
6. **Rate** - Cost per unit (auto-filled from master, disabled)
7. **Amount** - Total = Rate × Quantity (auto-calculated, disabled)

**Logic:**

```javascript
// When work code is selected OR quantity changes:
// 1. Find the work code in master
// 2. Get rate from work code master
// 3. Calculate amount = rate × targetQty
// 4. Auto-populate rate and amount fields

const handleChange = (name, value) => {
  let updated = { ...prev, [name]: value };
  
  if (name === "workCode" || name === "targetQty") {
    const wc = workCodeMaster.find(w => w.WorkCode === updated.workCode?.WorkCode);
    const rate = wc ? wc.Rate : 0;
    updated.rate = rate;
    updated.amount = rate * Number(updated.targetQty || 0);
  }
  
  return updated;
};
```

**Master Data Example:**

```javascript
const workCodeMaster = [
  { WorkCode: "BRK-001", WorkName: "Brick Work 230mm", Rate: 550 },
  { WorkCode: "PL-002", WorkName: "Internal Plaster 12mm", Rate: 120 }
];

const blockMaster = [
  { Block__Id: 1, Block__Name: "Tower A" },
  { Block__Id: 2, Block__Name: "Tower B" }
];

const floorMaster = [
  { Floor__Id: 1, Floor__Name: "Ground Floor" },
  { Floor__Id: 2, Floor__Name: "First Floor" }
];
```

**Validation:**
- All * fields mandatory
- Target quantity must be > 0

**On Submit:**
- Validate fields
- Save to draft store
- Move to Completion tab

**What to Tell Someone:**
> "WorkAllocationTab defines the work task. You select which block, which floor, and what type of work (like brick laying or plastering). You enter a target quantity - how many units should be done. The system automatically looks up the rate from the work master and calculates the total amount. This tells the system 'Labour X will do Work Y in Location Z for Amount A'."

---

### 1️⃣4️⃣ **components/labourTabs/CompletionTab.jsx** (Tab 3: Work Completion)

**Purpose:** Record how much work was actually completed

**Fields Captured:**
1. **Completed Quantity** * - Actual qty finished (required)
2. **Photos** * - At least 1 photo of completed work (required)
3. **GPS** - Auto-captured (required)
4. **Remarks** - Reason if partial completion (conditional)

**Validation Logic:**

```javascript
const handleSubmit = () => {
  const completedQty = Number(formData.completedQty);
  
  // Must be > 0
  if (!completedQty || completedQty <= 0) {
    setError("Completed Quantity must be greater than zero");
    return;
  }
  
  // Cannot exceed target
  if (completedQty > targetQty) {
    setError(`Completed Quantity cannot exceed Target Qty (${targetQty})`);
    return;
  }
  
  // At least one photo required
  if (formData.photos.length < 1) {
    setError("At least one work completion photo is required");
    return;
  }
  
  // If partial completion, remarks mandatory
  if (completedQty < targetQty && !formData.remarks.trim()) {
    setError("Remarks are mandatory for partial completion");
    return;
  }
};
```

**Scenarios:**

```
Scenario 1: Full Completion
  Target Qty = 100
  Completed Qty = 100
  Photos = required
  Remarks = optional
  ✅ Submit

Scenario 2: Partial Completion
  Target Qty = 100
  Completed Qty = 75
  Photos = required
  Remarks = required (why not 100?)
  ✅ Submit

Scenario 3: Invalid
  Completed Qty = 0 or negative
  ❌ Rejected
  
Scenario 4: Invalid
  Completed Qty = 150 (exceeds target)
  ❌ Rejected
```

**What to Tell Someone:**
> "CompletionTab records actual work done. If the labour was supposed to do 100 units, we record how many they actually completed (might be 100, might be 75 if some was left for next day). We also take photos proving the work was done. If they didn't complete the full amount, we ask them why (remarks). This prevents fraud and tracks productivity."

---

### 1️⃣5️⃣ **components/labourTabs/TimeOutTab.jsx** (Tab 4: Exit Time)

**Purpose:** Record labour departure from site

**Fields Captured:**
1. **Out Time** - Departure time (auto-set to current, disabled)
2. **Photo** * - Exit photo (required)
3. **GPS** * - Auto-captured (required)
4. **Site Engineer Confirmation** * - Engineer approval (required)

**Engineer Dropdown:**

```javascript
const engineers = [
  { id: 1, name: "Engineer Anil" },
  { id: 2, name: "Engineer Sunil" },
  { id: 3, name: "Engineer Rakesh" },
];
```

**Validation:**

```javascript
if (!formData.photo) {
  setError("Photo is mandatory");
  return;
}

if (!formData.gps) {
  setError("GPS not captured");
  return;
}

if (!formData.engineerId) {
  setError("Site Engineer confirmation is required");
  return;
}
```

**What to Tell Someone:**
> "TimeOutTab records when the labour leaves the site. We capture an exit photo and GPS location to confirm they actually left. We also require the Site Engineer to confirm the departure. This creates an audit trail - when did they come (TimeInTab), what did they do (WorkAllocationTab + CompletionTab), and when did they leave (TimeOutTab)."

---

### 1️⃣6️⃣ **components/labourTabs/QCTab.jsx** (Tab 5: Quality Check)

**Purpose:** Final quality verification before approving transaction

**Fields Captured:**
1. **QC Photos** * - Photos of final work (required, up to 2)
2. **QC Executive** * - Who approved it (required)
3. **QC Remarks** - Any issues or notes (optional)
4. **Approved Quantity** - Final approved amount (auto-calculated)
5. **QC Time** - When QC was done (auto-set)

**Master Data:**

```javascript
const qcExecutives = [
  { QC__Id: 101, QC__Name: "Site Engineer - Anil" },
  { QC__Id: 102, QC__Name: "Site Engineer - Sunil" },
  { QC__Id: 103, QC__Name: "QC Engineer - Ramesh" },
];
```

**Key Logic - Build Final Payload:**

```javascript
const handleSubmit = async () => {
  // Validation
  if (!formData.qcPhotos.length) {
    setError("At least one QC photo is mandatory");
    return;
  }
  
  if (!formData.qcExecutiveId) {
    setError("QC Executive selection is mandatory");
    return;
  }
  
  // Save QC data to draft
  saveDraft({ qc: formData });
  
  // Get entire draft
  const draft = getDraft();
  
  // Build final ERP payload from all tabs
  const finalPayload = buildCreateDoc(draft);
  
  // Post to Focus9 ERP
  const apiResponse = await postLabourDocument(finalPayload, sessionId);
  
  if (apiResponse.result === 1) {
    alert("Labour timesheet submitted successfully!");
    clearDraft();  // Clear draft after successful save
    navigate("/dashboard");
  }
};
```

**What to Tell Someone:**
> "QCTab is the final gate. A QC executive takes photos of the completed work and approves it. This is quality control - making sure the work is actually done and done well. Once approved, the system builds a complete document from all 5 tabs (entry time, work details, completion qty, exit time, QC approval) and sends it to Focus9 ERP. The transaction is then complete and saved in the main system."

---

### 1️⃣7️⃣ **components/CameraGPS.jsx** (Camera & GPS Capture)

**Purpose:** Capture photos and geolocation data

**What It Does:**
1. Access device camera (front or back)
2. Capture photo as base64
3. Get GPS coordinates
4. Return both to parent component

**GPS Implementation:**

```javascript
useEffect(() => {
  if (!navigator.geolocation) {
    setError("Geolocation not supported");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (pos) =>
      setGps({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      }),
    () => setError("GPS permission required"),
    {
      enableHighAccuracy: false,  // Fast GPS (5-meter accuracy)
      timeout: 5000,               // 5 second timeout
      maximumAge: 300000,          // Use cache if available
    }
  );
}, []);
```

**Camera Implementation:**

```javascript
const startCamera = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode }  // "environment" = back, "user" = front
    });
    
    videoRef.current.srcObject = stream;
    setCameraOn(true);
  } catch (err) {
    setError("Camera permission denied");
  }
};

const capturePhoto = () => {
  const context = canvasRef.current.getContext("2d");
  context.drawImage(videoRef.current, 0, 0);
  const base64 = canvasRef.current.toDataURL("image/jpeg");
  setPhotos([...photos, base64]);
};
```

**Props:**
- `maxPhotos` - Maximum photos allowed (e.g., 1 or 2)
- `onCapture` - Callback with `{ photos, gps }`

**What to Tell Someone:**
> "CameraGPS.jsx is a utility component that handles camera and GPS. When mounted, it automatically tries to get GPS location. The user can click a button to activate the camera, take a photo, and the photo gets converted to base64 format. When done, it sends both the photo(s) and GPS coordinates back to the parent component. This is used in TimeInTab, CompletionTab, TimeOutTab, and QCTab."

---

### 1️⃣8️⃣ **components/CalendarView.jsx** (Calendar Display)

**Purpose:** Show labour entries on a calendar grid

**What It Does:**
1. Display current month calendar
2. Show task summary on each day
3. Allow month navigation
4. Show task details for selected day

**Calendar Data Example:**

```javascript
const tasksData = {
  1: [
    { id: 1, type: "TimeIn", status: "completed", name: "Labour 1", docNo: "DOC-2026-000001" },
    { id: 2, type: "WorkAllocation", status: "pending", name: "Labour 2", docNo: "DOC-2026-000002" },
  ],
  5: [
    { id: 3, type: "Completion", status: "completed", name: "Labour 3", docNo: "DOC-2026-000003" }
  ],
  // ... more days
};
```

**Task Types & Colors:**

```javascript
const getTaskColor = (type) => {
  return {
    TimeIn: "#10b981",        // Green
    WorkAllocation: "#3b82f6", // Blue
    Completion: "#06b6d4",     // Cyan
    TimeOut: "#f59e0b",        // Orange
    QC: "#8b5cf6",             // Purple
  }[type] || "#6b7280";
};
```

**Features:**
- Previous/Next month buttons
- Click date to see tasks for that day
- Shows task status (completed/pending)
- Color-coded by task type

**What to Tell Someone:**
> "CalendarView.jsx displays a calendar showing all labour work entries. Each day can have multiple entries. When you click a day, it shows all the labour tasks for that day - their status, type (TimeIn, Allocation, etc.), and document number. The tasks are color-coded: Green = Time In, Blue = Allocation, Cyan = Completion, Orange = Time Out, Purple = QC."

---

### 1️⃣9️⃣ **data/dummyMasters.js** (Master Data)

**Purpose:** Provide dropdown options (will be replaced with API calls)

**Master Data Included:**

```javascript
const dummyMasters = {
  // Sites where work happens
  sites: [
    { Site__Id: 454, Site__Name: "Adarsh Awash Yojana", Site__Code: "AAY-01" },
    { Site__Id: 455, Site__Name: "Green City", Site__Code: "GC-01" },
  ],
  
  // Site engineers overseeing work
  engineers: [
    { Engineer__Id: 1, Engineer__Name: "Engineer Anil" },
    { Engineer__Id: 2, Engineer__Name: "Engineer Sunil" },
  ],
  
  // Contract types (daily vs fixed rate)
  contractTypes: [
    { Contract_Type__Id: 1, Contract_Type__Name: "Daily Rate" },
    { Contract_Type__Id: 2, Contract_Type__Name: "Rate Contract" },
  ],
  
  // Contractors/vendors
  contractors: [
    { VendorAC__Id: 169297, VendorAC__Name: "11 DOTS STUDIO" },
  ],
  
  // Labour workers
  labours: [
    { Labour__Id: 1, Labour__Name: "Ramesh" },
    { Labour__Id: 2, Labour__Name: "Suresh" },
  ],
  
  // Skills (Mason, Carpenter, etc.)
  skills: [
    { Labour_Skill__Id: 1, Labour_Skill__Name: "MS" },  // Mason
    { Labour_Skill__Id: 2, Labour_Skill__Name: "MC" },  // Carpenter
  ],
  
  // Blocks/buildings
  blocks: [
    { PILEBlock__Id: 1, PILEBlock__Name: "Block A" },
    { PILEBlock__Id: 2, PILEBlock__Name: "Block B" },
  ],
  
  // Phases of project
  phases: [
    { Phase__Id: 1, Phase__Name: "Phase 1", EnableFloor: true },
  ],
  
  // Floors in building
  floors: [
    { Floor__Id: 1, Floor__Name: "Floor 1", BlockId: 1 },
    { Floor__Id: 2, Floor__Name: "Floor 2", BlockId: 1 },
  ],
  
  // QC approvers
  qcExecutives: [
    { QC__Id: 101, QC__Name: "Site Engineer - Anil" },
    { QC__Id: 102, QC__Name: "Site Engineer - Sunil" },
  ],
  
  // Types of work and their rates
  workCodes: [
    { WorkCode__Id: 1, WorkName: "Foundation", Rate: 120 },
    { WorkCode__Id: 2, WorkName: "Plumbing", Rate: 100 },
  ],
};
```

**Note:** These are mock/dummy data. In production, they should be fetched from Focus9 API endpoints.

**What to Tell Someone:**
> "dummyMasters.js contains all the dropdown options like 'which site?', 'which engineer?', 'which skill?', etc. It's currently hardcoded, but later we'll replace it with API calls to Focus9 so the lists update dynamically from the ERP system."

---

### 2️⃣0️⃣ **store/labourDraftStore.js** (Local Draft Storage)

**Purpose:** Save incomplete labour entries locally

**Functions:**

```javascript
// Save data to localStorage
export const saveDraft = (data) => {
  const existing = JSON.parse(localStorage.getItem("LABOUR_DRAFT") || "{}");
  const updated = { ...existing, ...data };
  localStorage.setItem("LABOUR_DRAFT", JSON.stringify(updated));
};

// Get all draft data
export const getDraft = () => {
  return JSON.parse(localStorage.getItem("LABOUR_DRAFT") || "{}");
};

// Clear draft after successful save
export const clearDraft = () => {
  localStorage.removeItem("LABOUR_DRAFT");
};
```

**Draft Structure:**

```javascript
{
  "timeIn": {
    date: "2026-01-24",
    site: {...},
    engineer: {...},
    contractor: {...},
    labour: {...},
    skill: {...},
    photo: "base64...",
    gps: { lat: 19.123, lng: 72.456 },
    inTime: "2026-01-24T09:00:00Z"
  },
  "workAllocation": {
    block: {...},
    floor: {...},
    workCode: {...},
    targetQty: 100,
    rate: 500,
    amount: 50000
  },
  "completion": {
    completedQty: 100,
    photos: ["base64...", "base64..."],
    remarks: "Completed on time",
    gps: { lat: 19.123, lng: 72.456 }
  },
  "timeOut": {
    outTime: "2026-01-24T17:00:00Z",
    photo: "base64...",
    gps: { lat: 19.123, lng: 72.456 },
    engineerId: "anil"
  },
  "qc": {
    qcPhotos: ["base64..."],
    qcExecutiveId: "101",
    qcRemarks: "Good quality",
    approvedQty: 100,
    qcTime: "2026-01-24T17:30:00Z"
  }
}
```

**How It Works:**

```
User fills TimeInTab
↓
Click "Save & Continue"
↓
saveDraft({ timeIn: formData })  // Saves to localStorage
↓
localStorage["LABOUR_DRAFT"] = { "timeIn": {...} }
↓
User fills WorkAllocationTab
↓
Click "Save & Continue"
↓
saveDraft({ workAllocation: formData })  // Merges with existing
↓
localStorage["LABOUR_DRAFT"] = { "timeIn": {...}, "workAllocation": {...} }
↓
... continues for all 5 tabs
↓
User clicks final "Save"
↓
buildCreateDoc() gets all 5 tabs from draft
↓
postLabourDocument() sends to Focus9
↓
Success → clearDraft()  // Clear localStorage
```

**Why It Matters:**
- If internet connection drops, no data is lost
- User can go back to previous tabs to edit
- Creates complete transaction from multiple steps

**What to Tell Someone:**
> "labourDraftStore.js saves the labour entry to the browser's local storage as the user fills each tab. So if they fill TimeInTab and close the browser, the data is saved. When they come back, they can resume from where they left off. It's like a scratch pad that saves automatically. Once they click final Save and it reaches Focus9, we clear the scratch pad."

---

### 2️⃣1️⃣ **builders/buildCreateDoc.js** (ERP Payload Builder)

**Purpose:** Convert 5-tab data into Focus9 ERP document structure

**What It Does:**
Takes draft data from all 5 tabs and builds a complete document object that Focus9 ERP expects.

**Input (Draft Data):**

```javascript
{
  timeIn: { date, site, engineer, contractor, labour, skill, photo, gps, inTime },
  workAllocation: { block, floor, workCode, targetQty, rate, amount },
  completion: { completedQty, photos, remarks, gps },
  timeOut: { outTime, photo, gps, engineerId },
  qc: { qcPhotos, qcExecutiveId, qcRemarks, approvedQty }
}
```

**Output (ERP Document Structure):**

```javascript
{
  "data": [
    {
      "Header": {
        "DocNo": "LA/AAY/1",
        "Date": 45988,  // ERP date format
        "Time": "",
        "VendorAC__Id": 169297,
        "VendorAC__Name": "11 DOTS STUDIO",
        "Site__Id": 454,
        "Site__Name": "Adarsh Awash Yojana",
        "PILEBlock Master__Id": 1,
        "PILEBlock Master__Name": "Block A",
        // ... more header fields
      },
      "Body": [
        {
          "Floor__Id": 1,
          "Floor__Name": "Floor 1",
          "Labour Skil Type__Id": 1,
          "Labour Skil Type__Name": "MS",
          "Quantity": 100,  // Completed qty
          "Rate": 500,
          "Gross": 50000,
          "LabourPhoto": {
            "FileData": "base64...",
            "FileName": "photo_1234567890.jpg"
          },
          "InTime": 1700000000,  // Epoch milliseconds
          "OutTime": 1700030000,
          "GeoPosition": "19.123,72.456",
          "BaseQuantity": 100,
          // ... more body fields
        }
      ]
    }
  ],
  "result": 1,
  "message": ""
}
```

**Helper Functions:**

```javascript
// Convert YYYY-MM-DD to ERP Excel serial date
const toERPDate = (dateStr) => {
  const date = new Date(dateStr);
  const baseDate = new Date(1900, 0, 1);
  const diffDays = Math.floor((date - baseDate) / (1000 * 60 * 60 * 24));
  return diffDays + 1;
};

// Convert ISO timestamp to epoch milliseconds
const toEpochMillis = (dateTime) => {
  return new Date(dateTime).getTime();
};

// Extract photo from base64
const getPhotoData = (photo) => {
  if (typeof photo === "string") return photo;
  if (photo?.base64) return photo.base64;
  return "";
};
```

**Key Mappings:**

| App Field | ERP Header Field | Source Tab |
|-----------|------------------|------------|
| date | Date | TimeInTab |
| site | Site__Id, Site__Name | TimeInTab |
| engineer | Engineer info | TimeInTab |
| contractor | VendorAC__Id | TimeInTab |
| block | PILEBlock Master__Id | WorkAllocationTab |
| floor | Floor__Id | WorkAllocationTab |
| skill | Labour Skil Type__Id | TimeInTab |
| photo | LabourPhoto | CompletionTab |
| inTime | InTime | TimeInTab |
| outTime | OutTime | TimeOutTab |
| gps | GeoPosition | TimeInTab/CompletionTab |
| completedQty | Quantity | CompletionTab |
| targetQty | BaseQuantity | WorkAllocationTab |
| rate | Rate | WorkAllocationTab |
| amount | Gross | WorkAllocationTab |

**What to Tell Someone:**
> "buildCreateDoc.js is a translator. After the user fills all 5 tabs, the app has 5 separate datasets. Focus9 ERP expects one big structured document with Header section and Body section. This file takes all 5 datasets and reorganizes them into the format Focus9 expects. It also converts dates and photo formats because the app uses different formats than ERP."

---

### 2️⃣2️⃣ **pages/LabourList.jsx** (Labour Entries List)

**Purpose:** Display list of labour entries with status

**What It Shows:**
- List of labour entries from dummy data
- Labour name, site, date
- Current status with color badge
- Click entry to view/edit details

**Status Mapping:**

```javascript
const statusLabel = {
  TIME_IN_DONE: "Needs Allocation",
  ALLOCATED: "Needs Completion",
  COMPLETED: "Needs Time Out",
  TIME_OUT: "QC Pending",
  QC_DONE: "Completed"
};

const statusColor = {
  TIME_IN_DONE: "primary",    // Blue
  ALLOCATED: "warning",       // Yellow
  COMPLETED: "info",          // Light blue
  TIME_OUT: "danger",         // Red
  QC_DONE: "success"          // Green
};
```

**What to Tell Someone:**
> "LabourList.jsx shows all labour work entries as a list. Each entry shows the worker name, site, date, and current status. The status is color-coded - green means completed, yellow means waiting for next step, red means waiting for QC. When you click an entry, it opens the labour entry form so you can edit or view details."

---

### 2️⃣3️⃣ **utils/focusDate.js** (Date Utilities)

**Purpose:** Date conversion helpers

**Function:**

```javascript
export function toFocusDate(dateStr) {
  const d = new Date(dateStr);
  return `${d.getFullYear()}-${(d.getMonth()+1).toString().padStart(2,'0')}-${d.getDate().toString().padStart(2,'0')}`;
}
```

**Purpose:** Convert ISO date string to YYYY-MM-DD format for Focus9

**Example:**
```
Input:  "2026-01-24T10:30:00Z"
Output: "2026-01-24"
```

**What to Tell Someone:**
> "focusDate.js has utility functions for converting dates. Focus9 ERP has its own date format, so we use this to convert JavaScript dates into the format Focus9 expects."

---

### 2️⃣4️⃣ **styles/theme.css** (Global Theme)

**Purpose:** Color variables and global styles

**CSS Variables:**

```css
:root {
  --primary-blue: #0d6efd;
  --light-blue: #e7f1ff;
  --border-color: #dee2e6;
  --bg-white: #ffffff;
}

/* Global card style */
.erp-card {
  background: var(--bg-white);
  border: 1px solid var(--border-color);
  border-radius: 10px;
  padding: 14px;
  margin-bottom: 12px;
}

/* Labels */
.erp-label {
  font-size: 13px;
  font-weight: 600;
  color: #495057;
  margin-bottom: 4px;
}

/* Sticky buttons at bottom */
.sticky-action {
  position: sticky;
  bottom: 0;
  background: white;
  padding: 10px;
  border-top: 1px solid var(--border-color);
}
```

**What to Tell Someone:**
> "theme.css defines the color scheme and common styles used across the app. It uses CSS variables so we can change colors in one place and it updates everywhere. All cards, labels, and buttons inherit from these theme styles."

---

## API INTEGRATION GUIDE

### **Backend Server URL**

```javascript
// From setupProxy.js (package.json)
"proxy": "http://103.252.144.86"
```

All API calls are proxied through this server, which is the Focus9 ERP instance.

### **API Endpoints Reference**

| Endpoint | Method | Purpose | Returns |
|----------|--------|---------|---------|
| `/Focus9Api/v2/Company/GetList` | GET | Get all companies | Array of companies |
| `/Focus9Api/v2/Login/Login` | POST | Authenticate user | Token, SessionId, EmployeeId |
| `/Focus9Api/v2/Login/Logout` | POST | Log out user | Success message |
| `/api/Focus9Api/v1/Screens/GetNextNumber` | GET | Get next DocNo | Document number string |
| `/api/Focus9Api/v1/Screens/LoadDoc` | GET | Load transaction | Full transaction object |
| `/api/Focus9Api/v1/Screens/PostDoc` | POST | Create/Update transaction | Result object |

### **Authentication Flow**

```
1. User submits login form
   ↓
2. Call loginUser(username, password, companyId)
   ↓
3. API returns:
   {
     Token: "jwt_token_...",
     fSessionId: "session_id_...",
     EmployeeId: "emp_123",
     ...
   }
   ↓
4. Store in localStorage:
   - localStorage["token"] = Token
   - localStorage["sessionId"] = fSessionId
   - localStorage["employeeId"] = EmployeeId
   - localStorage["user"] = entire user object
   ↓
5. Update AuthContext
   ↓
6. Navigate to Dashboard
```

### **Session Management**

All authenticated API calls require `sessionId`:

```javascript
// Example
const sessionId = localStorage.getItem("sessionId");

// Pass to API
await getNextDocNo(sessionId);
await loadLabourDoc(docNo, sessionId);
await postLabourDocument(payload, sessionId);
```

---

## DATA FLOW & ARCHITECTURE

### **Overall Application Data Flow**

```
┌─────────────┐
│  Login.jsx  │  ← User enters credentials
└──────┬──────┘
       │
       ▼
   ┌──────────────────┐
   │ loginUser API    │  ← Call Focus9 /Login/Login
   └──────┬───────────┘
          │
          ▼
   ┌──────────────────┐
   │ AuthContext.js   │  ← Store token, sessionId, user data
   └──────┬───────────┘
          │
          ▼
   ┌──────────────────┐
   │ Dashboard.jsx    │  ← Show dashboard
   └──────┬───────────┘
          │
          ├─ Calendar View
          │
          └─ Labour Entry Button
                   │
                   ▼
           ┌───────────────────────┐
           │ LabourEntry.jsx       │  ← Main workflow manager
           └───────────┬───────────┘
                       │
        ┌──────────────┼──────────────┐
        │              │              │
        ▼              ▼              ▼
    ┌─────┐        ┌─────┐       ┌─────┐
    │Time │        │Work │       │Comp │
    │ In  │────→   │Alloc│───→   │let  │  ← labourDraftStore
    └─────┘        └─────┘       └──┬──┘   saves each tab
        │              │              │
        └──────────────┼──────────────┘
                       │
                       ▼
                  ┌──────────┐
                  │TimeOut   │
                  │Tab       │
                  └────┬─────┘
                       │
                       ▼
                  ┌──────────┐
                  │QC        │
                  │Tab       │
                  └────┬─────┘
                       │
                       ▼
        ┌──────────────────────────┐
        │ buildCreateDoc()          │  ← Combines all tabs
        └────────────┬─────────────┘
                     │
                     ▼
        ┌──────────────────────────┐
        │ postLabourDocument()      │  ← Posts to Focus9 API
        └────────────┬─────────────┘
                     │
                     ▼
        ┌──────────────────────────┐
        │ Focus9 ERP Database       │  ← Transaction saved
        └──────────────────────────┘
```

### **State Management Strategy**

**Local Component State (useState):**
- Used for form fields in each tab
- Used for UI state (loading, error messages)
- Not shared between components

**Global Auth State (AuthContext):**
- User login information
- Session ID
- Token
- Accessible from anywhere via `useContext(AuthContext)`

**Draft Store (localStorage):**
- Holds incomplete labour entry data
- Persists across page refreshes
- Survives browser close/reopen
- Cleared after successful save

**Dummy Masters Data:**
- Hardcoded in `dummyMasters.js`
- Used for dropdown options
- Will be replaced with API calls

---

## CSS STYLING GUIDE

### **Color Palette**

```css
/* Primary Colors */
--primary-blue: #0d6efd      /* Main action color */
--light-blue: #e7f1ff        /* Light backgrounds */
--dark-blue: #094a8f         /* Hover states */

/* Neutrals */
--white: #ffffff
--light-gray: #f9fafb
--border-gray: #e5e7eb
--text-gray: #6b7280

/* Semantic Colors */
--success: #10b981          /* Green - completed */
--warning: #f59e0b          /* Orange - pending */
--danger: #ef5350           /* Red - error */
--info: #3b82f6             /* Blue - info */
```

### **Layout Patterns**

**Flexbox Layout (Dashboard Sidebar):**
```css
.sidebar {
  display: flex;
  flex-direction: column;
  justify-content: space-between;  /* Push footer to bottom */
}
```

**Grid Layout (Calendar):**
```css
.calendar-days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);  /* 7 columns for days */
  gap: 4px;
}
```

**Tab Navigation (LabourEntry):**
```css
.labour-tabs {
  display: flex;
  flex-direction: row;  /* Horizontal tabs */
}

.labour-tabs button.active {
  border-bottom: 3px solid #0d6efd;  /* Active indicator */
}
```

### **Responsive Design**

```css
/* Mobile first */
@media (max-width: 1024px) {
  .labour-tabs button {
    padding: 10px 8px;
    font-size: 12px;
  }
  
  .labour-content {
    padding: 12px;
  }
}
```

---

## HOW EACH PAGE/COMPONENT WORKS

### **Login Page Flow**

```
1. Page loads
   ↓
2. useEffect() fetches companies from API
   ↓
3. Companies loaded → Display dropdown
   ↓
4. User enters username, password, selects company
   ↓
5. User clicks "Login" button
   ↓
6. Validation:
   - All fields filled?
   - ✓ Proceed
   - ✗ Show error
   ↓
7. Call loginUser() API
   ↓
8. Success:
   - Store token, sessionId in localStorage
   - Update AuthContext with user data
   - Navigate to /dashboard
   ↓
9. Error:
   - Show error message
   - User can retry
```

### **Dashboard Flow**

```
1. Dashboard mounts
   ↓
2. Check AuthContext for user
   ↓
3. If no user: Redirect to /login
   ↓
4. If user: Show sidebar + main content
   ↓
5. User can click:
   - "Labour Entry" → Navigate to /labour/new
   - "Calendar" → Show CalendarView
   - "Settings" → Show settings panel
   - Light/Dark toggle → Switch theme
   - Logout → Call logout API → Navigate to /login
```

### **Labour Entry Flow (Complete Workflow)**

```
STEP 1: Component Initializes
  - Mount LabourEntry component
  - useEffect() runs
  - Fetch sessionId from localStorage
  - Call getNextDocNo() API
  - Display next DocNo (e.g., "LA/AAY/5")
  - Set mode = "NEW"
  - Set activeTab = "timein"

STEP 2: User Options
  A) NEW ENTRY:
     - Keep auto-generated DocNo
     - Fill TimeInTab
     - Click "Save & Continue"
     - Move to WorkAllocationTab
     - ... continue through all 5 tabs

  B) EDIT EXISTING:
     - Change DocNo in header
     - Leave DocNo field (onBlur)
     - App calls loadLabourDoc(newDocNo)
     - If exists: Load data, set mode="EDIT" (yellow background)
     - If not exists: Stay in NEW mode
     - If mode="EDIT": Pre-fill all tabs with loaded data
     - User can modify data
     - Click "Save" to update

STEP 3: Tab Progression (After timeIn filled)
  TimeInTab saved
    ↓ (disabled until timeIn saved)
  WorkAllocationTab enabled
    ↓ (disabled until allocation saved)
  CompletionTab enabled
    ↓ (disabled until completion saved)
  TimeOutTab enabled
    ↓ (disabled until timeout saved)
  QCTab enabled
    ↓ (final save)

STEP 4: Final Save
  - User fills QCTab
  - Click "Save" button in header
  - QCTab validates QC data
  - saveDraft() stores QC data
  - getDraft() retrieves all 5 tabs
  - buildCreateDoc() creates ERP payload
  - postLabourDocument() sends to Focus9 API
  - Success: Show alert → clearDraft() → Navigate to dashboard
  - Error: Show error message → User can retry

STEP 5: After Success
  - localStorage cleared
  - Transaction saved in Focus9
  - User returns to dashboard
  - Can create another entry
```

---

## KEY CONCEPTS & WORKFLOWS

### **NEW vs EDIT Mode**

**NEW Mode:**
```
Screen loads
  ↓
Fetch next DocNo (e.g., "LA/AAY/5")
  ↓
Show in Document No field
  ↓
User sees: "🟢 NEW MODE"
  ↓
Field background: White
  ↓
User fills tabs and saves
  ↓
Result: New transaction created in ERP
```

**EDIT Mode:**
```
User changes DocNo (e.g., "LA/AAY/3")
  ↓
App calls loadLabourDoc("LA/AAY/3")
  ↓
If found:
  - Load all transaction data
  - Pre-fill all tabs
  - Show: "🟠 EDIT MODE"
  - Field background: Yellow
  ↓
User modifies data and saves
  ↓
Result: Existing transaction updated in ERP
```

### **Draft System (Multi-Step Form)**

**Problem:** Filling all 5 tabs in one go is complicated. User might close browser.

**Solution:** Save each tab to draft as user progresses.

```
Tab 1 Submit
  ↓
saveDraft({ timeIn: {...} })
  ↓
localStorage["LABOUR_DRAFT"] = { "timeIn": {...} }
  ↓
User moves to Tab 2
  ↓
Tab 2 Submit
  ↓
saveDraft({ workAllocation: {...} })
  ↓
localStorage merges: { "timeIn": {...}, "workAllocation": {...} }
  ↓
... and so on
  ↓
Final Save
  ↓
buildCreateDoc() retrieves all from localStorage
  ↓
Creates one complete ERP document
  ↓
Posts to API
  ↓
clearDraft() removes from localStorage
```

### **Photo & GPS Capture**

**Why Needed:**
- Proof of work done
- Location verification
- Audit trail

**Implementation:**
```
CameraGPS component
  ↓
1. On mount: Request GPS permission
  ↓ (fast GPS: use cached location if < 5 min old)
  ↓
2. User clicks "Take Photo"
  ↓
3. Camera activates (back camera by default)
  ↓
4. User frames photo
  ↓
5. User clicks "Capture"
  ↓
6. Photo converted to base64
  ↓
7. Return { photos: [base64], gps: {lat, lng} }
  ↓
Parent component receives & saves to draft
```

### **Tab Enabling/Disabling Logic**

```
TimeInTab:
  - Always enabled
  - Must fill before proceeding

WorkAllocationTab:
  - Disabled if status === "NEW"
  - Enabled after TimeInTab saved (status = "TIME_IN_DONE")

CompletionTab:
  - Disabled unless status === "ALLOCATED"

TimeOutTab:
  - Disabled unless status === "COMPLETED"

QCTab:
  - Disabled unless status === "TIME_OUT"
```

---

## STATE MANAGEMENT

### **Three Levels of State**

**1. Local Component State (useState)**
```javascript
// In TimeInTab.jsx
const [formData, setFormData] = useState({
  site: null,
  engineer: null,
  // ...
});
```
- Only exists in that component
- Doesn't persist
- Lost on unmount

**2. Global Auth State (AuthContext)**
```javascript
// Available everywhere
const { user, login, logout } = useContext(AuthContext);

// Persists in localStorage
localStorage.setItem("user", JSON.stringify(userData));
```
- Accessible from any component
- Persists across page refreshes
- Used for login info

**3. Draft Storage (localStorage)**
```javascript
// Save incomplete entries
localStorage.setItem("LABOUR_DRAFT", JSON.stringify(draft));

// Retrieve later
const draft = JSON.parse(localStorage.getItem("LABOUR_DRAFT"));
```
- Persists across browser close/reopen
- Used for multi-step forms
- Cleared after successful save

### **Pros & Cons**

| Type | Pros | Cons |
|------|------|------|
| Local State | Simple, isolated | Lost on unmount |
| AuthContext | Global, persistent | Need useContext hook |
| localStorage | Very persistent | Limited size (5MB) |

---

## AUTHENTICATION FLOW

### **Login Sequence**

```
1. User at /login
   ↓
2. Login.jsx renders form
   ↓
3. useEffect() fetches getCompanies()
   ↓
4. Companies dropdown populated
   ↓
5. User enters credentials + selects company
   ↓
6. Click "Login"
   ↓
7. Validation check
   ✓ All fields filled → Continue
   ✗ Missing fields → Show error
   ↓
8. Call loginUser(username, password, companyId)
   ↓
9. API request to Focus9
   ↓
10. Focus9 response:
    ✓ Valid credentials → Return token + sessionId
    ✗ Invalid → Return error
   ↓
11. Store in localStorage:
    localStorage["token"] = token
    localStorage["sessionId"] = sessionId
    localStorage["employeeId"] = employeeId
    localStorage["user"] = user object
   ↓
12. Update AuthContext:
    login(userData)
   ↓
13. Navigate to /dashboard
   ↓
14. Dashboard mounts, checks AuthContext
   ↓
15. User exists → Show dashboard
   ↓
16. User logged in ✓
```

### **Logout Sequence**

```
1. User clicks "Logout" in Dashboard
   ↓
2. Show confirmation dialog
   ↓
3. If confirmed:
   ↓
4. Call logout API
   ↓
5. Clear AuthContext:
   - setUser(null)
   - removeItem("token")
   - removeItem("user")
   ↓
6. Navigate to /login
   ↓
7. User logged out ✓
```

### **Protected Routes**

```javascript
function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);
  
  // If user exists: Show page
  // If no user: Redirect to login
  return user ? children : <Navigate to="/" />;
}

// Usage
<Route path="/dashboard" element={
  <ProtectedRoute>
    <Dashboard />
  </ProtectedRoute>
} />
```

---

## LABOUR ENTRY WORKFLOW

### **Complete Example: Creating a Labour Entry**

**Scenario:** Labour worker "Ramesh" does brick laying work on Jan 24, 2026

**Step 1: Screen Loads**
```
LabourEntry.jsx mounts
  ↓
getNextDocNo() returns "LA/AAY/5"
  ↓
Document No field shows: "LA/AAY/5"
  ↓
Mode = "NEW"
  ↓
Background = White
```

**Step 2: TimeInTab**
```
User selects:
- Site: "Adarsh Awash Yojana"
- Engineer: "Engineer Anil"
- Contract Type: "Daily Rate"
- Contractor: "11 DOTS STUDIO"
- Labour: "Ramesh"
- Skill: "MS" (Mason)

System auto-fills:
- Date: 2026-01-24 (today)
- In Time: 08:00 (current time)

User captures:
- Photo: Click camera, take photo
- GPS: 19.123, 72.456 (auto-captured)

User clicks "Save & Continue"
  ↓
saveDraft({ timeIn: {...} })
  ↓
status = "TIME_IN_DONE"
  ↓
WorkAllocationTab becomes enabled
```

**Step 3: WorkAllocationTab**
```
User selects:
- Block: "Tower A"
- Floor: "Ground Floor"
- Work Code: "BRK-001" (Brick Work)
- Target Quantity: 100 units

System auto-calculates:
- Rate: 550 (from master)
- Amount: 550 × 100 = 55,000

User clicks "Save & Continue"
  ↓
saveDraft({ workAllocation: {...} })
  ↓
status = "ALLOCATED"
  ↓
CompletionTab becomes enabled
```

**Step 4: CompletionTab**
```
User enters:
- Completed Quantity: 100 (full completion)

User captures:
- Photo of completed work (1 required)
- GPS: Auto-captured

Remarks: Empty (full completion, so not required)

User clicks "Save & Continue"
  ↓
saveDraft({ completion: {...} })
  ↓
status = "COMPLETED"
  ↓
TimeOutTab becomes enabled
```

**Step 5: TimeOutTab**
```
System auto-fills:
- Out Time: 17:00 (current time)

User captures:
- Exit photo
- GPS: Auto-captured

User selects:
- Engineer confirmation: "Engineer Anil"

User clicks "Save & Continue"
  ↓
saveDraft({ timeOut: {...} })
  ↓
status = "TIME_OUT"
  ↓
QCTab becomes enabled
```

**Step 6: QCTab**
```
User captures:
- QC photos (min 1 required): 1 photo taken

User selects:
- QC Executive: "Site Engineer - Anil"

User enters:
- QC Remarks: "Excellent work"

System auto-fills:
- Approved Qty: 100
- QC Time: 17:30

User clicks "Save" button in header
  ↓
QCTab validates all fields
  ↓
saveDraft({ qc: {...} })
  ↓
getDraft() retrieves all 5 tabs
  ↓
buildCreateDoc() creates payload:
{
  "data": [{
    "Header": {
      "DocNo": "LA/AAY/5",
      "Date": 45988,
      "VendorAC__Id": 169297,
      "Site__Id": 454,
      "Contract Type__Id": 1,
      // ... all header fields
    },
    "Body": [{
      "Floor__Id": 1,
      "Labour Skil Type__Id": 1,
      "Quantity": 100,
      "Rate": 550,
      "Gross": 55000,
      "InTime": 1700000000,
      "OutTime": 1700030000,
      "GeoPosition": "19.123,72.456",
      // ... all body fields
    }]
  }]
}
  ↓
postLabourDocument(payload, sessionId)
  ↓
API sends to Focus9 ERP
  ↓
Focus9 creates transaction LA/AAY/5
  ↓
Response: { result: 1, message: "Success" }
  ↓
Alert: "Labour timesheet submitted successfully!"
  ↓
clearDraft()
  ↓
Navigate to /dashboard
  ↓
Transaction saved ✓
```

### **Example: Editing an Existing Entry**

**Scenario:** Need to edit previously created entry LA/AAY/3

**Step 1: Open Labour Entry**
```
LabourEntry.jsx loads
  ↓
getNextDocNo() returns "LA/AAY/5" (next number)
  ↓
But user wants to edit LA/AAY/3
  ↓
User changes DocNo field to "LA/AAY/3"
```

**Step 2: Trigger Load**
```
User leaves DocNo field (onBlur event)
  ↓
handleDocNoBlur() checks if changed
  ↓
loadLabourDoc("LA/AAY/3", sessionId)
  ↓
Focus9 API returns:
{
  "Header": { DocNo: "LA/AAY/3", ... },
  "Body": [{ ... }]
}
  ↓
mode = "EDIT"
  ↓
Document No field background: Yellow
  ↓
Tooltip: "🟠 EDIT MODE"
```

**Step 3: Edit Data**
```
All 5 tabs auto-fill with loaded data
  ↓
User can modify any field
  ↓
For example: Change completed quantity from 100 to 95
```

**Step 4: Save**
```
User clicks "Save" button
  ↓
saveDraft({ ... updated data ... })
  ↓
buildCreateDoc() creates payload with DocNo: "LA/AAY/3"
  ↓
postLabourDocument() sends update to Focus9
  ↓
Focus9 updates existing transaction LA/AAY/3
  ↓
Success message
  ↓
Navigate to dashboard
  ↓
Transaction updated ✓
```

---

## QUICK REFERENCE: WHAT TO SAY IN MEETINGS

### **To Your Manager:**

> "Our app has three main parts:
> 1. **Login** - Users authenticate with Focus9 ERP
> 2. **Dashboard** - Central hub with calendar and navigation
> 3. **Labour Entry** - 5-tab workflow to record labour work
>
> Each tab captures a specific part:
> - **Tab 1 (Time In)** - Worker arrives, site, engineer, take photo + GPS
> - **Tab 2 (Work Allocation)** - What work? Block, floor, work code, target qty
> - **Tab 3 (Completion)** - How much done? Completed qty, photos
> - **Tab 4 (Time Out)** - Worker leaves, exit photo, engineer approval
> - **Tab 5 (QC)** - Quality check, QC photos, QC executive approval
>
> On each tab save, data goes to localStorage. When final save is clicked, all 5 tabs combine into one ERP document and go to Focus9 database.
>
> We also support editing - user can change the Document No to edit existing entries."

### **To Your Colleagues:**

> "The app uses React with React Router for navigation. Authentication state is managed with Context API. Forms save to localStorage as drafts. When the user clicks final save, we build a Focus9-compatible payload, send it to the API, and it saves in the ERP database. We also have a calendar view showing all labour entries."

### **To a New Developer:**

> "Start with App.js - it's the router. Login page handles authentication. Dashboard is the main hub. LabourEntry is the complex part - it orchestrates 5 tabs with a draft system. Each tab is a separate component. focusApi.js has all API functions. buildCreateDoc.js transforms our data into Focus9 format. labourDraftStore.js manages localStorage. Check dummyMasters.js for master data structure."

---

## SUMMARY TABLE: ALL FILES AT A GLANCE

| File | Purpose | Key Exports | Type |
|------|---------|------------|------|
| **App.js** | Router & auth | App component, ProtectedRoute | Component |
| **index.js** | Entry point | React render | Bootstrap |
| **Login.jsx** | Login UI | Login component | Page |
| **Dashboard.jsx** | Main hub | Dashboard component | Page |
| **LabourEntry.jsx** | Labour workflow | LabourEntry component | Page |
| **LabourList.jsx** | List view | LabourList component | Page |
| **AuthContext.js** | Auth state | AuthContext, AuthProvider | Context |
| **api.js** | Axios config | api instance | API Config |
| **focusApi.js** | API functions | getCompanies, loginUser, etc. | API |
| **TimeInTab.jsx** | Tab 1 | TimeInTab component | Component |
| **WorkAllocationTab.jsx** | Tab 2 | WorkAllocationTab component | Component |
| **CompletionTab.jsx** | Tab 3 | CompletionTab component | Component |
| **TimeOutTab.jsx** | Tab 4 | TimeOutTab component | Component |
| **QCTab.jsx** | Tab 5 | QCTab component | Component |
| **CameraGPS.jsx** | Camera/GPS | CameraGPS component | Component |
| **CalendarView.jsx** | Calendar | CalendarView component | Component |
| **buildCreateDoc.js** | Payload builder | buildCreateDoc function | Builder |
| **labourDraftStore.js** | Draft storage | saveDraft, getDraft, clearDraft | Store |
| **dummyMasters.js** | Master data | dummyMasters object | Data |
| **focusDate.js** | Date utils | toFocusDate function | Utils |
| **Login.css** | Login styles | - | Styles |
| **Dashboard.css** | Dashboard styles | - | Styles |
| **LabourEntry.css** | Labour styles | - | Styles |
| **CalendarView.css** | Calendar styles | - | Styles |
| **theme.css** | Global theme | CSS variables | Styles |

---

## NEXT STEPS & RECOMMENDATIONS

### **What's Working:**
✅ Authentication flow  
✅ Dashboard layout  
✅ Labour entry workflow structure  
✅ Draft management  
✅ API integration  

### **What Needs Implementation:**
⚠️ Replace dummyMasters with API calls  
⚠️ Replace dummyLabourList with API calls  
⚠️ Add error handling for all API calls  
⚠️ Add loading spinners  
⚠️ Add success/error toast notifications  
⚠️ Add form validation UI  
⚠️ Add edit functionality for completed entries  

### **Testing Needed:**
🧪 Test login with invalid credentials  
🧪 Test NEW mode entry creation  
🧪 Test EDIT mode document loading  
🧪 Test offline draft recovery  
🧪 Test photo/GPS capture on mobile  
🧪 Test all 5 tabs workflow  
🧪 Test ERP payload format  

---

**END OF DOCUMENTATION**

*Version 1.0 | Last Updated: January 24, 2026 | Prepared for: DEC Labour Management Team*
