import { Table, Input, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { MdModeEditOutline } from "react-icons/md";
import { LuEye } from "react-icons/lu";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navigate } from "../../Navigate";

const MainProduct = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const navigate = useNavigate();

  const dummyProducts = [
    {
      key: "1",
      sl: 1,
      name: "T-Shirt",
      category: "Clothing",
      subcategory: "Men",
      price: 100,
      discountPrice: 80,
    },
    {
      key: "2",
      sl: 2,
      name: "Laptop Bag",
      category: "Accessories",
      subcategory: "Bags",
      price: 200,
      discountPrice: 180,
    },
  ];

  const columns = [
    { title: "SL no.", dataIndex: "sl", width: 70, align: "center" },
    { title: "Product Name", dataIndex: "name" },
    { title: "Category", dataIndex: "category" },
    { title: "Subcategory", dataIndex: "subcategory" },
    { title: "Price", dataIndex: "price" },
    { title: "Discount Price", dataIndex: "discountPrice" },
    {
      title: "Action",
      align: "center",
      render: (_, record) => (
        <Space size="middle">
          <Link to={"/dashboard/product-verient"}>
            <button>
              <span className="bg-black text-white w-9 h-9 flex justify-center items-center rounded text-xl">
                <LuEye />
              </span>
            </button>
          </Link>
          <Link to={"/dashboard/edit-productInfo"}>
            <button>
              <span className="bg-[#0022FF] text-white w-9 h-9 flex justify-center items-center rounded text-xl">
                <MdModeEditOutline />
              </span>
            </button>
          </Link>
        </Space>
      ),
    },
  ];

  return (
    <div className="bg-white p-3 h-[87vh]">
      <div className="flex justify-between mb-4">
        <Navigate title={"Products Verients"} />
        <div className="flex gap-5">
          <Input
            placeholder="Search by name..."
            prefix={<SearchOutlined />}
            style={{ maxWidth: "500px", height: "40px" }}
          />
          <div>
            <Link to={"/dashboard/add-product"}>
              <button className="bg-[#E63946] w-[150px] text-white py-2 rounded">
                Add Product Info
              </button>
            </Link>
          </div>
        </div>
      </div>
   
      <Table
        columns={columns}
        dataSource={dummyProducts}
        pagination={false}
        className="custom-table"
        scroll={{ x: "max-content" }}
        rowClassName={() => "border-b border-gray-200"}
      />
    </div>
  );
};

export default MainProduct;
