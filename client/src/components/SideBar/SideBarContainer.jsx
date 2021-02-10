import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { logout } from "../../store/auth/actions";
import SideBar from "./SideBar";

const SideBarContainer = (props) => {
    const { email, logout, avatar } = props;
    const logoutAction = () => {
      localStorage.clear();
      logout()
    }
    return <SideBar {...props} email={email} logout={logoutAction} avatar={avatar}/>;
  };
  
  let mapStateToProps = (state) => {
    const { email } = state.authPage;
    const { avatar } = state.authPage;
    return { email, avatar };
  };
  
  export default compose(connect(mapStateToProps, {logout}))(SideBarContainer);
  