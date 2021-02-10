import React, { useEffect } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { getUsers } from "../../store/user/actions";
import Users from "./Users";

const UsersContainer = ({ getUsers, users }) => {
  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return <Users users={users} />;
};

let mapStateToProps = (state) => {
  const { users } = state.usersPage;
  return { users };
};

export default compose(connect(mapStateToProps, { getUsers }))(UsersContainer);
