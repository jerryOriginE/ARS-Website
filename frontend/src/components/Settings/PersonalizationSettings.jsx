import {
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Switch
} from "@mui/material";

export default function PersonalizationSettings() {
  return (
    <Box>
      <Typography
        sx={{
          fontWeight: 700,
          color: "#2F3A1F",
          mb: 2
        }}
      >
        Personalización
      </Typography>

      <Typography sx={{ mb: 1 }}>
        Tema
      </Typography>

      <RadioGroup defaultValue="light">
        <FormControlLabel
          value="light"
          control={<Radio />}
          label="Claro"
        />

        <FormControlLabel
          value="dark"
          control={<Radio />}
          label="Oscuro"
        />

        <FormControlLabel
          value="system"
          control={<Radio />}
          label="Sistema"
        />
      </RadioGroup>

      <Box sx={{ mt: 3 }}>
        <FormControlLabel
          control={<Switch defaultChecked />}
          label="Mostrar puntos en inicio"
        />

        <FormControlLabel
          control={<Switch defaultChecked />}
          label="Mostrar noticias en inicio"
        />

        <FormControlLabel
          control={<Switch />}
          label="Mostrar QR al abrir"
        />
      </Box>
    </Box>
  );
}