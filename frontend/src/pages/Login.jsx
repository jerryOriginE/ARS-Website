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

// LOGO (adjust path if needed)
import logo from '../assets/img/logo.png';

export default function Login() {
  const [usuario, setUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');

  const navigate = useNavigate();
  const { showAlert } = useAlert();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: usuario,
        password: contraseña
      })
    });

    if (res.ok) {
      const data = await res.json();

      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role);
      localStorage.setItem('username', data.username);
      localStorage.setItem('id', data.id);

      showAlert('Inicio de sesión exitoso', 'success');
      window.dispatchEvent(new Event('userUpdated'));

      navigate('/dashboard');
    } else {
      const err = await res.json();

      showAlert(err.message || 'Credenciales inválidas', 'error');
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
            {/* LOGO SECTION */}
            <Box
              sx={{
                mb: 3,
                display: 'flex',
                justifyContent: 'center'
              }}
            >
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
              sx={{
                fontWeight: 800,
                color: '#2F3A1F'
              }}
            >
              ARS Inicio de Sesión
            </Typography>

            <Typography
              sx={{
                color: '#6B7280',
                mt: 1,
                mb: 4,
                fontSize: '0.95rem'
              }}
            >
              Sistema de acceso al ecosistema ARS
            </Typography>

            {/* FORM */}
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Usuario"
                margin="normal"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    backgroundColor: '#FAFCF7',

                    '& fieldset': {
                      borderColor: '#D8EDAB'
                    },
                    '&:hover fieldset': {
                      borderColor: '#C6E28F'
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#6E9B2D'
                    }
                  }
                }}
              />

              <TextField
                fullWidth
                label="Contraseña"
                type="password"
                margin="normal"
                value={contraseña}
                onChange={(e) => setContraseña(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    backgroundColor: '#FAFCF7',

                    '& fieldset': {
                      borderColor: '#D8EDAB'
                    },
                    '&:hover fieldset': {
                      borderColor: '#C6E28F'
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#6E9B2D'
                    }
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
                Iniciar Sesión
              </Button>

              {/* Register Link */}
              <Typography
                sx={{
                  mt: 2,
                  fontSize: '0.9rem',
                  color: '#6B7280'
                }}
              >
                ¿No tienes una cuenta?{' '}
                <Button
                  variant="text"
                  onClick={() => navigate('/register')}
                  sx={{
                    padding: 0,
                    minWidth: 'auto',
                    fontSize: '0.9rem',
                    color: '#6E9B2D',
                    textTransform: 'none',
                    '&:hover': {
                      backgroundColor: 'transparent',
                      color: '#5C8626'
                    }
                  }}
                >
                  Regístrate
                </Button>
              </Typography>

              {/* FOOTER TEXT */}
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