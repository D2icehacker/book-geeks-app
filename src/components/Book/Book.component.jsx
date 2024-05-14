import React, { Suspense } from "react";
import { Link } from "react-router-dom";
import {
  Paper,
  makeStyles,
  Typography,
  Button,
  CircularProgress,
} from "@material-ui/core";
import noImg from "../../assets/no-image.png";
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
  let imgURL = volumeInfo.imageLinks ? volumeInfo.imageLinks.thumbnail : noImg;
  let publishedYear = volumeInfo.publishedDate
    ? volumeInfo.publishedDate.slice(0, 4)
    : null;

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
            alt={book.volumeInfo.title}
            classnames="book__bg-img"
          />
        </Suspense>
      </div>
      <div className={classes.bookContent}>
        <div className="book__top">
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
