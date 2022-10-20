import React, {useEffect, useState} from 'react';
import {
  Button, Chip,
  FormControl, InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import PropTypes from "prop-types";
import {getSelectedStudent} from "../selectors/studentsSelectors";
import {connect} from "react-redux";
import {useHistory, useParams} from 'react-router-dom';

import useStyles from './studentViewStyles';
import {fetchStudent, updateStudent} from "../actions/studentsActions";
import Grid from "@material-ui/core/Grid";

export function StudentView({ student, handleFetchStudent, handleUpdateStudent }) {
  const classes = useStyles();
  const { studentId } = useParams();
  const history = useHistory();

  const [editedStudent, setEditedStudent] = useState(student);
  const [favouriteSubjectValue, setFavouriteSubjectValue] = useState('');

  useEffect(() => {
    handleFetchStudent(studentId);
  }, [studentId]);

  useEffect(() => {
    setEditedStudent(student);
  }, [student]);

  const handleFieldChanged = fieldName => event => {
    return setEditedStudent(editedStudent.set(fieldName, event.target.value));
  };

  const handleSave = () => {
    handleUpdateStudent(studentId, editedStudent);
    history.push('/students');
  };

  const handleChipDelete = deleteTarget => {
    const newFavouriteSubjects = editedStudent.get("favouriteSubjects").filter(item => item !== deleteTarget);
    setEditedStudent(editedStudent.set("favouriteSubjects", newFavouriteSubjects));
  };

  const handleChipAdd = () => {
    const existingSubjects = editedStudent.get("favouriteSubjects").filter(subject => subject === favouriteSubjectValue);
    if (favouriteSubjectValue && !existingSubjects.size) {
      const newFavouriteSubjects = editedStudent.get("favouriteSubjects").push(favouriteSubjectValue);
      setEditedStudent(editedStudent.set("favouriteSubjects", newFavouriteSubjects));
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
      {editedStudent &&
        <Grid container>
          <Grid item xs={12}>
            <h3>{editedStudent.get("firstName")} {editedStudent.get("lastName")}</h3>
          </Grid>
          <Grid item xs={12}>
            <FormControl>
              <InputLabel variant="outlined">Gender</InputLabel>
              <Select
                value={editedStudent?.get("gender") || ''}
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
                value={editedStudent?.get("email") || ''}
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
                value={editedStudent?.get("totalSpentInBooks") || ''}
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
                editedStudent?.get("favouriteSubjects")?.map(subject => (
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
                  !editedStudent.get("email") || !editedStudent.get("gender")
                }
              >
                Save
              </Button>
            </FormControl>
          </Grid>
        </Grid>
      }
    </Grid>
  );
}

StudentView.propTypes = {
  student: PropTypes.object.isRequired,
  handleFetchStudent: PropTypes.func,
  handleUpdateStudent: PropTypes.func,
};

const mapStateToProps = state => ({
  student: getSelectedStudent(state),
});

const mapDispatchToProps = {
  handleUpdateStudent: updateStudent,
  handleFetchStudent: fetchStudent,
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentView);
