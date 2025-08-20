import { Card, CardActionArea, Grid, CardHeader, Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
// Import useData if it's a custom hook from your project
import { useData } from "../DataContext";

export const Home = () => {
  const { list, loading } = useData();
  const navigate = useNavigate();
  return (
    <Grid container spacing={2} justifyContent={"center"}>
      {list.map((detail, index) => (
        <Card key={index} sx={{ mb: 2, maxWidth: 345, boxShadow: 3 }}>
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
                avatar={<Avatar></Avatar>}
                title={detail.name}
                subheader={detail.eb}
              />
            </Grid>
          </CardActionArea>
        </Card>
      ))}
    </Grid>
  );
};
