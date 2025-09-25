import { Form, Input, message, Select } from "antd";
import React, { useRef, useState } from "react";
import { Navigate } from "../../Navigate";
import JoditEditor from "jodit-react";
import { useAddProductMutation } from "../redux/api/productApi";
import {
  useGetBrandsNameQuery,
  useGetCategoryQuery,
} from "../redux/api/categoryApi";

const { Option } = Select;

const ProductAddPage = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [form] = Form.useForm();

  const limit = 10;
  const page = 1;
  const { data: categoryData } = useGetCategoryQuery({ limit, page });
  const { data: brands, isLoading } = useGetBrandsNameQuery();
  const [addProduct] = useAddProductMutation();

  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();

      formData.append("productName", values.productName);
      formData.append("description", content);
      formData.append("shortDescription", values.shortDescription);
      formData.append("category", values.category);
      formData.append("brand", values.brand);
      formData.append("subcategory", values.subcategory);
      formData.append("price", values.price);
      formData.append("discountPercentage", values.discountPrice);

      const res = await addProduct(formData);
      if (res?.data?.success) {
        message.success(res.data.message);
        form.resetFields();
        setContent("");
      } else {
        message.error("Something went wrong");
      }
    } catch (error) {
      console.error(error);
      message.error("Failed to add product");
    }
  };

  const config = {
    readonly: false,
    placeholder: "Start typing...",
    buttons: [
      "fontsize",
      "bold",
      "italic",
      "underline",
      "|",
      "font",
      "brush",
      "align",
    ],
  };

  return (
    <div className="bg-white p-3">
      <Navigate title={"Add Product"} />
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        {/* Main Product Info */}
        <div className="grid grid-cols-3 gap-4">
          <Form.Item
            label="Product Name"
            name="productName"
            rules={[
              { required: true, message: "Please enter the product name" },
            ]}
          >
            <Input
              style={{ height: "45px" }}
              placeholder="Enter product name"
            />
          </Form.Item>

          {/* Category */}
          <Form.Item
            label="Category"
            name="category"
            rules={[{ required: true, message: "Please select a category" }]}
          >
            <Select
              style={{ height: "45px" }}
              placeholder="Select Category"
              onChange={(value) => setSelectedCategory(value)}
            >
              {categoryData?.data?.map((cat) => (
                <Option key={cat._id} value={cat._id}>
                  {cat.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {/* Subcategory */}
          <Form.Item
            label="Subcategory"
            name="subcategory"
            rules={[{ required: true, message: "Please select a subcategory" }]}
          >
            <Select style={{ height: "45px" }} placeholder="Select Subcategory">
              {categoryData?.data
                ?.find((cat) => cat._id === selectedCategory)
                ?.subcategories?.map((sub) => (
                  <Option key={sub._id} value={sub._id}>
                    {sub.name}
                  </Option>
                ))}
            </Select>
          </Form.Item>
        </div>

        {/* Price Section */}
        <div className="grid grid-cols-3 gap-4 mt-4">
          <Form.Item
            label="Brand"
            name="brand"
            rules={[{ required: true, message: "Please select a category" }]}
          >
            <Select
              style={{ height: "45px" }}
              placeholder="Select Category"
              onChange={(value) => setSelectedCategory(value)}
            >
              {brands?.data?.map((cat) => (
                <Option key={cat._id} value={cat._id}>
                  {cat.brandName}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: "Please enter the price" }]}
          >
            <Input
              type="number"
              style={{ height: "45px" }}
              placeholder="Enter price"
            />
          </Form.Item>

          <Form.Item
            label="Discount Percentage"
            name="discountPrice"
            rules={[{ required: true, message: "Please enter the discount" }]}
          >
            <Input
              type="number"
              style={{ height: "45px" }}
              placeholder="Enter discount %"
            />
          </Form.Item>
        </div>

        {/* Description */}
        <Form.Item label="Short Description" name="shortDescription">
          <Input.TextArea placeholder="Enter description" rows={4} />
        </Form.Item>

        <Form.Item label="Description" name="description">
          <JoditEditor
            ref={editor}
            value={content}
            config={config}
            tabIndex={1}
            onBlur={(newContent) => setContent(newContent)}
          />
        </Form.Item>

        {/* Submit */}
        <div className="flex gap-3 mt-4">
          <button
            type="submit"
            className="px-4 py-3 w-full bg-[#E63946] text-white rounded-md"
          >
            Add Product
          </button>
        </div>
      </Form>
    </div>
  );
};

export default ProductAddPage;
