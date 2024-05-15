import React from "react";
import { Toolbar, styled } from "@mui/material";
import "./Footer.styles.scss";

const StyledFooter = styled('footer')(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  marginTop: '1rem',
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  justifyContent: 'center',
  textAlign: 'center',
  fontWeight: 'bold',
}));

const Footer = () => {
  return (
    <StyledFooter>
      <StyledToolbar>Book Geeks 2024</StyledToolbar>
    </StyledFooter>
  );
};

export default Footer;
