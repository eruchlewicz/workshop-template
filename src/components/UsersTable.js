import React from 'react';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";

import PropTypes from "prop-types";
import useStyles from "./usersViewStyles";

function UsersTable({ users }) {
  const classes = useStyles();

  return (
    <div className={classes.table}>
        <TableContainer>
          <Table>
            <TableHead className={classes.tableHeader}>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Cell</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell>Nationality</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map(user => (
                <TableRow key={user.cell}>
                  <TableCell>{ user.name.first } { user.name.last }</TableCell>
                  <TableCell>{ user.email }</TableCell>
                  <TableCell>{ user.cell }</TableCell>
                  <TableCell>{ user.gender }</TableCell>
                  <TableCell>{ user.nat }</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
    </div>
  );
}

UsersTable.propTypes = {
  users: PropTypes.array,
};

export default UsersTable;
