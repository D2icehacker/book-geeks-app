import React from "react";
import { Typography, styled } from "@mui/material";
import "./Message.styles.scss";

const StyledTypography = styled(Typography)(({ theme }) => ({
  margin: '1rem 0',
}));

const Message = ({ text }) => {
  return (
    <StyledTypography align="center" component="h2" variant="h4">
      {text}
    </StyledTypography>
  );
};

export default Message;
