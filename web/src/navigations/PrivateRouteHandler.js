import React from 'react';
import { Redirect, Route } from 'react-router-dom';

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
const PrivateRouteHandler = ({children, auth, ...rest}) => {
  console.log(children, '', auth );
  return (
    <Route
      {...rest}
      render={({location}) =>
        auth?.loggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: {from: location}
            }}
          />
        )
      }
    />
  );
}

export default PrivateRouteHandler;
