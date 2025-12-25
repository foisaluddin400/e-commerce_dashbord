import { Input, Table, message } from "antd";
import { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import AddCoupon from "./AddCoupon";
import { MdOutlineModeEdit } from "react-icons/md";

const Coupons = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [coupons, setCoupons] = useState([]); // Will hold added coupons

  // Dummy initial data (updated to match new form structure)
  const initialDummyData = [
    {
      _id: "1",
      imageUrl: "/uploads/coupon1.jpg",
      reasonName: "Christmas Sale",
      couponCode: "XMAS25",
      category: "fashion",
      quantityType: "limited",
      quantity: 100,
      startDate: "2025-12-01",
      endDate: "2025-12-31",
      discountType: "percentage",
      discountValue: 25,
    },
    {
      _id: "2",
      imageUrl: "/uploads/coupon2.jpg",
      reasonName: "New Year Free Shipping",
      couponCode: "FREESHIP2026",
      category: "electronics",
      quantityType: "unlimited",
      startDate: "2025-12-20",
      endDate: "2026-01-15",
      discountType: "flat",
      discountValue: 15,
    },
    {
      _id: "3",
      imageUrl: "/uploads/coupon3.jpg",
      reasonName: "Welcome Offer",
      couponCode: "WELCOME10",
      category: "beauty",
      quantityType: "limited",
      quantity: 50,
      startDate: "2025-11-01",
      endDate: "2025-12-24",
      discountType: "flat",
      discountValue: 10,
    },
  ];

  const dataSource = coupons.length > 0 ? coupons : initialDummyData;

  const handleDeleteCoupon = (id) => {
    setCoupons(coupons.filter((c) => c._id !== id));
    message.success("Coupon deleted successfully!");
  };

  const getStatus = (startDate, endDate) => {
    const today = "2025-12-25";
    if (today < startDate) return "Upcoming";
    if (today > endDate) return "Expired";
    return "Active";
  };
  
  // Helper to format discount display
  const formatDiscount = (type, value) => {
    return type === "percentage" ? `${value}% Off` : `$${value} Off`;
  };

  // Helper for quantity display
  const formatQuantity = (type, quantity) => {
    return type === "unlimited" ? "Unlimited" : quantity;
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "imageUrl",
      key: "image",
      align: "center",
      render: () => (
        <img
          src="https://via.placeholder.com/80x60?text=Coupon+Image"
          alt="Coupon"
          className="w-20 h-16 object-cover rounded mx-auto"
        />
      ),
    },
    {
      title: "Reason Name",
      dataIndex: "reasonName",
      key: "reasonName",
      align: "center",
    },
    {
      title: "Coupon Code",
      dataIndex: "couponCode",
      key: "couponCode",
      align: "center",
      render: (code) => <span className="font-mono font-bold">{code}</span>,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      align: "center",
      render: (category) => (
        <span className="capitalize">{category.replace("_", " ")}</span>
      ),
    },
    {
      title: "Quantity",
      key: "quantity",
      align: "center",
      render: (_, record) =>
        formatQuantity(record.quantityType, record.quantity),
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      align: "center",
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
      align: "center",
    },
    {
      title: "Discount Type",
      dataIndex: "discountType",
      key: "discountType",
      align: "center",
      render: (type) => (
        <span className="capitalize">
          {type === "flat" ? "Flat Amount" : "Percentage"}
        </span>
      ),
    },
    {
      title: "Discount Value",
      key: "discountValue",
      align: "center",
      render: (_, record) =>
        formatDiscount(record.discountType, record.discountValue),
    },
    {
      title: "Status",
      key: "status",
      align: "center",
      render: (_, record) => {
        const status = getStatus(record.startDate, record.endDate);
        return (
          <span
            className={`px-4 py-1 rounded-full text-xs font-medium ${
              status === "Active"
                ? "bg-green-100 text-green-800"
                : status === "Expired"
                ? "bg-red-100 text-red-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {status}
          </span>
        );
      },
    },
    {
      title: "Actions",
      key: "actions",
      align: "center",
      render: (_, record) => (
        <div className="flex justify-center gap-4">
          <div
            // onClick={() => handleEdit(record)}
            className="w-[36px] h-[36px] text-lg bg-[#007BFF] flex justify-center items-center text-white rounded cursor-pointer"
          >
            <MdOutlineModeEdit />
          </div>
          <div
            onClick={() => handleDeleteCoupon(record._id)}
            className="w-9 h-9 text-lg bg-[#E63946] flex justify-center items-center text-white rounded cursor-pointer hover:bg-red-700 transition"
          >
            <RiDeleteBin6Line />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Coupons Management</h2>
        <button
          onClick={() => setOpenAddModal(true)}
          className="bg-[#E63946] text-white px-6 py-2 rounded hover:bg-red-700 transition"
        >
          Add Coupon
        </button>
      </div>

      <Table
        dataSource={dataSource}
        columns={columns}
        rowKey="_id"
        pagination={false}
        scroll={{ x: "max-content" }}
        className="custom-table"
      />

      <AddCoupon
        openAddModal={openAddModal}
        setOpenAddModal={setOpenAddModal}
        onAddCoupon={(newCoupon) => {
          setCoupons([
            ...coupons,
            { ...newCoupon, _id: Date.now().toString() },
          ]);
        }}
      />
    </div>
  );
};

export default Coupons;
