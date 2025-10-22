import { Form, message, Select, Upload } from "antd";
import React, { useState, useEffect } from "react";
import { Navigate } from "../../Navigate";
import {
  useGetColorCatQuery,
  useGetSizeCatQuery,
} from "../redux/api/categoryApi";
import {
  useGetSingleProductQuery,
  useUpdateProductVeriantMutation,
} from "../redux/api/productApi";
import { useParams } from "react-router-dom";
import { imageUrl } from "../redux/api/baseApi";

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

const EditProduct = () => {
  const { productId, variantId } = useParams();
  const { data: singleProduct } = useGetSingleProductQuery({ id: productId });
  console.log(singleProduct)
  const { data: colorData } = useGetColorCatQuery();
  const { data: sizeData } = useGetSizeCatQuery();
  const [updateVerientProduct] = useUpdateProductVeriantMutation();

  const [frontImageList, setFrontImageList] = useState([]);
  const [backImageList, setBackImageList] = useState([]);
    const [rightImageList, setRightImageList] = useState([]);
  const [leftImageList, setLeftImageList] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    if (singleProduct?.data) {
      const variant = singleProduct.data.variants.find(
        (v) => v._id === variantId
      );

      if (variant) {
        // Set form fields
        form.setFieldsValue({
          color: variant.color?._id || undefined,
          size: variant.size?.map((s) => s._id) || [],
          status: variant.status || undefined,
          stockStatus: variant.stockStatus || undefined,
        });
        setFrontImageList(
          variant.frontImage
            ? [
                {
                  uid: "-1",
                  name: "frontImage",
                  status: "done",
                  url: `${imageUrl}${variant.frontImage}`,
                },
              ]
            : []
        );
        setBackImageList(
          variant.backImage
            ? [
                {
                  uid: "-2",
                  name: "backImage",
                  status: "done",
                  url: `${imageUrl}${variant.backImage}`,
                },
              ]
            : []
        );

        setRightImageList(
          variant.backImage
            ? [
                {
                  uid: "-2",
                  name: "rightImage",
                  status: "done",
                  url: `${imageUrl}${variant.rightImage}`,
                },
              ]
            : []
        );

        setLeftImageList(
          variant.backImage
            ? [
                {
                  uid: "-2",
                  name: "leftImage",
                  status: "done",
                  url: `${imageUrl}${variant.leftImage}`,
                },
              ]
            : []
        );
      }
    }
  }, [singleProduct, variantId, form]);

  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();

      // Append new images if uploaded
      frontImageList.forEach((file) => {
        if (file.originFileObj) formData.append("frontImage", file.originFileObj);
      });
      backImageList.forEach((file) => {
        if (file.originFileObj) formData.append("backImage", file.originFileObj);
      });

rightImageList.forEach((file) => {
        if (file.originFileObj) formData.append("rightImage", file.originFileObj);
      });


      leftImageList.forEach((file) => {
        if (file.originFileObj) formData.append("leftImage", file.originFileObj);
      });



    
      // Other fields
      formData.append("color", values.color);
      values.size.forEach((sizeId) => formData.append("size", sizeId));
      formData.append("stockStatus", values.stockStatus);
      formData.append("status", values.status);

      const res = await updateVerientProduct({
        formData,
        productId,
        variantId,
      }).unwrap();

      message.success(res.message);
    } catch (error) {
      console.error(error);
      message.error(error?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="bg-white p-3">
      <Navigate title={"Edit Product Variant"} />
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        {/* Color Select */}
        <Form.Item
          label="Color"
          name="color"
          rules={[{ required: true, message: "Please select a color" }]}
        >
          <Select style={{ height: "45px" }} placeholder="Select Color">
            {colorData?.data?.map((color) => (
              <Option key={color._id} value={color._id}>
                <span
                  style={{
                    display: "inline-block",
                    width: "15px",
                    height: "15px",
                    backgroundColor: color.hexValue,
                    borderRadius: "50%",
                    marginRight: "8px",
                  }}
                ></span>
                {color.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        {/* Size Select */}
        <Form.Item
          label="Size"
          name="size"
          rules={[
            { required: true, message: "Please select at least one size" },
          ]}
        >
          <Select
            mode="multiple"
            style={{ width: "100%", height: "45px" }}
            placeholder="Select Sizes"
          >
            {sizeData?.data?.map((size) => (
              <Option key={size._id} value={size._id}>
                {size.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        {/* Status */}
        <Form.Item
          label="Status"
          name="status"
          rules={[{ required: true, message: "Please select status" }]}
        >
          <Select style={{ height: "45px" }} placeholder="Select Status">
            <Option value="Visible">Visible</Option>
            <Option value="Hidden">Hidden</Option>
          </Select>
        </Form.Item>

        {/* Stock Status */}
        <Form.Item
          label="Stock Status"
          name="stockStatus"
          rules={[{ required: true, message: "Please select stock status" }]}
        >
          <Select style={{ height: "45px" }} placeholder="Select Stock Status">
            <Option value="In Stock">In Stock</Option>
            <Option value="Stock Out">Stock Out</Option>
       
          </Select>
        </Form.Item>

        {/* Image Upload */}
        <div className="grid grid-cols-4 gap-4">
            <Form.Item label="Front Image" name="frontImage">
              <Upload
                listType="picture-card"
                fileList={frontImageList}
                onChange={({ fileList }) => setFrontImageList(fileList)}
                onPreview={onPreview}
                multiple={false}
                accept="image/*"
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
              >
                {backImageList.length < 1 && "+ Upload"}
              </Upload>
            </Form.Item>

            <Form.Item label="Right Image (Optional)">
              <Upload
                listType="picture-card"
                fileList={rightImageList}
                onChange={({ fileList }) => setRightImageList(fileList)}
                onPreview={onPreview}
                multiple={false}
                accept="image/*"
              >
                {rightImageList.length < 1 && "+ Upload"}
              </Upload>
            </Form.Item>

            <Form.Item label="Left Image (Optional)">
              <Upload
                listType="picture-card"
                fileList={leftImageList}
                onChange={({ fileList }) => setLeftImageList(fileList)}
                onPreview={onPreview}
                multiple={false}
                accept="image/*"
              >
                {leftImageList.length < 1 && "+ Upload"}
              </Upload>
            </Form.Item>
          </div>

        {/* Submit */}
        <div className="flex gap-3 mt-4">
          <button
            type="submit"
            className="px-4 py-3 w-full bg-[#E63946] text-white rounded-md"
          >
            Update Product
          </button>
        </div>
      </Form>
    </div>
  );
};

export default EditProduct;
