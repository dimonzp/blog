import React, { useEffect, useState } from "react";
import { Button, Typography, Modal, Image } from "antd";
import Title from "antd/lib/typography/Title";
import { useModal } from "../../../hooks/useModal";
import { DownloadOutlined } from "@ant-design/icons";
import PhotoLoader from "../../common/PhotoLoader/PhotoLoader";

const { Paragraph } = Typography;

const EditPost = ({
  postPage: { title, fullText, description, _id, image },
  editPostHandler,
  deletePostHandler,
  updatePostPictureHandler,
}) => {
  const [titleText, setTitleText] = useState(title);
  const [fullMain, setFullMain] = useState(fullText);
  const [descriptionText, setDescriptionText] = useState(description);
  const [file, setFile] = useState({});

  const deletePost = useModal("Delete Post", deletePostHandler, _id);
  const updatePost = useModal(
    "Update Post",
    editPostHandler,
    _id,
    titleText,
    fullMain,
    descriptionText
  );
  const updatePostPicture = useModal(
    "Load new photo",
    updatePostPictureHandler,
    _id,
    file
  );

  useEffect(() => {
    setTitleText(title);
    setFullMain(fullText);
    setDescriptionText(description);
  }, [title, fullText, description]);

  return (
    <>
      <Modal {...deletePost.bind}>
        <Title>Do you want delete this post?</Title>
      </Modal>

      <Modal {...updatePost.bind}>
        <Title>Do you want update this post?</Title>
      </Modal>

      <Modal {...updatePostPicture.bind}>
        <PhotoLoader setFile={setFile} />
      </Modal>

      <Paragraph
        strong={true}
        editable={{
          onChange: setTitleText,
          maxLength: 50,
        }}
      >
        {titleText}
      </Paragraph>
      {image && (
          <Image
            width={300}
            src={image}
            preview={false}
          />
        )}
      <Paragraph
        editable={{
          onChange: setFullMain,
          maxLength: 400,
          autoSize: { maxRows: 50, minRows: 3 },
        }}
      >
        {fullMain}
      </Paragraph>
      <Paragraph
        editable={{
          onChange: setDescriptionText,
          maxLength: 50,
        }}
      >
        {descriptionText}
      </Paragraph>

      <div style={{ textAlign: "center" }}>
        <div style={{ paddingBottom: "10px" }}>
          <Button
            type="primary"
            shape="round"
            icon={<DownloadOutlined />}
            size="large"
            onClick={updatePostPicture.openModal}
          >
            Update Picture
          </Button>
        </div>

        <div style={{ paddingBottom: "10px" }}>
          <Button type="primary" onClick={updatePost.openModal}>
            Update
          </Button>
        </div>
        <div>
          <Button type="primary" danger onClick={deletePost.openModal}>
            Delete
          </Button>
        </div>
      </div>
    </>
  );
};

export default EditPost;
