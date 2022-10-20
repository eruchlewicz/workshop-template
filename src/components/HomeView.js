import React, {useEffect, useState} from 'react';
import {useHistory, useRouteMatch} from 'react-router-dom';
import {
  Button,
  FormControl,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField
} from "@material-ui/core";

import useStyles from './homeViewStyles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {fetchStudents} from "../actions/studentsActions";
import {getStudentsData} from "../selectors/studentsSelectors";
import moment from 'moment';

export function HomeView({ students, handleFetchStudents }) {
  const classes = useStyles();
  const history = useHistory();
  const { path } = useRouteMatch();

  const [filteredStudents, setFilteredStudents] = useState(students);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    handleFetchStudents();
  }, [handleFetchStudents]);

  useEffect(() => {
    setFilteredStudents(students);
  }, [students]);

  const tableRowClickHandler = element => {
    history.push(`${path}/${element}`);
  };

  const addStudentClickHandler = () => {
    history.push(`${path}/add`);
  };

  const handleSearchTextChanged = e => {
    setSearchText(e.target.value);
    setFilteredStudents(students.filter(student => student.get("lastName")?.includes(e.target.value)));
  };

  return (
    <div className={classes.table}>
      <FormControl className={classes.searchBar}>
        <TextField
          value={searchText}
          onChange={e => handleSearchTextChanged(e)}
          placeholder="Search students..."
        />
      </FormControl>
      <FormControl className={classes.addButton}>
        <Button
          variant="contained"
          onClick={addStudentClickHandler}
        >
          Add new student
        </Button>
      </FormControl>
      <TableContainer>
        <Table>
          <TableHead className={classes.tableHeader}>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              filteredStudents.map(student => (
                <TableRow key={student.get("id")} onClick={() => tableRowClickHandler(student.get("id"))}>
                  <TableCell>{student.get("firstName")}</TableCell>
                  <TableCell>{student.get("lastName")}</TableCell>
                  <TableCell>{student.get("email")}</TableCell>
                  <TableCell>{student.get("gender")}</TableCell>
                  <TableCell>{moment(student.get("created")).local().format('DD-MM-YYYY hh:mm')}</TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

HomeView.propTypes = {
  students: PropTypes.object.isRequired,
  handleFetchStudents: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  students: getStudentsData(state),
});

const mapDispatchToProps = {
  handleFetchStudents: fetchStudents,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeView);
