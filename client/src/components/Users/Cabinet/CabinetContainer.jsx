import React, { useEffect } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withAuthRedirect } from "../../../hoc/withRedirect";
import {
  deleteUser,
  updateAvatar,
  updateUser,
} from "../../../store/auth/actions";
import { getPosts } from "../../../store/posts/actions";
import { getUserById } from "../../../store/user/actions";
import Cabinet from "./Cabinet";

const CabinetContainer = ({
  updateUser,
  _id,
  avatar,
  name,
  email,
  posts,
  dateCreated,
  updateAvatar,
  getPosts,
  deleteUser,
}) => {
  useEffect(() => {
    getUserById(_id);
    getPosts();
  }, [_id, getPosts]);

  return  <>
   <Cabinet
    deleteUser={deleteUser}
    updateUser={updateUser}
    _id={_id}
    avatar={avatar}
    userName={name}
    email={email}
    posts={posts}
    dateCreated={dateCreated}
    updateAvatar={updateAvatar}
  />
    </>
  
};

let mapStateToProps = (state) => {
  const { _id, avatar, name, dateCreated } = state.authPage;
  const { posts } = state.postsPage;

  return { _id, avatar, name, dateCreated, posts };
};

export default compose(
  connect(mapStateToProps, {
    getUserById,
    getPosts,
    updateUser,
    updateAvatar,
    deleteUser,
  }),
  withAuthRedirect
)(CabinetContainer);
