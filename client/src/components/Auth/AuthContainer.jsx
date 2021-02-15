import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { compose } from "redux";
import { postAuth } from "../../store/auth/actions";
import Auth from "./Auth";

const AuthContainer = (props) => {
  const { email, postAuth, error } = props;
  const onHandlerSubmit = (email, password) => {
    postAuth(email, password);
  };

  return (
    <>
      {email ? (
        <Redirect to="/posts" />
      ) : (
        <Auth error={error} onHandlerSubmit={onHandlerSubmit} />
      )}
    </>
  );
};

let mapStateToProps = (state) => {
  const { email, error } = state.authPage;
  console.log("AUTH CONTAINER", error);
  return { email, error };
};
export default compose(connect(mapStateToProps, { postAuth }))(AuthContainer);
