import React from "react";
import { Chip, styled } from "@mui/material"; 

const StyledChip = styled(Chip, {
  shouldForwardProp: (prop) => prop !== 'color' // Prevent the color prop from being passed to the DOM element
})(({ theme, color }) => {
  const backgroundColor = theme.palette[color]?.main || theme.palette.grey[500]; // Default to grey if color not found
  return {
    marginRight: '0.3rem',
    marginTop: '0.3rem',
    color: '#ffffff',
    backgroundColor,
  };
});

const BookChip = ({ label, color }) => {
  return (
    <StyledChip size="small" label={label} color={color} />
  );
};

export default BookChip;
