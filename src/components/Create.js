// MODULES //
import React from 'react';
import { Formik, FieldArray, Field } from 'formik';
//import { FormikConsumer } from 'formik';
import firebase from '../Firebase';
//import { Link } from 'react-router-dom';

// MATERIAL //
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
//import { Typography } from '@material-ui/core';
/* import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select'; */

// CUSTOM //
import useStyles from '../css';
import { Typography } from '@material-ui/core';

const Create = (props) => {
  const classes = useStyles();
  const ref = firebase.firestore().collection('recipes');

  return (
    <Formik
      {...props}
      initialValues={{ 
        name: '',
        style: '',
        brewer: '',
        version: '',
        description: '',
        malts: [{
          name: '',
          quantity: '',
        }],
        waters: [{
          step: '',
          quantity: '',
          duration: '',
        }],
        hops: [{
          name: "",
          quantity: ""
        }],
        yeasts: [{
          name: '',
          quantity: '',
        }],
        miscs: [{
          name: '',
          quantity: '',
        }],
        IBU: '',
        SRM: '',
        est_ABV: '',
      }}
      /*validate={values => {
        let errors = {};
        if (!values.email) {
          errors.email = 'Required';
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = 'Invalid email address';
        }
        return errors;
      }}*/
      onSubmit={(values, form) => {

        ref.add({
          values
        }).then((docRef) => {
          props.history.push("/")
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
        form.setSubmitting(false);
      }}    
    
    render={form => (
      
      <form onSubmit={form.handleSubmit}>
        <div className={classes.root}>
          <br />
          <React.Fragment>
          <Paper className={classes.paper}>
            <Grid container spacing={3}>
              <Grid item xs={12} className={classes.paperTitle}>
                <Typography variant="h5">
                  General Beer Recipe Information
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Field
                  name="name"
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Name"
                      placeholder="Red Fox"
                      //class="form-control"
                      className={classes.textField}
                      onChange={form.handleChange}
                      margin="normal"
                    />
                  )}
                />
                {/* errors.email && touched.email && errors.email */}
              </Grid>
              <Grid item xs={3}>
                <Field
                  name="style"
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Style"
                      placeholder="Red Ale"
                      //class="form-control"
                      className={classes.textField}
                      onChange={form.handleChange}
                      margin="normal"
                    />
                  )}
                />
                {/* errors.email && touched.email && errors.email */}
              </Grid>
              <Grid item xs={3}>
                <Field
                  name="brewer"
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Brewer"
                      placeholder="Au Camp de Chasse"
                      //class="form-control"
                      className={classes.textField}
                      onChange={form.handleChange}
                      margin="normal"
                    />
                    /* <FormControl className={classes.formControl}>
                      <InputLabel 
                        htmlFor="age-simple"
                        className={classes.select}
                      >
                        Age
                      </InputLabel>
                      <Select
                        {...field}
                        className={classes.select}                        
                      >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                      </Select>
                  </FormControl> */
                  )}
                />
                {/* errors.email && touched.email && errors.email */}
              </Grid>
              <Grid item xs={3}>
                <Field
                  name="version"
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Version"
                      placeholder="1.1"
                      //class="form-control"
                      className={classes.textField}
                      onChange={form.handleChange}
                      margin="normal"
                    />
                  )}
                />
                {/* errors.email && touched.email && errors.email */}
              </Grid>
            </Grid>
          </Paper>
          </React.Fragment>
          
          <br />
          <br />
          <React.Fragment>
          <Paper className={classes.paper}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h5">
                  title
                </Typography>
              </Grid>
            </Grid>
          </Paper>
          </React.Fragment>

          <Grid container spacing={3}>
            <Grid item xs={12}>
               {/* <Paper className={classes.paper}> */}
                {/* <TextField 
                  id="description"
                  name="description"
                  label="Description"
                  //class="form-control"
                  //className={classes.textField}
                  onChange={form.handleChange} 
                  //placeholder="Description" 
                  //cols="80" 
                  rowsMax="4"
                  multiline
                  value={form.values.description}
                  margin="normal"
                /> */}
                {/* errors.password && touched.password && errors.password */}
              {/* </Paper> */}
            </Grid>
            <Grid item xs={12}>
            <FieldArray
            name="malts"
            render={({ insert, remove, push }) => (
              <div>
                {form.values.malts.length > 0 &&
                  form.values.malts.map((malt, index) => (
                     /* <div /* className="row" key={index}> */
                      /* <div className="col"> */
                      <Grid container spacing={8} direction="row" justify="space-around" key={index}>
                        <Grid item xs={6} sm={3}>
                          <Button
                            type="button"
                            className="secondary"
                            onClick={() => push({ name: "", quantity: "" })}
                          >
                            Add Malt
                          </Button>
                        </Grid>
                        <Grid item xs={6} sm={3}>
                          <Field
                            name={`malts.${index}.name`}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                label="Malt Name"
                                //class="form-control"
                                className={classes.textField}
                                //value={form.values.malts[index].name}
                                onChange={form.handleChange}
                                margin="normal"
                              />
                            )}
                          />
                          
                          {/* errors.malts &&
                            errors.malts[index] &&
                            errors.malts[index].name &&
                            touched.malts &&
                            touched.malts[index].name && (
                              <div className="field-error">
                                {/* errors.malts[index].name }
                              </div>
                          )*/}
                        </Grid>
                        <Grid item xs={6} sm={3}>
                          <label htmlFor={`malts.${index}.quantity`}>
                            Quantity
                          </label>
                          <Field
                            name={`malts.${index}.quantity`}
                            placeholder="1000"
                            type="string"
                          />
                          {/* errors.malts &&
                            errors.malts[index] &&
                            errors.malts[index].email &&
                            touched.malts &&
                            touched.malts[index].email && (
                              <div className="field-error">
                                {errors.malts[index].email}
                              </div>
                            ) */}
                        </Grid>
                        <Grid item xs={6} sm={3}>
                          <button
                            type="button"
                            className="secondary"
                            onClick={() => remove(index)}
                          >
                            X
                          </button>
                        </Grid>
                      </Grid>
                    /* </div> */
                  ))}
              </div>
            )}
          />
            </Grid>
            <Grid item xs={12}>
              <Button 
                type="submit" 
                disabled={form.isSubmitting}
                margin="normal"
              >
                Submit
              </Button>
            </Grid>
          </Grid>
          {console.log(form.values)}
        </div>
      </form>   
    )}
  />
  )
};

export default Create;