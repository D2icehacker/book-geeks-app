// BookDetails.js

import React, { useState } from "react";
import parse from "html-react-parser";
import { Grid, Typography, TextField, Button } from "@mui/material";
import Title from "../Title/Title.component";
import NoInfo from "./../NoInfo/NoInfo.components";
import noImg from "../../assets/no-image.png";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useDispatch, useSelector } from "react-redux";
import { addReview, addRating, selectReviews, selectRatings } from "../../Redux/Reducers/bookSlice";

import "./BookDetails.styles.scss";

const BookDetails = ({ details }) => {
  const { volumeInfo } = details;
  const {
    title,
    authors,
    publisher,
    publishedDate,
    description,
    categories,
  } = volumeInfo;

  const [rating, setRating] = useState(useSelector(selectRatings)[details.id] || 0);
  const [review, setReview] = useState("");
  const reviews = useSelector(selectReviews);
  const dispatch = useDispatch();

  const handleStarClick = (index) => {
    setRating(index + 1);
    dispatch(addRating({ id: details.id, rating: index + 1 }));
  };

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const handleSubmitReview = () => {
    if (review.trim() !== "") {
      dispatch(addReview(review));
      setReview("");
    }
  };

  let imgURL = volumeInfo.imageLinks ? volumeInfo.imageLinks.thumbnail : noImg;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={5} className="book-details__left">
        <img src={imgURL} alt={title} className="book-details__image" />
      </Grid>
      <Grid item xs={12} md={7} className="book-details__right">
        <Title text={title} />
        <p className="book-details__right-info">
          <span>Release Date:</span>{" "}
          {publishedDate ? publishedDate : <NoInfo />}
        </p>
        <p className="book-details__right-info">
          <span>Categories:</span>{" "}
          {categories ? categories : <NoInfo />}
        </p>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <div className="book-details__right-section">
              <Typography variant="h4" component="h2">
                Authors:
              </Typography>
              {authors ? (
                authors.map((author, index) => (
                  <span key={`author_${index}`}>
                    {(index ? ", " : "") + author}
                  </span>
                ))
              ) : (
                <span>N/A</span>
              )}
            </div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <div className="book-details__right-section">
              <Typography variant="h4" component="h2">
                Publisher:
              </Typography>
              <span>{publisher ? publisher : <NoInfo />}</span>
            </div>
          </Grid>
        </Grid>
        <div className="book-details__description">
          <Typography variant="h4" component="h2">
            Description:
          </Typography>
          {description ? parse(description) : <NoInfo />}
        </div>
        <Typography variant="h4" component="h2">
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
        <div className="book-details__reviews">
          <Typography variant="h4" component="h2">
            Reviews:
          </Typography>
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <Typography key={index} variant="body1">
                {review}
              </Typography>
            ))
          ) : (
            <Typography variant="body1">No reviews yet.</Typography>
          )}
          <TextField
            label="Add a review"
            variant="outlined"
            value={review}
            onChange={handleReviewChange}
            fullWidth
            multiline
            rows={4}
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmitReview}
          >
            Submit Review
          </Button>
        </div>
      </Grid>
    </Grid>
  );
};

export default BookDetails;
