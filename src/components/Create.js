// MODULES //
import React from 'react';
import { Formik, FieldArray, Field } from 'formik';
import firebase from '../Firebase';
//import { Link } from 'react-router-dom';

// MATERIAL //
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
//import Paper from '@material-ui/core/Paper';
//import { Typography } from '@material-ui/core';

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
        title: '',
        description: '',
        author: '',
        friends: [
          {
            name: "Klaus",
            email: "klaus@formik.com"
          },
          {
            name: "Hans",
            email: "hans@formik.com"
          }
        ]
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
          title: values.title,
          description: values.description,
          friends: values.friends
          //author: values.author
        }).then((docRef) => {
          /* setState({
            title: '',
            description: '',
            author: ''
          }); */
          props.history.push("/")
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
        form.setSubmitting(false);
      }}
    //>
    render={form => (
      <form onSubmit={form.handleSubmit}>
        <div className={classes.root}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              {/* <Paper className={classes.paper}> */}
                <TextField
                  id="title"
                  name="title"
                  label="Title"
                  //class="form-control"
                  //className={classes.textField}
                  value={form.values.name}
                  onChange={form.handleChange}
                  margin="normal"
                />
                {/* errors.email && touched.email && errors.email */}
              {/* </Paper> */}
            </Grid>
            <Grid item xs={12}>
              {/* <Paper className={classes.paper}> */}
                <TextField 
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
                />
                {/* errors.password && touched.password && errors.password */}
              {/* </Paper> */}
            </Grid>
            <Grid item xs={12}>
            <FieldArray
            name="friends"
            render={({ insert, remove, push }) => (
              <div>
                {form.values.friends.length > 0 &&
                  form.values.friends.map((friend, index) => (
                    <div className="row" key={index}>
                      <div className="col">
                        <label htmlFor={`friends.${index}.name`}>Name</label>
                        <Field
                          name={`friends.${index}.name`}
                          placeholder="Jane Doe"
                          type="text"
                        />
                        {/* errors.friends &&
                          errors.friends[index] &&
                          errors.friends[index].name &&
                          touched.friends &&
                          touched.friends[index].name && (
                            <div className="field-error">
                              {/* errors.friends[index].name }
                            </div>
                          )*/}
                      </div>
                      <div className="col">
                        <label htmlFor={`friends.${index}.email`}>
                          Email
                        </label>
                        <Field
                          name={`friends.${index}.email`}
                          placeholder="jane@acme.com"
                          type="email"
                        />
                        {/* errors.friends &&
                          errors.friends[index] &&
                          errors.friends[index].email &&
                          touched.friends &&
                          touched.friends[index].email && (
                            <div className="field-error">
                              {errors.friends[index].email}
                            </div>
                          ) */}
                      </div>
                      <div className="col">
                        <button
                          type="button"
                          className="secondary"
                          onClick={() => remove(index)}
                        >
                          X
                        </button>
                      </div>
                    </div>
                  ))}
                <button
                  type="button"
                  className="secondary"
                  onClick={() => push({ name: "", email: "" })}
                >
                  Add Friend
                </button>
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