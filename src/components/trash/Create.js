// MODULES //
import React from 'react';
import { Formik, FieldArray, Field } from 'formik';
import firebase from '../Firebase';

// INPUTS //
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

// ICONS //
import Add from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import SvgIcon from '@material-ui/core/SvgIcon';

// CUSTOM //
import useStyles from '../css';

const Create = (props) => {
  const classes = useStyles();
  const { id } = props.match.params;
  const [state, setState] = React.useState({});

  React.useEffect(() => {
    if ( id ) {
      firebase.firestore().collection('recipes').doc(id).get().then((doc) => {
        setState(doc.data())
      })
    }    
  }, [id, setState])

  return (
    <Formik
      {...props}
      enableReinitialize={true}
      initialValues={state.values}
      /* onSubmit={(values, form) => {

        console.log(form)
        /* ref.add({
          values
        }).then((docRef) => {
          props.history.push("/")
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });

        form.setSubmitting(false);
      }} */
    
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
              <Grid item xs={12} style={{ marginBottom: "3%" }}></Grid>
            </Grid>
          </React.Fragment>
          <React.Fragment>
            <Grid container /* spacing={3} */>
              <Grid item xs={6} className={classes.fieldArrayHeader}>
                <Typography variant="h5">
                  Malt
                  <SvgIcon>
                    <path d="M7.33,18.33C6.5,17.17 6.5,15.83 6.5,14.5C8.17,15.5 9.83,16.5 10.67,17.67L11,18.23V15.95C9.5,15.05 8.08,14.13 7.33,13.08C6.5,11.92 6.5,10.58 6.5,9.25C8.17,10.25 9.83,11.25 10.67,12.42L11,13V10.7C9.5,9.8 8.08,8.88 7.33,7.83C6.5,6.67 6.5,5.33 6.5,4C8.17,5 9.83,6 10.67,7.17C10.77,7.31 10.86,7.46 10.94,7.62C10.77,7 10.66,6.42 10.65,5.82C10.64,4.31 11.3,2.76 11.96,1.21C12.65,2.69 13.34,4.18 13.35,5.69C13.36,6.32 13.25,6.96 13.07,7.59C13.15,7.45 13.23,7.31 13.33,7.17C14.17,6 15.83,5 17.5,4C17.5,5.33 17.5,6.67 16.67,7.83C15.92,8.88 14.5,9.8 13,10.7V13L13.33,12.42C14.17,11.25 15.83,10.25 17.5,9.25C17.5,10.58 17.5,11.92 16.67,13.08C15.92,14.13 14.5,15.05 13,15.95V18.23L13.33,17.67C14.17,16.5 15.83,15.5 17.5,14.5C17.5,15.83 17.5,17.17 16.67,18.33C15.92,19.38 14.5,20.3 13,21.2V23H11V21.2C9.5,20.3 8.08,19.38 7.33,18.33Z"/>
                  </SvgIcon>
                </Typography>
              </Grid>
              <Grid item xs={6} className={classes.fieldArrayHeader}>
                <Typography variant="h5">
                  Hop
                  <SvgIcon>
                    <path d="M21,12C21,12 12.5,10 12.5,2C12.5,2 21,2 21,12M3,12C3,2 11.5,2 11.5,2C11.5,10 3,12 3,12M12,6.5C12,6.5 13,8.66 15,10.5C14.76,14.16 12,16 12,16C12,16 9.24,14.16 9,10.5C11,8.66 12,6.5 12,6.5M20.75,13.25C20.75,13.25 20,17 18,19C18,19 15.53,17.36 14.33,14.81C15.05,13.58 15.5,12.12 15.75,11.13C17.13,12.18 18.75,13 20.75,13.25M15.5,18.25C14.5,20.25 12,21.75 12,21.75C12,21.75 9.5,20.25 8.5,18.25C8.5,18.25 9.59,17.34 10.35,15.8C10.82,16.35 11.36,16.79 12,17C12.64,16.79 13.18,16.35 13.65,15.8C14.41,17.34 15.5,18.25 15.5,18.25M3.25,13.25C5.25,13 6.87,12.18 8.25,11.13C8.5,12.12 8.95,13.58 9.67,14.81C8.47,17.36 6,19 6,19C4,17 3.25,13.25 3.25,13.25Z"/>
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
                          {//form.values.malts.length > 0 &&
                            form.values.malts !== undefined &&
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
                                      <FormControl className={classes.formControl}>
                                        <InputLabel 
                                          htmlFor="Malt Name"
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
                                          {/* malts.map((malt) => {
                                            return (
                                              <MenuItem value={malt}>{malt}</MenuItem>
                                            );
                                          }) */}
                                          <MenuItem value={"malt"}>{"malt"}</MenuItem>
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
                                    onClick={() => push({ name: "", quantity: "" })}
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
                          {//form.values.hops.length > 0 &&
                            form.values.hops !== undefined &&
                            form.values.hops.map((hop, index) => (
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
                                    name={`hops.${index}.name`}
                                    render={({ field }) => (
                                      <FormControl className={classes.formControl}>
                                        <InputLabel 
                                          htmlFor="Hops"
                                          className={classes.select}
                                          align="Left"
                                        >
                                          Hops
                                        </InputLabel>
                                        <Select
                                          {...field}
                                          className={classes.select}
                                          fullWidth                       
                                        >
                                          {/* hops.map((hop) => {
                                            return (
                                              <MenuItem value={hop}>{hop}</MenuItem>
                                            );
                                          }) */}
                                          <MenuItem value={"hop"}>{"hop"}</MenuItem>
                                        </Select>
                                      </FormControl>
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
                                    onClick={() => push({ name: "", quantity: "" })}
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
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} style={{ marginTop: "3%" }}></Grid>
              <Grid item xs={6} className={classes.fieldArrayHeader}>
                <Typography variant="h5">
                  Water
                  <SvgIcon>
                    <path d="M12,20A6,6 0 0,1 6,14C6,10 12,3.25 12,3.25C12,3.25 18,10 18,14A6,6 0 0,1 12,20Z"/>
                  </SvgIcon>
                </Typography>
              </Grid>
              <Grid item xs={6} className={classes.fieldArrayHeader}>
                <Typography variant="h5">
                  Yeast
                  <SvgIcon>
                    <path d="M18,14A4,4 0 0,1 22,18A4,4 0 0,1 18,22A4,4 0 0,1 14,18L14.09,17.15C14.05,16.45 13.92,15.84 13.55,15.5C13.35,15.3 13.07,15.19 12.75,15.13C11.79,15.68 10.68,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3A6.5,6.5 0 0,1 16,9.5C16,10.68 15.68,11.79 15.13,12.75C15.19,13.07 15.3,13.35 15.5,13.55C15.84,13.92 16.45,14.05 17.15,14.09L18,14M7.5,10A1.5,1.5 0 0,1 9,11.5A1.5,1.5 0 0,1 7.5,13A1.5,1.5 0 0,1 6,11.5A1.5,1.5 0 0,1 7.5,10M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"/>
                  </SvgIcon>
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Grid container className={classes.container}>
                  <Grid item xs={3}>
                    <Field
                      name={`waters.[0].step`}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Step"
                          placeholder="Step"
                          className={classes.textField}
                          onChange={form.handleChange}
                          margin="dense"
                          value="Mash In"
                          fullWidth
                          variant="outlined"
                        />
                      )}
                    />
                    {/* errors.email && touched.email && errors.email */}                
                  </Grid>
                  <Grid item xs={3}>
                    <Field
                      name={`waters.[0].quantity`}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Quantity"
                          placeholder="15 L"
                          className={classes.textField}
                          onChange={form.handleChange}
                          margin="dense"
                          fullWidth
                          variant="outlined"
                        />
                      )}
                    />
                    {/* errors.email && touched.email && errors.email */}                
                  </Grid>
                  <Grid item xs={3}>
                    <Field
                      name={`waters.[0].temperature`}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Temperature"
                          placeholder="152 F"
                          className={classes.textField}
                          onChange={form.handleChange}
                          margin="dense"
                          fullWidth
                          variant="outlined"
                        />
                      )}
                    />
                    {/* errors.email && touched.email && errors.email */}                
                  </Grid>
                  <Grid item xs={3}>
                    <Field
                      name={`waters.[0].duration`}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Duration"
                          placeholder="60 min"
                          className={classes.textField}
                          onChange={form.handleChange}
                          margin="dense"
                          fullWidth
                          variant="outlined"
                        />
                      )}
                    />
                    {/* errors.email && touched.email && errors.email */}                
                  </Grid>
                  <Grid item xs={3}>
                    <Field
                      name={`waters.[1].step`}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Step"
                          placeholder="Step"
                          //class="form-control"
                          className={classes.textField}
                          onChange={form.handleChange}
                          margin="dense"
                          value="Sparge"
                          fullWidth
                          variant="outlined"
                        />
                      )}
                    />
                    {/* errors.email && touched.email && errors.email */}                
                  </Grid>
                  <Grid item xs={3}>
                    <Field
                      name={`waters.[1].quantity`}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Quantity"
                          placeholder="18 L"
                          className={classes.textField}
                          onChange={form.handleChange}
                          margin="dense"
                          fullWidth
                          variant="outlined"
                        />
                      )}
                    />
                    {/* errors.email && touched.email && errors.email */}                
                  </Grid>
                  <Grid item xs={3}>
                    <Field
                      name={`waters.[1].temperature`}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Temperature"
                          placeholder="152 F"
                          className={classes.textField}
                          onChange={form.handleChange}
                          margin="dense"
                          fullWidth
                          variant="outlined"
                        />
                      )}
                    />
                    {/* errors.email && touched.email && errors.email */}                
                  </Grid>
                  <Grid item xs={3}>
                    <Field
                      name={`waters.[1].duration`}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Duration"
                          placeholder="60 min"
                          className={classes.textField}
                          onChange={form.handleChange}
                          margin="dense"
                          fullWidth
                          variant="outlined"
                        />
                      )}
                    />
                    {/* errors.email && touched.email && errors.email */}                
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Grid container>
                  <Grid item xs={12}>
                    <FieldArray
                      name="yeasts"
                      render={({ insert, remove, push }) => (
                        <div>
                          {//form.values.yeasts.length > 0 &&
                            form.values.yeasts !== undefined &&
                            form.values.yeasts.map((yeast, index) => (
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
                                    name={`yeasts.${index}.name`}
                                    render={({ field }) => (
                                      <FormControl className={classes.formControl}>
                                        <InputLabel 
                                          htmlFor="Yeasts"
                                          className={classes.select}
                                          align="Left"
                                        >
                                          Yeasts
                                        </InputLabel>
                                        <Select
                                          {...field}
                                          className={classes.select}
                                          fullWidth                       
                                        >
                                          {/* yeasts.map((yeast) => {
                                            return (
                                              <MenuItem value={yeast}>{yeast}</MenuItem>
                                            );
                                          }) */}
                                          <MenuItem value={"yeast"}>{"yeast"}</MenuItem>
                                        </Select>
                                      </FormControl>
                                    )}
                                  />
                                </Grid>
                                <Grid item xs={5}>
                                  <Field
                                    name={`yeasts.${index}.quantity`}
                                    render={({ field }) => (
                                      <TextField
                                        {...field}
                                        label="Quantity"
                                        placeholder="28"
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
                                    onClick={() => push({ name: "", quantity: "" })}
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