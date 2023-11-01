"use client"

import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

export default function Loader() {

    return (
        <Typography variant="body2" color="text.secondary" align="center" >
            {'Copyright © '}
            <Link color="inherit" href="https://nolatech.ai/es">
                Nolatech
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    )
}