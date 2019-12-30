// MODULES //
import React from 'react';
import firebase from '../Firebase';

import MUIDataTable from "mui-datatables";

const TestGet = () => {
  //const [ref] = firebase.firestore().collection('recipes');
  const [data, setData] = React.useState({});
  /* const [data] = React.useState(
    firebase.firestore().collection('recipes')
    .get()
    .then(snap => { snap.forEach(doc => { doc.data() })})
  ) */

  /* firebase.firestore().collection('recipes')
    .get()
    .then(snap => { snap.forEach(doc => {
      //console.log(doc.data())
      setData(doc.data())
    }) }); */

  React.useEffect(() => {
    firebase.firestore().collection('recipes')
    .get().then(snap => { 
      snap.forEach(doc => { 
        //doc.data()
        setData(doc.data())
      }
    )})
  }, [])

  /* React.useEffect(() => {
    //ref
    const recipes = [];
    firebase.firestore().collection('recipes')
      .get()
      .then(snap => {
        snap.forEach(doc => {
          const { name, description, brewer } = doc.data().values;
          recipes.push({
            key: doc.id,
            doc, // DocumentSnapshot
            name,
            description,
            brewer
          });
        });
      })
    setData({
      recipes
    });
  }, []); */

  const columns = ["name", "description", "brewer"];

  const options = {
    filterType: 'checkbox',
  };

  console.log(data)
  return (<>
    {data ? 
      <MUIDataTable
        title={"Employee List"}
        data={data}
        columns={columns}
        options={options}
      />
    : console.log("rien")}    
  </>);

}

export default TestGet;
