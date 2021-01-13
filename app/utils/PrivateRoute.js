import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const PrivateRoute = ({ children, ...rest }) => {
  const { user } = useContext(AuthContext);
  const { isAuthenticated } = user.user;
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: location } }} />
        )
      }
    />
  );
};
export default PrivateRoute;
