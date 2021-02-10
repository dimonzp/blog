import React, { useEffect, useState } from "react";
import { Button, Modal, Card, Image } from "antd";
import Paragraph from "antd/lib/typography/Paragraph";
import PhotoLoader from "./PhotoLoader";
import noUser from "../../../assets/noUser.png";
import OnePost from "../../Post/OnePost";
import { filterPost } from "../../../utils/filterPost";
import Title from "antd/lib/typography/Title";
import { Link } from "react-router-dom";
import { FormOutlined } from "@ant-design/icons";
import AddNewPostContainer from "../../Post/AddNewPost/AddNewPostContainer";

const Cabinet = ({
  updateUser,
  _id,
  avatar,
  userName,
  email,
  dateCreated,
  updateAvatar,
  posts,
}) => {
  const [name, setName] = useState(userName);
  const [isAddPost, setIsAddPost] = useState(false);

  const [base64, setBase64] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalUpdateVisible, setisModalUpdateVisible] = useState(false);

  useEffect(() => {
    
    setName(userName);
  }, [userName, setIsAddPost]);

  // =============== for load new photo modal
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    if (base64) {
      updateAvatar(_id, base64);
    }

    setIsModalVisible(false);
    setBase64("");
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setBase64("");
  };
  // =============== for update modal
  const showUpdateModal = () => {
    setisModalUpdateVisible(true);
  };

  const updateHandleOk = () => {
    updateUser(_id, name);
    setisModalUpdateVisible(false);
  };

  const updateHandleCancel = () => {
    setisModalUpdateVisible(false);
  };

  return (
    <>
      <Card title={"User Cabinet"} bordered={false}>
        <Image
          width={300}
          style={{ justifyItems: "center" }}
          src={avatar ? avatar : noUser}
          preview={false}
        />
        <Button type="warning" onClick={showModal}>
          Change photo
        </Button>
        <Modal
          title="Load new photo"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <PhotoLoader setBase64={setBase64} />
        </Modal>

        <Modal
          title="Update User"
          visible={isModalUpdateVisible}
          onOk={updateHandleOk}
          onCancel={updateHandleCancel}
        >
          <Title>Want to update user?</Title>
        </Modal>

        <Paragraph
          strong={true}
          editable={{
            onChange: setName,
            maxLength: 50,
          }}
        >
          {name}
        </Paragraph>
        <p>Email: {email}</p>
        <p>{`id: ${_id}`}</p>
        <p>{`Registreted: ${new Date(dateCreated).toLocaleDateString()}`}</p>

        <Button type="primary" onClick={showUpdateModal}>
          Update User
        </Button>
        <div style={{ paddingTop: "10px" }}>
          <Button icon={<FormOutlined />} onClick={() => setIsAddPost(!isAddPost)}>
            {isAddPost ? "Hide" : "Add Post"}
          </Button>
        </div>
        {isAddPost && <AddNewPostContainer setIsAddPost={setIsAddPost} redirectPath={"/cabinet"}/>}
        
      </Card>
      {filterPost(posts, "", true, _id).length ? (
        filterPost(posts, "", true, _id).map((p) => {
          return (
            <OnePost
              key={p._id}
              title={p.title}
              postId={p._id}
              postedBy={userName}
              postedById={p.postedBy}
              avatar={avatar || ""}
              userId={_id}
              description={p.description}
              dateCreated={p.dateCreated}
              filtredWord={""}
            />
          );
        })
      ) : (
        <div style={{ paddingTop: "10px" }}>
          <Card title={"No posts yet..."}>
            <Link to={"/posts/new"}>
              <Title>Click to write new post</Title>
            </Link>
          </Card>
        </div>
      )}
    </>
  );
};

export default Cabinet;
