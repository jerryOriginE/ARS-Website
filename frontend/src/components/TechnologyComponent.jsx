import { Box } from "@mui/material";
import "@google/model-viewer";

export default function TechnologyShowcase() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        backgroundColor: "#111827",
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
        }}
      />
    </Box>
  );
}