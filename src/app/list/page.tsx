/* eslint-disable @next/next/no-img-element */
"use client";
import "@ant-design/v5-patch-for-react-19";
import React, { useState, useEffect } from "react";
import { Button, Card, Modal } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  DeleteOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import { FormAddProduct } from "../component/form";
import { FormEditProduct } from "../component/editForm";
import { SatuSehatTypes } from "../types/data.types";
import SkeletonLoader from "../component/skeletonLoader";

const { confirm } = Modal;

export function SatuSehatList() {
  const [data, setData] = useState(null);
  const [dataEdit, setDataEdit] = useState(Object);
  const [totalData, setTotalData] = useState(0);
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [openModalDetail, setOpenModalDetail] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);

  const [detailSelected, setDetailSelected] = useState(Object);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://run.mocky.io/v3/56acb466-3607-4639-ab50-50595e7d82c0"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setTotalData(result.data.length);
      setData(result.data);
    };

    fetchData().catch((e) => {
      // handle the error as needed
      console.error("An error occurred while fetching the data: ", e);
    });
  }, []);

  const openDetailPage = (value: SatuSehatTypes) => {
    setDetailSelected(value);
    setOpenModalDetail(true);
  };

  const closeDetailPage = () => {
    setDetailSelected({});
    setOpenModalDetail(false);
  };

  const openEditPage = (value: SatuSehatTypes) => {
    setOpenModalEdit(true);
    setDataEdit(value);
  };

  // for delete
  const showDeleteConfirm = (value: SatuSehatTypes) => {
    confirm({
      title: "Are you sure delete this product?",
      icon: <ExclamationCircleFilled />,
      content: value.name,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        deleteProduct(value);
      },
    });
  };

  const deleteProduct = (value: SatuSehatTypes) => {
    if (data) {
      const filtered = data.filter((item) => item.name !== value.name);
      setData(filtered);
      setTotalData(filtered.length);
    }
  };

  function submitAdd(value: SatuSehatTypes, status: string) {
    if (status === "add") {
      if (data) {
        value.id = totalData + 1;
        value.image =
          "https://upload.wikimedia.org/wikipedia/commons/b/b0/Contoh.png";
        let listUpdate: any = [];
        listUpdate = data;
        listUpdate.push(value);
        setData(listUpdate);
      }
    }

    setOpenModalAdd(false);
  }

  function submitEdit(value: SatuSehatTypes, status: string) {
    if (status === "edit") {
      if (data) {
        data.forEach((element) => {
          if (element.id === value.id) {
            element.name = value.name;
            element.sku = value.sku;
            element.price = value.price;
            element.image = value.image;
            element.description = value.description;
          }
        });
      }
    }

    setOpenModalEdit(false);
  }

  return (
    <>
      <div className="ml-6">
        {/* for add product */}
        <Button type="primary" onClick={() => setOpenModalAdd(true)}>
          Add Product
        </Button>
        <Modal
          title="Add Product Satu Sehat"
          centered
          closable={false}
          open={openModalAdd}
          footer={null}
          width={{
            xs: "90%",
            sm: "80%",
            md: "70%",
            lg: "60%",
            xl: "50%",
            xxl: "40%",
          }}
        >
          <FormAddProduct submitAdd={submitAdd} />
        </Modal>
      </div>

      {/* for list product */}
      <div className="w-full h-full overflow-auto item-center">
        {data ? (
          <div className="m-4 grid grid-cols-3 grid-rows-3">
            {data.map((project: SatuSehatTypes, index: number) => (
              <Card
                key={index}
                id="card-list-satu-sehat"
                className="p-2 w-80 m-2 border-solid"
                cover={
                  <img id="card-image-satu-sehat" alt="" src={project.image} />
                }
                actions={[
                  <EditOutlined
                    key="edit"
                    onClick={() => openEditPage(project)}
                  />,
                  <DeleteOutlined
                    key="delete"
                    onClick={() => showDeleteConfirm(project)}
                  />,
                  <EllipsisOutlined
                    key="detail"
                    onClick={() => openDetailPage(project)}
                  />,
                ]}
              >
                <div id="card-list-name-satu-sehat">Name: {project.name}</div>
                <div id="card-list-sku-satu-sehat">SKU: {project.sku}</div>
                <div id="card-list-price-satu-sehat">
                  Price: Rp {project.price}
                </div>
              </Card>
            ))}

            {/* for detail */}
            <Modal
              title="Detail Product Satu Sehat"
              centered
              open={openModalDetail}
              closable={false}
              width={{
                xs: "90%",
                sm: "80%",
                md: "70%",
                lg: "60%",
                xl: "50%",
                xxl: "40%",
              }}
              footer={[
                <Button key="back" onClick={closeDetailPage}>
                  Close
                </Button>,
              ]}
            >
              <div className="flex w-full">
                <div className="w-1/2">
                  <div className="flex" id="name-detail-satu-sehat">
                    {" "}
                    <p className="font-bold">Name: &nbsp;</p>{" "}
                    {detailSelected?.name}
                  </div>
                  <div className="flex" id="sku-detail-satu-sehat">
                    {" "}
                    <p className="font-bold">SKU: &nbsp;</p>{" "}
                    {detailSelected?.sku}
                  </div>
                  <div className="flex" id="price-detail-satu-sehat">
                    {" "}
                    <p className="font-bold">Price: &nbsp;</p> Rp{" "}
                    {detailSelected?.price}
                  </div>
                  <div className="flex" id="description-detail-satu-sehat">
                    {" "}
                    <p className="font-bold">Description: &nbsp;</p>{" "}
                    {detailSelected.description ?? "-"}
                  </div>
                </div>
                <div className="w-1/2">
                  <img
                    id="image-detail-satu-sehat"
                    src={detailSelected.image}
                    alt=""
                  />
                </div>
              </div>
            </Modal>

            {/* for edit */}
            <Modal
              title="Edit Product Satu Sehat"
              centered
              open={openModalEdit}
              footer={null}
              closable={false}
              width={{
                xs: "90%",
                sm: "80%",
                md: "70%",
                lg: "60%",
                xl: "50%",
                xxl: "40%",
              }}
            >
              <FormEditProduct dataEdit={dataEdit} submitEdit={submitEdit} />
            </Modal>
          </div>
        ) : (
          <div className="w-full m-6">
            <SkeletonLoader />
          </div>
        )}
      </div>
    </>
  );
}

export default SatuSehatList;
