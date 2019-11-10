import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import firebase from './Firebase';

import Button from "@material-ui/core/Button";
//import Create from "./components/Create";

class App extends Component {
  constructor(props) {
    super(props);
    this.refRecipes = firebase.firestore().collection('recipes');
    this.refMalts = firebase.firestore().collection('malts');
    this.unsubscribe = null;
    this.state = {
      recipes: [],
      malts: [],
    };
  }

  onCollectionUpdateRecipes = (querySnapshot) => {
    const recipes = [];
    querySnapshot.forEach((doc) => {
      const { name, description, brewer } = doc.data().values;
      recipes.push({
        key: doc.id,
        doc, // DocumentSnapshot
        name,
        description,
        brewer
      });
    });
    this.setState({
      recipes
   });
  }

  onCollectionUpdateMalts = (querySnapshot) => {
    const malts = [];
    querySnapshot.forEach((doc) => {
      const { malt_name } = doc.data();
      malts.push({
        malt_name
      });
    });
    this.setState({
      malts
   });
  }

  componentDidMount() {
    this.unsubscribe = this.refRecipes.onSnapshot(this.onCollectionUpdateRecipes);
    this.unsubscribe = this.refMalts.onSnapshot(this.onCollectionUpdateMalts);
  }

  render() {
    console.log(this.state)
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              BOARD LIST
            </h3>
          </div>
          <div class="panel-body">
            {console.log(this.state)}
            {/* <h4><Link to='/create' params={{state: this.state}}>Add Board</Link></h4> */}
            <Button
              onClick={() => this.props.history.push({
                pathname: "/create",
                params: {state: this.state}
                //state: {state: state}
              })}
            >
              CLick
            </Button>
            <table class="table table-stripe">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Brewer</th>
                </tr>
              </thead>
              <tbody>
                {this.state.recipes.map(board =>
                  <tr>
                    <td><Link to={`/show/${board.key}`}>{board.name}</Link></td>
                    <td>{board.description}</td>
                    <td>{board.brewer}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
