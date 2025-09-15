import { Form, Input, message, Modal, Select, Upload } from "antd";
import React, { useRef, useState } from "react";
import { Navigate } from "../../Navigate";
import JoditEditor from "jodit-react";

const { Option } = Select;

const onPreview = async (file) => {
  let src = file.url;
  if (!src) {
    src = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file.originFileObj);
      reader.onload = () => resolve(reader.result);
    });
  }
  const image = new Image();
  image.src = src;
  const imgWindow = window.open(src);
  imgWindow?.document.write(image.outerHTML);
};

const ProductAddPage = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [frontImageList, setFrontImageList] = useState([]);
  const [backImageList, setBackImageList] = useState([]);
  const [form] = Form.useForm();

  // Control visibility
  const [showSize, setShowSize] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const [showStockStatus, setShowStockStatus] = useState(false);
  const [showImages, setShowImages] = useState(false);

  // Variants
  const [variants, setVariants] = useState([]);

  const handleAddMore = () => {
    const color = form.getFieldValue("color");
    const size = form.getFieldValue("size");
    const status = form.getFieldValue("status");
    const stockStatus = form.getFieldValue("stockStatus");
    const frontImage = frontImageList[0]?.originFileObj;
    const backImage = backImageList[0]?.originFileObj;

    if (
      !color ||
      !size ||
      !status ||
      !stockStatus ||
      !frontImage ||
      !backImage
    ) {
      message.error("Please fill all variant fields before adding more");
      return;
    }

    const newVariant = {
      color,
      size,
      status,
      stockStatus,
      frontImage,
      backImage,
    };

    setVariants((prev) => [...prev, newVariant]);
    message.success(`${color} - ${size} variant added!`);
  };

  const handleSubmit = async (values) => {
    if (variants.length === 0) {
      message.error("Please add at least one variant");
      return;
    }

    const productData = {
      productName: values.productName,
      category: values.category,
      subcategory: values.subcategory,
      price: values.price,
      discountPrice: values.discountPrice,
      shortDescription: values.shortDescription,
      description: content,
      variants, // array of all variant cards
    };

    console.log("Final Product Data:", productData);
    message.success("Product Added Successfully!");
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

          <Form.Item
            label="Category"
            name="category"
            rules={[{ required: true, message: "Please select a category" }]}
          >
            <Select style={{ height: "45px" }} placeholder="Select Category">
              <Option value="clothing">Clothing</Option>
              <Option value="electronics">Electronics</Option>
              <Option value="accessories">Accessories</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Subcategory"
            name="subcategory"
            rules={[{ required: true, message: "Please select a subcategory" }]}
          >
            <Select style={{ height: "45px" }} placeholder="Select Subcategory">
              <Option value="men">Men</Option>
              <Option value="women">Women</Option>
              <Option value="kids">Kids</Option>
            </Select>
          </Form.Item>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
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
            label="Discount Price"
            name="discountPrice"
            rules={[
              { required: true, message: "Please enter the discount price" },
            ]}
          >
            <Input
              type="number"
              style={{ height: "45px" }}
              placeholder="Enter discount price"
            />
          </Form.Item>
        </div>

        {/* Variant Section */}
        <div className="border p-4 rounded mt-4 bg-gray-50">
          <h3 className="font-semibold mb-4">Product Variants</h3>

          {/* Color */}
          <Form.Item
            label="Color"
            name="color"
            rules={[{ required: true, message: "Please select a color" }]}
          >
            <Select
              style={{ height: "45px" }}
              placeholder="Select Color"
              onChange={() => setShowSize(true)}
            >
              <Option value="red">Red</Option>
              <Option value="yellow">Yellow</Option>
              <Option value="black">Black</Option>
              <Option value="green">Green</Option>
            </Select>
          </Form.Item>

          {/* Size */}
          {showSize && (
            <Form.Item
              label="Size"
              name="size"
              rules={[
                { required: true, message: "Please select at least one size" },
              ]}
            >
              <Select
                mode="multiple" // ✅ allow selecting multiple
                style={{ width: "100%", height: "45px" }}
                placeholder="Select Sizes"
                onChange={() => setShowStatus(true)}
                options={[
                  { value: "S", label: "S" },
                  { value: "M", label: "M" },
                  { value: "L", label: "L" },
                  { value: "XL", label: "XL" },
                ]}
              />
            </Form.Item>
          )}

          {/* Status */}
          {showStatus && (
            <Form.Item
              label="Status"
              name="status"
              rules={[{ required: true, message: "Please select status" }]}
            >
              <Select
                style={{ height: "45px" }}
                placeholder="Select Status"
                onChange={() => setShowStockStatus(true)}
              >
                <Option value="Visible">Visible</Option>
                <Option value="Hidden">Hidden</Option>
              </Select>
            </Form.Item>
          )}

          {/* Stock Status */}
          {showStockStatus && (
            <Form.Item
              label="Stock Status"
              name="stockStatus"
              rules={[
                { required: true, message: "Please select stock status" },
              ]}
            >
              <Select
                style={{ height: "45px" }}
                placeholder="Select Stock Status"
                onChange={() => setShowImages(true)}
              >
                <Option value="In Stock">In Stock</Option>
                <Option value="Stock Out">Stock Out</Option>
                <Option value="Upcoming">Upcoming</Option>
              </Select>
            </Form.Item>
          )}

          {/* Front / Back Images */}
          {showImages && (
            <div className="grid grid-cols-2 gap-4">
              <Form.Item label="Front Image" name="frontImage">
                <Upload
                  listType="picture-card"
                  fileList={frontImageList}
                  onChange={({ fileList }) => setFrontImageList(fileList)}
                  onPreview={onPreview}
                  multiple={false}
                  accept="image/*"
                  style={{ width: "100%", height: "200px" }}
                >
                  {frontImageList.length < 1 && "+ Upload"}
                </Upload>
              </Form.Item>

              <Form.Item label="Back Image" name="backImage">
                <Upload
                  listType="picture-card"
                  fileList={backImageList}
                  onChange={({ fileList }) => setBackImageList(fileList)}
                  onPreview={onPreview}
                  multiple={false}
                  accept="image/*"
                  style={{ width: "100%", height: "200px" }}
                >
                  {backImageList.length < 1 && "+ Upload"}
                </Upload>
              </Form.Item>
            </div>
          )}

          {showImages && (
            <div className="flex justify-end mt-2">
              <button
                type="button"
                onClick={handleAddMore}
                className="px-4 py-2 bg-[#4A90E2] text-white rounded"
              >
                Add More
              </button>
            </div>
          )}

          {/* Show Added Variants */}
          {variants.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-7 gap-4 mt-4">
              {variants.map((v, i) => (
                <div key={i} className="border p-3 rounded shadow-sm bg-white">
                  <p>
                    <b>Color:</b> {v.color}
                  </p>
                  <p>
                    <b>Size:</b> {v.size}
                  </p>
                  <p>
                    <b>Status:</b> {v.status}
                  </p>
                  <p>
                    <b>Stock:</b> {v.stockStatus}
                  </p>
                  <div className="flex gap-2 mt-2">
                    {v.frontImage && (
                      <img
                        src={URL.createObjectURL(v.frontImage)}
                        className="w-[80px] h-[80px] object-cover border"
                      />
                    )}
                    {v.backImage && (
                      <img
                        src={URL.createObjectURL(v.backImage)}
                        className="w-20 h-20 object-cover border"
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
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
            className="px-4 py-3 w-full bg-[#D17C51] text-white rounded-md"
          >
            Add Product
          </button>
        </div>
      </Form>
    </div>
  );
};

export default ProductAddPage;
