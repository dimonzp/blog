import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { compose } from "redux";
import { withAuthRedirect } from "../../../hoc/withRedirect";
import { createNewPost } from "../../../store/posts/actions";
import AddNewPost from "./AddNewPost";

const AddNewPostContainer = ({
  createNewPost,
  setIsAddPost,
  redirectPath = "/posts",
}) => {
  const [isRedirect, setIsRedirect] = useState(false);

  const sendNewPost = (title, fullText, description) => {
    setIsAddPost(false);
    createNewPost(title, fullText, description);
    setIsRedirect(true);
  };

  return (
    <>
      {isRedirect ? (
        <Redirect to={redirectPath} />
      ) : (
        <AddNewPost sendNewPost={sendNewPost} />
      )}
    </>
  );
};

let mapStateToProps = (state) => {
  const { posts } = state.postsPage;
  return { posts };
};

export default compose(
  connect(mapStateToProps, { createNewPost }),
  withAuthRedirect
)(AddNewPostContainer);
