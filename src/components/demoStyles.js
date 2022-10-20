import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  appBarSpacer: {
    height: theme.spacing(8),
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
    backgroundColor: '#fff',
  },
  container: {
    padding: 0,
    minHeight: 'calc(100vh - 64px)',
  },
  alert: {
    position: 'fixed',
    top: '85px',
    zIndex: '1500',
    left: '50%',
    transform: 'translateX(-50%)',
  },
}));
