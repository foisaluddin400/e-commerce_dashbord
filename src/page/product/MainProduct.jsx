import { Table, Input, Space, message } from "antd";
import { DeleteOutlined, SearchOutlined } from "@ant-design/icons";
import { MdModeEditOutline } from "react-icons/md";
import { LuEye } from "react-icons/lu";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navigate } from "../../Navigate";
import { useDeleteProductMutation, useGetProductQuery } from "../redux/api/productApi";

const MainProduct = () => {
  const { data: allProduct } = useGetProductQuery();
  const [deleteData] = useDeleteProductMutation()
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
      const res = await deleteData(id).unwrap();
      message.success(res?.message);
    } catch (err) {
      message.error(err?.data?.message);
    }
  };

  // Convert API data to table data format
  const tableData =
    allProduct?.data?.map((item, index) => ({
      key: item._id,
      sl: index + 1,
      name: item.productName,
      category: item.category?.name,
       brand: item.brand?.brandName,
      subcategory: item.subcategory?.name,
      price: item.price,
      discountPrice: item.discountPercentage,
      variant: item.variants?.length || 0,
    })) || [];
    console.log(allProduct)

  const columns = [
    { title: "SL no.", dataIndex: "sl", width: 70, align: "center" },
    { title: "Product Name", dataIndex: "name" },
    { title: "Brand", dataIndex: "brand" },
    { title: "Category", dataIndex: "category" },
    { title: "Subcategory", dataIndex: "subcategory" },
    { title: "Price", dataIndex: "price" },
    { title: "Discount Percentage", dataIndex: "discountPrice" },
    { title: "Total Variant", dataIndex: "variant" },
    {
      title: "Action",
      align: "center",
      render: (_, record) => (
        <Space size="middle">
          <Link to={`/dashboard/product-verient/${record.key}`}>
            <button>
              <span className="bg-black text-white flex justify-center items-center rounded py-1 px-3">
                Veriant
              </span>
            </button>
          </Link>
          <Link to={`/dashboard/edit-productInfo/${record.key}`}>
            <button>
              <span className="bg-[#0022FF] text-white w-9 h-9 flex justify-center items-center rounded text-xl">
                <MdModeEditOutline />
              </span>
            </button>
          </Link>
          <button
            className="bg-[#E63946] text-white w-9 h-9 flex justify-center items-center rounded text-xl"
            onClick={() => handleDelete(record.key)}
          >
            <DeleteOutlined />
          </button>
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
        dataSource={tableData}
        pagination={false}
        className="custom-table"
        scroll={{ x: "max-content" }}
        rowClassName={() => "border-b border-gray-200"}
      />
    </div>
  );
};

export default MainProduct;
