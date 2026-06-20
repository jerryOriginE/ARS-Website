import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography
} from '@mui/material';

import { motion } from 'framer-motion';
import { useAlert } from '../context/AlertContext';
import API_BASE_URL from '../config';

import logo from '../assets/img/logo.png';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();
  const { showAlert } = useAlert();

  // simple email validation
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // VALIDATIONS
    if (!username || !email || !password || !confirmPassword) {
      return showAlert('Todos los campos son obligatorios', 'error');
    }

    if (!isValidEmail(email)) {
      return showAlert('Correo electrónico inválido', 'error');
    }

    if (password.length < 6) {
      return showAlert('La contraseña debe tener al menos 6 caracteres', 'error');
    }

    if (password !== confirmPassword) {
      return showAlert('Las contraseñas no coinciden', 'error');
    }

    const res = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username,
        email,
        password
      })
    });

    if (res.ok) {
      await res.json();

      showAlert('Registro exitoso, ahora inicia sesión', 'success');
      navigate('/login');
    } else {
      const err = await res.json();
      showAlert(err.message || 'Error al registrarse', 'error');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
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
              backgroundColor: '#FFFFFF',
              border: '1px solid #D8EDAB',
              boxShadow: '0 20px 60px rgba(110, 155, 45, 0.15)',
              textAlign: 'center'
            }}
          >
            {/* LOGO */}
            <Box sx={{ mb: 3, display: 'flex', justifyContent: 'center' }}>
              <Box
                sx={{
                  width: 90,
                  height: 90,
                  borderRadius: 3,
                  backgroundColor: '#F6FAF2',
                  border: '1px solid #D8EDAB',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  p: 1.5
                }}
              >
                <img
                  src={logo}
                  alt="ARS Logo"
                  style={{
                    width: '250%',
                    height: '250%',
                    objectFit: 'contain'
                  }}
                />
              </Box>
            </Box>

            {/* TITLE */}
            <Typography
              variant="h4"
              sx={{ fontWeight: 800, color: '#2F3A1F' }}
            >
              Crear Cuenta ARS
            </Typography>

            <Typography
              sx={{
                color: '#6B7280',
                mt: 1,
                mb: 4,
                fontSize: '0.95rem'
              }}
            >
              Registro al ecosistema ARS
            </Typography>

            {/* FORM */}
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Usuario"
                margin="normal"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    backgroundColor: '#FAFCF7',
                    '& fieldset': { borderColor: '#D8EDAB' },
                    '&:hover fieldset': { borderColor: '#C6E28F' },
                    '&.Mui-focused fieldset': { borderColor: '#6E9B2D' }
                  }
                }}
              />

              <TextField
                fullWidth
                label="Correo electrónico"
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    backgroundColor: '#FAFCF7',
                    '& fieldset': { borderColor: '#D8EDAB' },
                    '&:hover fieldset': { borderColor: '#C6E28F' },
                    '&.Mui-focused fieldset': { borderColor: '#6E9B2D' }
                  }
                }}
              />

              <TextField
                fullWidth
                label="Contraseña"
                type="password"
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    backgroundColor: '#FAFCF7',
                    '& fieldset': { borderColor: '#D8EDAB' },
                    '&:hover fieldset': { borderColor: '#C6E28F' },
                    '&.Mui-focused fieldset': { borderColor: '#6E9B2D' }
                  }
                }}
              />

              <TextField
                fullWidth
                label="Confirmar contraseña"
                type="password"
                margin="normal"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    backgroundColor: '#FAFCF7',
                    '& fieldset': { borderColor: '#D8EDAB' },
                    '&:hover fieldset': { borderColor: '#C6E28F' },
                    '&.Mui-focused fieldset': { borderColor: '#6E9B2D' }
                  }
                }}
              />

              <Button
                fullWidth
                type="submit"
                variant="contained"
                sx={{
                  mt: 3,
                  py: 1.4,
                  borderRadius: 2,
                  backgroundColor: '#6E9B2D',
                  color: '#FFFFFF',
                  fontWeight: 700,
                  textTransform: 'none',
                  boxShadow: 'none',
                  '&:hover': {
                    backgroundColor: '#5C8626',
                    boxShadow: '0 8px 20px rgba(110, 155, 45, 0.25)'
                  }
                }}
              >
                Registrarse
              </Button>

              {/* FOOTER */}
              <Typography
                sx={{
                  mt: 3,
                  fontSize: '0.75rem',
                  color: '#9CA3AF'
                }}
              >
                ARS System © {new Date().getFullYear()}
              </Typography>
            </form>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
}