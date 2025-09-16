import React from "react";
import { useParams } from "react-router-dom";
import { useGetSingleBlogsQuery } from "../redux/api/blogApi";
import { imageUrl } from "../redux/api/baseApi";
import { Spin } from "antd";
import { Navigate } from "../../Navigate";

const BlogDetails = () => {
  const { id } = useParams();
  const { data: singleBlogData, isLoading } = useGetSingleBlogsQuery({ id });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <Spin size="large" />
      </div>
    );
  }

  const blog = singleBlogData?.data;

  return (
    <div className=" bg-white p-3 h-[87vh] overflow-auto ">
      <Navigate title="Blog Details" />
      {/* Blog Image */}
    <div className="max-w-6xl m-auto border p-2">
          {blog?.imageUrl && (
        <img
          src={`${imageUrl}${blog.imageUrl}`}
          alt={blog.title}
          className="w-full object-cover rounded mb-6"
        />
      )}

      {/* Blog Title */}
      <h1 className="text-3xl font-bold mb-4">{blog?.title}</h1>

      {/* Blog Content */}
      <div
        className="prose max-w-none mb-6"
        dangerouslySetInnerHTML={{ __html: blog?.content }}
      ></div>

      {/* Author and Date */}
      <div className="flex justify-between text-gray-600 text-sm border-t pt-4">
        <div>
          <p>
            <span className="font-semibold">Author:</span>{" "}
            {blog?.author?.firstName} {blog?.author?.lastName}
          </p>
          <p>{blog?.author?.email}</p>
        </div>
        <div className="text-right">
          <p>
            <span className="font-semibold">Created:</span>{" "}
            {new Date(blog?.createdAt).toLocaleDateString()}{" "}
            {new Date(blog?.createdAt).toLocaleTimeString()}
          </p>
          <p>
            <span className="font-semibold">Updated:</span>{" "}
            {new Date(blog?.updatedAt).toLocaleDateString()}{" "}
            {new Date(blog?.updatedAt).toLocaleTimeString()}
          </p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default BlogDetails;
