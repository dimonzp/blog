import React from "react";
import { Card, Image } from "antd";
import { Link } from "react-router-dom";
import { EditOutlined } from "@ant-design/icons";

const { Meta } = Card;

const PostPage = ({
  postPage: { title, fullText, description, dateCreated, image, postedBy, _id },
  userId,
}) => {
  return (
    <Card
      title={title}
      bordered={false}
      actions={
        postedBy === userId && [
          <Link to={`/post/edit/${_id}`}>
            <EditOutlined key="edit" />
          </Link>,
        ]
      }
    >
      <Meta description={description} />
      {image && (
        <Image width={300} style={{ justifyItems: "center" }} src={image} />
      )}
      <p>{fullText}</p>
      <p>{`Registreted: ${new Date(dateCreated).toLocaleDateString()}`}</p>
    </Card>
  );
};

export default PostPage;
