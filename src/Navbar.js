// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Library App
        </Typography>
        <Button color="inherit" component={Link} to="/book">
          Book List
        </Button>
        <Button color="inherit" component={Link} to="/student">
          Student List
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
