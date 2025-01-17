/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable react/display-name */
"use client";
import React from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, InputNumber, Space, Upload } from "antd";

interface AddFormProps {
  submitAdd: any;
}

const { TextArea } = Input;

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

export const FormAddProduct: React.FC<AddFormProps> = ({ submitAdd }) => {
  const [form] = Form.useForm();

  //for submit
  const onFinish = (values: any) => {
    submitAdd(values, "add");
    form.resetFields();
  };

  const cancelAdd = () => {
    submitAdd(null, "cancel");
    form.resetFields();
  };

  return (
    <Form
      id="add-satu-sehat"
      onFinish={onFinish}
      form={form}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
      disabled={false}
      style={{ maxWidth: 600 }}
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input id="add-name-satu-sehat" />
      </Form.Item>
      <Form.Item
        label="SKU"
        name="sku"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input id="add-sku-satu-sehat" />
      </Form.Item>
      <Form.Item
        label="Price"
        name="price"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <InputNumber id="add-price-satu-sehat" min={1} />
      </Form.Item>
      <Form.Item label="Description" name="description">
        <TextArea id="add-description-satu-sehat" rows={4} />
      </Form.Item>
      <Form.Item
        id="add-image-satu-sehat"
        label="Image"
        valuePropName="fileList"
        getValueFromEvent={normFile}
        name="image"
      >
        <Upload
          action="/upload.do"
          listType="picture-card"
          accept=".jpg, .jpeg, .png"
          maxCount={1}
        >
          <button style={{ border: 0, background: "none" }} type="button">
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
          </button>
        </Upload>
      </Form.Item>
      <Form.Item
        wrapperCol={{
          span: 12,
          offset: 2,
        }}
      >
        <Space>
          <Button type="primary" htmlType="submit">
            Add Product
          </Button>
          <Button onClick={cancelAdd}>Cancel</Button>
        </Space>
      </Form.Item>
    </Form>
  );
};
