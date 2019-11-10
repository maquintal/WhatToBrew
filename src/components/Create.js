// MODULES //
import React from 'react';
import { Formik, FieldArray, Field } from 'formik';
//import { FormikConsumer } from 'formik';
import firebase from '../Firebase';
//import { Link } from 'react-router-dom';

// MATERIAL //

// INPUTS //
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';

import InputLabel from '@material-ui/core/InputLabel';
//import MenuItem from '@material-ui/core/MenuItem';
//import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

// ICONS //
//import AddCircle from '@material-ui/icons/AddCircle';
import Add from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
//import RemoveCircle from '@material-ui/icons/RemoveCircle';
//import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';

// CUSTOM //
import useStyles from '../css';

const Create = (props) => {
  console.log(props)
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
        <div /* className={classes.root} */>
          <br />
            <React.Fragment>
            {/* <Paper className={classes.paper}> */}
            <Grid container spacing={3}>
              <Grid item xs={1} /* style={{backgroundColor: "yellow"}} */></Grid>
              <Grid item xs={10} /* style={{backgroundColor: "orange"}} */>
                <Paper className={classes.paper}>
                    <Typography variant="h5">
                      General Beer Recipe Information
                    </Typography>            
                    <Grid container align="center">
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
                      <Grid tem xs={1}></Grid>
                      <Grid item xs={10}>
                        <Field
                          name="description"
                          render={({ field }) => (
                            <TextField
                              {...field}
                              label="Description"
                              placeholder="Add Beer Recipe Description"
                              //class="form-control"
                              className={classes.textField}
                              onChange={form.handleChange}
                              margin="normal"
                              fullWidth
                              multiline
                              rows={4}
                              variant="outlined"
                            />
                          )}
                        />
                        {/* errors.email && touched.email && errors.email */}                
                      </Grid>
                      <Grid tem xs={1}></Grid>
                    </Grid>
                  </Paper>
                </Grid>
              <Grid item xs={1}></Grid>
            </Grid>
          </React.Fragment>
          
          <br />
          <br />
          <React.Fragment>
            <Grid container /* spacing={3} */>
              <Grid item xs={12}>
                <Typography variant="h5">
                  Malt
                  <SvgIcon>
                    <path d="M7.33,18.33C6.5,17.17 6.5,15.83 6.5,14.5C8.17,15.5 9.83,16.5 10.67,17.67L11,18.23V15.95C9.5,15.05 8.08,14.13 7.33,13.08C6.5,11.92 6.5,10.58 6.5,9.25C8.17,10.25 9.83,11.25 10.67,12.42L11,13V10.7C9.5,9.8 8.08,8.88 7.33,7.83C6.5,6.67 6.5,5.33 6.5,4C8.17,5 9.83,6 10.67,7.17C10.77,7.31 10.86,7.46 10.94,7.62C10.77,7 10.66,6.42 10.65,5.82C10.64,4.31 11.3,2.76 11.96,1.21C12.65,2.69 13.34,4.18 13.35,5.69C13.36,6.32 13.25,6.96 13.07,7.59C13.15,7.45 13.23,7.31 13.33,7.17C14.17,6 15.83,5 17.5,4C17.5,5.33 17.5,6.67 16.67,7.83C15.92,8.88 14.5,9.8 13,10.7V13L13.33,12.42C14.17,11.25 15.83,10.25 17.5,9.25C17.5,10.58 17.5,11.92 16.67,13.08C15.92,14.13 14.5,15.05 13,15.95V18.23L13.33,17.67C14.17,16.5 15.83,15.5 17.5,14.5C17.5,15.83 17.5,17.17 16.67,18.33C15.92,19.38 14.5,20.3 13,21.2V23H11V21.2C9.5,20.3 8.08,19.38 7.33,18.33Z"/>
                  </SvgIcon>
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Grid container>
                  <Grid item xs={12}>
                    <FieldArray
                      name="malts"
                      render={({ insert, remove, push }) => (
                        <div>
                          {form.values.malts.length > 0 &&
                            form.values.malts.map((malt, index) => (
                              <Paper>
                                <Grid container align="center" key={index}>
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
                                        /* <TextField
                                          {...field}
                                          label="Malt Name"
                                          placeholder="Red Ale"
                                          //class="form-control"
                                          className={classes.textField}
                                          variant="outlined"
                                          //value={form.values.malts[index].name}
                                          onChange={form.handleChange}
                                          margin="normal"
                                        /> */
                                        <FormControl className={classes.formControl}>
                                          <InputLabel 
                                            //htmlFor="age-simple"
                                            className={classes.select}
                                            align="Left"
                                          >
                                            Malt Name
                                          </InputLabel>
                                          <Select
                                            {...field}
                                            className={classes.select}
                                            fullWidth                       
                                          >
                                            {/* <MenuItem value={10}>Ten</MenuItem>
                                            <MenuItem value={20}>Twenty</MenuItem>
                                            <MenuItem value={30}>Thirty</MenuItem> */}
                                            {/* <GetMalt /> */}
                                          </Select>
                                      </FormControl>
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
                                          //value={form.values.malts[index].name}
                                          onChange={form.handleChange}
                                          margin="normal"
                                          variant="outlined"
                                        />
                                      )}
                                    />
                                  </Grid>
                                  <Grid item xs={1} className={classes.fieldArrayIcon} style={{marginLeft: "-2%"}}>
                                    <Fab
                                      size="small"
                                      onClick={() => push({ name: "", quantity: "" })}
                                    >
                                      <Add />
                                    </Fab>
                                  </Grid>
                                </Grid>
                              </Paper>
                            )
                          )}
                        </div>
                      )}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Grid container>
                  <Grid item xs={12}>
                    <FieldArray
                      name="hops"
                      render={({ insert, remove, push }) => (
                        <div>
                          {form.values.hops.length > 0 &&
                            form.values.hops.map((hop, index) => (
                              <Paper>
                                <Grid container align="center" key={index}>
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
                                      name={`hops.${index}.name`}
                                      render={({ field }) => (
                                        <TextField
                                          {...field}
                                          label="Hop Name"
                                          placeholder="Saaz"
                                          //class="form-control"
                                          className={classes.textField}
                                          variant="outlined"
                                          //value={form.values.hops[index].name}
                                          onChange={form.handleChange}
                                          margin="normal"
                                        />
                                      )}
                                    />
                                  </Grid>
                                  <Grid item xs={5}>
                                    <Field
                                      name={`hops.${index}.quantity`}
                                      render={({ field }) => (
                                        <TextField
                                          {...field}
                                          label="Quantity"
                                          placeholder="28"
                                          //class="form-control"
                                          className={classes.textField}
                                          //value={form.values.hops[index].name}
                                          onChange={form.handleChange}
                                          margin="normal"
                                          variant="outlined"
                                        />
                                      )}
                                    />
                                  </Grid>
                                  <Grid item xs={1} className={classes.fieldArrayIcon} style={{marginLeft: "-2%"}}>
                                    <Fab
                                      size="small"
                                      onClick={() => push({ name: "", quantity: "" })}
                                    >
                                      <Add />
                                    </Fab>
                                  </Grid>
                                </Grid>
                              </Paper>
                            )
                          )}
                        </div>
                      )}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container>
                  <Grid item xs={12} style={{paddingTop: "3%"}}></Grid>
                  <Grid item xs={10}></Grid>
                  <Grid item xs={1}>
                    <Button 
                      type="submit" 
                      disabled={form.isSubmitting}
                      margin="normal"
                      variant="outlined"
                      color="primary"
                    >
                      Submit
                    </Button>
                  </Grid>
                  <Grid item xs={1}></Grid>
                </Grid>
              </Grid>
            </Grid>
          </React.Fragment>

          {console.log(form.values)}
        </div>
      </form>   
    )}
  />
  )
};

export default Create;