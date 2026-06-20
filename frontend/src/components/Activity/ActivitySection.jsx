import { Box, Typography } from "@mui/material";

export default function ActivitySection() {
  const activities = [
    {
      date: "Lunes 03/04/26",
      data: "Metal desechado",
      points: "+20 puntos"
    },
    {
      date: "Martes 04/04/26",
      data: "Plástico reciclado",
      points: "+15 puntos"
    },
    {
      date: "Miércoles 05/04/26",
      data: "Cartón entregado",
      points: "+10 puntos"
    },
    {
      date: "Jueves 06/04/26",
      data: "Vidrio reciclado",
      points: "+25 puntos"
    }
  ];

  return (
    <Box
      sx={{
        bgcolor: "#FFFFFF",
        border: "1px solid #D8EDAB",
        borderRadius: 1,
        overflow: "hidden"
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 3,
          borderBottom: "3px solid #6E9B2D"
        }}
      >
        <Typography
          sx={{
            fontWeight: 700,
            color: "#2F3A1F",
            fontSize: "1.1rem"
          }}
        >
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
          fontWeight: 700
        }}
      >
        <Typography sx={{ color: "#6E9B2D", fontWeight: 700 }}>
          Fecha
        </Typography>

        <Typography sx={{ color: "#6E9B2D", fontWeight: 700 }}>
          Actividad
        </Typography>

        <Typography sx={{ color: "#6E9B2D", fontWeight: 700 }}>
          Puntos
        </Typography>
      </Box>

      {/* Activity Rows */}
      {activities.map((activity, index) => (
        <Box
          key={index}
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "2fr 3fr 1fr" },
            px: 3,
            py: 2,
            alignItems: "center",
            borderBottom:
              index !== activities.length - 1
                ? "1px solid #EEF5E2"
                : "none",
            "&:hover": {
              bgcolor: "#F9FCF6"
            }
          }}
        >
          <Typography sx={{ color: "#2F3A1F" }}>
            {activity.date}
          </Typography>

          <Typography sx={{ color: "#2F3A1F", fontWeight: 500 }}>
            {activity.data}
          </Typography>

          <Typography
            sx={{
              color: "#6E9B2D",
              fontWeight: 700
            }}
          >
            {activity.points}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}