import React from 'react';
import { Container, Paper, Box, Typography } from '@mui/material';

const AuthLayout = ({ title, children }) => {
  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ mt: 8, p: 4 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            {title}
          </Typography>
          {children}
        </Box>
      </Paper>
    </Container>
  );
};

export default AuthLayout;