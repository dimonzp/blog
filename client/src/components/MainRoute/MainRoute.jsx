import React from "react";
import { Route } from "react-router-dom";
import AuthContainer from "../Auth/AuthContainer";
import AddNewPostContainer from "../Post/AddNewPost/AddNewPostContainer";
import EditPostContainer from "../Post/EditPost/EditPostContainer";
import PostContainer from "../Post/PostContainer";
import PostPageContainer from "../Post/PostPage/PostPageContainer";
import RegistrateContainer from "../Registrate/RegistrateContainer";
import CabinetContainer from "../Users/Cabinet/CabinetContainer";
import UserPageContainer from "../Users/UserPage/UserPageContainer";
import UsersContainer from "../Users/UsersContainer";


const MainContainer = () => {
  return (
    <div
      className="site-layout-background"
      style={{ padding: 24 }}
    >
      <Route exact path="/" component={PostContainer} />
      <Route exact path="/login" component={AuthContainer} />
      <Route exact path="/registrate" component={RegistrateContainer} />
      <Route exact path="/users" component={UsersContainer} />
      <Route exact path="/cabinet" component={CabinetContainer} />
      <Route exact path="/user/:id" component={UserPageContainer} />
      <Route exact path="/posts/new" component={AddNewPostContainer} />
      <Route exact path="/post/:id" component={PostPageContainer} />
      <Route exact path="/post/edit/:id" component={EditPostContainer} />

      <Route exact path="/posts" render={() => <PostContainer />} />
    </div>
  );
};

export default MainContainer;
