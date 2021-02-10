import React, { useEffect, useState } from "react";
import { Button, Typography, Modal } from "antd";
import Title from "antd/lib/typography/Title";

const { Paragraph } = Typography;

const EditPost = ({
  postPage: { title, fullText, description, _id },
  editPostHandler,
  deletePostHandler,
}) => {
  const [titleText, setTitleText] = useState(title);
  const [fullMain, setFullMain] = useState(fullText);
  const [descriptionText, setDescriptionText] = useState(description);

  const [isModalDelete, setIsModalDelete] = useState(false);
  const [isModalUpdate, setIsModalUpdate] = useState(false);

  // for delete modal
  const showDeleteModal = () => {
    setIsModalDelete(true);
  };

  const handleOkDelete = () => {
    deletePostHandler(_id);
    setIsModalDelete(false);
  };

  const handleCancelDelete = () => {
    setIsModalDelete(false);
  };
  // for update post modal
  const showUpdateModal = () => {
    setIsModalUpdate(true);
  };

  const handleOkUpdate = () => {
    editPostHandler(_id, titleText, fullMain, descriptionText);
    setIsModalUpdate(false);
  };

  const handleCancelUpdate = () => {
    setIsModalUpdate(false);
  };

  useEffect(() => {
    setTitleText(title);
    setFullMain(fullText);
    setDescriptionText(description);
  }, [title, fullText, description]);

  return (
    <>
      <Modal
        title="Delete Post"
        visible={isModalDelete}
        onOk={handleOkDelete}
        onCancel={handleCancelDelete}
      >
        <Title>Do you want delete this post?</Title>
      </Modal>

      <Modal
        title="Update Post"
        visible={isModalUpdate}
        onOk={handleOkUpdate}
        onCancel={handleCancelUpdate}
      >
        <Title>Do you want update this post?</Title>
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
            onClick={showUpdateModal}
          >
            Update
          </Button>
        </div>
        <div>
          <Button type="primary" danger onClick={showDeleteModal}>
            Delete
          </Button>
        </div>
      </div>
    </>
  );
};

export default EditPost;
