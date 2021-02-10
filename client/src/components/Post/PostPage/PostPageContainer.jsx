import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { getPostById } from "../../../store/posts/actions";
import PostPage from "./PostPage";

const PostPageContainer = ({
  match: {
    params: { id },
  },
  _id,
  getPostById,
  postPage,
}) => {
  
  useEffect(() => {
    getPostById(id);
  }, [getPostById, id]);

  return <PostPage postPage={postPage} userId={_id} />;
};

let mapStateToProps = (state) => {
  const { postPage } = state.postsPage;
  const { _id } = state.authPage;
  
  return { postPage, _id };
};

export default compose(
  connect(mapStateToProps, { getPostById }),
  withRouter
)(PostPageContainer);
