import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { compose } from "redux";
import { postAuth } from "../../store/auth/actions";
import Auth from "./Auth";

const AuthContainer = (props) => {
  const { email, postAuth } = props;
  const onHandlerSubmit = (email, password) => {
    postAuth(email, password);
  };

  return (
    <>
      {email ? (
        <Redirect to="/posts" />
      ) : (
        <Auth {...props} onHandlerSubmit={onHandlerSubmit} />
      )}
    </>
  );
};
let mapStateToProps = (state) => {
  const { email } = state.authPage;
  return { email };
};
export default compose(connect(mapStateToProps, { postAuth }))(AuthContainer);
