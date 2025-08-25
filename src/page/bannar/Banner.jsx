import React, { useState, useRef } from "react";
const Banner = () => {
      const [selectedFiles, setSelectedFiles] = useState([]);
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [discount, setDiscount] = useState("");
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    setSelectedFiles(files);
  };

  const handleFileSelect = (e) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setSelectedFiles(files);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", {
      category,
      subCategory,
      discount,
      files: selectedFiles,
    });
  };

  return (
    <div>
        <div className="p-6 ">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="">Select Category</option>
            <option value="graphics">Graphics & Design</option>
            <option value="marketing">Marketing Materials</option>
            <option value="print">Print Design</option>
            <option value="digital">Digital Assets</option>
          </select>

          <select
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="">Select Sub Category</option>
            <option value="logo">Logo Design</option>
            <option value="brochure">Brochure</option>
            <option value="business-card">Business Card</option>
            <option value="flyer">Flyer</option>
          </select>

          <input
            type="text"
            placeholder="Discount"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          />
        </div>

        {/* File Upload Area */}
        <div
          className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
            isDragOver ? "border-red-400 bg-red-50" : "border-gray-300 bg-gray-50"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center space-y-4">
            <div
              className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center"
              style={{ fontSize: "2rem" }}
            >
              ☁️
            </div>

            <div>
              <p>
                Drag & Drop or{" "}
                <button
                  type="button"
                  onClick={handleBrowseClick}
                  className="text-red-500 underline"
                >
                  Browse
                </button>{" "}
                Your Computer
              </p>
              <p className="text-sm text-gray-500 mt-2">
                JPG, PNG, EPS, AI, PDF, WEBP, AVIF, HEIC, TIFF AND SVG (Max 20 MB)
              </p>
            </div>

            {selectedFiles.length > 0 && (
              <div className="mt-4">
                <p className="text-sm font-medium">Selected files:</p>
                {selectedFiles.map((file, index) => (
                  <p key={index} className="text-sm text-gray-600">
                    {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                  </p>
                ))}
              </div>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".jpg,.jpeg,.png,.eps,.ai,.pdf,.webp,.avif,.heic,.tiff,.svg"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>

        {/* Help Section */}
        <div className="text-center space-y-2">
          <h3 className="font-medium">Need help with your upload?</h3>
          <p className="text-sm text-gray-600">
            We accept most file types. If yours isn't supported, just email it or start a chat. Our team will review your file and follow up with you.
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="px-6 bg-red-500 hover:bg-red-600 text-white py-3 rounded font-medium"
        >
          Submit
        </button>
      </form>
    </div>
    </div>
  )
}

export default Banner