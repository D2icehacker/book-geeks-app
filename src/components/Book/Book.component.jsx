import React, { Suspense, useState } from "react";
import { Link } from "react-router-dom";
import {
  Paper,
  makeStyles,
  Typography,
  Button,
  CircularProgress,
} from "@material-ui/core";
import noImg from "../../assets/no-image.png";

import BookmarkIcon from '@material-ui/icons/Bookmark';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';

import "./Book.styles.scss";

const Image = React.lazy(() => import("../Image/Image.component"));

const useStyles = makeStyles((theme) => ({
  bookTitle: {
    fontSize: "1rem",
    lineHeight: "1.2rem",
  },
  bookDate: {
    fontSize: "0.8rem",
  },
  bookContent: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    height: "100%",
    position: "relative",
    top: "253px",
    zIndex: "2",
    transition: "top 0.3s ease-in-out",
  },
  btnLink: {
    textDecoration: "none",
    color: theme.palette.primary.contrastText,
  },
  btn: {
    marginTop: "0.5rem",
  },
}));

const Book = ({ book }) => {
  const classes = useStyles();

  const { volumeInfo } = book;
  const imgURL = volumeInfo.imageLinks ? volumeInfo.imageLinks.thumbnail : noImg;
  const publishedYear = volumeInfo.publishedDate ? volumeInfo.publishedDate.slice(0, 4) : null;

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked); // Toggle the bookmark state
  }

  const toggleFavorite = () => {
    setIsFavorited(!isFavorited); // Toggle the favorite state
  }

  return (
    <Paper className="book__paper">
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
      <div className={classes.bookContent}>
        <div className="book__top">
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {/* Bookmark icon floated to the left */}
            <div onClick={toggleBookmark} style={{ cursor: 'pointer' }}>
              {isBookmarked ? <BookmarkIcon fontSize="large" /> : <BookmarkBorderIcon fontSize="large" />}
            </div>
            {/* Favorite icon floated to the right */}
            <div onClick={toggleFavorite} style={{ cursor: 'pointer' }}>
              {isFavorited ? <StarIcon fontSize="large"/> : <StarBorderIcon fontSize="large" />}
            </div>
          </div>
        
          <Typography variant="h6" component="h3" className={classes.bookTitle}>
            {volumeInfo.title}
          </Typography>
          
          <Typography
            variant="subtitle1"
            component="p"
            className={classes.bookDate}
          >
            {publishedYear}
          </Typography>

          {/* Link to details page */}
          <Link to={`/details/${book.id}`} className={classes.btnLink}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              className={classes.btn}
            >
              Read More
            </Button>
          </Link>
        </div>
      </div>
    </Paper>
  );
};

export default Book;
