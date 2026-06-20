import {
  Box,
  Typography,
  FormControlLabel,
  Switch,
  Button
} from "@mui/material";

export default function PrivacySettings() {
  return (
    <Box>
      <Typography
        sx={{
          fontWeight: 700,
          color: "#2F3A1F",
          mb: 2
        }}
      >
        Configuración de privacidad
      </Typography>

      <FormControlLabel
        control={<Switch defaultChecked />}
        label="Perfil visible"
      />

      <FormControlLabel
        control={<Switch />}
        label="Compartir estadísticas ambientales"
      />

      <FormControlLabel
        control={<Switch />}
        label="Mostrar actividad reciente"
      />

      <FormControlLabel
        control={<Switch />}
        label="Recibir correos informativos"
      />

      <Button
        variant="outlined"
        sx={{
          mt: 3,
          borderColor: "#6E9B2D",
          color: "#6E9B2D"
        }}
      >
        Descargar mis datos
      </Button>
    </Box>
  );
}