import React, {useEffect, useState} from 'react';
import {List, Map} from 'immutable';
import {
  FormControl,
  TextField,
  MenuItem,
  Select, Button, InputLabel, Chip, InputAdornment,
} from "@material-ui/core";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import useStyles from './studentViewStyles';
import Grid from "@material-ui/core/Grid";
import { addStudent } from "../actions/studentsActions";
import {getSelectedStudent} from "../selectors/studentsSelectors";
import {useHistory} from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";

export function AddStudentView({ student, handleAddStudent }) {
  const classes = useStyles();
  const history = useHistory();

  const [newStudent, setNewStudent] = useState(Map());
  const [favouriteSubjectValue, setFavouriteSubjectValue] = useState('');

  useEffect(() => {
    if (student?.get('id')) {
      history.push(`${student.get('id')}`);
    }
  }, [student]);

  const handleFieldChanged = fieldName => event => {
    return setNewStudent(newStudent.set(fieldName, event.target.value));
  };

  const handleSave = () => {
    handleAddStudent(newStudent);
  };

  const handleChipDelete = deleteTarget => {
    const newFavouriteSubjects = newStudent.get("favouriteSubjects")?.filter(item => item !== deleteTarget);
    setNewStudent(newStudent.set("favouriteSubjects", newFavouriteSubjects));
  };

  const handleChipAdd = () => {
    const favouriteSubjects = newStudent.get("favouriteSubjects") ? newStudent.get("favouriteSubjects") : List();
    const existingSubjects = favouriteSubjects.filter(subject => subject === favouriteSubjectValue);
    if (favouriteSubjectValue && !existingSubjects?.size) {
      const newFavouriteSubjects = favouriteSubjects.push(favouriteSubjectValue);
      setNewStudent(newStudent.set("favouriteSubjects", newFavouriteSubjects));
    }
    handleClearSubject();
  };

  const handleSubjectChange = e => {
    setFavouriteSubjectValue(e.target.value);
  };

  const handleClearSubject = () => {
    setFavouriteSubjectValue('');
  };

  return (
    <Grid container>
      <Grid item xs={12}>
      <FormControl>
        <TextField
          value={newStudent.get("firstName")}
          variant="outlined"
          label="First name"
          className={classes.input}
          onChange={handleFieldChanged('firstName')}
        />
      </FormControl>
      </Grid>
      <Grid item xs={12}>
      <FormControl>
        <TextField
          value={newStudent.get("lastName")}
          variant="outlined"
          label="Last name"
          className={classes.input}
          onChange={handleFieldChanged('lastName')}
        />
      </FormControl>
      </Grid>
      <Grid item xs={12}>
      <FormControl>
        <InputLabel variant="outlined">Gender</InputLabel>
        <Select
          value={newStudent.get("gender")}
          label="Gender"
          variant="outlined"
          className={classes.input}
          onChange={handleFieldChanged('gender')}
        >
          <MenuItem key="M" value="MALE">
            MALE
          </MenuItem>
          <MenuItem key="F" value="FEMALE">
            FEMALE
          </MenuItem>
        </Select>
      </FormControl>
      </Grid>
      <Grid item xs={12}>
      <FormControl>
        <TextField
          value={newStudent.get("email")}
          variant="outlined"
          label="Email"
          className={classes.input}
          onChange={handleFieldChanged('email')}
        />
      </FormControl>
      </Grid>
      <Grid item xs={12}>
      <FormControl>
        <TextField
          value={newStudent.get("totalSpentInBooks")}
          variant="outlined"
          label="Total spent in books"
          className={classes.input}
          onChange={handleFieldChanged('totalSpentInBooks')}
        />
      </FormControl>
      </Grid>
          <Grid item xs={12}>
            <FormControl>
              {
                newStudent?.get("favouriteSubjects")?.map(subject => (
                  <Chip
                    key={subject}
                    label={subject}
                    onDelete={() => handleChipDelete(subject)}
                    className={classes.externalTag}
                  />
                ))
              }
              <TextField
                variant="outlined"
                label="Favourite subjects"
                className={classes.input}
                value={favouriteSubjectValue}
                onChange={e => handleSubjectChange(e)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <AddIcon onClick={() => handleChipAdd(favouriteSubjectValue)} className={classes.addIcon}/>
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
          </Grid>
      <Grid item xs={12}>
      <FormControl>
        <Button
          variant="contained"
          onClick={handleSave}
          disabled={
            !newStudent.get("email") || !newStudent.get("gender")
          }
        >
          Save
        </Button>
      </FormControl>
      </Grid>
    </Grid>
  );
}

AddStudentView.propTypes = {
  student: PropTypes.object,
  handleAddStudent: PropTypes.func,
};

const mapStateToProps = state => ({
  student: getSelectedStudent(state),
});

const mapDispatchToProps = {
  handleAddStudent: addStudent,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddStudentView);
