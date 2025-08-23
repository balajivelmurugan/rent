import "./App.css";
import { useLocation, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import { Link, Routes, Route } from "react-router-dom";
import { Home } from "./pages/home.js";
import { Detail } from "./pages/detail.js";
import { Login } from "./pages/login.js";
import { HomeFilled, LogoutOutlined } from "@mui/icons-material";
import { PrivateRoute } from "./pages/private-route.js";

function App() {
  const location = useLocation();
  const navigate = useNavigate();

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
      <AppBar position="static">
        <Toolbar className="app-bar">
          {location.pathname !== "/login" && (
            <>
              <div className="app-title">Tenants Management</div>
              <div className="app-actions">
                <IconButton color="inherit" component={Link} to="/rent">
                  <HomeFilled />
                </IconButton>
                <IconButton color="inherit" onClick={handleLogout}>
                  <LogoutOutlined />
                </IconButton>
              </div>
            </>
          )}
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 2 }}>
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
      </Container>
    </>
  );
}

export default App;
