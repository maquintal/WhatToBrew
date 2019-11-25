import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import firebase from './Firebase';

import Button from "@material-ui/core/Button";

class App extends Component {
  constructor(props) {
    super(props);
    this.refRecipes = firebase.firestore().collection('recipes');
    this.refIngredients = firebase.firestore().collection('ingredients');
    this.unsubscribe = null;
    this.state = {
      recipes: [],
      malts: [],
      hops: [],
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
    querySnapshot.forEach((doc) => {
      const { malts, hops } = doc.data();
      this.setState({
        malts: malts,
        hops: hops
      });
    })
  };

  componentDidMount() {
    this.unsubscribe = this.refRecipes.onSnapshot(this.onCollectionUpdateRecipes);
    this.unsubscribe = this.refIngredients.onSnapshot(this.onCollectionUpdateMalts);
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
                    <td>
                      <Button
                        onClick={() => this.props.history.push({
                          pathname: `/show/${board.key}`,
                          params: {state: this.state, id: board.key}
                        }
                        //  `/show/${board.key}`
                        
                          
                        )}
                      >
                        {board.name}
                      </Button>
                    </td>
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
