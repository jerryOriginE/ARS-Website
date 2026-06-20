import React from 'react';
import { Snackbar, Alert } from '@mui/material';
import { motion } from 'framer-motion';

export default function CustomAlert({ open, onClose, message, severity = 'info' }) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
      >
        <Alert
          onClose={onClose}
          severity={severity}
          sx={{
            minWidth: { xs: 280, sm: 360 },
            borderRadius: 3,
            background:
              severity === 'success'
                ? 'linear-gradient(180deg, rgba(247,251,240,0.98), rgba(227,240,208,0.98))'
                : severity === 'error'
                ? 'linear-gradient(180deg, rgba(255,245,245,0.98), rgba(255,231,231,0.98))'
                : 'linear-gradient(180deg, rgba(247,251,240,0.98), rgba(235,244,220,0.98))',
            color: '#32412a',
            border:
              severity === 'error'
                ? '1px solid rgba(138,62,62,0.18)'
                : '1px solid rgba(122,146,82,0.18)',
            fontFamily: 'Inter, Segoe UI, sans-serif',
            boxShadow: '0 18px 40px rgba(61, 83, 30, 0.18)',
            '& .MuiAlert-icon': {
              color:
                severity === 'success'
                  ? '#4f6d2b'
                  : severity === 'error'
                  ? '#8a3e3e'
                  : '#7a9252',
            },
          }}
        >
          {message}
        </Alert>
      </motion.div>
    </Snackbar>
  );
}
