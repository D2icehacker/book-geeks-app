import React, { Suspense } from "react";
import { Link } from "react-router-dom";
import {
  Paper,
  Typography,
  Button,
  CircularProgress,
  styled,
} from "@mui/material";

import noImg from "../../assets/no-image.png";

import "./Book.styles.scss";

const Image = React.lazy(() => import("../Image/Image.component"));

const StyledPaper = styled(Paper)(({ theme }) => ({
  position: "relative",
  overflow: "hidden",
  margin: "1rem",
}));

const BookContent = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.secondary.contrastText,
  height: "100%",
  position: "relative",
  top: "253px",
  zIndex: "2",
  transition: "top 0.3s ease-in-out",
}));

const BookTitle = styled(Typography)(({ theme }) => ({
  fontSize: "1rem",
  lineHeight: "1.2rem",
}));

const BookDate = styled(Typography)(({ theme }) => ({
  fontSize: "0.8rem",
}));

const BtnLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: theme.palette.primary.contrastText,
}));

const Btn = styled(Button)(({ theme }) => ({
  marginTop: "0.5rem",
}));

const Book = ({ book }) => {
  const { volumeInfo } = book;
  let imgURL = volumeInfo.imageLinks ? volumeInfo.imageLinks.thumbnail : noImg;
  let publishedYear = volumeInfo.publishedDate
    ? volumeInfo.publishedDate.slice(0, 4)
    : null;

  return (
    <StyledPaper className="book__paper">
      <div className="book__img-container">
        <Suspense
          fallback={
            <div className="book-loading-container">
              <CircularProgress />
            </div>
          }
        >
          <Image
            src={imgURL}
            alt={volumeInfo.title}
            classnames="book__bg-img"
          />
        </Suspense>
      </div>
      <BookContent>
        <div className="book__top">
          <BookTitle variant="h6" component="h3">
            {volumeInfo.title}
          </BookTitle>
          <BookDate variant="subtitle1" component="p">
            {publishedYear}
          </BookDate>
         
          <BtnLink to={`/details/${book.id}`}>
            <Btn variant="contained" color="primary" fullWidth>
              Read More
            </Btn>
          </BtnLink>
        </div>
      </BookContent>
    </StyledPaper>
  );
};

export default Book;
