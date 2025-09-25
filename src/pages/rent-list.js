import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  CardActions,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";

export const RentList = () => {
  const [rentList, setRentList] = useState([]);
  const [selected, setSelected] = useState("all");
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const groupedByName = rentList.reduce((acc, rent) => {
    const name = rent.tenantName;
    if (!acc[name]) acc[name] = [];
    acc[name].push(rent);
    return acc;
  }, {});

  const groupedByMonth = rentList.reduce((acc, rent) => {
    const month = rent.month;
    if (!acc[month]) acc[month] = [];
    acc[month].push(rent);
    return acc;
  }, {});

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
          {selected === "all" &&
            rentList.map((rent, index) => (
              <Card key={index} sx={{ width: "100%", mb: 2 }}>
                <Grid key={rent.eb}>
                  <CardContent
                    sx={{
                      height: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingBottom: "0px",
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

          {selected !== "all" &&
            Object.entries(groupedByName).map(([name, rents], index) => (
              <Accordion
                expanded={expanded === index}
                onChange={handleChange(index)}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id={index}
                >
                  <Typography
                    component="span"
                    sx={{ width: "33%", flexShrink: 0 }}
                  >
                    {name}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {rents.map((rent, index) => (
                    <Card key={index} sx={{ width: "100%", mb: 2 }}>
                      <Grid key={rent.eb}>
                        <CardContent
                          sx={{
                            height: "100%",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            paddingBottom: "0px",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "start",
                            }}
                          >
                            <Typography variant="h6" color="text.secondary">
                              {rent.month}
                            </Typography>
                          </Box>
                          <Typography variant="h5" component="div">
                            {rent.totalAmount}
                          </Typography>
                        </CardContent>
                        <CardActions
                          sx={{ display: "flex", justifyContent: "end" }}
                        >
                          <Button variant="text">More Detail</Button>
                        </CardActions>
                      </Grid>
                    </Card>
                  ))}
                </AccordionDetails>
              </Accordion>
            ))}
        </Box>
      </Box>
    </>
  );
};
