import dashboard from "../../assets/routerImg/dashboard.png";
import categorie from "../../assets/routerImg/categorie.png";
import create from "../../assets/routerImg/create.png";
import settings from "../../assets/routerImg/settings.png";
import subscription from "../../assets/routerImg/subscription.png";
import user from "../../assets/routerImg/user.png";
import logo from "../../assets/header/logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { FaChevronRight, FaHome, FaJediOrder } from "react-icons/fa";
import { IoIosLogIn } from "react-icons/io";
import { logout } from "../../page/redux/features/auth/authSlice";
import { useDispatch } from "react-redux";
import { FiUser } from "react-icons/fi";
import { FaBorderNone } from "react-icons/fa6";
import { FaBorderAll } from "react-icons/fa";
import { MdContactSupport } from "react-icons/md";
import { TbCategory2, TbLogs } from "react-icons/tb";
import { VscSymbolColor } from "react-icons/vsc";
import { IoSettingsOutline } from "react-icons/io5";
import { MdFormatSize } from "react-icons/md";
import { TbTiltShift } from "react-icons/tb";
const items = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: <FaHome />,
    link: "/",
  },
  {
    key: "userManagement",
    label: "User Management",
    icon: <FiUser />,
    link: "/dashboard/UserManagement",
  },

  {
    key: "categoriesManagement",
    label: "Categories Management",
    icon: <TbCategory2 />,
    link: "/dashboard/CategoriesManagement/Categories",
    children: [
      {
        key: "categories",
        label: "Categories",
        link: "/dashboard/CategoriesManagement/Categories",
      },
      {
        key: "subcategory",
        label: "Subcategory",
        link: "/dashboard/CategoriesManagement/Subcategory",
      },
    ],
  },
  {
    key: "order",
    label: "Order",
    icon: <FaJediOrder />,
    link: "/dashboard/order",
  },
  {
    key: "banner",
    label: "Banner Add",
    icon: <FaBorderAll />,
    link: "/dashboard/banner",
  },
     {
    key: "size",
    label: "Size",
    icon: <MdFormatSize />,
    link: "/dashboard/size",
  },
  {
    key: "color",
    label: "Color",
    icon: <VscSymbolColor />,
    link: "/dashboard/color",
  },
  {
    key: "product",
    label: "Product",
    icon: <TbTiltShift />,
    link: "/dashboard/product",
  },
 {
    key: "blog",
    label: "blog",
    icon: <TbLogs />,
    link: "/dashboard/blogs",
  },
  {
    key: "support",
    label: "Support",
    icon: <MdContactSupport />,
    link: "/dashboard/support",
  },

  {
    key: "settings",
    label: "Settings",
    icon: <IoSettingsOutline />,
    link: "/dashboard/Settings/profile",
    children: [
      {
        key: "profile",
        label: "Profile",
        link: "/dashboard/Settings/profile",
      },
      {
        key: "terms",
        label: "Terms & Condition",
        link: "/dashboard/Settings/Terms&Condition",
      },
      {
        key: "privacy",
        label: "Privacy Policy",
        link: "/dashboard/Settings/PrivacyPolicy",
      },
      {
        key: "faq",
        label: "FAQ",
        link: "/dashboard/Settings/FAQ",
      },
      {
        key: "about",
        label: "About Us",
        link: "/dashboard/Settings/aboutUs",
      },
    ],
  },
];

const SidBar = () => {
  const [selectedKey, setSelectedKey] = useState("dashboard");
  const [expandedKeys, setExpandedKeys] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const contentRef = useRef({});
  const dispatch = useDispatch();

  useEffect(() => {
    const currentPath = location.pathname;

    let activeParent = null;

    items.forEach((item) => {
      if (item.link === currentPath) {
        activeParent = item;
      } else if (
        item.children &&
        item.children.some((child) => child.link === currentPath)
      ) {
        activeParent = item;
      }
    });

    if (activeParent) {
      setSelectedKey(
        activeParent.children
          ? activeParent.children.find((child) => child.link === currentPath)
              ?.key || activeParent.key
          : activeParent.key
      );

      if (activeParent.children && !expandedKeys.includes(activeParent.key)) {
        setExpandedKeys([...expandedKeys, activeParent.key]);
      }
    }
  }, [location]);

  const onParentClick = (key) => {
    setExpandedKeys((prev) =>
      prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key]
    );
  };

  // Logout Function
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="custom-sidebar h-[100vh] ">
      <div className="custom-sidebar-logo flex justify-center">
        <h1 className="text-4xl font-bold text-red-600 py-4">
          Shs<span>o</span>pflo
        </h1>
      </div>
      <div className="menu-items">
        {items.map((item) => {
          const isSettingsActive =
            item.key === "settings" &&
            item.children.some((child) => child.link === location.pathname);

          const isCreatorActive =
            item.key === "creatorManagement" &&
            item.children.some((child) => child.link === location.pathname);

          const isCategoriesActive =
            item.key === "categoriesManagement" &&
            item.children.some((child) => child.link === location.pathname);

          return (
            <div key={item.key}>
              <Link
                to={item.link}
                className={`menu-item my-2 mr-3 py-[10px] px-3 flex items-center cursor-pointer ${
                  selectedKey === item.key ||
                  isSettingsActive ||
                  isCreatorActive ||
                  isCategoriesActive
                    ? "bg-[#E63946] text-white rounded-r-3xl "
                    : "bg-white rounded-r-3xl hover:bg-gray-200"
                }`}
                onClick={(e) => {
                  if (item.children) {
                    e.preventDefault();
                    onParentClick(item.key);
                  } else {
                    setSelectedKey(item.key);
                  }
                }}
              >
                <h1 className="w-5 mr-2">{item.icon}</h1>

                <span className="block w-full ">{item.label}</span>

                {/* Show dropdown arrow if children exist */}
                {item.children && (
                  <FaChevronRight
                    className={`ml-auto transform transition-all text-[10px] duration-300 ${
                      expandedKeys.includes(item.key) ? "rotate-90" : ""
                    }`}
                  />
                )}
              </Link>

              {/* Show children menu if expanded */}
              {item.children && (
                <div
                  className={`children-menu bg-white ml-6 mx-2  transition-all duration-300 ${
                    expandedKeys.includes(item.key) ? "expanded" : ""
                  }`}
                  style={{
                    maxHeight: expandedKeys.includes(item.key)
                      ? `${contentRef.current[item.key]?.scrollHeight}px`
                      : "0",
                  }}
                  ref={(el) => (contentRef.current[item.key] = el)}
                >
                  {item.children.map((child) => (
                    <Link
                      key={child.key}
                      to={child.link}
                      className={`menu-item p-2 flex items-center cursor-pointer ${
                        selectedKey === child.key
                          ? "bg-[#E63946] text-white"
                          : "hover:bg-gray-200"
                      }`}
                      onClick={() => {
                        setSelectedKey(child.key); // Set the selected key for children
                        setExpandedKeys([]); // Close all expanded items
                      }}
                    >
                      <span className="block w-full ">{child.label}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Logout Button */}
      <div className="  w-full p-4 border-t mt-4">
        <button
          onClick={handleLogout}
          className="w-full flex  text-black text-start rounded-md  "
        >
          <span className="text-2xl">
            <IoIosLogIn />
          </span>
          <span className="ml-3">Log Out</span>
        </button>
      </div>
    </div>
  );
};

export default SidBar;
