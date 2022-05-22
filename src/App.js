import React, { Component, useEffect } from 'react';
import Home from './components/Home/Home';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import listingSingle from './components/PostDetails/ListingSingle';
import Auth from './components/Auth/Auth'
import Admin from './components/Form/Admin'

import Dashboard from './components/AdminSite/AdminDashboard/Dashboard';
import ClientDashbord from './components/Client/ClientDashbord/ClientDashboard';

import {useSelector, useDispatch} from 'react-redux';

import {getUsers} from './actions/users';
import { AdminRoute } from './helpers/routes/admin';
import { ClientRoute } from './helpers/routes/client';
import { BusinessRoute } from './helpers/routes/business';
import { HomeRoute } from './helpers/routes/home';

const App = () => {

  
  return (
    
      <div>
        <Router>
    {/* <Switch> */}
      
      <Route exact path='/' component={Home}/>
       
       <Route exact path='/posts' component={Home}/>
      
       <Route exact path="/search" exact component={Home} />
        
        <Route exact strict path="/:id" exact component={listingSingle}/> 
    
        <Route exact path="/Auth" component={Auth}/>
        {/* <Route exact path="/Admin" component={Admin}/> */}
       
        <AdminRoute path="/adminDashboard" component={Dashboard}/>
        <BusinessRoute path="/clientDashboard" component={ClientDashbord}/>
        {/* <Route exact path="/Admins" component={Index}/> */}
        {/* <Route exact path="/Admins/users" component={() => <User users={users} />}/> */}

      
    {/* </Switch> */}
    </Router>
      </div>
  )
}

export default App;
