import React from "react";
import { Card, Avatar, Image } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import noPhoto from "../../assets/noUser.png";
import Text from "antd/lib/typography/Text";

const { Meta } = Card;

const OnePost = ({
  title,
  postId,
  postedBy,
  avatar,
  userId,
  description,
  dateCreated,
  filtredWord,
  postedById,
}) => {
  return (
    <Card
      key={`${postId}.${postedBy}`}
      hoverable
      title={
        typeof title === "string"
          ? title
          : title &&
            title.map((t, index) => {
              return filtredWord.toLowerCase() === t.toLowerCase() ? (
                <Text key={`${postId}.${index}`} mark>
                  {t}
                </Text>
              ) : (
                <span key={`${postId}.${index}`}>{t}</span>
              );
            })
      }
      bordered={false}
      style={{ margin: 10 }}
    >
      <Link key={`${postId}.${postedBy}`} to={`/post/${postId}`}>
        <Meta
          description={
            typeof description === "string"
              ? description
              : title &&
                description.map((d, index) => {
                  return filtredWord.toLowerCase() === d.toLowerCase() ? (
                    <Text key={`${postId}.${index}`} mark>{d}</Text>
                  ) : (
                    <span key={`${postId}.${index}`}>{d}</span>
                  );
                })
          }
        />

        <Meta
          avatar={
            <Avatar
              src={<Image src={avatar ? avatar : noPhoto} preview={false} />}
            />
          }
          title={`Posted by: ${postedBy}`}
          description={new Date(dateCreated).toLocaleDateString()}
        />
      </Link>
      {postedById === userId && (
        <Link to={`/post/edit/${postId}`}>
          <EditOutlined key="edit" />
        </Link>
      )}
    </Card>
  );
};
export default OnePost;
