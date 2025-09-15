import React, { useState, useEffect } from "react";
import { message, Modal } from "antd";
import { FaRegQuestionCircle } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";

import {
  useAddFaqMutation,
  useDeleteFaqMutation,
  useGetFaqQuery,
  useUpdateFaqMutation,
} from "../redux/api/metaApi";

const FAQ = () => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(null);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedFaq, setSelectedFaq] = useState(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const { data: faqResponse, refetch } = useGetFaqQuery();
  const [addFaq] = useAddFaqMutation();
  const [updateFaq] = useUpdateFaqMutation();
  const [deleteFaq] = useDeleteFaqMutation();

  // Accordion click
  const handleClick = (index) => {
    setIsAccordionOpen((prevIndex) => (prevIndex === index ? null : index));
  };

  // Add FAQ
  const handleAddFaq = async () => {
    if (!question || !answer) return message.warning("Please fill all fields");
    try {
      const res = await addFaq({ question, answer }).unwrap();
      message.success(res?.message || "FAQ added successfully");
      setAddModalOpen(false);
      setQuestion("");
      setAnswer("");
      refetch();
    } catch (err) {
      message.error(err?.data?.message || "Failed to add FAQ");
    }
  };

  // Update FAQ
  const handleUpdateFaq = async () => {
    if (!question || !answer) return message.warning("Please fill all fields");
    try {
      const res = await updateFaq({ id: selectedFaq._id, data: { question, answer } }).unwrap();
      message.success(res?.message || "FAQ updated successfully");
      setUpdateModalOpen(false);
      setSelectedFaq(null);
      setQuestion("");
      setAnswer("");
      refetch();
    } catch (err) {
      message.error(err?.data?.message || "Failed to update FAQ");
    }
  };

  // Delete FAQ
  const handleDeleteFaq = async () => {
    try {
      const res = await deleteFaq(selectedFaq._id).unwrap();
      message.success(res?.message || "FAQ deleted successfully");
      setDeleteModalOpen(false);
      setSelectedFaq(null);
      refetch();
    } catch (err) {
      message.error(err?.data?.message || "Failed to delete FAQ");
    }
  };

  return (
    <div className="relative p-5 z-0">
      <div className="flex justify-between items-center">
        <button
          onClick={() => setAddModalOpen(true)}
          className="bg-[#E63946] text-white font-semibold px-5 py-2 rounded transition duration-200"
        >
          + Add FAQ
        </button>
      </div>

      <div className="flex gap-2 flex-col w-full mt-5 bg-white p-5">
        {faqResponse?.data?.map((faq, index) => (
          <section key={faq._id} className="border-b border-[#e5eaf2] rounded py-3">
            <div
              className="flex gap-2 cursor-pointer items-center justify-between w-full"
              onClick={() => handleClick(index)}
            >
              <h2 className="text-base font-normal md:font-bold md:text-2xl flex gap-2 items-center">
                <FaRegQuestionCircle className="w-5 h-5 hidden md:flex" />
                {faq.question}
              </h2>
              <div className="flex gap-2 md:gap-4 items-center">
                <div className="border-2 px-1.5 py-1 rounded border-[#E63946] bg-[#f0fcf4]">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedFaq(faq);
                      setQuestion(faq.question);
                      setAnswer(faq.answer);
                      setUpdateModalOpen(true);
                    }}
                  >
                    <CiEdit className="text-2xl cursor-pointer text-[#E63946] font-bold transition-all" />
                  </button>
                </div>
                <div className="border-2 px-1.5 py-1 rounded border-[#E63946] bg-[#f0fcf4]">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedFaq(faq);
                      setDeleteModalOpen(true);
                    }}
                  >
                    <RiDeleteBin6Line className="text-2xl cursor-pointer text-red-500 transition-all" />
                  </button>
                </div>
              </div>
            </div>
            <div
              className={`grid transition-all duration-300 overflow-hidden ease-in-out ${
                isAccordionOpen === index ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <p className="text-[#424242] text-[0.9rem] overflow-hidden">{faq.answer}</p>
            </div>
          </section>
        ))}
      </div>

      {/* Add FAQ Modal */}
      <Modal open={addModalOpen} centered onCancel={() => setAddModalOpen(false)} footer={null}>
        <div className="p-5">
          <h2 className="text-2xl font-bold text-center mb-2">Add FAQ</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Question</label>
              <input
                type="text"
                placeholder="Enter the FAQ"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Answer</label>
              <textarea
                placeholder="Enter the FAQ Answer"
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-6">
            <button
              onClick={() => setAddModalOpen(false)}
              className="py-2 px-4 rounded-lg border border-[#EF4444] bg-red-50"
            >
              Cancel
            </button>
            <button onClick={handleAddFaq} className="py-2 px-4 rounded-lg bg-[#E63946] text-white">
              Save
            </button>
          </div>
        </div>
      </Modal>

      {/* Update FAQ Modal */}
      <Modal open={updateModalOpen} centered onCancel={() => setUpdateModalOpen(false)} footer={null}>
        <div className="p-5">
          <h2 className="text-2xl font-bold text-center mb-2">Update FAQ</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Question</label>
              <input
                type="text"
                placeholder="Enter the FAQ"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Answer</label>
              <textarea
                placeholder="Enter the FAQ Answer"
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-6">
            <button
              onClick={() => setUpdateModalOpen(false)}
              className="py-2 px-4 rounded-lg border border-[#EF4444] bg-red-50"
            >
              Cancel
            </button>
            <button onClick={handleUpdateFaq} className="py-2 px-4 rounded-lg bg-[#E63946] text-white">
              Save
            </button>
          </div>
        </div>
      </Modal>

      {/* Delete FAQ Modal */}
      <Modal open={deleteModalOpen} centered onCancel={() => setDeleteModalOpen(false)} footer={null}>
        <div className="p-5 text-center">
          <h2 className="text-2xl font-bold mb-6">Are you sure you want to delete?</h2>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setDeleteModalOpen(false)}
              className="py-2 px-4 rounded-lg border border-[#EF4444] bg-red-50"
            >
              Cancel
            </button>
            <button onClick={handleDeleteFaq} className="py-2 px-4 rounded-lg bg-[#E63946] text-white">
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default FAQ;
