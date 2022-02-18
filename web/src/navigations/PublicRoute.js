import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Login from '../components/Login';


const PublicRoute = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to='/login'/>
      </Route>
      <Route path="/login">
        <Login/>
      </Route>
    </Switch>
  )
}

export default PublicRoute;
