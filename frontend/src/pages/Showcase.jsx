import { Box, Typography, Paper, Chip, Stack } from "@mui/material";

import "@google/model-viewer";

export default function TechnologyShowcase() {
  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        backgroundColor: "#111827",
        zIndex: 1300,
      }}
    >
      <model-viewer
        src="/pcb.gltf"
        camera-controls
        auto-rotate
        shadow-intensity="1"
        exposure="1.2"
        style={{
          width: "100%",
          height: "100%",
          background: "transparent",
          borderRadius: 0,
        }}
      />
    </Box>
  );
}