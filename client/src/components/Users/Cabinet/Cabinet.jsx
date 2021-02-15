import React, { useEffect, useState } from "react";
import { Button, Modal, Card, Image } from "antd";
import Paragraph from "antd/lib/typography/Paragraph";
import PhotoLoader from "../../common/PhotoLoader/PhotoLoader";
import noUser from "../../../assets/noUser.png";
import OnePost from "../../Post/OnePost";
import { filterPost } from "../../../utils/filterPost";
import Title from "antd/lib/typography/Title";
import { Link, useHistory } from "react-router-dom";
import { FormOutlined } from "@ant-design/icons";
import AddNewPostContainer from "../../Post/AddNewPost/AddNewPostContainer";
import { useModal } from "../../../hooks/useModal";

const Cabinet = ({
  updateUser,
  _id,
  avatar,
  userName,
  email,
  dateCreated,
  updateAvatar,
  posts,
  deleteUser,
}) => {
  const [name, setName] = useState(userName);
  const [isAddPost, setIsAddPost] = useState(false);

  const [file, setFile] = useState({});
  const afterDeleteUser = (id) => {
    deleteUser(id);
    history.push("/posts")
  }

  const updateModal = useModal("Update User", updateUser, _id, name);
  const updatePhoto = useModal("Load new photo", updateAvatar, _id, file);
  const deleteUserModal = useModal("Delete user", afterDeleteUser, _id);
  
  const history = useHistory();



  useEffect(() => {
    setName(userName);
  }, [userName, setIsAddPost]);

  return (
    <>
      <Card title={"User Cabinet"} bordered={false}>
        <Image
          width={300}
          style={{ justifyItems: "center" }}
          src={avatar ? avatar : noUser}
          preview={false}
        />
        <Button type="warning" onClick={() => updatePhoto.openModal(true)}>
          Change photo
        </Button>
        <Modal {...updatePhoto.bind}>
          <PhotoLoader setFile={setFile} />
        </Modal>

        <Modal {...updateModal.bind}>
          <Title>Want to update user?</Title>
        </Modal>
        <Modal {...deleteUserModal.bind}>
          <Title type="danger">Want to DELETE user???</Title>
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

        <Button type="primary" onClick={updateModal.openModal}>
          Update User
        </Button>
        <div style={{ paddingTop: "10px", paddingBottom: "10px" }}>
          <Button danger onClick={deleteUserModal.openModal}>
            Delete User
          </Button>
        </div>
        <div>
          <Button
            icon={<FormOutlined />}
            onClick={() => setIsAddPost(!isAddPost)}
          >
            {isAddPost ? "Hide" : "Add Post"}
          </Button>
        </div>
        {isAddPost && (
          <AddNewPostContainer
            setIsAddPost={setIsAddPost}
            redirectPath={"/cabinet"}
          />
        )}
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
