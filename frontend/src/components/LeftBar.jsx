import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import {
  Box,
  Button,
  IconButton,
  Drawer,
  useMediaQuery
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import TimelineIcon from "@mui/icons-material/Timeline";
import SettingsIcon from "@mui/icons-material/Settings";

import logo from "../assets/img/logo.png";

export default function LeftBar() {
  const isMobile = useMediaQuery("(max-width: 900px)");
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      id: "dashboard",
      label: "Inicio",
      path: "/dashboard",
      icon: <HomeIcon />
    },
    {
      id: "activity",
      label: "Actividad",
      path: "/activity",
      icon: <TimelineIcon />
    },
    {
      id: "settings",
      label: "Ajustes",
      path: "/settings",
      icon: <SettingsIcon />
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);

    if (isMobile) {
      setOpen(false);
    }
  };

  const SidebarContent = () => (
    <Box
      sx={{
        width: 250,
        minHeight: "100vh",
        height: "100%",
        backgroundColor: "#D8EDAB",
        borderRight: "2px solid #C6E28F",
        display: "flex",
        flexDirection: "column",
        p: 3,
        flexShrink: 0
      }}
    >
      {/* Logo */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mb: 5
        }}
      >
        <img
          src={logo}
          alt="ARS Logo"
          style={{
            width: "140px",
            objectFit: "contain"
          }}
        />
      </Box>

      {/* Navigation */}
      {menuItems.map((item) => {
        const active = location.pathname === item.path;

        return (
          <Box
            key={item.id}
            sx={{
              position: "relative",
              mb: 1
            }}
          >
            {active && (
              <Box
                sx={{
                  position: "absolute",
                  left: -24,
                  top: 8,
                  width: 5,
                  height: 32,
                  borderRadius: "0 4px 4px 0",
                  backgroundColor: "#6E9B2D"
                }}
              />
            )}

            <Button
              fullWidth
              startIcon={item.icon}
              onClick={() => handleNavigation(item.path)}
              sx={{
                justifyContent: "flex-start",
                py: 1.5,
                px: 2,
                color: active ? "#2F3A1F" : "#4F5D35",
                backgroundColor: active
                  ? "rgba(255,255,255,0.45)"
                  : "transparent",
                fontWeight: active ? 700 : 500,
                borderRadius: 3,
                textTransform: "none",

                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.35)"
                }
              }}
            >
              {item.label}
            </Button>
          </Box>
        );
      })}
    </Box>
  );

  return (
    <>
      {/* Mobile Hamburger */}
      {isMobile && (
        <Box
          sx={{
            position: "fixed",
            top: 10,
            left: 10,
            zIndex: 2000
          }}
        >
          <IconButton
            onClick={() => setOpen(true)}
            sx={{
              bgcolor: "#D8EDAB",
              border: "1px solid #C6E28F",
              borderRadius: 2,

              "&:hover": {
                bgcolor: "#D0E69E"
              }
            }}
          >
            <MenuIcon />
          </IconButton>
        </Box>
      )}

      {/* Desktop Sidebar */}
      {!isMobile && <SidebarContent />}

      {/* Mobile Drawer */}
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
      >
        <SidebarContent />
      </Drawer>
    </>
  );
}