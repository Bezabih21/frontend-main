import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { LOGOUT } from "../../constants/actionTypes";

export const AdminRoute = ({
  component: Component,
  ...rest
}) => {
    const dispatch = useDispatch();
  return (
    <Route
      {...rest}
      render={props => {
        if (JSON.parse(localStorage.getItem('profile'))?.result.role === 'ADMIN') {

          return <Component {...props} />;
        } else {
          dispatch({type: LOGOUT})
          // console.log("kkkkkkk", user.current);

          return (
            <Redirect
              to={{
                pathname: "/",
                state: {
                  from: props.location
                }
              }}
            />
          );
        }
      }}
    />
  );
};
