import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { createTheme, ThemeProvider, CircularProgress } from "@mui/material";
import BooksListContextProvider from "./context/BooksListContext";
import BookDetailsContextProvider from "./context/BookDetailsContext";
import Header from "./components/Header/Header.component";
import Footer from "./components/Footer/Footer.component";
import ScrollToTop from "./components/ScrollToTop.component";
import Bookmarks from "./pages/Bookmark/Bookmarks.component";
import Favourites from "./pages/Favourite/Favourites.component"
import "./App.css";

const Search = React.lazy(() => import("./pages/Search/Search.component"));
const Home = React.lazy(() => import("./pages/Home/Home.component"));
const Details = React.lazy(() => import("./pages/Details/Details.component"));

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#9b6549",
      },
      secondary: {
        main: "#3786AD",
      },
      tertiary: {
        main: "#16487D",
        contrastText: "#ffffff",
        dark: "#0f3257",
      },
    },
    typography: {
      fontFamily: "Neuton",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <BooksListContextProvider>
        <Header />
        <Suspense
          fallback={
            <div className="home-loading-container">
              <CircularProgress size="5rem" color="secondary" />
            </div>
          }
        >
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <ScrollToTop />
                  <Home />
                </>
              }
            />
            <Route
              path="/bookmarks"
              element={
                <>
                  <ScrollToTop />
                  <Bookmarks />
                </>
              }
            />
  <Route
              path="/favourites"
              element={
                <>
                  <ScrollToTop />
                  <Favourites />
                </>
              }
            />
            <Route
              path="/search"
              element={
                <>
                  <ScrollToTop />
                  <Search />
                </>
              }
            />
            <Route
              path="/details/:book_id"
              element={
                <BookDetailsContextProvider>
                  <ScrollToTop />
                  <Details />
                </BookDetailsContextProvider>
              }
            />
          </Routes>
        </Suspense>
        <Footer />
      </BooksListContextProvider>
    </ThemeProvider>
  );
}

export default App;
