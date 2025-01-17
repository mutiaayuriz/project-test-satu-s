/* eslint-disable @next/next/no-img-element */
/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable react/display-name */
"use client";
import React from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, InputNumber, Space, Upload } from "antd";
import { SatuSehatTypes } from "../types/data.types";

interface EditFormProps {
  dataEdit: SatuSehatTypes;
  submitEdit: any;
}

const { TextArea } = Input;

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

export const FormEditProduct: React.FC<EditFormProps> = ({
  dataEdit,
  submitEdit,
}) => {
  const [form] = Form.useForm();

  form.setFields([{ name: ["name"], value: dataEdit.name }]);
  form.setFields([{ name: ["sku"], value: dataEdit.sku }]);
  form.setFields([{ name: ["price"], value: dataEdit.price }]);
  form.setFields([{ name: ["description"], value: dataEdit.description }]);
  form.setFields([{ name: ["image"], value: dataEdit.image }]);

  //for submit
  const onFinish = (values: any) => {
    values.id = dataEdit.id;
    values.image = dataEdit.image;
    submitEdit(values, "edit");
    form.resetFields();
  };

  const cancelEdit = () => {
    submitEdit(null, "cancel");
    form.resetFields();
  };
  return (
    <Form
      id="edit-satu-sehat"
      onFinish={onFinish}
      form={form}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
      disabled={false}
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
        <Input id="edit-name-satu-sehat" />
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
        <Input id="edit-sku-satu-sehat" />
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
        <InputNumber id="edit-price-satu-sehat" min={1} />
      </Form.Item>
      <Form.Item label="Description" name="description">
        <TextArea id="edit-description-satu-sehat" rows={4} />
      </Form.Item>
      <Form.Item
        id="edit-image-satu-sehat"
        label="Image"
        valuePropName="fileList"
        getValueFromEvent={normFile}
        className="w-full"
        name="image"
      >
        <div className="flex">
          <div className="w-1/2">
            <Upload
              listType="picture-card"
              accept=".jpg, .jpeg, .png"
              maxCount={1}
            >
              <button style={{ border: 0, background: "none" }} type="button">
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </button>
            </Upload>
          </div>
          <div className="w-1/2">
            <p>Image Product Previous:</p>
            <img id="edit-image-satu-sehat" alt="" src={dataEdit.image} />
          </div>
        </div>
      </Form.Item>
      <Form.Item
        wrapperCol={{
          span: 12,
          offset: 2,
        }}
      >
        <Space>
          <Button type="primary" htmlType="submit">
            Edit
          </Button>
          <Button onClick={cancelEdit}>Cancel</Button>
        </Space>
      </Form.Item>
    </Form>
  );
};
