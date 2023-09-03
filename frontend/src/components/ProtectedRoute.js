import React from "react";
import { Navigate} from "react-router-dom";

function ProtectedRoute({ component: Component, isLoggedIn, ...props }) {
  return (
        isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Navigate to='/sign-up' replace/>
        )
  );
}

export default ProtectedRoute;