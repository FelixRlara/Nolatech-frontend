"use client"

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import MuiLink from '@mui/material/Link';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import authService from '@/services/auth';
import { useRouter } from 'next/navigation';
import { registerSchema } from '@/schemas/auth.schema';

import useAlertSnackbar from '../../../hooks/useAlertSnackbar';
import Copyright from '../../../components/Copyrigth'

export default function RegisterPage() {
  return (
    <Register />
  )
}

const defaultTheme = createTheme();


function Register() {
  const router = useRouter();

  const [alert, Snackbar] = useAlertSnackbar();

  const handleSubmit = (event) => {

    event.preventDefault();

    try {
      const data = new FormData(event.currentTarget);
      const payload = {
        email: data.get('email'),
        password: data.get('password'),
        name: data.get('name'),
        lastname: data.get('lastname'),
        username: data.get('username'),
      }
      registerSchema.validateSync(payload);



      authService.register(payload)
        .then((user) => { })
        .catch(err => {
          alert({
            message: "Estamos presentando inconvenientes",
            description: err,
            type: "error",
          })
        })
    } catch (error) {
      alert({
        message: error.message,
        description: '',
        type: "error",
      })
    }

  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Snackbar />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Ingresa tus datos para registrarte
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="name"
              label="Nombre"
              type="name"
              id="name"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="lastname"
              label="Apellido"
              type="lastname"
              id="lastname"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="username"
              label="Usuario"
              type="username"
              id="username"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Correo"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Registrar
            </Button>
            <Link
              as={MuiLink}
              href={'/auth/login'}
              variant="contained"
              align='center'
            >
              ¿Ya estas registrado ? inicia sesión aqui
            </Link>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}