import { Box, Button, Container, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        background: `
          radial-gradient(circle at top, #F6FAF2 0%, #EAF3E0 40%, #D8EDAB 100%)
        `,

        px: 2
      }}
    >
      <Container maxWidth="sm">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Paper
            elevation={0}
            sx={{
              p: 5,
              borderRadius: 4,

              backgroundColor: "#FFFFFF",
              border: "1px solid #D8EDAB",

              boxShadow: "0 20px 60px rgba(110, 155, 45, 0.15)",
              textAlign: "center"
            }}
          >
            {/* BIG CODE */}
            <Typography
              sx={{
                fontSize: "4.5rem",
                fontWeight: 800,
                color: "#4F6B1E",
                lineHeight: 1
              }}
            >
              404
            </Typography>

            {/* TITLE */}
            <Typography
              sx={{
                fontSize: "1.6rem",
                fontWeight: 800,
                color: "#2F3A1F",
                mt: 1
              }}
            >
              Página no encontrada
            </Typography>

            {/* SUBTITLE */}
            <Typography
              sx={{
                color: "#6B7280",
                mt: 1,
                mb: 4,
                fontSize: "0.95rem"
              }}
            >
              La página que buscas no existe o fue movida del sistema.
            </Typography>

            {/* BUTTON */}
            <Button
              onClick={() => navigate("/dashboard")}
              fullWidth
              variant="contained"
              sx={{
                py: 1.4,
                borderRadius: 2,

                backgroundColor: "#6E9B2D",
                color: "#FFFFFF",

                fontWeight: 700,
                textTransform: "none",

                boxShadow: "none",

                "&:hover": {
                  backgroundColor: "#5C8626",
                  boxShadow: "0 8px 20px rgba(110, 155, 45, 0.25)"
                }
              }}
            >
              Volver al dashboard
            </Button>

            {/* FOOTER */}
            <Typography
              sx={{
                mt: 3,
                fontSize: "0.75rem",
                color: "#9CA3AF"
              }}
            >
              ARS System © {new Date().getFullYear()}
            </Typography>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
}