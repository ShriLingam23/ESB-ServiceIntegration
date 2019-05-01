import React from 'react';
import {BrowserRouter,Switch,Route} from 'react-router-dom';

import './App.css';
import './assets/css/Landing.css'
import './assets/css/bootstrap.min.css'

import Landing from './components/Landing'
import Home from './components/Home'

function App() {
  return (
    <BrowserRouter>
    
      <Switch>
        <Route exact path='/' component={Landing} />
        <Route exact path='/home/:id' component={Home} />
      </Switch>

    </BrowserRouter>
    
  );
}

export default App;
