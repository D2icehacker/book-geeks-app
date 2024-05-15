import React from "react";
import { AppBar, Toolbar, Typography, Link, styled } from "@mui/material";
import './Header.styles.scss';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  alignItems: 'center',
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  color: 'white',
}));

const Header = () => {
  return (
    <StyledAppBar position="sticky">
      <Toolbar>
        <Link to='/' className="link">
          <StyledTypography align='center' component='h1' variant='h4'>
            Book Geeks
          </StyledTypography>
        </Link>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Header;
