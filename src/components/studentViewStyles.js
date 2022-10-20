import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  input: {
    minWidth: 300,
    marginBottom: '10px',
  },
  externalTag: {
    margin: theme.spacing(0.5),
  },
  addIcon: {
    cursor: 'pointer',
    color: '#a9a9a9',
  }
}));
