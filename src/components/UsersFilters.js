import React from 'react';
import {FormControl, Grid, InputLabel, MenuItem, Select} from "@material-ui/core";

import PropTypes from "prop-types";
import useStyles from './usersViewStyles';

function UsersFilters({ selectedNationality, selectedGender, handleChangeNationality, handleChangeGender }) {
  const classes = useStyles();

  return (
    <Grid container className={classes.filterContainer}>
      <FormControl variant="filled" className={classes.formControl}>
        <InputLabel>Nationality</InputLabel>
        <Select className={classes.fullWidth} value={selectedNationality} onChange={handleChangeNationality}>
          <MenuItem value="">All countries</MenuItem>
          <MenuItem value="us">USA</MenuItem>
          <MenuItem value="gb">Great Britain</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="filled" className={classes.formControl}>
        <InputLabel>Gender</InputLabel>
        <Select className={classes.fullWidth} value={selectedGender} onChange={handleChangeGender}>
          <MenuItem value="">All genders</MenuItem>
          <MenuItem value="male">Male</MenuItem>
          <MenuItem value="female">Female</MenuItem>
        </Select>
      </FormControl>
    </Grid>
  );
}

UsersFilters.propTypes = {
  selectedNationality: PropTypes.string.isRequired,
  selectedGender: PropTypes.string.isRequired,
  handleChangeNationality: PropTypes.func.isRequired,
  handleChangeGender: PropTypes.func.isRequired,
};

export default UsersFilters;
