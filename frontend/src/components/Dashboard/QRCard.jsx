// src/components/Dashboard/QRCard.jsx

import React, { useState } from "react";

import {
  Box,
  Typography,
  Button
} from "@mui/material";

import QrCodeIcon from "@mui/icons-material/QrCode";

import { QRCodeSVG } from "qrcode.react";

export default function QRCard() {

  const [showQR, setShowQR] = useState(false);

  const qrData = JSON.stringify({
    company: "ARS",
    id: localStorage.getItem("id"),
    username: localStorage.getItem("username"),
    role: localStorage.getItem("role"),
    generatedAt: new Date().toISOString()
  });

  return (
    <Box
      sx={{
        bgcolor: "#FFFFFF",
        border: "1px solid #D8EDAB",
        borderRadius: 1,
        p: 3,
        flex: 1,
        textAlign: "center"
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: 700,
          color: "#2F3A1F"
        }}
      >
        Código de Identificación
      </Typography>

      <Typography
        sx={{
          color: "#6B7280",
          fontSize: "0.9rem",
          mb: 2
        }}
      >
        Escanear para registrar actividad
      </Typography>

      {!showQR ? (
        <Button
          onClick={() => setShowQR(true)}
          sx={{
            p: 0,
            mt: 2,
            borderRadius: 4,
            textTransform: "none"
          }}
        >
          <Box
            sx={{
              width: 170,
              height: 170,

              border: "1px solid #D8EDAB",

              borderRadius: 1,

              backgroundColor: "#FAFCF7",

              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",

              transition: "all .2s ease",

              "&:hover": {
                backgroundColor: "#F3F8EA",
                borderColor: "#C6E28F",
                transform: "translateY(-2px)"
              }
            }}
          >
            <QrCodeIcon
              sx={{
                fontSize: 80,
                color: "#6E9B2D"
              }}
            />

            <Typography
              sx={{
                mt: 1,
                fontWeight: 600,
                color: "#6E9B2D"
              }}
            >
              Ver QR
            </Typography>
          </Box>
        </Button>
      ) : (
        <Box
          sx={{
            mt: 3,
            display: "flex",
            justifyContent: "center"
          }}
        >
          <Box
            sx={{
              p: 2,
              border: "1px solid #D8EDAB",
              borderRadius: 2,
              backgroundColor: "#FFFFFF",

              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            <QRCodeSVG
              value={qrData}
              size={180}
              bgColor="#FFFFFF"
              fgColor="#2F3A1F"
              level="H"
              includeMargin={true}
            />

            <Typography
              sx={{
                mt: 2,
                fontWeight: 600,
                color: "#2F3A1F"
              }}
            >
              ARS
            </Typography>

            <Typography
              sx={{
                fontSize: "0.75rem",
                color: "#6B7280"
              }}
            >
              {localStorage.getItem("username")}
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
}