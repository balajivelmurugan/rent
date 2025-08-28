import {
  Card,
  CardActionArea,
  Grid,
  CardHeader,
  Avatar,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
// Import useData if it's a custom hook from your project
import { useData } from "../DataContext";
import { ArrowForwardIos, GroupsRounded } from "@mui/icons-material";

export const Home = () => {
  const { list } = useData();
  const navigate = useNavigate();
  const colors = ["#e74c3c", "#3498db", "#2ecc71", "#f1c40f", "#9b59b6"];
  return (
    <>
      <section className="home-header">
        <Box className="home-header-content">
          <Typography variant="h7">Total Tenants</Typography>
          <Typography variant="h4" fontWeight={700}>
            {list.length}
          </Typography>
        </Box>
        <GroupsRounded sx={{ fontSize: 40 }} />
      </section>
      <Grid container spacing={2} paddingInline={2}>
        {list.map((detail, index) => (
          <Card key={index} sx={{ width: "100%" }}>
            <CardActionArea
              sx={{
                height: "100%",
                "&[data-active]": {
                  backgroundColor: "action.selected",
                  "&:hover": {
                    backgroundColor: "action.selectedHover",
                  },
                },
              }}
              onClick={() =>
                navigate(`/detail`, { state: { selectedEB: detail.eb } })
              } // Navigate on click
            >
              <Grid key={detail.id}>
                <CardHeader
                  avatar={
                    <Avatar
                      sx={{ bgcolor: colors[index % colors.length] }}
                    ></Avatar>
                  }
                  title={detail.name}
                  subheader={detail.eb}
                  action={
                    <IconButton aria-label="settings">
                      <ArrowForwardIos />
                    </IconButton>
                  }
                  slotProps={{
                    title: {
                      display: "flex",
                      justifyContent: "start",
                      fontWeight: 600,
                    },
                    subheader: { display: "flex", justifyContent: "start" },
                  }}
                />
              </Grid>
            </CardActionArea>
          </Card>
        ))}
      </Grid>
    </>
  );
};
