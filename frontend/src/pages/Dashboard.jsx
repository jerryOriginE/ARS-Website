import { Box } from "@mui/material";

import LeftBar from "../components/LeftBar";
import Navbar from "../components/Navbar";
import PointsCard from "../components/Dashboard/PointsCard";
import QRCard from "../components/Dashboard/QRCard";
import NewsSection from "../components/Dashboard/NewsSection";

export default function Dashboard() {

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        minHeight: "100vh",
        backgroundColor: "#F6FAF2"
      }}
    >
      {/* Sidebar */}
      <LeftBar />

      {/* Main */}
      <Box
        sx={{
          flex: 1,
          p: { xs: 2, md: 4 }
        }}
      >
        <Navbar />

        {/* Cards Row */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 3,
            mb: 3
          }}
        >
          <PointsCard />
          <QRCard />
        </Box>

        <NewsSection />
      </Box>
    </Box>
  );
}