import React, { useState } from "react";
import {
  Table,
  Input,
  Modal,
  Spin,
  Pagination,
  Select,
  message,
  Image,
} from "antd";
import {
  SearchOutlined,
  LoadingOutlined,
  DownloadOutlined,
} from "@ant-design/icons";

import { LuEye } from "react-icons/lu";

import { useNavigate } from "react-router-dom";
import OrderEdit from "./OrderEdit";
import { useGetOrderQuery, useUpdateOrderMutation } from "../redux/api/metaApi";
import { imageUrl } from "../redux/api/baseApi";
import { Navigate } from "../../Navigate";

const { Option } = Select;

const Order = () => {
  const navigate = useNavigate();
   const [statusFilter, setStatusFilter] = useState("");
     const [search, setSearch] = useState("");
     const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const { data: orderResponse, isLoading, refetch } = useGetOrderQuery();
  const orderData = orderResponse?.data || [];

  const [updateStatus, { isLoading: isUpdating }] = useUpdateOrderMutation();

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
 
  const [editModal, setEditModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  

  // Direct Download Function (No Link Opening)
  const downloadImage = async (imageUrl, fileName) => {
    try {
      const response = await fetch(imageUrl, {
        mode: "cors",
        credentials: "omit",
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch image: ${response.status}`);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName || "image.jpg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download failed:", err);
      message.error("Failed to download image. Please try again.");
    }
  };

  // Format Date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB");
  };

  // Status Options
  const statusOptions = [
    { label: "Pending", value: "pending" },
    { label: "Confirmed", value: "confirmed" },
    { label: "Processing", value: "processing" },
    { label: "Shipped", value: "shipped" },
    { label: "Delivered", value: "delivered" },
    { label: "Cancelled", value: "cancelled" },
  ];

  // Handle Status Change
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateStatus({ id: orderId, data: { status: newStatus } }).unwrap();
      message.success("Status updated successfully!");
      refetch();
    } catch (err) {
      message.error("Failed to update status");
      console.error(err);
    }
  };

  // Open Modal
  const openModal = (order) => {
    setSelectedOrder(order);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedOrder(null);
  };

  const handleEdit = (record) => {
    setSelectedRecord(record);
    setEditModal(true);
  };

  // Table Columns
  const columns = [
    {
      title: "SL no.",
      key: "sl",
      width: 70,
      align: "center",
      render: (_, __, index) => (currentPage - 1) * pageSize + index + 1,
    },
    {
      title: "Date",
      dataIndex: "orderDate",
      render: (date) => formatDate(date),
    },
    {
      title: "Product Name",
      render: (_, record) => {
        const names = record?.items.map((item) => item?.product?.productName);
        return names.join(", ");
      },
    },
    {
      title: "Total",
      dataIndex: "total",
      render: (total) => `$${total}`,
    },
    {
      title: "Qty",
      render: (_, record) => {
        return record?.items.reduce((total, item) => {
          return (
            total +
            item.variantQuantities?.reduce(
              (sum, v) =>
                sum + v.sizeQuantities.reduce((s, sq) => s + sq.quantity, 0),
              0
            )
          );
        }, 0);
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status, record) => (
        <Select
          defaultValue={status}
          style={{ width: 130 }}
          onChange={(value) => handleStatusChange(record?._id, value)}
          loading={isUpdating}
          disabled={isUpdating}
        >
          {statusOptions?.map((opt) => (
            <Option key={opt?.value} value={opt?.value}>
              {opt?.label}
            </Option>
          ))}
        </Select>
      ),
    },
    {
      title: "Action",
      align: "center",
      render: (_, record) => (
        <div className="flex gap-2 justify-center">
          <button onClick={() => openModal(record)} className="text-black">
            <LuEye size={20} />
          </button>
        </div>
      ),
    },
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
      </div>
    );
  }

  return (
    <div className="bg-white p-3 h-[87vh]">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <Navigate title="Order" />
        <div className="flex gap-4 items-center">
          <Select
            value={statusFilter}
            onChange={setStatusFilter}
            style={{ width: 150, height: "42px" }}
            options={[
              { value: "", label: "All" },
              { value: "Pending", label: "Pending" },
              { value: "Delivered", label: "Delivered" },
              { value: "Confirmed", label: "Confirmed" },
              { value: "Processing", label: "Processing" },
              { value: "Cancelled", label: "Cancelled" },
              { value: "Shipped", label: "Shipped" },
            ]}
          />

          <Input
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            value={search}
            placeholder="Search by name..."
            prefix={<SearchOutlined />}
            style={{ width: "300px", height: "40px" }}
          />
        </div>
      </div>
      {/* Table */}
      <Table
        columns={columns}
        dataSource={orderData}
        pagination={false}
        rowKey="_id"
        className="custom-table"
        scroll={{ x: "max-content" }}
      />

      {/* Pagination */}
      <div className="mt-4 flex justify-end">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={orderResponse?.meta?.total || 0}
          onChange={setCurrentPage}
          showSizeChanger={false}
        />
      </div>

      {/* Details Modal */}
      <Modal
        open={modalOpen}
        onCancel={closeModal}
        footer={null}
        width={1200}
        centered
        closeIcon={<span className="text-2xl cursor-pointer">×</span>}
      >
        {selectedOrder && (
          <div className="space-y-8 max-h-screen overflow-y-auto p-2">
            {/* Top Summary */}
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <div className="grid grid-cols-2 gap-6 text-sm">
                <div className="space-y-2">
                  <p>
                    <strong>Order ID:</strong> {selectedOrder?._id}
                  </p>
                  <p>
                    <strong>Customer:</strong> {selectedOrder?.user?.firstName}{" "}
                    {selectedOrder?.user?.lastName}
                  </p>
                  <p>
                    <strong>Email:</strong> {selectedOrder?.user?.email}
                  </p>
                  <p>
                    <strong>Order Date:</strong>{" "}
                    {formatDate(selectedOrder?.orderDate)}
                  </p>
                </div>
                <div className="space-y-2">
                  <p>
                    <strong>Payment Status:</strong>{" "}
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        selectedOrder?.paymentStatus === "paid"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {selectedOrder?.paymentStatus.toUpperCase()}
                    </span>
                  </p>
                  <p>
                    <strong>Order Status:</strong>{" "}
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        selectedOrder?.status === "delivered"
                          ? "bg-green-100 text-green-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {selectedOrder?.status.toUpperCase()}
                    </span>
                  </p>
                  <p>
                    <strong>Total Amount:</strong>{" "}
                    <span className="font-bold text-lg">
                      ${selectedOrder?.total}
                    </span>
                  </p>
                  <p>
                    <strong>Shipping Address:</strong>{" "}
                    {selectedOrder?.address?.city}, {selectedOrder?.address?.state},{" "}
                    {selectedOrder?.address?.country}
                  </p>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div>
              <h3 className="font-bold text-lg mb-3">Order Items</h3>
              {selectedOrder.items.map((item) => (
                <div
                  key={item?._id}
                  className="border rounded-lg p-6 mb-6 bg-white shadow-sm"
                >
                  {/* Product Header */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative group">
                      <Image
                        src={`${imageUrl}${
                          item.design
                            ? item?.design?.frontImage
                            : item?.product?.thumbnail
                        }`}
                        alt={item?.product?.productName}
                        width={80}
                        height={80}
                        preview={true}
                        className="object-contain rounded border cursor-pointer"
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          downloadImage(
                            `${imageUrl}${
                              item.design
                                ? item?.design?.frontImage
                                : item?.product?.thumbnail
                            }`,
                            `${item?.product?.productName}_thumbnail.jpg`
                          );
                        }}
                        className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity bg-white rounded-full p-1.5 shadow-md hover:bg-gray-100"
                        title="Download Thumbnail"
                      >
                        <DownloadOutlined
                          style={{ fontSize: "14px", color: "#1890ff" }}
                        />
                      </button>
                    </div>

                    <div className="flex-1">
                      <h4 className="font-semibold text-lg">
                        {item?.product?.productName}
                      </h4>
                      <p className="text-sm text-gray-600">
                        <strong>Brand:</strong> {item?.product?.brand?.brandName}
                      </p>
                      {item?.product?.brand?.brandLogo && (
                        <div className="relative group inline-block">
                          <Image
                            src={`${imageUrl}${item?.product?.brand?.brandLogo}`}
                            alt="Brand Logo"
                            width={48}
                            height={48}
                            preview={true}
                            className="object-contain mt-1 rounded border cursor-pointer"
                          />
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              downloadImage(
                                `${imageUrl}${item?.product?.brand?.brandLogo}`,
                                `${item?.product?.brand?.brandName}_logo.jpg`
                              );
                            }}
                            className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
                            title="Download Logo"
                          >
                            <DownloadOutlined
                              style={{ fontSize: "12px", color: "#1890ff" }}
                            />
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="text-right">
                      <p className="font-medium">${item?.itemTotal}</p>
                      <p className="text-sm text-gray-600">
                        Qty:{" "}
                        {item?.variantQuantities.reduce(
                          (sum, v) =>
                            sum +
                            v?.sizeQuantities.reduce(
                              (s, sq) => s + sq.quantity,
                              0
                            ),
                          0
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Price Info */}
                  <div className="grid grid-cols-3 gap-4 text-sm mb-4 bg-gray-50 p-3 rounded">
                    <p>
                      <strong>Price:</strong> ${item.product.price}
                    </p>
                    <p>
                      <strong>Discounted Price:</strong> $
                      {item.product.discountedPrice}
                    </p>
                    <p>
                      <strong>Item Total:</strong> ${item.itemTotal}
                    </p>
                  </div>

                  {/* Variants */}
                  <div className="space-y-4">
                    {item.variantQuantities.map((variant) => {
                      const variantInfo = item.product.variants.find(
                        (v) => v._id === variant.variant
                      );
                      return (
                        <div
                          key={variant.variant}
                          className="border p-4 rounded bg-gray-50"
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <span
                              className="inline-block w-6 h-6 rounded-full border"
                              style={{
                                backgroundColor: variantInfo?.color?.hexValue,
                              }}
                            />
                            <strong>{variantInfo?.color?.name}</strong>
                            <span className="ml-auto text-sm">
                              Stock: {variantInfo?.stockStatus}
                            </span>
                          </div>

                          {/* Variant Images */}
                          <div className="grid grid-cols-4 gap-2 mb-3">
                            {["front", "back", "left", "right"].map((side) => {
                              const img = variantInfo?.[`${side}Image`];
                              return img ? (
                                <div
                                  key={side}
                                  className="relative group text-center"
                                >
                                  <Image
                                    src={`${imageUrl}${img}`}
                                    alt={`${side} view`}
                                    width={80}
                                    height={80}
                                    preview={true}
                                    className="object-contain rounded border cursor-pointer"
                                  />
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      downloadImage(
                                        `${imageUrl}${img}`,
                                        `${item.product.productName}_${variantInfo?.color?.name}_${side}.jpg`
                                      );
                                    }}
                                    className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity bg-white rounded-full p-1.5 shadow-md hover:bg-gray-100"
                                    title={`Download ${side} Image`}
                                  >
                                    <DownloadOutlined
                                      style={{
                                        fontSize: "14px",
                                        color: "#1890ff",
                                      }}
                                    />
                                  </button>
                                  <p className="text-xs mt-1 capitalize">
                                    {side}
                                  </p>
                                </div>
                              ) : null;
                            })}
                          </div>

                          {/* Size Quantities */}
                          <div className="flex gap-1.5 text-xs">
                            {variant.sizeQuantities.map((sq) => (
                              <div
                                key={sq.size._id}
                                className="bg-white p-1.5 rounded border text-center"
                              >
                                <p className="font-semibold">{sq.size.name}</p>
                                <p>Qty: {sq.quantity}</p>
                              </div>
                            ))}
                          </div>

                          <p className="text-right mt-2 font-medium">
                            Variant Total: ${variant.variantTotal}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  {/* Design Section */}
                  {item.isDesignItem && item.design && (
                    <div className="mt-6 border-t pt-6">
                      <h5 className="font-bold text-lg mb-3">Design Preview</h5>

                      {/* Design Views */}
                      <div className="mb-6">
                        <p className="text-sm font-medium text-gray-700 mb-2">
                          Design Views
                        </p>
                        <div className="grid grid-cols-4 gap-3">
                          {["front", "back", "left", "right"].map((side) => {
                            const img = item.design[`${side}Image`];
                            return img ? (
                              <div
                                key={side}
                                className="relative group border rounded-lg overflow-hidden bg-white"
                              >
                                <Image
                                  src={`${imageUrl}${img}`}
                                  alt={`${side} view`}
                                  className="w-full h-32 object-contain cursor-pointer"
                                  preview={true}
                                />
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    downloadImage(
                                      `${imageUrl}${img}`,
                                      `${item.product.productName}_design_${side}.jpg`
                                    );
                                  }}
                                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white rounded-full p-1.5 shadow-md hover:bg-gray-100 z-10"
                                  title={`Download ${side} Design`}
                                >
                                  <DownloadOutlined
                                    style={{
                                      fontSize: "14px",
                                      color: "#1890ff",
                                    }}
                                  />
                                </button>
                                <p className="text-center text-xs font-medium capitalize bg-gray-50 py-1 border-t">
                                  {side} View
                                </p>
                              </div>
                            ) : null;
                          })}
                        </div>
                      </div>

                      {/* Design Elements */}
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-2">
                          Design Elements
                        </p>
                        <div className="grid grid-cols-4 gap-3">
                          {["front", "back", "left", "right"].map((side) => {
                            const elem = item.design[`${side}Element`];
                            return elem ? (
                              <div
                                key={side}
                                className="relative group border rounded-lg overflow-hidden bg-white"
                              >
                                <Image
                                  src={`${imageUrl}${elem}`}
                                  alt={`${side} element`}
                                  className="w-full h-32 object-contain cursor-pointer"
                                  preview={true}
                                />
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    downloadImage(
                                      `${imageUrl}${elem}`,
                                      `${item.product.productName}_element_${side}.jpg`
                                    );
                                  }}
                                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white rounded-full p-1.5 shadow-md hover:bg-gray-100 z-10"
                                  title={`Download ${side} Element`}
                                >
                                  <DownloadOutlined
                                    style={{
                                      fontSize: "14px",
                                      color: "#1890ff",
                                    }}
                                  />
                                </button>
                                <p className="text-center text-xs font-medium capitalize bg-blue-50 py-1 border-t">
                                  {side} Element
                                </p>
                              </div>
                            ) : null;
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </Modal>

      {/* Edit Modal */}
      <OrderEdit
        editModal={editModal}
        setEditModal={setEditModal}
        selectedRecord={selectedRecord}
      />
    </div>
  );
};

export default Order;
