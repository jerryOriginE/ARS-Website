import { useState } from "react";

import AccessibilitySettings from "../components/Settings/AccessibilitySettings";
import PrivacySettings from "../components/Settings/PrivacySettings";
import PersonalizationSettings from "../components/Settings/PersonalizationSettings";
import AccountSettings from "../components/Settings/AccountSettings";

import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import PrivacyTipIcon from "@mui/icons-material/PrivacyTip";
import PaletteIcon from "@mui/icons-material/Palette";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

import {
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  useMediaQuery
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

import Navbar from "../components/Navbar";
import LeftBar from "../components/LeftBar";
import SettingCard from "../components/Settings/SettingCard";

export default function Settings() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const isMobile = useMediaQuery("(max-width: 600px)");

  const renderModalContent = () => {
    switch (selected?.title) {
      case "Accesibilidad":
        return <AccessibilitySettings />;

      case "Privacidad":
        return <PrivacySettings />;

      case "Personalización":
        return <PersonalizationSettings />;

      case "Gestión de cuentas":
        return <AccountSettings />;

      default:
        return null;
    }
  };

  const settings = [
    {
      title: "Accesibilidad",
      description: "Opciones de lectura, contraste y navegación.",
      icon: <AccessibilityNewIcon />
    },
    {
      title: "Privacidad",
      description: "Gestiona permisos y datos personales.",
      icon: <PrivacyTipIcon />
    },
    {
      title: "Personalización",
      description: "Configura la apariencia y experiencia.",
      icon: <PaletteIcon />
    },
    {
      title: "Gestión de cuentas",
      description: "Administra tu información y cuenta.",
      icon: <ManageAccountsIcon />
    }
  ];

  const handleOpen = (item) => {
    setSelected(item);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelected(null);
  };

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

        {/* Header */}
        <Box sx={{ mb: { xs: 3, md: 4 } }}>
          <Typography
            sx={{
              color: "#2F3A1F",
              fontWeight: 700,
              fontSize: { xs: "1.6rem", md: "2rem" },
              mb: 1
            }}
          >
            Ajustes
          </Typography>

          <Typography
            sx={{
              color: "#6E9B2D",
              fontSize: { xs: "0.9rem", md: "1rem" }
            }}
          >
            Configura tu experiencia dentro de ARS.
          </Typography>
          <Typography
            sx={{
              color: "#ff0000",
              fontSize: { xs: "0.9rem", md: "1rem" }
            }}
          >
            Disclaimer: Esta sección es un prototipo y no representa la funcionalidad final de la aplicación.
          </Typography>
        </Box>

        {/* Cards */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr",
              md: "1fr 1fr"
            },
            gap: { xs: 2, md: 3 }
          }}
        >
          {settings.map((item) => (
            <SettingCard
              key={item.title}
              title={item.title}
              description={item.description}
              icon={item.icon}
              onClick={() => handleOpen(item)}
            />
          ))}
        </Box>

        {/* Modal */}
        <Dialog
          open={open}
          onClose={handleClose}
          fullWidth
          maxWidth="sm"
          fullScreen={isMobile}
        >
          <DialogTitle
            sx={{
              color: "#2F3A1F",
              fontWeight: 700,
              borderBottom: "2px solid #D8EDAB",
              pr: 6
            }}
          >
            {selected?.title}

            <IconButton
              onClick={handleClose}
              sx={{
                position: "absolute",
                right: 12,
                top: 12
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>

          <DialogContent sx={{ p: { xs: 2, md: 3 } }}>
            {renderModalContent()}
          </DialogContent>
        </Dialog>
      </Box>
    </Box>
  );
}