import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { getPosts } from "../../../store/posts/actions";
import { getUserById } from "../../../store/user/actions";
import UserPage from "./UserPage";

const UserPageContainer = ({
  match: {
    params: { id },
  },
  getUserById,
  userPage,
  getPosts,
  posts,
  _id
}) => {
  useEffect(() => {
    getPosts();
    getUserById(id);
  }, [getUserById, id, getPosts]);

  return <UserPage userPage={userPage} posts={posts} authUserId={_id} />;
};

let mapStateToProps = (state) => {
  const { userPage } = state.usersPage;
  const { posts } = state.postsPage;
  const { _id } = state.authPage;

  return { userPage, posts, _id };
};

export default compose(
  connect(mapStateToProps, { getUserById, getPosts }),
  withRouter
)(UserPageContainer);
