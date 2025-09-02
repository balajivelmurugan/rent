import {
  Box,
  FormControl,
  OutlinedInput,
  Button,
  Fab,
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  Card,
  CardHeader,
  Grid,
  Avatar,
} from "@mui/material";
import { useData } from "../DataContext"; // Adjust the path as needed
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import {
  ArrowBack,
  Build,
  Calculate,
  ElectricBolt,
  Home,
  PhoneAndroidRounded,
  WhatsApp,
} from "@mui/icons-material";

export const Detail = () => {
  const { list } = useData();
  const location = useLocation();
  const { selectedEB } = location.state || {};
  const selectedDetail = list.find((item) => item.eb === selectedEB) || {};
  const [currentReading, setCurrentReading] = useState("");
  const [totalAmount, setTotalAmount] = useState(null);
  const navigate = useNavigate();
  const bottomRef = useRef(null);

  useEffect(() => {
    console.log("into");
    if (totalAmount && bottomRef.current) {
      console.log("scrolling");
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [totalAmount]);

  function Price({ amount }) {
    const formatted = new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);

    return <span>{formatted}</span>;
  }

  if (!selectedEB) {
    navigate("/rent", { replace: true });
    return null;
  }

  const calculate = () => {
    const unitsConsumed = currentReading
      ? currentReading - selectedDetail.lastReading
      : 0;
    const ebAmount = unitsConsumed ? unitsConsumed * 6 : 0; // Assuming rate is 6 per unit
    setTotalAmount(
      ebAmount + selectedDetail.maintenance + selectedDetail.amount
    );
  };

  const sendToWhatsApp = async () => {
    await updateRentDetails().then(() => {
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
    });
  };

  const updateRentDetails = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API}/update-rent`,
        {
          eb: String(selectedDetail.eb),
          lastReading: String(selectedDetail.lastReading),
          currentReading: String(currentReading),
          totalAmount: String(totalAmount),
          unitsConsumed: String(currentReading - selectedDetail.lastReading),
          ebAmount: String((currentReading - selectedDetail.lastReading) * 6),
          maintenance: String(selectedDetail.maintenance),
          rent: String(selectedDetail.amount),
        }
      );

      if (response.status === 201) {
        navigate("/rent", { replace: true });
      }

      console.log("Rent details updated successfully:", response.data);
    } catch (error) {
      console.error("Error updating rent details:", error);
    }
  };

  return (
    <>
      <Box sx={{ flexGrow: 0 }}>
        <AppBar position="static" color="none">
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
              justifyContent={"center"}
              display={"flex"}
            >
              Tenant Details
            </Typography>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ position: "absolute" }}
            >
              <ArrowBack />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          height: "calc(100vh - 64px - 56px)", // Adjust 64px if your AppBar height is different
          overflow: "auto",
        }}
      >
        <>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: 2,
              gap: 2,
            }}
          >
            <Card sx={{ width: "100%" }}>
              <Grid key={selectedDetail.id}>
                <CardHeader
                  avatar={<Avatar sx={{ bgcolor: "#1976d2" }}></Avatar>}
                  title={selectedDetail.name}
                  subheader={selectedDetail.eb}
                  slotProps={{
                    title: {
                      display: "flex",
                      justifyContent: "start",
                      fontWeight: 600,
                    },
                    subheader: { display: "flex", justifyContent: "start" },
                  }}
                />
                <Box
                  sx={{
                    display: "flex",
                    padding: 2,
                  }}
                >
                  <PhoneAndroidRounded />
                  <Typography variant="body2">
                    {selectedDetail.whatsapp}
                  </Typography>
                </Box>
              </Grid>
            </Card>
          </Box>
        </>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 2,
            gap: 2,
          }}
        >
          <Card sx={{ width: "100%" }}>
            <Grid key={selectedDetail.id}>
              <CardHeader
                title="Readings"
                slotProps={{
                  title: { display: "flex", justifyContent: "start" },
                }}
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  padding: 2,
                  backgroundColor: "#ededed",
                  m: 2,
                  mt: 0,
                  borderRadius: 2,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ display: "flex", justifyContent: "start", flexGrow: 1 }}
                >
                  Last Reading
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{ display: "flex", justifyContent: "start", flexGrow: 1 }}
                >
                  {selectedDetail.lastReading}
                </Typography>
                <Typography
                  sx={{ display: "flex", justifyContent: "start", flexGrow: 1 }}
                  variant="caption"
                >
                  Previous Month
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  padding: 2,
                  m: 2,
                  mt: 0,
                  backgroundColor: "#dde6f8",
                  borderRadius: 2,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    display: "flex",
                    justifyContent: "start",
                    flexGrow: 1,
                    color: "#1976d2",
                  }}
                >
                  Current Reading
                </Typography>
                <FormControl sx={{ m: 2, width: "25ch" }} variant="outlined">
                  <OutlinedInput
                    id="outlined-adornment-weight"
                    aria-describedby="outlined-weight-helper-text"
                    inputProps={{
                      "aria-label": "Current Reading",
                    }}
                    placeholder="Enter Current Reading"
                    value={currentReading}
                    onChange={(e) => setCurrentReading(e.target.value)}
                  />
                </FormControl>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  padding: 2,
                  m: 2,
                  mt: 0,
                  backgroundColor: "#E3FBE3",
                  borderRadius: 2,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    display: "flex",
                    justifyContent: "start",
                    flexGrow: 1,
                    color: "#0A470A",
                  }}
                >
                  Units Consumed
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{ display: "flex", justifyContent: "start", flexGrow: 1 }}
                >
                  {Number(currentReading) > 0
                    ? currentReading - selectedDetail.lastReading || 0
                    : 0}
                </Typography>
              </Box>
            </Grid>
          </Card>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 2,
            gap: 2,
          }}
        >
          <Card sx={{ width: "100%" }}>
            <CardHeader
              title="Calculations"
              slotProps={{
                title: { display: "flex", justifyContent: "start" },
              }}
            />

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                padding: 2,
              }}
            >
              <Typography variant="body1">
                <ElectricBolt /> EB Amount
              </Typography>
              <Typography variant="h6">
                <Price
                  amount={
                    currentReading
                      ? (currentReading - selectedDetail.lastReading) * 6
                      : 0
                  }
                />
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                padding: 2,
              }}
            >
              <Typography variant="body1">
                <Build /> Maintenance
              </Typography>
              <Typography variant="h6">
                <Price amount={selectedDetail.maintenance} />
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                padding: 2,
              }}
            >
              <Typography variant="body1">
                <Home /> Rent
              </Typography>
              <Typography variant="h6">
                <Price amount={selectedDetail.amount} />
              </Typography>
            </Box>
          </Card>
        </Box>

        {totalAmount && (
          <>
            <Box className="total playing">
              <h1> {totalAmount} </h1>
              <div class="wave"></div>
              <div class="wave"></div>
              <div class="wave"></div>
            </Box>
            <Box sx={{ mt: 2 }}>
              <Fab
                color="success"
                aria-label="edit"
                size="large"
                variant="circular"
                onClick={sendToWhatsApp}
              >
                <WhatsApp />
              </Fab>
            </Box>
          </>
        )}

        <Box sx={{ mt: 2, p: 2 }}>
          <Button fullWidth variant="contained" onClick={() => calculate()}>
            Calculate
            <Calculate sx={{ ml: 1 }} />
          </Button>
        </Box>
      </Box>
      <div ref={bottomRef} />
    </>
  );
};
