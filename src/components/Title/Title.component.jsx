import React from "react";
import Typography from "@mui/material/Typography";
import "./Title.styles.scss";

const Title = ({ text, align }) => (
  <Typography
    component="h2"
    variant="h3"
    align={!align ? 'left' : align}
    className="title-component"
  >
    {text}
  </Typography>
);

export default Title;
