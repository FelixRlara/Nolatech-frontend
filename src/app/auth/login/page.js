"use client"

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import MuiLink from '@mui/material/Link';
import Link from 'next/link'
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import authService from '@/services/auth';

import { loginSchema } from '@/schemas/auth.schema';
import storage from '@/utils/storage';
import { useRouter } from 'next/navigation';
import { decodeToken } from '@/utils/jwt';

import { STORAGE_KEYS } from '../../../contants';
import useAlertSnackbar from '../../../hooks/useAlertSnackbar';
import Copyright from '../../../components/Copyrigth'


export default function LoginPage() {
    return (
        <SignIn />
    )
}

const defaultTheme = createTheme();

function SignIn() {

    const router = useRouter();

    const [alert, Snackbar] = useAlertSnackbar();

    const handleSubmit = (event) => {
        event.preventDefault();

        try {
            const data = new FormData(event.currentTarget);
            const email = data.get('email')
            let auth = {}
            if (email.includes('@')) {
                auth.email = email
            } else {
                auth.username = email
            }

            const payload = {
                ...auth,
                password: data.get('password'),
            }
            loginSchema.validateSync(payload);

            authService.login(payload).then((token) => {
                const user = decodeToken(token.access_token)
                storage.set(STORAGE_KEYS.ACCESS_TOKEN, token.access_token)
                storage.set(STORAGE_KEYS.USER, user)
                router.push(`/user/${user.id}`);
            })
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
                        Iniciar sesión
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Correo o Usuario"
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
                            Iniciar
                        </Button>
                        <Link
                            as={MuiLink}
                            href={'/auth/register'}
                            variant="contained"
                            align="center"
                        >
                            ¿No tienes una cuenta ? registrate aqui
                        </Link>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}