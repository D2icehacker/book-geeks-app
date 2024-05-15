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

import BookChip from "../BookChip/BookChip.component";

import "./Book.styles.scss";

const Image = React.lazy(() => import("../Image/Image.component"));

const StyledPaper = styled(Paper)(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  margin: '1rem',
}));

const BookContent = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.secondary.contrastText,
  height: '100%',
  position: 'relative',
  top: '253px',
  zIndex: '2',
  transition: 'top 0.3s ease-in-out',
}));

const BookTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1rem',
  lineHeight: '1.2rem',
}));

const BookDate = styled(Typography)(({ theme }) => ({
  fontSize: '0.8rem',
}));

const BtnLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.contrastText,
}));

const Btn = styled(Button)(({ theme }) => ({
  marginTop: '0.5rem',
}));

const Book = ({ book }) => {
  const { volumeInfo, saleInfo, accessInfo } = book;
  const { isEbook, saleability } = saleInfo;
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

          {volumeInfo.categories && (
            <BookChip
              label={volumeInfo.categories}
              color="chipCategory"
              key={volumeInfo.categories}
            />
          )}

          {saleability === "FREE" ? (
            <BookChip label="Free" color="chipSuccess" />
          ) : saleability === "FOR_SALE" ? (
            <BookChip label="For Sale" color="chipInfo" />
          ) : saleability === "NOT_FOR_SALE" ? (
            <BookChip label="Not for sale" color="chipDanger" />
          ) : null}

          {isEbook ? <BookChip label="Ebook" color="chipSuccess" /> : null}

          {accessInfo.viewability === "PARTIAL" ? (
            <BookChip label="Partial Preview" color="chipWarning" />
          ) : accessInfo.viewability === "ALL_PAGES" ? (
            <BookChip label="Full Preview" color="chipSuccess" />
          ) : accessInfo.viewability === "NO_PAGES" ? (
            <BookChip label="No Preview" color="chipDanger" />
          ) : null}

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
