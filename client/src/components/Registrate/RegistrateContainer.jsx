import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { compose } from "redux";
import { registrateUser } from "../../store/user/actions";
import Registrate from "./Registrate";

const RegistrateContainer = (props) => {
  const { email, registrateUser, error } = props;
  const submitHandler = (email, password, name) => {
    registrateUser(email, password, name);
  };

  return (
    <>
      {email ? (
        <Redirect to={"/posts"} />
      ) : (
        <Registrate
            {...props}
            error={error}
          onHandlerSubmit={submitHandler}
        />
      )}
    </>
  );
};

let mapStateToProps = (state) => {
  const { email, error } = state.authPage;
  return { email, error };
};

export default compose(connect(mapStateToProps, { registrateUser }))(
  RegistrateContainer
);
