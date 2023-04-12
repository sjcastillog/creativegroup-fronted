import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "./Auth";

function PrivateRoute({ component: Component, ...rest }) {
  const { authTokens } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) =>{ 
        if(authTokens){ 
            return <Component {...props} />
        }else{
            return <Redirect to="/Login" />
        }

      }}
    />
  );
}

export default PrivateRoute;