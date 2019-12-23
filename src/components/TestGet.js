// MODULES //
import React from 'react';
import firebase from '../Firebase';

const TestGet = () => {

  //const [state, setState] = React.useState({});

  //React.useEffect(() => {
    /* const ref = firebase.firestore().collectionGroup('recipes')//.doc("JmkCUd36eX1cuT1a6BoT")
      //.where("name", "==", "test 1")
      //.orderBy("name")
      .get().then((doc) => {
        console.log(doc.data())
        //setState(doc.data());
      }) */

      firebase.firestore().collection('recipes')
        .get()
        .then(snap => {
          let res = [];
          snap.forEach(doc => {
            if ( doc.data().values.name.includes("test") ) {
              res.push(doc.data().values.name)
            }
            //console.log(doc.data());
            
          });
          console.log(res)
        });



      /* let citiesRef = firebase.firestore().collection('recipes');
      //let query = 
      citiesRef//.where('values', '==', "test")
      .get()
        .then(snapshot => {
          if (snapshot.empty) {
            console.log('No matching documents.');
            return;
          }
          snapshot.forEach(doc => {
            console.log(doc.id, '=>', doc.data());
          });
        })
        .catch(err => {
          console.log('Error getting documents', err);
        }); */

    //}, []);

  //console.log(state)


  /* db.collection("cities").where("capital", "==", true)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    }); */

  return (<>
    
  </>);

}

export default TestGet;
