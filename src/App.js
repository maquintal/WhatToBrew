import React, { /* Component */ } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import firebase from './Firebase';
//import Create from '../src/components/Create';

const App = (props) => {
  const ref = firebase.firestore().collection('recipes');
  const [state, setState] = React.useState({
    recipes: []
  });

  const onCollectionUpdate = (querySnapshot) => {
    const recipes = [];
    querySnapshot.forEach((doc) => {
      const { title, description, author } = doc.data();
      recipes.push({
        key: doc.id,
        doc, // DocumentSnapshot
        title,
        description,
        author,
      });
    });
    setState({
      recipes
   });
  }
 
  ref.onSnapshot(onCollectionUpdate)

  return (
    <div class="container">
      <div class="panel panel-default">
        <div class="panel-heading">
          <h3 class="panel-title">
            BOARD LIST
          </h3>
        </div>
        <div class="panel-body">
          <h4><Link to="/create">Add Board</Link></h4>
          <table class="table table-stripe">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Author</th>
              </tr>
            </thead>
            <tbody>
              {state.recipes.map(board =>
                <tr>
                  <td><Link to={`/show/${board.key}`}>{board.title}</Link></td>
                  <td>{board.description}</td>
                  <td>{board.author}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
