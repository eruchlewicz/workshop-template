import React, { memo, useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import useStyles from './demoStyles';
import HomeView from "./HomeView";
import StudentView from "./StudentView";
import AddStudentView from "./AddStudentView";

function Demo() {
  const classes = useStyles();
  const history = useHistory();

  const newLocation = window.localStorage.getItem('redirectFrom');

  useEffect(() => {
    if (newLocation) {
      window.localStorage.removeItem('redirectFrom');
      history.push(newLocation);
    }
  }, [newLocation, history]);

  return (
    <main className={classes.content} id="content">
      <div className={classes.appBarSpacer} />
      <Container maxWidth={false} className={classes.container}>
        <Grid container>
          <Grid item md={12} lg={12}>
            <Switch>
              <Route exact path="/students">
                <HomeView />
              </Route>
              <Route exact path="/students/add">
                <AddStudentView />
              </Route>
              <Route path="/students/:studentId">
                <StudentView />
              </Route>
            </Switch>
          </Grid>
        </Grid>
      </Container>
    </main>
  );
}

export default memo(Demo);
