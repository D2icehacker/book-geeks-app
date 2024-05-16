import React, { Suspense } from "react";
import { CircularProgress, Container, Paper } from "@mui/material";
import Title from "../../components/Title/Title.component";
import { selectBookmarked } from "../../Redux/Reducers/bookSlice";
import { useSelector } from "react-redux";

import "./Bookmarks.styles.scss";

const Books = React.lazy(() =>
  import("../../components/BookDetails/BookDetails.component")
);

const Bookmark = () => {
 
  const books = useSelector(selectBookmarked)


  return (
    <Container className="container-search">
      <Title 
        text="Bookmarks"
        align="center"
      />
      <Paper
        elevation={3}
        className="advanced-search__paper"
        style={{ marginBottom: "1rem" }}
      >
        
      </Paper>
      <Suspense
        fallback={
          <div className="search-loading-container">
            <CircularProgress size="3rem" color="secondary" />
          </div>
        }
      >
        {books.length !== 0 && (
          <Books books={books} />
        )}
        {/* <Message text={message} /> */}
      </Suspense>
    </Container>
  );
};

export default Bookmark;
