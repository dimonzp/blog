import React, { useState, useEffect, useCallback } from "react";
import { Switch, Pagination } from "antd";
import OnePost from "./OnePost";
import Filter from "../common/Filter/Filter";
import { filterPost } from "../../utils/filterPost";
import SearchNotFound from "../common/SeachNotFound/SearchNotFoundPost";

const Posts = ({ posts, userId, users }) => {
  const [isMyPosts, setIsMyPosts] = useState(false);
  const [filtredWord, setFiltredWord] = useState("");
  const [filtredPosts, setFiltredPosts] = useState([]);
  const [page, setPage] = useState(1);

  const postsPage = useCallback(
    (page, size = 5) => {
      let postByPage = [];
      for (let i = 0; i < Math.ceil(filtredPosts.length / size); i++) {
        postByPage[i] = filtredPosts.slice(i * size, i * size + size);
      }
      postByPage.length && postByPage.length < page && setPage(1);
      return postByPage[page - 1] || [];
    },
    [filtredPosts]
  );

  useEffect(() => {
    if (!filtredWord && !isMyPosts) {
      setFiltredPosts(posts);
    } else {
      JSON.stringify(filterPost(posts, filtredWord, isMyPosts, userId)) !==
        JSON.stringify(filtredPosts) &&
        setFiltredPosts(filterPost(posts, filtredWord, isMyPosts, userId));
    }
    postsPage(page);
  }, [filtredWord, posts, postsPage, page, userId, isMyPosts, filtredPosts]);

  const onChangeHandler = (e) => {
    setTimeout(setFiltredWord, 250, e.target.value);
  };

  const params = {
    defaultChecked: false,
  };

  return (
    <div key={"dd"} style={{ paddingBottom: "5%" }}>
      <h1>Posts</h1>
      <div style={{ paddingTop: "10px" }}>
        <Filter onChangeHandler={onChangeHandler} placeHolder={"Title, description"} />
      </div>

      {userId && (
        <Switch
          {...params}
          checkedChildren="My posts"
          unCheckedChildren="All"
          onChange={setIsMyPosts}
        />
      )}
      {postsPage(page).length ? (
        <div>
          {postsPage(page).map((p, index) => {
            const userPostedBy =
              users.find((user) => user._id === p.postedBy) || {};

            return (
              <OnePost
                key={`${p._id}.${index}`}
                title={p.title}
                postId={p._id}
                postedBy={userPostedBy.name}
                postedById={p.postedBy}
                avatar={userPostedBy.avatar || ""}
                userId={userId}
                description={p.description}
                dateCreated={p.dateCreated}
                filtredWord={filtredWord}
              />
            );
          })}
          <Pagination
            size="small"
            total={filtredPosts.length}
            pageSize={5}
            onChange={(page) => {
              setPage(page);
            }}
            current={page}
          />
        </div>
      ) : (
        <SearchNotFound title={"Post not found by filter"} />
      )}
    </div>
  );
};

export default Posts;
