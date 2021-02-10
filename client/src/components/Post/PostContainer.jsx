import React, { useEffect } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { getPosts } from "../../store/posts/actions";
import Post from "./Post";

const PostsContainer = ({ getPosts, posts, _id, users }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return <Post posts={posts} userId={_id} users={users} />;
};

let mapStateToProps = (state) => {
  const { posts } = state.postsPage;
  const { _id } = state.authPage;
  const { users } = state.usersPage;
  return { posts, _id, users };
};

export default compose(connect(mapStateToProps, { getPosts }))(PostsContainer);
