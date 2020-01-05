import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// COMPONENTS //
import Show from './components/Show';
import SimpleSnackbar from "./components/snackbar";
import TestGet from "./components/TestGet";
import ReactTableCompo from "./components/react-table";
import AddMalts from "./components/management/addMalts";

ReactDOM.render(
  <Router>
      <div>
        <Route exact path='/' component={App} />
        {/* <Route path='/edit/:id' component={Edit} /> */}
        {/* <Route path='/create' component={Create} /> */}
        {/* <Route path='/create/:id' component={Create} /> */}
        <Route path='/create' component={Show} />
        <Route path='/show/:id' component={Show} />
        <Route path='/snackbar' component={SimpleSnackbar} />
        <Route path='/test' component={TestGet} />
        <Route path='/react-table' component={ReactTableCompo} />
        <Route path='/addMalts' component={AddMalts} />
      </div>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();