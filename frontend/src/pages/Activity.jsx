import { Box } from "@mui/material";

import LeftBar from "../components/LeftBar";
import Navbar from "../components/Navbar";
import ActivitySection from "../components/Activity/ActivitySection";

export default function History() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        minHeight: "100vh",
        backgroundColor: "#F6FAF2"
      }}
    >
      <LeftBar />

      <Box
        sx={{
          flex: 1,
          p: { xs: 2, md: 4 }
        }}
      >
        <Navbar />

        <ActivitySection />
      </Box>
    </Box>
  );
}