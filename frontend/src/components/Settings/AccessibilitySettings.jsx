import {
  Box,
  Typography,
  FormControlLabel,
  Switch,
  RadioGroup,
  Radio
} from "@mui/material";

export default function AccessibilitySettings() {
  return (
    <Box>
      <Typography
        sx={{
          fontWeight: 700,
          color: "#2F3A1F",
          mb: 2
        }}
      >
        Opciones de accesibilidad
      </Typography>

      <FormControlLabel
        control={<Switch />}
        label="Alto contraste"
      />

      <FormControlLabel
        control={<Switch />}
        label="Reducir animaciones"
      />

      <FormControlLabel
        control={<Switch />}
        label="Modo para daltonismo"
      />

      <FormControlLabel
        control={<Switch />}
        label="Lectura simplificada"
      />

      <Typography sx={{ mt: 3, mb: 1 }}>
        Tamaño de texto
      </Typography>

      <RadioGroup defaultValue="normal">
        <FormControlLabel
          value="small"
          control={<Radio />}
          label="Pequeño"
        />

        <FormControlLabel
          value="normal"
          control={<Radio />}
          label="Normal"
        />

        <FormControlLabel
          value="large"
          control={<Radio />}
          label="Grande"
        />
      </RadioGroup>
    </Box>
  );
}