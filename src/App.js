import "./App.css";
import { useLocation, useNavigate } from "react-router-dom";
import { Link, Routes, Route } from "react-router-dom";
import { Home } from "./pages/home.js";
import { Detail } from "./pages/detail.js";
import { Login } from "./pages/login.js";
import { HomeRounded, Settings } from "@mui/icons-material";
import { PrivateRoute } from "./pages/private-route.js";
import {
  Box,
  BottomNavigation,
  BottomNavigationAction,
  Paper,
} from "@mui/material";
import { useState, useRef } from "react";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [navigateValue, setNavigateValue] = useState(0);

  const bottomNavRef = useRef(null);

  const handleLogout = () => {
    if (navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({
        type: "LOGOUT",
      });
    }
    navigate("/login", { replace: true });
  };

  return (
    <>
      <Box className="main-container">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/rent"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />{" "}
          {/* Default */}
          <Route
            path="/detail"
            element={
              <PrivateRoute>
                <Detail />
              </PrivateRoute>
            }
          />
        </Routes>
      </Box>
      {location.pathname !== "/login" && (
        <Paper
          sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
          elevation={3}
        >
          <BottomNavigation
            ref={bottomNavRef}
            showLabels
            value={navigateValue}
            onChange={(event, newValue) => {
              setNavigateValue(newValue);
            }}
          >
            <BottomNavigationAction
              label="Home"
              component={Link}
              to="/rent"
              icon={<HomeRounded />}
            />
            <BottomNavigationAction label="Settings" icon={<Settings />} />
          </BottomNavigation>
        </Paper>
      )}
    </>
  );
}

export default App;
