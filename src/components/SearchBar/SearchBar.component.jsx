import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import SearchParams from "../SearchParams/SearchParams.component";

const SearchBar = ({
  validateSearch,
  parameter,
  filter,
  order,
  home,
  search,
  setParameter,
  setFilter,
}) => {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleKeyPress = (e) => {
    validateSearch(e, parameter, filter);
    if (e.key !== "Enter") {
      return;
    } else if (home && e.key === "Enter" && e.target.value !== "") {
      navigate("/search");
    } else {
      e.preventDefault();
    }
  };

  return (
    <form autoComplete="off">
      <TextField
        label="Search for a book"
        id="q_book"
        onKeyPress={(e) => handleKeyPress(e)}
        onChange={(e) => handleChange(e)}
        fullWidth
        margin="normal"
        value={searchValue}
      />
      {search ? (
        <SearchParams
          parameter={parameter}
          filter={filter}
          setParameter={setParameter}
          setFilter={setFilter}
        />
      ) : (
        home && (
          <Button
            variant="contained"
            color="secondary"
            style={{ marginRight: "0.5rem" }}
            onClick={() => {
              navigate("/search");
            }}
          >
            Advanced Search
          </Button>
        )
      )}
      <Button
        variant="contained"
        color="primary"
        onClick={(e) => {
          const isValid = validateSearch(e, parameter, filter);
          if (isValid) {
            navigate("/search");
          }
        }}
      >
        Search
      </Button>
    </form>
  );
};

export default SearchBar;
