import {
  Box,
  Typography,
  IconButton,
  Avatar
} from "@mui/material";

import NotificationsIcon from "@mui/icons-material/Notifications";
import LogoutIcon from "@mui/icons-material/Logout";

import { useNotifications } from "../context/NotificationContext";
import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import { getProfile } from "../api/authHelper";
import { calculateLevel } from "../api/levelSystem";

export default function Navbar() {
  const navigate = useNavigate();

  const {
    openNotifications,
    unreadCount
  } = useNotifications();

  const [profile, setProfile] = useState(null);

  const username =
    localStorage.getItem("username") || "Usuario";

  useEffect(() => {
    async function loadProfile() {
      try {
        const data = await getProfile();
        setProfile(data);
      } catch (err) {
        console.error("Navbar profile error:", err);
      }
    }

    loadProfile();
  }, []);

  const points = profile?.points || 0;
  const level = profile?.level || calculateLevel(points);

  const today = new Date().toLocaleDateString("es-MX", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    localStorage.removeItem("id");

    navigate("/login");
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        pb: 2,
        mb: 4,
        borderBottom: "1px solid #DCE7CC"
      }}
    >
      {/* LEFT */}
      <Box>
        <Typography sx={{ fontWeight: 700, color: "#2F3A1F", fontSize: { xs: "1.3rem", md: "2rem" } }}>
          ¡Hola, <Box component="span" sx={{ color: "#618132" }}>{username}</Box>!
        </Typography>

        <Typography sx={{ mt: 0.5, color: "#6B7280", fontSize: "0.95rem", textTransform: "capitalize" }}>
          {today}
        </Typography>

        <Typography sx={{ color: "#889172", fontSize: "0.85rem" }}>
          Bienvenido de regreso
        </Typography>
      </Box>

      {/* RIGHT */}
      <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>

        {/* NOTIFICATIONS */}
        <IconButton
          onClick={openNotifications}
          sx={{
            width: 42,
            height: 42,
            borderRadius: 1,
            bgcolor: "#FFFFFF",
            border: "1px solid #D8EDAB",
            color: "#6E9B2D",
            position: "relative",
            "&:hover": { bgcolor: "#F8FBF3" }
          }}
        >
          <NotificationsIcon />

          {/* 🔴 RED BADGE */}
          {unreadCount > 0 && (
            <Box
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                width: 10,
                height: 10,
                borderRadius: "50%",
                bgcolor: "#D14343",
                border: "2px solid white"
              }}
            />
          )}
        </IconButton>

        {/* USER */}
        <Box
          sx={{
            bgcolor: "#FFFFFF",
            border: "1px solid #D8EDAB",
            borderRadius: 1,
            py: 1,
            px: 1.5,
            minWidth: 150,
            display: "flex",
            alignItems: "center",
            gap: 1
          }}
        >
          <Avatar sx={{ width: 34, height: 34, bgcolor: "#D8EDAB", color: "#4F6B1E" }} />

          <Box>
            <Typography sx={{ fontWeight: 700, fontSize: "0.85rem", color: "#2F3A1F" }}>
              {username}
            </Typography>

            <Typography sx={{ fontSize: "0.75rem", color: "#6B7280" }}>
              Nivel {level}
            </Typography>
          </Box>
        </Box>

        {/* LOGOUT */}
        <IconButton
          onClick={handleLogout}
          sx={{
            width: 42,
            height: 42,
            borderRadius: 1,
            bgcolor: "#FFFFFF",
            border: "1px solid #F2B8B5",
            color: "#D14343",
            "&:hover": { bgcolor: "#FFF5F5" }
          }}
        >
          <LogoutIcon />
        </IconButton>

      </Box>
    </Box>
  );
}