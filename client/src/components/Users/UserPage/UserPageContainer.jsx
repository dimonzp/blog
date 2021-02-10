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
}) => {
  useEffect(() => {
    getPosts();
    getUserById(id);
  }, [getUserById, id, getPosts]);

  return <UserPage userPage={userPage} posts={posts} />;
};

let mapStateToProps = (state) => {
  const { userPage } = state.usersPage;
  const { posts } = state.postsPage;
  return { userPage, posts };
};

export default compose(
  connect(mapStateToProps, { getUserById, getPosts }),
  withRouter
)(UserPageContainer);
