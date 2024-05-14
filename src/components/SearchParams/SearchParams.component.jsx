import React from "react";
import { parameters, filters} from "./../../constants/index";
import { Grid } from "@material-ui/core";
import "./SearchParams.styles.scss";
import Searhparam from "../SearchParam/SearhParam.component";

const SearchParams = ({
  parameter,
  setParameter,
  filter,
  setFilter,
}) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={4}>
        <Searhparam
          param={parameter}
          items={parameters}
          setfunction={setParameter}
          label="Search by"
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <Searhparam param={filter} items={filters} setfunction={setFilter} label="Filter" />
      </Grid>
       </Grid>
  );
};

export default SearchParams;
