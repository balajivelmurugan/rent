import "./App.css";
import { useNavigate } from "react-router-dom";
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
import { useState } from "react";

function App() {
  const navigate = useNavigate();
  const [navigateValue, setNavigateValue] = useState(0);

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
      {/* {location.pathname !== "/login" && (
        <AppBar position="static">
          <Toolbar className="app-bar">
            <div className="app-title">Tenants Management</div>
            <div className="app-actions">
              <IconButton color="inherit" component={Link} to="/rent">
                <HomeFilled />
              </IconButton>
              <IconButton color="inherit" onClick={handleLogout}>
                <LogoutOutlined />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
      )} */}

      <Box>
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
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation
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
    </>
  );
}

export default App;
