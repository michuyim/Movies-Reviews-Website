import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Container, Box, TextField, Button, IconButton } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom'; // Assuming you are using react-router

const Header = () => {
  const [query, setQuery] = useState('');
  const history = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault();
    history.push(`/search?q=${query}`);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              Movie Reviews
            </Link>
          </Typography>
          <Box component="form" onSubmit={handleSearch} sx={{ display: 'flex', alignItems: 'center' }}>
            <TextField
              label="Search"
              variant="outlined"
              size="small"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              sx={{ bgcolor: 'white', borderRadius: 1, mr: 1 }}
            />
            <Button type="submit" variant="contained" color="secondary">
              Search
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;