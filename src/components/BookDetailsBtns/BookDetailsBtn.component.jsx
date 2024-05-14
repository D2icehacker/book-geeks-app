import React, { Fragment } from "react";
import { Button, styled } from "@mui/material";

const StyledButton = styled(Button)(({ theme, color }) => ({
  marginRight: '0.5rem',
  backgroundColor: theme.palette[color].main,
  color: theme.palette[color].contrastText,
  '&:hover': {
    backgroundColor: theme.palette[color].dark,
  }
}));

const BookDetailsBtn = ({ info, link, label, color }) => {
  return (
    <Fragment>
      <a
        href={info[link]}
        target="_blank"
        rel="noopener noreferrer"
        className="book-details__btn-link"
      >
        <StyledButton variant="contained" color={color}>
          {label}
        </StyledButton>
      </a>
    </Fragment>
  );
};

export default BookDetailsBtn;
