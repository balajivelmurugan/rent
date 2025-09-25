import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import ToggleButton from "@mui/material/ToggleButton";
import Chip from "@mui/material/Chip";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import axios from "axios";
import { CardActions } from "@mui/material";
import MoreHoriz from "@mui/icons-material/MoreHoriz";
import { MoreOutlined, ReadMore } from "@mui/icons-material";

export const RentList = () => {
  const [rentList, setRentList] = useState([]);
  const [selected, setSelected] = useState("all");

  useEffect(() => {
    // Fetch rent data from API
    axios
      .get(`${process.env.REACT_APP_API}/rents`)
      .then((res) => {
        console.log(res.data);
        setRentList(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch:", err);
      });
  }, []); // Only run once on mount

  return (
    <>
      <Box sx={{ height: "calc(100vh - 56px) " }}>
        <Box>
          <AppBar position="static" color="none">
            <Toolbar>
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1 }}
                justifyContent={"center"}
                display={"flex"}
              >
                Bill Records
              </Typography>
            </Toolbar>
          </AppBar>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            mt: 0.5,
            p: 2,
            position: "sticky",
            top: 0,
            backgroundColor: "background.paper",
            zIndex: 1,
          }}
        >
          <Chip
            label="All"
            variant={selected === "all" ? "filled" : "outlined"}
            color="info"
            onClick={() => setSelected("all")}
            sx={{ minWidth: "5rem" }}
          />
          <Chip
            label="Name"
            variant={selected === "name" ? "filled" : "outlined"}
            color="info"
            onClick={() => setSelected("name")}
            sx={{ minWidth: "5rem" }}
          />
          <Chip
            label="Month"
            variant={selected === "month" ? "filled" : "outlined"}
            color="info"
            onClick={() => setSelected("month")}
            sx={{ minWidth: "5rem" }}
          />
        </Box>
        <Box
          sx={{
            p: 2,
            paddingBottom: "56px",
          }}
        >
          {rentList.map((rent, index) => (
            <Card key={index} sx={{ width: "100%", mb: 2 }}>
              <Grid key={rent.eb}>
                <CardContent
                  sx={{
                    height: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "start",
                    }}
                  >
                    <Typography variant="h5" component="div">
                      {rent.tenantName}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ display: "flex", justifyContent: "start" }}
                    >
                      {rent.month}
                    </Typography>
                  </Box>
                  <Typography variant="h5" component="div">
                    {rent.totalAmount}
                  </Typography>
                </CardContent>
                <CardActions sx={{ display: "flex", justifyContent: "end" }}>
                  <Button variant="text">More Detail</Button>
                </CardActions>
              </Grid>
            </Card>
          ))}
        </Box>
      </Box>
    </>
  );
};
