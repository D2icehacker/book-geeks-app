import React, { useState, useEffect, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
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

import { addBookmark, removeBookmark, addFavorite, removeFavorite, selectBookmarked, selectFavorites } from "../../Redux/Reducers/bookSlice";

import { saveToMockDB } from "../../mockdb/data.js";

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


  const dispatch = useDispatch();
  const bookmarked = useSelector(selectBookmarked);
  const favorites = useSelector(selectFavorites);

  useEffect(() => {
    // Save bookmarked and favorites data to mock database whenever they change
    saveToMockDB({ bookmarked, favorites });
  }, [bookmarked, favorites]);

 ;

  const toggleBookmark = () => {
    if (!isBookmarked) {
      dispatch(addBookmark(book));
    } else {
      dispatch(removeBookmark(book));
    }
    setIsBookmarked(!isBookmarked);
  };

  const toggleFavorite = () => {
    if (!isFavorited) {
      dispatch(addFavorite(book));
    } else {
      dispatch(removeFavorite(book));
    }
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
