import { Box, Typography } from "@mui/material";

export default function SettingCard({
  title,
  description,
  icon,
  onClick
}) {
  return (
    <Box
      onClick={onClick}
      sx={{
        bgcolor: "#FFFFFF",
        border: "1px solid #D8EDAB",
        borderRadius: 3,

        p: { xs: 3, md: 4 },
        minHeight: { xs: 160, md: 200 },

        display: "flex",
        flexDirection: "column",

        cursor: "pointer",
        userSelect: "none",

        transition: "all 0.25s ease",

        // safer hover (only desktop)
        "@media (hover: hover)": {
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0 8px 20px rgba(110,155,45,0.15)",
            borderColor: "#6E9B2D"
          }
        },

        // mobile tap feedback
        "&:active": {
          transform: "scale(0.98)"
        }
      }}
    >
      {/* Icon */}
      <Box
        sx={{
          width: { xs: 56, md: 72 },
          height: { xs: 56, md: 72 },

          borderRadius: "50%",
          bgcolor: "#F6FAF2",
          border: "1px solid #D8EDAB",

          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          mb: { xs: 2, md: 3 },

          "& svg": {
            fontSize: { xs: 30, md: 40 },
            color: "#6E9B2D"
          }
        }}
      >
        {icon}
      </Box>

      {/* Title */}
      <Typography
        sx={{
          color: "#2F3A1F",
          fontWeight: 700,
          fontSize: { xs: "1rem", md: "1.15rem" },
          mb: 1
        }}
      >
        {title}
      </Typography>

      {/* Description */}
      <Typography
        sx={{
          color: "#6E9B2D",
          lineHeight: 1.5,
          fontSize: { xs: "0.85rem", md: "0.95rem" }
        }}
      >
        {description}
      </Typography>
    </Box>
  );
}