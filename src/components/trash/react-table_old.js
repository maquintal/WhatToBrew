import React, { Component } from 'react';
import firebase from '../Firebase';

import MUIDataTable from "mui-datatables";

import Button from "@material-ui/core/Button"

class ReactTableCompo extends Component {
  constructor(props) {
    super(props);
    this.refRecipes = firebase.firestore().collection('recipes');
    this.refIngredients = firebase.firestore().collection('ingredients');
    this.unsubscribe = null;
    this.state = {
      recipes: [],
      //malts: [],
      //hops: [],
    };
  }

  onCollectionUpdateRecipes = (querySnapshot) => {
    const recipes = [];
    querySnapshot.forEach((doc) => {
      const { name, description, brewer, malts } = doc.data().values;
      recipes.push({
        key: doc.id,
        doc, // DocumentSnapshot
        name,
        description,
        brewer,
        malts,
      });
    });
    this.setState({
      recipes
   });
  }

  /* onCollectionUpdateMalts = (querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const { malts, hops } = doc.data();
      this.setState({
        malts: malts,
        hops: hops
      });
    })
  }; */

  componentDidMount() {
    this.unsubscribe = this.refRecipes.onSnapshot(this.onCollectionUpdateRecipes);
    //this.unsubscribe = this.refIngredients.onSnapshot(this.onCollectionUpdateMalts);
  }

  render() {

    const columns = [
      {
        name: "key",
        label: "Key",
        options: {
         filter: true,
         sort: true,
         display: false,
        }
       },
      {
       name: "name",
       label: "Name",
       options: {
        filter: true,
        sort: true,
       }
      },
      {
       name: "description",
       label: "Description",
       options: {
        filter: true,
        sort: false,
       }
      },
      {
       name: "brewer",
       label: "Brewer",
       options: {
        filter: true,
        sort: false,
       }
      },
    ];

    const options = {
      onRowClick: (rowData, rowMeta) => {
        //console.log("----RowClick");
        //console.log("rowData: ", rowData);
        //console.log("rowMeta: ", rowMeta);
        this.props.history.push({
          pathname: `/show/${rowData[0]}`
        })
      },
      selectableRows: false
    };
   
    return (<>
      <Button
        onClick={() => this.props.history.push({
          pathname: "/create",
          //params: {state: this.state}
        })}
      >
        Add Recipe
      </Button>
      <MUIDataTable
        title={"Brewing Recipes"}
        data={this.state.recipes}
        columns={columns}
        options={options}
      />
    </>)
  }
}

  export default ReactTableCompo;