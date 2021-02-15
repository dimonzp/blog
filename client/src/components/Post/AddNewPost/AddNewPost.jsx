import React from "react";
import { Form, Input, Button } from "antd";
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const AddNewPost = ({ sendNewPost }) => {
  const onFinish = ({ title, fullText, description }) => {
    sendNewPost(title, fullText, description);
  };

  return (
    <>
      <h1>Create New Post</h1>
      <Form
        {...layout}
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
            {
              max: 40,
              message: "Max 30 symbols",
            },
            {
              min: 5,
              message: "Min 5 symbols",
            },
          ]}
        >
          <Input placeholder="Title" />
        </Form.Item>

        <Form.Item
          label="Main Text"
          name="fullText"
          rules={[
            {
              required: true,
              message: "Please input main text!",
            },
            {
              min: 20,
              message: "Min 20 symbols",
            },
            {
              max: 400,
              message: "Max 400 symbols",
            },
          ]}
        >
          <Input.TextArea placeholder="Main text of your post" rows={10} />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[
            {
              required: true,
              message: "Please input your description!",
            },
            {
              max: 50,
              message: "Max 50 symbols",
            },
          ]}
        >
          <Input placeholder="Description" />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Public
          </Button>
        </Form.Item>
      </Form>

      {/* <div>
        <label>Title</label>
        <div>
          <input
            placeholder="Title"
            type="text"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
      </div>

      <div>
        <label>Text</label>
        <div>
          <textarea
            placeholder="Text"
            type="text"
            onChange={(e) => {
              setFullText(e.target.value);
            }}
          />
        </div>
      </div>
      <div>
        <label>Description</label>
        <div>
          <input
            placeholder="Description"
            type="text"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </div>
      </div>
      <button onClick={() => sendNewPost(title, fullText, description)}>Send Post</button> */}
    </>
  );
};

export default AddNewPost;
