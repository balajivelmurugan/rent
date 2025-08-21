import {
  Box,
  FormControl,
  OutlinedInput,
  Button,
  IconButton,
  Fab,
} from "@mui/material";
import { useData } from "../DataContext"; // Adjust the path as needed
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { Calculate, WhatsApp } from "@mui/icons-material";

export const Detail = () => {
  const { list, loading } = useData();
  const location = useLocation();
  const { selectedEB } = location.state || {};
  const selectedDetail = list.find((item) => item.eb === selectedEB) || {};
  const [currentReading, setCurrentReading] = useState("");
  const [totalAmount, setTotalAmount] = useState("");

  const calculate = () => {
    const unitsConsumed = currentReading - selectedDetail.lastReading;
    const ebAmount = unitsConsumed * 6; // Assuming rate is 6 per unit
    setTotalAmount(
      ebAmount + selectedDetail.maintenance + selectedDetail.amount
    );
  };

  const sendToWhatsApp = () => {
    const phoneNumber = selectedDetail.phoneNumber;
    const message =
      `Hello, here are the details:\n\n` +
      `Name: ${selectedDetail.name}\n` +
      `EB: ${selectedDetail.eb}\n` +
      `Last Reading: ${selectedDetail.lastReading}\n` +
      `Current Reading: ${currentReading}\n` +
      `Units Consumed: ${currentReading - selectedDetail.lastReading}\n` +
      `EB Amount: ${(currentReading - selectedDetail.lastReading) * 6}\n` +
      `Maintenance: ${selectedDetail.maintenance}\n` +
      `Rent: ${selectedDetail.amount}\n` +
      `Total Amount: ${totalAmount}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `whatsapp://send?phone=${phoneNumber}&text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };
  console.log(list);
  return (
    <>
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "space-between",
          height: "100%",
        }}
      >
        <div>
          <h1> {selectedDetail.name} </h1>
          <h2>{selectedDetail.eb}</h2>
        </div>
        <div>
          <h3 style={{ display: "flex", justifyContent: "start" }}>Readings</h3>
          <div className="eb-container">
            <span>{selectedDetail.lastReading}</span>-
            <FormControl sx={{ m: 1 }} variant="outlined">
              <OutlinedInput
                id="outlined-adornment-weight"
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  "aria-label": "Current Reading",
                }}
                placeholder="Current Reading"
                value={currentReading}
                onChange={(e) => setCurrentReading(e.target.value)}
              />
            </FormControl>
          </div>
        </div>
        <div
          style={{
            backgroundColor: "#fff",
            display: "flex",
            flexDirection: "column",
            gap: "25px",
            padding: "20px",
            marginTop: "10px",
          }}
        >
          <div className="field-row">
            <span>Units Consumed</span>
            <span>{currentReading - selectedDetail.lastReading}</span>
          </div>
          <div className="field-row">
            <span>EB Amount</span>
            <span>{(currentReading - selectedDetail.lastReading) * 6}</span>
          </div>
          <div className="field-row">
            <span>Maintenance:</span>
            <span>{selectedDetail.maintenance}</span>
          </div>
          <div className="field-row">
            <span>Rent:</span>
            <span>{selectedDetail.amount}</span>
          </div>
        </div>
      </Box>
      <Box sx={{ mt: 2 }}>
        <Button fullWidth variant="contained" onClick={() => calculate()}>
          Calculate
          <Calculate sx={{ ml: 1 }} />
        </Button>
      </Box>

      <Box>
        <h1> {totalAmount} </h1>
      </Box>
      {totalAmount && (
        <Box sx={{ mt: 2 }}>
          <Fab
            color="primary"
            aria-label="edit"
            size="large"
            variant="circular"
            onClick={sendToWhatsApp}
          >
            <WhatsApp />
          </Fab>
        </Box>
      )}
    </>
  );
};
