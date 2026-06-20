import { Box, Chip, Typography } from "@mui/material";

export default function NewsSection() {

  const news = [
    {
      area: "Operaciones",
      date: "Hoy · 14:32",
      title: "Nueva ruta de recolección disponible en tu zona.",
      recent: true
    },
    {
      area: "Sistema",
      date: "Ayer · 18:10",
      title: "Actualización del portal ARS.",
      recent: false
    },
    {
      area: "Eventos",
      date: "12/06/2026 · 10:45",
      title: "Nueva capacitación disponible.",
      recent: false
    }
  ];

  return (
    <Box
      sx={{
        bgcolor: "#FFFFFF",
        border: "1px solid #D8EDAB",
        borderRadius: 1,
        p: { xs: 2, md: 3 }
      }}
    >
      <Typography
        sx={{
          fontWeight: 700,
          color: "#2F3A1F",
          mb: 3
        }}
      >
        Noticias y Actualizaciones
      </Typography>

      {news.map((item, i) => (
        <Box key={i}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              py: 1.5,
              flexDirection: { xs: "column", md: "row" }
            }}
          >
            {/* Dot */}
            <Box
              sx={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                bgcolor: item.recent ? "#6E9B2D" : "#B9D98A",
                flexShrink: 0,
                display: { xs: "none", md: "block" }
              }}
            />

            {/* Content */}
            <Box sx={{ flex: 1, width: "100%" }}>
              <Typography sx={{ fontWeight: 600, color: "#2F3A1F" }}>
                {item.title}
              </Typography>

              <Typography sx={{ fontSize: "0.8rem", color: "#8AA55A" }}>
                {item.date}
              </Typography>
            </Box>

            {/* Tag */}
            <Chip
              label={item.area}
              size="small"
              sx={{
                bgcolor: "#F6FAF2",
                color: "#6E9B2D",
                border: "1px solid #D8EDAB",
                fontWeight: 600
              }}
            />
          </Box>

          {i < news.length - 1 && (
            <Box sx={{ borderBottom: "1px solid #EEF5E2" }} />
          )}
        </Box>
      ))}
    </Box>
  );
}