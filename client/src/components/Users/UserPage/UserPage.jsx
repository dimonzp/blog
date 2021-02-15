import React from "react";
import { Card, Image } from "antd";
import noUser from "../../../assets/noUser.png";
import { filterPost } from "../../../utils/filterPost";
import OnePost from "../../Post/OnePost";
import Title from "antd/lib/typography/Title";

const UserPage = ({
  userPage: { _id, email, name, dateCreated, avatar },
  posts,
  authUserId
}) => {
  return (
    <>
      <Card title={name} bordered={false}>
        <Image
          width={300}
          style={{ justifyItems: "center" }}
          src={avatar ? avatar : noUser}
          preview={false}
        />

        <p>{email}</p>
        <p>{`id: ${_id}`}</p>
        <p>{`Registreted: ${new Date(dateCreated).toLocaleDateString()}`}</p>
      </Card>
      {filterPost(posts, "", true, _id).length ? (
        <>
          <Title>Posts by {name}</Title>
          {filterPost(posts, "", true, _id).map((p) => {
            return (
              <OnePost
                key={p._id}
                title={p.title}
                postId={p._id}
                postedBy={name}
                postedById={p.postedBy}
                avatar={avatar || ""}
                userId={authUserId}
                description={p.description}
                dateCreated={p.dateCreated}
                filtredWord={""}
              />
            );
          })}
        </>
      ) : (
        <div style={{ paddingTop: "10px" }}>
          <Card title={"No posts yet..."}>
            <Title>No posts by this user</Title>
          </Card>
        </div>
      )}
    </>
  );
};

export default UserPage;
