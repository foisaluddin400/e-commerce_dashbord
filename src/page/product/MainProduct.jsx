import {
  Table,
  Input,
  Space,
  message,
  Image,
  Select,
  Pagination,
  Popconfirm,
} from "antd";
import { DeleteOutlined, SearchOutlined } from "@ant-design/icons";
import { MdModeEditOutline } from "react-icons/md";
import { LuEye } from "react-icons/lu";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navigate } from "../../Navigate";
import {
  useDeleteProductMutation,
  useGetProductQuery,
} from "../redux/api/productApi";
import { imageUrl } from "../redux/api/baseApi";
import { useGetCategoryQuery } from "../redux/api/categoryApi";

const MainProduct = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const handlePageChange = (page) => setCurrentPage(page);
  const limit = 100;
  const page = 1;
  const { data: category } = useGetCategoryQuery({ limit, page: page });
  console.log(category);
  const formCategory = category?.data;
  const { data: allProduct } = useGetProductQuery({
    search,
    page: currentPage,
    limit: pageSize,
    category: selectedCategory,
  });
  const [deleteData] = useDeleteProductMutation();

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
      thumbnail: `${imageUrl}${item.thumbnail}`,
      discountPrice: item.discountPercentage,
      variant: item.variants?.length || 0,
    })) || [];
  console.log(allProduct);

  const columns = [
    { title: "SL no.", dataIndex: "sl", width: 70, align: "center" },
    { title: "Product Name", dataIndex: "name" },
    {
      title: "Thumbnail",
      dataIndex: "thumbnail",
      key: "thumbnail",
      render: (img) => <Image width={45} src={img} />,
    },
    { title: "Brand", dataIndex: "brand" },
    { title: "Category", dataIndex: "category" },
    { title: "Subcategory", dataIndex: "subcategory" },
    { title: "Price", dataIndex: "price" },
    { title: "Discount %", dataIndex: "discountPrice" },
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
          <Popconfirm
            title="Are you sure to delete this Product Category?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => handleDelete(record.key)}
          >
            <button className="bg-[#E63946] text-white w-9 h-9 flex justify-center items-center rounded text-xl">
              <DeleteOutlined />
            </button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="bg-white p-3 h-[87vh]">
      <div className="flex justify-between mb-4">
        <Navigate title={"Products Info"} />
        <div className="flex gap-5">
          <div>
            <Select
              style={{ height: "40px", width: "180px" }}
              placeholder="Filter Category"
              allowClear
              value={selectedCategory || undefined}
              onChange={(value) => {
                setSelectedCategory(value || "");
                setCurrentPage(1);
              }}
            >
              {formCategory?.map((cat) => (
                <Select.Option key={cat._id} value={cat._id}>
                  {cat.name}
                </Select.Option>
              ))}
            </Select>
          </div>
          <Input
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name..."
            prefix={<SearchOutlined />}
            style={{ maxWidth: "600px", height: "40px" }}
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

      <div className="mt-4 flex justify-center">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={allProduct?.meta?.total || 0}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};

export default MainProduct;
