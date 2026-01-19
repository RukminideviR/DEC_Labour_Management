import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import LabourEntry from "./pages/LabourEntry";
import { AuthProvider, AuthContext } from "./auth/AuthContext";
import { useContext } from "react";
import LabourList from "./pages/LabourList";
// Component to protect routes
function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/" />;
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* ✅ NEW LABOUR ENTRY ROUTE (ADDED) */}
          <Route
            path="/labour/new"
            element={
              <ProtectedRoute>
                <LabourEntry />
              </ProtectedRoute>
            }
          />

<Route
  path="/labour/list"
  element={
    <ProtectedRoute>
      <LabourList />
    </ProtectedRoute>
  }
/>


          {/* Optional: Redirect any unknown route to login */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
