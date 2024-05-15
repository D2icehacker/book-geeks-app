import React, { useState, Suspense } from "react";
import { Link } from "react-router-dom";
import {
  Paper,
  Typography,
  Button,
  CircularProgress,
  styled,
} from "@mui/material";

import noImg from "../../assets/no-image.png";

import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

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

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [rating, setRating] = useState(0);

  const handleStarClick = (index) => {
    setRating(index + 1);
  };

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const toggleFavorite = () => {
    setIsFavorited(!isFavorited);
  };

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
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div onClick={toggleBookmark} style={{ cursor: "pointer" }}>
              {isBookmarked ? (
                <BookmarkIcon fontSize="large"  style={{
                  cursor: "pointer",
                  color: "gold",
                }}/>
              ) : (
                <BookmarkBorderIcon fontSize="large" />
              )}
            </div>
            <div onClick={toggleFavorite} style={{ cursor: "pointer" }}>
              {isFavorited ? (
                <StarIcon fontSize="large"  style={{
                  cursor: "pointer",
                  color: "gold",
                }} />
              ) : (
                <StarBorderIcon
                  fontSize="large"
                 
                />
              )}
            </div>
          </div>
          <BookTitle variant="h6" component="h3">
            {volumeInfo.title}
          </BookTitle>
          <BookDate variant="subtitle1" component="p">
            {publishedYear}
          </BookDate>
          <Typography variant="h6" component="h3">
            Rating:
            <br />
            {[...Array(5)].map((_, index) => (
              <span
                key={index}
                onClick={() => handleStarClick(index)}
                style={{
                  cursor: "pointer",
                  color: index < rating ? "gold" : "inherit",
                }}
              >
                {index < rating ? (
                  <StarIcon fontSize="small" />
                ) : (
                  <StarBorderIcon fontSize="small" />
                )}
              </span>
            ))}
          </Typography>
          <BtnLink to={`/details/${book.id}`}>
            <Btn variant="contained" color="primary" fullWidth>
              Details
            </Btn>
          </BtnLink>
        </div>
      </BookContent>
    </StyledPaper>
  );
};

export default Book;
