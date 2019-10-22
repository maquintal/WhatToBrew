import React, { Component } from 'react';
import firebase from '../Firebase';
import { Formik, FieldArray, Field } from 'formik';
//import { Link } from 'react-router-dom';

// MATERIAL //
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
//import Paper from '@material-ui/core/Paper';
//import { Typography } from '@material-ui/core';

class Show extends Component {
// const Show = (props) => {
//  const [state, setState] = React.useState({board: {}, key: this.props.match.params.id})
//  const ref = firebase.firestore().collection('recipes').doc(state.key)
//  ref.get().then((doc) => {
//    if (doc.exists) {
//      setState({
//        board: doc.data(),
//        key: doc.id,
//        isLoading: false
//      });
//    } else {
//      console.log("No such document!");
//    }
//  });

  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('recipes');
    this.state = {
      board: {},
      key: '',
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('recipes').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        this.setState({
          board: doc.data(),
          key: doc.id,
          isLoading: false
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  //delete(id) {
  //  firebase.firestore().collection('recipes').doc(id).delete().then(() => {
  //    console.log("Document successfully deleted!");
  //    this.props.history.push("/")
  //  }).catch((error) => {
  //    console.error("Error removing document: ", error);
  //  });
  //}

  render() {
    return (<>
      <Formik
      enableReinitialize={true}
      initialValues={this.state.board}
      onSubmit={(values, form ) => {

        const updateRef = firebase.firestore().collection('recipes').doc(this.state.key);
        updateRef.set(values
        ).then((docRef) => {
          this.props.history.push("/show/"+this.props.match.params.id)
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
      }} 

      render={form => (
        <form onSubmit={form.handleSubmit}>
          <div /* className={classes.root} */>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                {/* <Paper className={classes.paper}> */}
                  <TextField
                    id="title"
                    name="title"
                    label="Title"
                    //class="form-control"
                    //className={classes.textField}
                    value={form.values.title}
                    InputLabelProps={{
                      shrink: form.values.title ? true : false
                    }}
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
                    InputLabelProps={{
                      shrink: form.values.title ? true : false
                    }}
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
                  {form.values.friends !== undefined ? console.log(form.values.friends) : null}
                  {form.values.friends !== undefined ? 
                    form.values.friends.length > 0 &&
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
                    )): null}
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
                {console.log(form.isSubmitting)}
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
    </>)
  }
}

export default Show;
