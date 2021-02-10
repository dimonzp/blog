import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

export const withAuthRedirect = (Component) => {
  const RedirectComponent = (props) => {
    if (!localStorage.getItem('token')) return <Redirect to={"/login"} />;

    return <Component {...props} />;
  };

  let mapStateToProps = (state) => {
    return {
      email: state.authPage.email,
    };
  };

  let ConectRedirectComponent = connect(mapStateToProps)(RedirectComponent);

  return ConectRedirectComponent;
};
