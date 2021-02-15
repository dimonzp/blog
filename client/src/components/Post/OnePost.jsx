import React from "react";
import { Card, Avatar, Image, Button } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import noPhoto from "../../assets/noUser.png";
import MarkedText from "../common/MarkedText/MarkedText";

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
  const history = useHistory();

  return (
      <Card
        key={`${postId}.${postedBy}`}
        hoverable
        onClick={() => history.push(`/post/${postId}`)}
        title={
          <MarkedText word={title} filtredWord={filtredWord}/>
        }
        bordered={false}
        style={{ margin: 10 }}
      >
        <Meta
          description={
            <MarkedText word={description} filtredWord={filtredWord}/>
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

        {postedById === userId && (
          <Button onClick={e => {
            e.stopPropagation()
            history.push(`/post/edit/${postId}`)}
            }>
            <EditOutlined key="edit" />
          </Button>
        )}
      </Card>
  );
};
export default OnePost;
