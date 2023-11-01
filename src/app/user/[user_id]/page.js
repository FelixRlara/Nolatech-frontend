"use client"

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '@/schemas/auth.schema';
import storage from '@/utils/storage';
import { useRouter } from 'next/navigation';
import { decodeToken } from '@/utils/jwt';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';


import { STORAGE_KEYS } from '../../../contants';
import userService from '../../../services/user'
import Loader from '../../../components/Loader'
import Copyright from '../../../components/Copyrigth'
import useAlertSnackbar from '../../../hooks/useAlertSnackbar';

export default function UserProfilePage({ params }) {

    const user = useUser(params.user_id);

    if (!user) {
        return (
            <Loader></Loader>
        )
    }

    return (
        <UpdatuUser user={user} />
    )
}

const defaultTheme = createTheme();

// TODO remove, this demo shouldn't need to reset the theme.
function UpdatuUser({ user }) {

    const router = useRouter()

    const [alert, Snackbar] = useAlertSnackbar();

    const [form, setform] = React.useState({
        email: user.email,
        name: user.name,
        lastname: user.lastname,
        username: user.username,
    })

    const updatefield = (field) => (event) => {
        setform(
            form => ({
                ...form,
                [field]: event.target.value
            })
        )
    }

    const handleLogout = () => {
        storage.removeAll();
        router.push("/auth/login");
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        //yupResolver(loginSchema);

        const data = new FormData(event.currentTarget);
        const payload = {
            email: data.get('email'),
            name: data.get('name'),
            lastname: data.get('lastname'),
            username: data.get('username'),
            password: data.get('password')
        }

        userService.updateUser(user.id, payload)
            .then((token) => {
                alert({
                    message: 'Usuario editado correctamente'
                })
            })
            .catch(err => {
                alert({
                    message: "Estamos presentando inconvenientes",
                    description: err
                })
            })
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
                        Editar cuenta
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
                            value={form.email}
                            onChange={updatefield('email')}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Name"
                            name="name"
                            autoComplete="name"
                            autoFocus
                            value={form.name}
                            onChange={updatefield('name')}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="lastname"
                            label="Lastname"
                            name="lastname"
                            autoComplete="lastname"
                            autoFocus
                            value={form.lastname}
                            onChange={updatefield('lastname')}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            value={form.username}
                            onChange={updatefield('username')}
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
                            value={form.password}
                            onChange={updatefield('password')}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Guardar
                        </Button>
                        <Button
                            onClick={handleLogout}
                            fullWidth
                            variant="outlined"
                            color="error"
                            sx={{ mt: 0.5, mb: 0.5 }}
                        >
                            salir
                        </Button>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}

const useUser = (user_id) => {
    const [user, setUser] = React.useState(null);

    React.useEffect(
        () => {
            const retrieveUser = async () => {
                const user = await userService.getUser(user_id);
                setUser(user)
            }

            retrieveUser()
        },
        [setUser, user_id]
    );

    return user;
}

