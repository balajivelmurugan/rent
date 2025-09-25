import "./App.css";
import { useLocation, useNavigate } from "react-router-dom";
import { Link, Routes, Route } from "react-router-dom";
import { Home } from "./pages/home.js";
import { Detail } from "./pages/detail.js";
import { Login } from "./pages/login.js";
import { RentList } from "./pages/rent-list.js";
import { Group, ViewList } from "@mui/icons-material";
import { PrivateRoute } from "./pages/private-route.js";
import {
  Box,
  BottomNavigation,
  BottomNavigationAction,
  Paper,
} from "@mui/material";
import { useState, useRef, useEffect } from "react";

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const getNavValue = (pathname) => {
    if (pathname === "/rent") return 0;
    if (pathname === "/list") return 1;
    return 0; // default to tenants
  };

  const [navigateValue, setNavigateValue] = useState(
    getNavValue(location.pathname)
  );

  useEffect(() => {
    setNavigateValue(getNavValue(location.pathname));
  }, [location.pathname]);

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
          <Route
            path="/list"
            element={
              <PrivateRoute>
                <RentList />
              </PrivateRoute>
            }
          />
        </Routes>
      </Box>
      {location.pathname !== "/login" && location.pathname !== "/detail" && (
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
              label="Tenants"
              component={Link}
              to="/rent"
              icon={<Group />}
            />
            <BottomNavigationAction
              component={Link}
              to="/list"
              label="Rent"
              icon={<ViewList />}
            />
          </BottomNavigation>
        </Paper>
      )}
    </>
  );
}

export default App;
