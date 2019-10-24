import { makeStyles } from '@material-ui/core/styles';

// CSS //
const useStyles = makeStyles(theme => ({
  
  root: {
    flexGrow: 1,
  },

  // STRUCTURE //
  paper: {
    marginTop: theme.spacing(1),
    //padding: theme.spacing(1),
    paddingBottom: theme.spacing(7),
    minWidth: "90%",
    maxWidth: "90%",
    marginLeft: theme.spacing(8),
    //textAlign: 'center',
    //color: theme.palette.text.secondary,
  },
  paperTitle: {
    marginLeft: theme.spacing(2),
  },

  // FIELDS //
  textField: {
    marginLeft: theme.spacing(5),
  },
  select: {
    paddingTop: theme.spacing(2),
    minWidth: "200px",
  },
}));

export default useStyles;