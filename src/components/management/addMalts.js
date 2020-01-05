// MODULES //
import React from 'react';
import { Formik, FieldArray, Field } from 'formik';
import firebase from '../../Firebase';

// MATERIAL //
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

// MATERIAL ICONS //
import Fab from '@material-ui/core/Fab';
import Add from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

// CUSTOM //
import useStyles from '../../css';

const AddMalts = (props) => {
  const classes = useStyles();
  const [refIngredients] = React.useState(firebase.firestore().collection('ingredients').doc("7m5HiRkAt6OCJwt7EeoA"))
  console.log(refIngredients);

  return (
    <Formik
      initialValues={{
        malts: [{
          name: '',
          quantity: '',
          subMalts: [],
        }]
      }}
      onSubmit={(values, form) => {
        console.log(values)
      }}
      render={form => (
        <form onSubmit={form.handleSubmit}>
          <React.Fragment>
            <FieldArray
              name="malts"
              render={({ insert, remove, push }) => (
                <div>
                  {form.values.malts !== undefined &&
                  form.values.malts.map((malt, index) => (
                    <Grid container key={index}>
                      <Grid item xs={1} className={classes.fieldArrayIcon} style={{marginLeft: "1%"}}>
                        <Fab
                          size="small"
                          onClick={() => remove(index)}
                        >
                          <DeleteIcon />
                        </Fab>
                      </Grid>
                      <Grid item xs={5}>
                        <Field
                          name={`malts.${index}.name`}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              label="Name"
                              placeholder="2-Row"
                              //class="form-control"
                              className={classes.textField}
                              onChange={form.handleChange}
                              margin="dense"
                              variant="outlined"
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={5}>
                        <Field
                          name={`malts.${index}.quantity`}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              label="Quantity"
                              placeholder="1000"
                              //class="form-control"
                              className={classes.textField}
                              onChange={form.handleChange}
                              margin="dense"
                              variant="outlined"
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={1} className={classes.fieldArrayIcon} style={{marginLeft: "-2%"}}>
                        <Fab
                          size="small"
                          onClick={() => push({ name: "", quantity: "", subMalts: [] })}
                        >
                          <Add />
                        </Fab>
                      </Grid>                                                                        
                    </Grid>
                  )
                  )}
                </div>
              )}
            />
          </React.Fragment>
          <React.Fragment>
            <Button 
              type="submit" 
              disabled={form.isSubmitting}
              margin="normal"
              variant="outlined"
              color="primary"
            >
              Submit
            </Button>
          </React.Fragment>
        </form>
      )}
    />
  )
}

export default AddMalts;
