import React, { useState } from "react";
import { Table, Button, Modal } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Navigate } from "../../Navigate";
const AllShopRegistration = () => {
  const [open, setOpen] = useState(false);
  const [selectedShop, setSelectedShop] = useState(null);

  const dataSource = [
    {
      key: "1",
      shopName: "Cameron Salons",
      address: "1901 Thornridge Cir. Shiloh, Hawaii 81063",
      genderCategory: "Male",
      category: "Skin care",
      ownerName: "Mike Smith",
      email: "sadgfjdg@gmail.com",
      phone: "+3489 9999 9778",
      bankName: "AB Bank",
      accountHolder: "Dianne Russell",
      accountNumber: "6575675678676",
      branchCode: "4575467",
      branchCity: "New York",
      city: "Us",
      image: "https://via.placeholder.com/40",
    },
  ];

  const columns = [
    {
      title: "#",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Shop Name",
      dataIndex: "shopName",
      key: "shopName",
      render: (text, record) => (
        <div className="flex items-center space-x-2">
          <img src={record.image} alt="Shop" className="w-8 h-8 rounded-full" />
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: "phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "city",
      dataIndex: "city",
      key: "city",
    },
    {
      title: "Shop Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <div className=" ">
          <button
            type="primary"
            className="bg-[#D9F2DD] text-[#359742] rounded-full py-1 px-5"
          >
            Accept
          </button>
        </div>
      ),
    },
    {
      title: "View Details",
      key: "viewDetails",
      render: (record) => (
        <Button
          onClick={() => {
            setSelectedShop(record);
            setOpen(true);
          }}
          shape="circle"
          icon={<EyeOutlined />}
          style={{ backgroundColor: "#016A70", color: "white" }}
        />
      ),
    },
  ];

  return (
    <div className="p-3 bg-white mt-4">
      <Navigate title={"all Shop Registration"} />
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        scroll={{ x: 800 }}
      />

      <Modal
        title="Shop Details"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={500}
      >
        {selectedShop && (
          <div>
            <p>
              <strong>Shop Name:</strong> {selectedShop.shopName}
            </p>
            <p>
              <strong>Shop Address:</strong> {selectedShop.address}
            </p>
            <p>
              <strong>Shop Gender Category:</strong>{" "}
              {selectedShop.genderCategory}
            </p>
            <p>
              <strong>Shop Category:</strong> {selectedShop.category}
            </p>
            <p>
              <strong>Shop Owner Name:</strong> {selectedShop.ownerName}
            </p>
            <p>
              <strong>Email:</strong> {selectedShop.email}
            </p>
            <p>
              <strong>Phone Number:</strong> {selectedShop.phone}
            </p>
            <h3 className="font-bold mt-4">Bank Info</h3>
            <p>
              <strong>Bank Name:</strong> {selectedShop.bankName}
            </p>
            <p>
              <strong>Account Holder Name:</strong> {selectedShop.accountHolder}
            </p>
            <p>
              <strong>Account Number:</strong> {selectedShop.accountNumber}
            </p>
            <p>
              <strong>Enter Branch Code:</strong> {selectedShop.branchCode}
            </p>
            <p>
              <strong>Branch City:</strong> {selectedShop.branchCity}
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AllShopRegistration;
