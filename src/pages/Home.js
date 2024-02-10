import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Layout from "../components/Layout";

export default function Home() {
  return (
    <Layout>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12} lg={12}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "calc(80vh)",
            }}
          >
            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontSize: { xs: "1.5rem", sm: "2rem", md: "3rem" },
              }}
            >
              Welcome!
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Layout>
  );
}
