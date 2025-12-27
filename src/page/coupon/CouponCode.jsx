import { Table, message, Pagination } from "antd";
import { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineModeEdit } from "react-icons/md";
import AddCoupon from "./AddCoupon";
import { useDeleteCouponMutation, useGetCouponQuery } from "../redux/api/couponApi";
import dayjs from "dayjs";
import { imageUrl } from "../redux/api/baseApi";

const Coupons = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteCoupon] = useDeleteCouponMutation();
  const pageSize = 10;

  const { data: couponData, isLoading } = useGetCouponQuery({
    page: currentPage,
    limit: pageSize,
  });

  const handleDeleteCoupon =async (id) => {
   console.log(id);
    try {
      const res = await deleteCoupon(id).unwrap();
      message.success(res?.message);
    } catch (err) {
      message.error(err?.data?.message);
    }
  };

 


  // ✅ Status calculation
  const getStatus = (start, end) => {
    const today = dayjs();
    if (today.isBefore(start)) return "Upcoming";
    if (today.isAfter(end)) return "Expired";
    return "Active";
  };

  // ✅ Columns
  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      align: "center",
      render: (img) => (
        <img
          src={`${imageUrl}${img}`}
          alt="coupon"
          className="w-20 h-14 object-cover rounded mx-auto"
        />
      ),
    },
    {
      title: "Reason Name",
      dataIndex: "name",
      align: "center",
    },
    {
      title: "Coupon Code",
      dataIndex: "code",
      align: "center",
      render: (code) => (
        <span className="font-mono font-bold">{code}</span>
      ),
    },
    {
      title: "Quantity",
      align: "center",
      render: (_, record) =>
        record.usageLimit ? record.usageLimit : "Unlimited",
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      align: "center",
      render: (date) => dayjs(date).format("YYYY-MM-DD"),
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      align: "center",
      render: (date) => dayjs(date).format("YYYY-MM-DD"),
    },
    {
      title: "Discount",
      align: "center",
      render: (_, record) =>
        record.discountType === "PERCENTAGE"
          ? `${record.discountValue}% Off`
          : `$${record.discountValue} Off`,
    },
    {
      title: "Status",
      align: "center",
      render: (_, record) => {
        const status = getStatus(record.startDate, record.endDate);
        return (
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
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
      align: "center",
      render: (_, record) => (
        <div className="flex justify-center gap-3">
          <div
            onClick={() => handleDeleteCoupon(record._id)}
            className="w-9 h-9 bg-red-500 text-white flex items-center justify-center rounded cursor-pointer"
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
          className="bg-[#E63946] text-white px-6 py-2 rounded"
        >
          Add Coupon
        </button>
      </div>

      <Table
        loading={isLoading}
        dataSource={couponData?.data || []}
        columns={columns}
        rowKey="_id"
        pagination={false}
        scroll={{ x: "max-content" }}
      />

      {/* Pagination */}
      <div className="mt-5 flex justify-center">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={couponData?.meta?.total || 0}
          onChange={(page) => setCurrentPage(page)}
        />
      </div>

      <AddCoupon
        openAddModal={openAddModal}
        setOpenAddModal={setOpenAddModal}
      />
    </div>
  );
};

export default Coupons;
