import { Box, IconButton, useMediaQuery } from "@mui/material";
import QrCodeIcon from "@mui/icons-material/QrCode";
import { useState } from "react";
import QRFullScreen from "./QRFullscreen";

export default function FloatingQRButton() {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const [open, setOpen] = useState(false);

  if (!isMobile) return null;

  return (
    <>
      {/* FLOATING BUTTON */}
      <Box
        sx={{
          position: "fixed",
          bottom: 20,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 99999
        }}
      >
        <IconButton
          onClick={() => setOpen(true)}
          sx={{
            width: 65,
            height: 65,
            bgcolor: "#6E9B2D",
            color: "#fff",
            border: "4px solid #D8EDAB",
            boxShadow: "0 6px 20px rgba(0,0,0,0.2)",

            "&:hover": {
              bgcolor: "#5C8527"
            }
          }}
        >
          <QrCodeIcon sx={{ fontSize: 34 }} />
        </IconButton>
      </Box>

      {/* FULL SCREEN QR */}
      <QRFullScreen
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}