import React from "react";
import { AppBar, Toolbar, Typography, styled } from "@mui/material";
import { Link } from "react-router-dom";
import './Header.styles.scss';
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  display: "flex",
  flexDirection: "row"
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  color: 'white',
}));

const Header = () => {
  return (
    <StyledAppBar position="sticky">
    <Toolbar>
      <Link to='/' className="link" style={{cursor: "pointer", textDecoration: "none"}}>
        <StyledTypography align='center' component='h1' variant='h4'>
          Book Geeks
        </StyledTypography>
      </Link>
      <Link to='/bookmarks' className="link" style={{color: "white", paddingLeft: "100px", cursor: "pointer", textDecoration: "none", fontWeight: "bold"}}>
        Bookmarks
       
      </Link>
      <Link to='/favourites'  className="link" style={{color: "white", paddingLeft: "15px", cursor: "pointer", textDecoration: "none", fontWeight: "bold"}}>
        Favorites
      </Link>
    </Toolbar>
  </StyledAppBar>
  );
};

export default Header;
