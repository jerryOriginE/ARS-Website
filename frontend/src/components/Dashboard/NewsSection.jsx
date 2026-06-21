import { useEffect, useState } from "react";
import { Box, Chip, Typography, Skeleton } from "@mui/material";

import { getNews } from "../../api/newsHelper";

function formatNewsDate(dateString) {
  if (!dateString) return "";

  // FORCE ISO parsing
  const date = new Date(String(dateString).replace(" ", "T") + "Z");

  const now = new Date();

  const diffTime = now - date;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  const time = date.toLocaleTimeString("es-MX", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  });

  if (diffDays === 0) return `Hoy · ${time}`;
  if (diffDays === 1) return `Ayer · ${time}`;

  return `${date.toLocaleDateString("es-MX")} · ${time}`;
}

export default function NewsSection() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNews() {
      try {
        const data = await getNews();
        setNews(data);
      } catch (err) {
        console.error("Error loading news:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchNews();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          bgcolor: "#FFFFFF",
          border: "1px solid #D8EDAB",
          borderRadius: 1,
          p: { xs: 2, md: 3 }
        }}
      >
        <Skeleton width={200} height={30} />
        <Skeleton height={60} sx={{ mt: 2 }} />
        <Skeleton height={60} sx={{ mt: 1 }} />
        <Skeleton height={60} sx={{ mt: 1 }} />
      </Box>
    );
  }

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

      {news.length === 0 ? (
        <Typography sx={{ color: "#6B7280" }}>
          No hay noticias disponibles.
        </Typography>
      ) : (
        news.map((item, i) => (
          <Box key={item.id || i}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                py: 1.5,
                flexDirection: { xs: "column", md: "row" }
              }}
            >
              {/* DOT */}
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

              {/* CONTENT */}
              <Box sx={{ flex: 1, width: "100%" }}>
                <Typography sx={{ fontWeight: 600, color: "#2F3A1F" }}>
                  {item.content}
                </Typography>

                <Typography sx={{ fontSize: "0.8rem", color: "#8AA55A" }}>
                  {formatNewsDate(item.date || item.created_at)}
                </Typography>
              </Box>

              {/* CHIP */}
              <Chip
                label={item.label}
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
        ))
      )}
    </Box>
  );
}