import { makeStyles } from '@material-ui/core/styles';

// CSS //
const useStyles = makeStyles(theme => ({
  
  root: {
    flexGrow: 1,
  },

  // STRUCTURE //
  /* paper: {
    marginTop: theme.spacing(1),
    //padding: theme.spacing(1),
    paddingBottom: theme.spacing(7),
    minWidth: "90%",
    maxWidth: "90%",
    marginLeft: theme.spacing(8),
    //textAlign: 'center',
    //color: theme.palette.text.secondary,
  }, */
  /* paperTitle: {
    marginLeft: theme.spacing(2),
  }, */

  // FIELDS //
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  selectLabel: {
    minWidth: theme.spacing(25),
  },
  select: {
    minWidth: theme.spacing(25),
    //marginLeft: theme.spacing(1),
    //marginRight: theme.spacing(1),
    //marginTop: theme.spacing(2),
  },
  fieldArrayIcon: {
    //paddingTop: theme.spacing(3),
  },
  fieldArrayHeader: {
    marginBottom: theme.spacing(2),
    paddingLeft: theme.spacing(1),
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
}));

export default useStyles;