import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import { compose } from "redux";
import { withAuthRedirect } from "../../../hoc/withRedirect";
import {
  deletePost,
  getPostById,
  updatePost,
} from "../../../store/posts/actions";
import EditPost from "./EditPost";

const EditPostContainer = ({
  match: {
    params: { id },
  },
  postPage,
  _id,
  getPostById,
  deletePost,
  updatePost,
  redirectPath = "/posts",
}) => {
  const [isRedirect, setIsRedirect] = useState(false);

  const editPostHandler = (_id, titleText, fullMain, descriptionText) => {
    updatePost(_id, titleText, fullMain, descriptionText);
    setIsRedirect(true);
  };
  const deletePostHandler = (_id) => {
    deletePost(_id);
    setIsRedirect(true);
  };

  useEffect(() => {
    getPostById(id);
  }, [getPostById, id]);

  return isRedirect ? (
    <Redirect to={redirectPath} />
  ) : (
    <EditPost
      deletePostHandler={deletePostHandler}
      editPostHandler={editPostHandler}
      postPage={postPage}
      userId={_id}
      deletePost={deletePost}
      updatePost={updatePost}
    />
  );
};

let mapStateToProps = (state) => {
  const { postPage } = state.postsPage;
  const { _id } = state.authPage;
  return { postPage, _id };
};

export default compose(
  connect(mapStateToProps, { getPostById, deletePost, updatePost }),
  withRouter,
  withAuthRedirect
)(EditPostContainer);
