import React, { useState } from "react";
import { Table, Modal, Button, Space, Image, Input, Select } from "antd";
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Navigate } from "../../Navigate";
import { FaRegEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import image from "../../assets/header/image.png";
const { Option } = Select;

const AddProduct = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
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

  const [products, setProducts] = useState([
    {
      key: "1",
      name: "T-Shirt",
      price: 1200,
      size: "M",
      fontImage: image,
      backImage: image,
      category: "Clothing",
      subcategory: "Men",
      stock: 20,
      discountPrice: 1000,
      color: "Red",
      status: "Visible",
      stockStatus: "In Stock",
    },
    {
      key: "2",
      name: "Hoodie",
      price: 2200,
      size: "L",
      fontImage: image,
      backImage: image,
      category: "Clothing",
      subcategory: "Women",
      stock: 15,
      discountPrice: 1800,
      color: "Black",
      status: "Hidden",
      stockStatus: "Stock Out",
    },

    {
      key: "3",
      name: "Hoodie",
      price: 2200,
      size: "L",
      fontImage: image,
      backImage: image,
      category: "Clothing",
      subcategory: "Women",
      stock: 15,
      discountPrice: 1800,
      color: "Black",
      status: "Hidden",
      stockStatus: "Stock Out",
    },

    {
      key: "4",
      name: "Hoodie",
      price: 2200,
      size: "L",
      fontImage: image,
      backImage: image,
      category: "Clothing",
      subcategory: "Women",
      stock: 15,
      discountPrice: 1800,
      color: "Black",
      status: "Hidden",
      stockStatus: "Stock Out",
    },

    {
      key: "5",
      name: "Hoodie",
      price: 2200,
      size: "L",
      fontImage: image,
      backImage: image,
      category: "Clothing",
      subcategory: "Women",
      stock: 15,
      discountPrice: 1800,
      color: "Black",
      status: "Hidden",
      stockStatus: "Stock Out",
    },
  ]);

  // Handle status change
  const handleStatusUpdate = (record) => {
    const updated = products.map((p) =>
      p.key === record.key
        ? { ...p, status: record.status === "Visible" ? "Hidden" : "Visible" }
        : p
    );
    setProducts(updated);
    setStatusModal({ open: false, type: "", record: null });
  };

  // Handle stock status update
  const handleStockUpdate = () => {
    const updated = products.map((p) =>
      p.key === stockModal.record.key
        ? { ...p, stockStatus: stockModal.value }
        : p
    );
    setProducts(updated);
    setStockModal({ open: false, record: null, value: "" });
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
      render: (price) => <span className="text-green-600">৳{price}</span>,
    },
    {
      title: "Discount Price",
      dataIndex: "discountPrice",
      key: "discountPrice",
      render: (price) => <span className="text-red-500">৳{price}</span>,
    },
    {
      title: "Size",
      dataIndex: "size",
      key: "size",
    },
    {
      title: "Front Image",
      dataIndex: "fontImage",
      key: "fontImage",
      render: (img) => <Image width={35} src={img} />,
    },
    {
      title: "Back Image",
      dataIndex: "backImage",
      key: "backImage",
      render: (img) => <Image width={35} src={img} />,
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
          <Link to={"/dashboard/edit-product"}>
            <Button
              className="bg-green-700 text-white border-none"
              icon={<EditOutlined />}
            />
          </Link>
          <Button
            className="bg-[#E63946] text-white border-none"
            icon={<DeleteOutlined />}
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="bg-white p-3 h-[87vh] ">
      <div className="flex justify-between mb-4">
        <Navigate title={"Products"} />
        <div className="flex gap-5">
           <div>
            <Select
              style={{ height: "40px" }}
              placeholder="Select Category"
              // onChange={() => setShowStatus(true)}
            >
           <Option value="clothing">Clothing</Option>
              <Option value="electronics">Electronics</Option>
              <Option value="accessories">Accessories</Option>
            </Select>
          </div>
          <Input
            placeholder="Search by name..."
            prefix={<SearchOutlined />}
            style={{ maxWidth: "500px", height: "40px" }}
          />
          <div>
            <Link to={"/dashboard/add-product"}>
              {" "}
              <button className="bg-[#E63946] w-[150px] text-white py-2 rounded">
                Add Product
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
        rowClassName={() => "border-b border-gray-200"}
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
            <p>
              <span className="font-semibold">Color:</span>{" "}
              {selectedProduct.color}
            </p>
            <div className="flex space-x-4 mt-3">
              <div>
                <p className="font-semibold mb-1">Front Image</p>
                <Image width={100} src={selectedProduct.fontImage} />
              </div>
              <div>
                <p className="font-semibold mb-1">Back Image</p>
                <Image width={100} src={selectedProduct.backImage} />
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
          <Option value="Upcoming">Upcoming</Option>
        </Select>
      </Modal>
    </div>
  );
};

export default AddProduct;
