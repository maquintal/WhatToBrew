// MODULES //
import React from 'react';
import firebase from '../Firebase';

const TestGet = () => {

  const [state, setState] = React.useState({});

  React.useEffect(() => {
    firebase.firestore().collection('recipes').doc("JmkCUd36eX1cuT1a6BoT")
      .get().then((doc) => {
        if (doc.data().values.name === "test 1") {
          setState(doc.data());
        }
      })
    }, []);

  console.log(state)


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
