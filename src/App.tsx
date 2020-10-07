import React from 'react';
import { Redirect, Route, BrowserRouter as Router } from 'react-router-dom';
// import { NavLink, NavLinkProps, match, Link, RouteComponentProps, LinkProps, HashRouter } from 'react-router-dom';

import './App.css';
import Home from './pages/Home';
import AddItem from './pages/AddItem';
import ItemDetails from './pages/ItemDetails';

function App() {
  return (
    <div className='App'>
      <Router>
        <div className='App'>
          <Route exact path='/' component={Home} />
          <Route exact path='/add' component={AddItem} />
          <Route path='/item/:id' component={ItemDetails} />
        </div>
      </Router>
    </div>
  );
}

export default App;
