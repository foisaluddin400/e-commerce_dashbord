import React, { useState } from "react";
import {
  useDeleteContactClientsMutation,
  useGetClientContactQuery,
} from "../redux/api/metaApi";
import moment from "moment";
import { message, Pagination, Skeleton } from "antd";
import { DeleteIcon } from "lucide-react";

const Client = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const { data: clientContactData, isLoading } = useGetClientContactQuery({
    page: currentPage,
    limit: pageSize,
  });

  const [deleteContact] = useDeleteContactClientsMutation();
  const handleDeleteCategory = async (id) => {
    try {
      const res = await deleteContact(id).unwrap();
      message.success(res?.message || "Contact deleted successfully");
    } catch (err) {
      message.error(err?.data?.message || "Failed to delete contact");
    }
  };

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <div className="space-y-3">
      {isLoading ? (
        Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="flex justify-between items-center px-4 py-3 rounded bg-gray-100"
          >
            <div className="flex-1">
              <Skeleton.Input
                active
                size="small"
                style={{ width: 120, marginBottom: 8 }}
              />
              <Skeleton.Input
                active
                size="small"
                style={{ width: 200, marginBottom: 8 }}
              />
              <Skeleton.Input active size="small" style={{ width: "90%" }} />
            </div>
            <div className="flex flex-col items-end gap-2">
              <Skeleton.Input active size="small" style={{ width: 150 }} />
              <Skeleton.Button active size="small" shape="circle" />
            </div>
          </div>
        ))
      ) : clientContactData?.data?.length === 0 ? (
        <p>No messages found.</p>
      ) : (
        clientContactData?.data?.map((item, i) => (
          <div
            key={i}
            className="flex justify-between items-center px-4 py-3 rounded bg-gray-100"
          >
            <div>
              <h3 className="font-semibold text-gray-800">{item.name}</h3>
              <p className="text-sm text-gray-700">{item.email}</p>
              <p className="text-gray-500 text-sm">{item.message}</p>
            </div>
            <div className="flex gap-4 text-gray-700 font-medium text-sm items-center">
              {moment(item.createdAt).format("DD MMM, YYYY, hh:mm A")}
              <div
                className="cursor-pointer text-red-500 hover:text-red-700"
                onClick={() => handleDeleteCategory(item._id)}
              >
                <DeleteIcon size={18} />
              </div>
            </div>
          </div>
        ))
      )}

      <div className="mt-4 flex justify-center">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={clientContactData?.meta?.total || 0}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};

export default Client;
