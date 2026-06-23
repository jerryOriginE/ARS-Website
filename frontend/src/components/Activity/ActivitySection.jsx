import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import API_BASE_URL from "../../config";

export default function ActivitySection() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem("id");
  
  useEffect(() => {
    if (!userId) return;

    async function fetchHistory() {
      try {
        const res = await fetch(`${API_BASE_URL}/auth/history/${userId}`);

        if (!res.ok) {
          throw new Error("Failed to fetch history");
        }

        const data = await res.json();

        const formatted = data.map((item) => ({
          date: new Date(item.created_at).toLocaleDateString("es-MX", {
            weekday: "long",
            day: "2-digit",
            month: "2-digit",
            year: "2-digit",
          }),
          data: item.waste_type.charAt(0).toUpperCase() + item.waste_type.slice(1) + " desechado",
          points: `+${item.points_awarded} puntos`,
        }));

        setActivities(formatted);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchHistory();
  }, [userId]);

  return (
    <Box
      sx={{
        bgcolor: "#FFFFFF",
        border: "1px solid #D8EDAB",
        borderRadius: 1,
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <Box sx={{ p: 3, borderBottom: "3px solid #6E9B2D" }}>
        <Typography sx={{ fontWeight: 700, color: "#2F3A1F", fontSize: "1.1rem" }}>
          Historial
        </Typography>
      </Box>

      {/* Column Titles */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "2fr 3fr 1fr" },
          px: 3,
          py: 2,
          bgcolor: "#F6FAF2",
          borderBottom: "1px solid #D8EDAB",
        }}
      >
        <Typography sx={{ color: "#6E9B2D", fontWeight: 700 }}>Fecha</Typography>
        <Typography sx={{ color: "#6E9B2D", fontWeight: 700 }}>Actividad</Typography>
        <Typography sx={{ color: "#6E9B2D", fontWeight: 700 }}>Puntos</Typography>
      </Box>

      {/* Loading */}
      {loading && (
        <Box sx={{ p: 3 }}>
          <Typography>Cargando historial...</Typography>
        </Box>
      )}

      {/* Rows */}
      {!loading &&
        activities.map((activity, index) => (
          <Box
            key={index}
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "2fr 3fr 1fr" },
              px: 3,
              py: 2,
              alignItems: "center",
              borderBottom:
                index !== activities.length - 1 ? "1px solid #EEF5E2" : "none",
              "&:hover": { bgcolor: "#F9FCF6" },
            }}
          >
            <Typography sx={{ color: "#2F3A1F" }}>{activity.date}</Typography>
            <Typography sx={{ color: "#2F3A1F", fontWeight: 500 }}>
              {activity.data}
            </Typography>
            <Typography sx={{ color: "#6E9B2D", fontWeight: 700 }}>
              {activity.points}
            </Typography>
          </Box>
        ))}
    </Box>
  );
}