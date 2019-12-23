import React, { Component } from 'react';
import firebase from '../Firebase';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

//import Button from "@material-ui/core/Button";

class ReactTableCompo extends Component {
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
   
    const columns = [{
      Header: 'Name',
      accessor: 'name' // String-based value accessors!
    }]
   
    return (<ReactTable
      data={this.state.recipes}
      columns={columns}
      filterable={true}
    />)
  }
}

  export default ReactTableCompo;