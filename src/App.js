import "./App.css";
import { useState } from "react";
import { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { Link, Routes, Route } from "react-router-dom";
import { Home } from "./pages/home.js";
import { Detail } from "./pages/detail.js";
import { HomeFilled, HomeMax } from "@mui/icons-material";

function App() {
  // const [from, setFrom] = useState(""); // Example value
  // const [to, setTo] = useState(""); // Example value
  // const [unitsConsumed, setUnitsConsumed] = useState(""); // Calculate units consumed
  // const [amount, setAmount] = useState(""); // Example value, can be calculated based on units consumed
  // const ratePerUnit = 6; // Example rate per unit, can be fetched from an API or state
  // const [rent, setRent] = useState(""); // Example rent value, can be fetched from an API or state
  // const [maintenance, setMaintenance] = useState(""); // Example maintenance value, can be fetched from an API or state
  // const [total, setTotal] = useState(""); // Example total value, can be calculated based on rent and maintenance
  // const [rentDetails, setRentDetails] = useState([]);
  // const [ebList, setEbList] = useState([]);
  // const [selectedEb, setSelectedEb] = useState("");

  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={Link} to="/rent">
            <HomeFilled />
          </Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 2 }}>
        <Routes>
          <Route path="/rent" element={<Home />} /> {/* Default */}
          <Route path="/detail" element={<Detail />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
