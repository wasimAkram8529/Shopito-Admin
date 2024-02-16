import React, { useEffect, useState } from "react";
import "./MainLayout.css";
import { UploadOutlined } from "@ant-design/icons";
import { BiCategoryAlt } from "react-icons/bi";
import { SiGooglemarketingplatform } from "react-icons/si";
import { FaProductHunt } from "react-icons/fa6";
import { TbBrand4Chan } from "react-icons/tb";
import { RiCouponLine } from "react-icons/ri";
import { FaClipboardList, FaBloggerB, FaTimes } from "react-icons/fa";
import { CiCircleList, CiLogout } from "react-icons/ci";
import { IoIosNotifications } from "react-icons/io";
import { ImBlog } from "react-icons/im";
import {
  AiOutlineDashboard,
  AiOutlineUser,
  AiOutlineBgColors,
  AiOutlinePicRight,
  AiOutlinePicLeft,
} from "react-icons/ai";
import { Link, Outlet } from "react-router-dom";
import { Layout, Menu, Button, theme } from "antd";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { getAUser, logout } from "../features/auth/authSlice";
import Loader from "./loader/Loader";

const { Header, Sider, Content } = Layout;

const MainLayout = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [collapsed, setCollapsed] = useState(() => window.innerWidth < 800);
  const dispatch = useDispatch();

  useEffect(() => {
    // Update screenWidth when the window is resized
    const handleResize = () => {
      const newScreenWidth = window.innerWidth;
      setScreenWidth(newScreenWidth);

      // Dynamically update the collapsed state based on screen width
      if (newScreenWidth < 800) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Remove event listener on component unmount
    dispatch(getAUser());
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const hideMenu = () => {
    setCollapsed(!collapsed);
  };

  const { user, isLoading } = useSelector((state) => state.auth);
  //console.log(user);

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();

  return (
    <>
      {isLoading && <Loader />}
      <Layout /*onContextMenu={(e) => e.preventDefault()}*/>
        <Sider
          className={!collapsed ? "side-menu-open" : "side-menu-collapsed"}
          trigger={null}
          collapsible
          collapsed={collapsed}
        >
          <div className="logo">
            <h2 className="text-white fs-5 py-3 mb-0">
              <span className="sm-logo">
                S<span>T</span>
              </span>
              <span className="lg-logo">
                Shop<span>ito</span>
              </span>
              <FaTimes
                className={
                  collapsed ? "hide-menu-button" : "hide-menu-button-active"
                }
                size={22}
                color="#fff"
                onClick={hideMenu}
              />
            </h2>
          </div>
          <Menu
            className="side-menu"
            theme="dark"
            mode="inline"
            defaultSelectedKeys={[""]}
            onClick={({ key }) => {
              if (key === "signOut") {
                dispatch(logout())
                  .then((data) => {
                    if (data.payload === "Successfullly Logged Out") {
                      navigate("/");
                    }
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              } else {
                navigate(key);
              }
            }}
            items={[
              {
                key: "/admin",
                icon: <AiOutlineDashboard className="fs-4" />,
                label: "Dashboard",
              },
              {
                key: "customers",
                icon: <AiOutlineUser className="fs-4" />,
                label: "Customers",
              },
              {
                key: "catalog",
                icon: <UploadOutlined className="fs-4" />,
                label: "Catalog",
                children: [
                  {
                    key: "add-product",
                    icon: <FaProductHunt className="fs-4" />,
                    label: "Add Product",
                  },
                  {
                    key: "product-list",
                    icon: <CiCircleList className="fs-4" />,
                    label: "Products List",
                  },
                  {
                    key: "brand",
                    icon: <TbBrand4Chan className="fs-4" />,
                    label: "Brand",
                  },
                  {
                    key: "brand-list",
                    icon: <CiCircleList className="fs-4" />,
                    label: "Brands List",
                  },
                  {
                    key: "Category",
                    icon: <BiCategoryAlt className="fs-4" />,
                    label: "Category",
                  },
                  {
                    key: "category-list",
                    icon: <CiCircleList className="fs-4" />,
                    label: "Categories List",
                  },
                  {
                    key: "Color",
                    icon: <AiOutlineBgColors className="fs-4" />,
                    label: "Color",
                  },
                  {
                    key: "Color-list",
                    icon: <CiCircleList className="fs-4" />,
                    label: "Colors List",
                  },
                ],
              },
              {
                key: "orders",
                icon: <FaClipboardList className="fs-4" />,
                label: "Orders",
              },
              {
                key: "marketing",
                icon: <SiGooglemarketingplatform className="fs-4" />,
                label: "Marketing",
                children: [
                  {
                    key: "coupon",
                    icon: <RiCouponLine className="fs-4" />,
                    label: "Add coupon",
                  },
                  {
                    key: "coupon-list",
                    icon: <CiCircleList className="fs-4" />,
                    label: "Coupon List",
                  },
                ],
              },
              {
                key: "blogs",
                icon: <FaBloggerB className="fs-4" />,
                label: "Blog",
                children: [
                  {
                    key: "blog",
                    icon: <ImBlog className="fs-4" />,
                    label: "Add Blog",
                  },
                  {
                    key: "blog-list",
                    icon: <CiCircleList className="fs-4" />,
                    label: "Blog List",
                  },
                  {
                    key: "blog-category",
                    icon: <FaBloggerB className="fs-4" />,
                    label: "Add Blog Category",
                  },
                  {
                    key: "blog-category-list",
                    icon: <CiCircleList className="fs-4" />,
                    label: "Blog Category List",
                  },
                ],
              },
              {
                key: "enquiries",
                icon: <CiCircleList className="fs-4" />,
                label: "Enquiry",
              },
              {
                key: "signOut",
                icon: <CiLogout className="fs-4" />,
                label: "Sign Out",
              },
            ]}
          />
        </Sider>
        <Layout>
          <Header
            className="d-flex justify-content-between ps-3 pe-5"
            style={{ padding: 0, background: colorBgContainer }}
          >
            <Button
              type="text"
              icon={collapsed ? <AiOutlinePicRight /> : <AiOutlinePicLeft />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
            <div
              className={
                collapsed ? `nav-wrapper show-nav-wrapper` : `nav-wrapper`
              }
              onClick={hideMenu}
            ></div>
            <div className="d-flex gap-3 align-items-center">
              <div className="position-relative">
                <IoIosNotifications className="fs-4" />
                <span className="badge bg-warning rounded-circle p-1 position-absolute">
                  3
                </span>
              </div>
              <div className="d-flex gap-3 align-items-center dropdown">
                <div>
                  <img src={user?.[0]?.photo} alt="User" />
                </div>
                <div
                  role="button"
                  id="dropdownMenuLink"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <h5 className="mb-0">
                    {user?.[0]?.firstName + " " + user?.[0]?.lastName}
                  </h5>
                  <p className="mb-0">{user?.[0]?.email}</p>
                </div>
                {/* <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <li>
                  <Link
                    className="dropdown-item py-1 mb-1"
                    style={{ height: "auto", lineHeight: "20px" }}
                    to="/"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item py-1 mb-1"
                    style={{ height: "auto", lineHeight: "20px" }}
                    to="/"
                  >
                    Sign Out
                  </Link>
                </li>
              </div> */}
              </div>
            </div>
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: "red",
            }}
          >
            <ToastContainer
              position="top-right"
              autoClose={1000}
              hideProgressBar={false}
              newestOnTop={true}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              theme="light"
            />
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default MainLayout;
