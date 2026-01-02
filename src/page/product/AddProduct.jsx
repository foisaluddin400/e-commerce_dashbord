import React, { useState } from "react";
import {
  Table,
  Modal,
  Button,
  Space,
  Image,
  Input,
  Select,
  message,
  Popconfirm,
} from "antd";
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Navigate } from "../../Navigate";
import { FaRegEdit } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import image from "../../assets/header/image.png";
import {
  useDeleteVariantProductMutation,
  useGetSingleProductQuery,
  useUpdateProductVeriantMutation,
} from "../redux/api/productApi";
import { imageUrl } from "../redux/api/baseApi";
const { Option } = Select;

const AddProduct = () => {
  const { id } = useParams();
  const { data: variantProduct } = useGetSingleProductQuery({ id });
  console.log(variantProduct);
  const [deleteData] = useDeleteVariantProductMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [updateStatus] = useUpdateProductVeriantMutation();

  const [statusModal, setStatusModal] = useState({
    open: false,
    type: "",
    record: null,
  });
  const [stockModal, setStockModal] = useState({
    open: false,
    record: null,
    value: "",
  });

  const handleDelete = async (variantId) => {
    try {
      const res = await deleteData({
        productId: id,
        variantId: variantId,
      }).unwrap();
      message.success(res?.message);
    } catch (err) {
      message.error(err?.data?.message);
    }
  };

  const products =
    variantProduct?.data?.variants?.map((variant, index) => ({
      key: index + 1,
      id: variant?._id,
      productId: variantProduct?.data?._id,
      name: variantProduct?.data?.productName,
      price: variantProduct?.data?.price,
      discountPrice: variantProduct?.data?.discountPercentage,
      size: variant?.size?.map((s) => s.name).join(", "),

      fontImage: variant?.frontImage
        ? `${imageUrl}${variant?.frontImage}`
        : "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",

     

      backImage: variant?.backImage
        ? `${imageUrl}${variant?.backImage}`
        : "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",



      

      rightImage: variant?.rightImage
        ? `${imageUrl}${variant?.rightImage}`
        : "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",




  leftImage: variant?.leftImage
        ? `${imageUrl}${variant?.leftImage}`
        : "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",



      
      category: variantProduct?.data?.category?.name,
      subcategory: variantProduct?.data?.subcategory?.name,
      color: variant?.color,
      hexValue: variant?.color?.hexValue,
      status: variant?.status,
      stockStatus: variant?.stockStatus,
      stock: 10,
    })) || [];
  console.log(products);

  // Handle status change (API integration)
  const handleStatusUpdate = async (record) => {
    try {
      const newStatus = record.status === "Visible" ? "Hidden" : "Visible";

      const formData = { status: newStatus };

      const res = await updateStatus({
        formData,
        productId: record.productId,
        variantId: record.id,
      }).unwrap();

      message.success(res?.message);

      setStatusModal({ open: false, type: "", record: null });
    } catch (err) {
      message.error(err?.data?.message || "Failed to update status");
    }
  };

  // Handle stock status update (API integration)
  const handleStockUpdate = async () => {
    try {
      const formData = { stockStatus: stockModal.value };

      console.log(stockModal.record.id);
      console.log(stockModal.record.productId);

      const res = await updateStatus({
        formData,
        productId: stockModal.record.productId,
        variantId: stockModal.record.id,
      }).unwrap();

      message.success(res?.message);

      setStockModal({ open: false, record: null, value: "" });
    } catch (err) {
      message.error(err?.data?.message);
    }
  };

  const columns = [
    {
      title: "SI.NO",
      key: "serial",
      render: (_, __, index) => index + 1,
      width: 70,
      className: "text-center font-medium",
    },
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
      className: "text-gray-800 font-medium",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => <span className="text-green-600">${price}</span>,
    },
    // {
    //   title: "Discount Price",
    //   dataIndex: "discountPrice",
    //   key: "discountPrice",
    //   render: (price) => <span className="text-red-500">৳{price}</span>,
    // },
    // {
    //   title: "Size",
    //   dataIndex: "size",
    //   key: "size",
    // },
    {
      title: "Color",
      dataIndex: "color",
      key: "color",
      render: (color) => (
        <div className="flex gap-x-2.5">
          <div className="mt-0">
            <span
              style={{
                display: "inline-block",
                width: "15px",
                height: "15px",
                backgroundColor: color.hexValue,
                borderRadius: "50%",
              }}
            ></span>
          </div>
          <div className="-mt-1">{color.name}</div>
        </div>
      ),
    },

    {
      title: "Front Image",
      dataIndex: "fontImage",
      key: "fontImage",
      render: (img) => <Image width={45} src={img} />,
    },

    {
      title: "Back Image",
      dataIndex: "backImage",
      key: "backImage",
      render: (img) => <Image width={45} src={img} />,
    },

    {
      title: "Right Image",
      dataIndex: "rightImage",
      key: "rightImage",
      render: (img) => <Image width={45} src={img} />,
    },
    {
      title: "Left Image",
      dataIndex: "leftImage",
      key: "leftImage",
      render: (img) => <Image width={45} src={img} />,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, record) => (
        <div className="flex items-center gap-1">
          <span className="bg-green-100 rounded-full font-semibold border border-green-400 text-green-600 px-7 py-[2px]">
            {record.status}
          </span>
          <div className="bg-gray-100 rounded-full p-1">
            <FaRegEdit
              className=""
              onClick={() =>
                setStatusModal({ open: true, type: record.status, record })
              }
            />
          </div>
        </div>
      ),
    },
    {
      title: "Stock Status",
      dataIndex: "stockStatus",
      key: "stockStatus",
      render: (_, record) => (
        <div className="flex items-center gap-1">
          <span className="bg-violet-100 rounded-full border font-semibold border-violet-400 text-violet-600 px-7 py-[2px]">
            {record.stockStatus}
          </span>
          <div className="bg-gray-100 rounded-full p-1">
            <FaRegEdit
              className=""
              onClick={() =>
                setStockModal({ open: true, record, value: record.stockStatus })
              }
            />
          </div>
        </div>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            className="bg-gray-700 text-white border-none "
            icon={<EyeOutlined />}
            onClick={() => {
              setSelectedProduct(record);
              setIsModalOpen(true);
            }}
          />
          <Link
            to={`/dashboard/edit-product/${record?.productId}/${record?.id}`}
          >
            <Button
              className="bg-green-700 text-white border-none"
              icon={<EditOutlined />}
            />
          </Link>
          <Popconfirm
            title="Are you sure to delete this Product?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button
              className="bg-[#E63946] text-white border-none"
              icon={<DeleteOutlined />}
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="bg-white p-3 h-[87vh] ">
      <div className="flex justify-between mb-4">
        <Navigate title={"Products Verients"} />
        <div className="flex gap-5">
          <div>
            <Link to={`/dashboard/add-verient/${id}`}>
              {" "}
              <button className="bg-[#E63946] w-[150px] text-white py-2 rounded">
                Add Verient
              </button>
            </Link>
          </div>
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={products}
        pagination={false}
        className="custom-table"
        scroll={{ x: "max-content" }}
      />

      {/* Product Details Modal */}
      <Modal
        title="Product Details"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        {selectedProduct && (
          <div className="space-y-2">
            <p>
              <span className="font-semibold">Name:</span>{" "}
              {selectedProduct.name}
            </p>
            <p>
              <span className="font-semibold">Category:</span>{" "}
              {selectedProduct.category}
            </p>
            <p>
              <span className="font-semibold">Subcategory:</span>{" "}
              {selectedProduct.subcategory}
            </p>
            <p>
              <span className="font-semibold">Price:</span> ৳
              {selectedProduct.price}
            </p>
            <p>
              <span className="font-semibold">Discount Price:</span> ৳
              {selectedProduct.discountPrice}
            </p>
            <p>
              <span className="font-semibold">Size:</span>{" "}
              {selectedProduct.size}
            </p>
            <p>
              <span className="font-semibold">Stock:</span>{" "}
              {selectedProduct.stock}
            </p>
            <p>
              <span className="font-semibold">Stock Status:</span>{" "}
              {selectedProduct.stockStatus}
            </p>
            <p>
              <span className="font-semibold">Status:</span>{" "}
              {selectedProduct.status}
            </p>
            <p className="flex gap-3">
              <span className="font-semibold">Color:</span>{" "}
              <div className="flex gap-x-2.5">
                <div className="mt-0">
                  <span
                    style={{
                      display: "inline-block",
                      width: "15px",
                      height: "15px",
                      backgroundColor: selectedProduct.color?.hexValue,
                      borderRadius: "50%",
                    }}
                  ></span>
                </div>
                <div className="-mt-1">{selectedProduct.color?.name}</div>
              </div>
            </p>
            <div className="grid grid-cols-2 mt-3">
              <div>
                <p className="font-semibold mb-1">Front Image</p>
                <Image className="w-full" src={selectedProduct.fontImage} />
              </div>
              <div>
                <p className="font-semibold mb-1">Back Image</p>
                <Image className="w-full" src={selectedProduct.backImage} />
              </div>

              <div>
                <p className="font-semibold mb-1">Right Image</p>
                <Image className="w-full" src={selectedProduct.rightImage} />
              </div>
              <div>
                <p className="font-semibold mb-1">Left Image</p>
                <Image className="w-full" src={selectedProduct.leftImage} />
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Status Edit Confirmation Modal */}
      <Modal
        title="Change Status"
        open={statusModal.open}
        onCancel={() => setStatusModal({ open: false, type: "", record: null })}
        onOk={() => handleStatusUpdate(statusModal.record)}
      >
        <p>
          Are you sure you want to change status to{" "}
          {statusModal.type === "Visible" ? "Hidden" : "Visible"}?
        </p>
      </Modal>

      {/* Stock Status Edit Modal */}
      <Modal
        title="Change Stock Status"
        open={stockModal.open}
        onCancel={() => setStockModal({ open: false, record: null, value: "" })}
        onOk={handleStockUpdate}
      >
        <Select
          value={stockModal.value}
          onChange={(value) => setStockModal({ ...stockModal, value })}
          style={{ width: "100%" }}
        >
          <Option value="In Stock">In Stock</Option>
          <Option value="Stock Out">Stock Out</Option>
        </Select>
      </Modal>
    </div>
  );
};

export default AddProduct;
