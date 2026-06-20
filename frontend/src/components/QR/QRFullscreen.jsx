// src/components/QRFullscreen.jsx 
import {
  Dialog,
  Box,
  Typography,
  IconButton
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import { QRCodeSVG } from "qrcode.react";

export default function QRFullScreen({
  open,
  onClose
}) {
  const qrData = JSON.stringify({
    company: "ARS",
    id: localStorage.getItem("id"),
    username: localStorage.getItem("username"),
    role: localStorage.getItem("role"),
    generatedAt: new Date().toISOString()
  });

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={onClose}
    >
      <Box
        sx={{
          height: "100%",
          bgcolor: "#F6FAF2",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          position: "relative"
        }}
      >
        {/* close button */}
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 20,
            right: 20,
            bgcolor: "#FFFFFF",
            border: "1px solid #D8EDAB"
          }}
        >
          <CloseIcon />
        </IconButton>

        <Typography
          sx={{
            fontWeight: 700,
            mb: 3,
            color: "#2F3A1F",
            fontSize: "1.5rem"
          }}
        >
          Tu código ARS
        </Typography>

        <Box
          sx={{
            p: 3,
            bgcolor: "#FFFFFF",
            border: "1px solid #D8EDAB",
            borderRadius: 3
          }}
        >
          <QRCodeSVG
            value={qrData}
            size={260}
            bgColor="#FFFFFF"
            fgColor="#2F3A1F"
            level="H"
          />
        </Box>

        <Typography
          sx={{
            mt: 3,
            color: "#6E9B2D",
            fontWeight: 600
          }}
        >
          Escanéame para registrar actividad
        </Typography>
      </Box>
    </Dialog>
  );
}