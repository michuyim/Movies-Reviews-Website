import React, { useState } from 'react';
import { Avatar, Button, TextField, Link, Grid, Box, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthLayout from './AuthLayout';
import { useUser } from './UserContext';

export default function SignUp() {
  const { setUser } = useUser();
  const history = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userData = {
      username: data.get('username'),
      email: data.get('email'),
      password: data.get('password'),
    };

    try {
      const response = await axios.post('http://localhost:2003/api/signup', userData, {
        withCredentials: true,
      });
      if (response.status === 201) {
        setUser(response.data.user);
        history.push('/');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Signup failed');
    }
  };

  return (
    <AuthLayout title="Sign Up">
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      {error && <Typography color="error">{error}</Typography>}
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          autoComplete="username"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
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
          Sign Up
        </Button>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link href="/login" variant="body2">
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
      </Box>
    </AuthLayout>
  );
}