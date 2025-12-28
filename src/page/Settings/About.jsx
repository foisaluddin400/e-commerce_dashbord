import { useState, useRef, useEffect } from "react";
import JoditEditor from "jodit-react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useGetAboutusQuery, useGetPrivecyQuery,  useUpdateAboutUsMutation,  useUpdatePrivecyMutation } from "../redux/api/metaApi";
import { message, Spin } from "antd";
import { Navigate } from "../../Navigate";

const About = () => {
  const [updateTerms] = useUpdateAboutUsMutation();
  const { data: termData } = useGetAboutusQuery();
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleTerms = async () => {
    const data = { content };

    try {
      setLoading(true);

      const res = await updateTerms(data).unwrap();

      message.success(res?.message || "Terms updated successfully!");
    } catch (error) {
      console.error("Error updating terms:", error);
      message.error(
        error?.data?.message || "Failed to update terms. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

const config = {
  readonly: false,
  placeholder: "Start typing...",
  height: 600,

  toolbarAdaptive: false,
  toolbarSticky: false,

  buttons: [
    // Text formatting
    "bold",
    "italic",
    "underline",
    "strikethrough",
    "eraser",
    "superscript",
    "subscript",

    "|",

    // Font & size
    "font",
    "fontsize",
    "brush",
    "paragraph",

    "|",

    

    "|",

    // Lists
    "ul",
    "ol",
    "outdent",
    "indent",

    "|",

    // Insert elements
    "image",
    "video",
    "file",
    "table",
    "link",
    "unlink",
    "hr",

    "|",

    // Media & blocks
    "symbols",
   
    "copyformat",

    "|",

    // Code & quotes
    "source",
    "blockquote",
    "code",

    "|",

    // Utilities
    "undo",
    "redo",
    "find",
    "selectall",
    "print",
    "preview",
    "fullsize"
  ],
};

  useEffect(() => {
    setContent(termData?.data?.content);
  }, [termData]);

  return (
    <div className=" bg-white p-3 h-[87vh] overflow-auto">
      <div className="flex justify-between  mt-4">
       <Navigate title={"About Us"} />
      </div>

      <JoditEditor
        ref={editor}
        value={content}
        config={config}
        tabIndex={1}
        onBlur={(newContent) => setContent(newContent)}
        onChange={(newContent) => {}}
      />

      <div className="mt-5 flex justify-center">
        <button
          onClick={handleTerms}
          disabled={isLoading}
          className="bg-[#E63946] py-2 px-4 rounded text-white"
        >
          {isLoading ? <Spin size="small" /> : "Update"}
        </button>
      </div>
    </div>
  );
};

export default About;
