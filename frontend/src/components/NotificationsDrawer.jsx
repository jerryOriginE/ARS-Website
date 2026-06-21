import {
  Drawer,
  Box,
  Typography,
  Divider,
  IconButton
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

import { useNotifications } from "../context/NotificationContext";

function formatNotificationDate(dateString) {
  if (!dateString) return "";

  const date = new Date(String(dateString).replace(" ", "T"));

  const now = new Date();

  const diffTime = now - date;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  const time = date.toLocaleTimeString("es-MX", {
    hour: "2-digit",
    minute: "2-digit"
  });

  if (diffDays === 0) return `Hoy · ${time}`;
  if (diffDays === 1) return `Ayer · ${time}`;

  return `${date.toLocaleDateString("es-MX")} · ${time}`;
}

export default function NotificationDrawer() {
  const {
    open,
    closeNotifications,
    notifications
  } = useNotifications();

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={closeNotifications}
    >
      <Box
        sx={{
          width: { xs: "100vw", sm: 380 },
          height: "100%",
          p: 3,
          bgcolor: "#F6FAF2"
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 2
          }}
        >
          <Typography
            sx={{
              fontWeight: 700,
              color: "#2F3A1F"
            }}
          >
            Notificaciones
          </Typography>

          <IconButton onClick={closeNotifications}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider sx={{ mb: 2 }} />

        {/* Content */}
        {notifications.length === 0 ? (
          <Typography sx={{ color: "#6E9B2D" }}>
            Sin notificaciones
          </Typography>
        ) : (
          notifications.map((n) => (
            <Box
              key={n.id}
              sx={{
                mb: 2,
                p: 2,
                bgcolor: "#FFFFFF",
                border: "1px solid #D8EDAB",
                borderRadius: 2
              }}
            >
              <Typography sx={{ fontWeight: 600 }}>
                {n.title}
              </Typography>

              <Typography
                sx={{
                  fontSize: "0.85rem",
                  color: "#6E9B2D"
                }}
              >
                {n.message}
              </Typography>

              <Typography
                sx={{
                  fontSize: "0.75rem",
                  color: "#9AA67A",
                  mt: 1
                }}
              >
                {formatNotificationDate(n.created_at)}
              </Typography>
            </Box>
          ))
        )}
      </Box>
    </Drawer>
  );
}