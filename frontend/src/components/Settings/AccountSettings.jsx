import {
  Box,
  Typography,
  Divider,
  Button,
  Alert
} from "@mui/material";

export default function AccountSettings() {
  return (
    <Box>
      <Typography
        sx={{
          fontWeight: 700,
          color: "#2F3A1F",
          mb: 2
        }}
      >
        Información de la cuenta
      </Typography>

      <Typography>
        Nombre: Juan Pérez
      </Typography>

      <Typography>
        Correo: juan@email.com
      </Typography>

      <Typography>
        Miembro desde: 03/04/2026
      </Typography>

      <Divider sx={{ my: 3 }} />

      <Typography
        sx={{
          fontWeight: 700,
          mb: 2
        }}
      >
        Seguridad
      </Typography>

      <Button
        variant="outlined"
        sx={{ mr: 2 }}
      >
        Cambiar contraseña
      </Button>

      <Button
        variant="outlined"
      >
        Cerrar sesión
      </Button>

      <Divider sx={{ my: 3 }} />

      <Alert
        severity="warning"
        sx={{ mb: 2 }}
      >
        Zona de peligro
      </Alert>

      <Button
        variant="outlined"
        color="warning"
        sx={{ mr: 2 }}
      >
        Desactivar cuenta
      </Button>

      <Button
        variant="contained"
        color="error"
      >
        Eliminar cuenta
      </Button>
    </Box>
  );
}