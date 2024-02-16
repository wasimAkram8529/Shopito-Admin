import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteBlogCategory,
  getBlogCategory,
} from "../features/bCategory/bCategorySlice";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import CustomModel from "../components/CustomModel";
import Loader from "../components/loader/Loader";
const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Blog Category",
    dataIndex: "blog",
    sorter: (a, b) => a.blog.length - b.blog.length,
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];
const BlogCategoryList = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [BlogCategoryId, setBlogCategoryId] = useState("");
  const hideModal = () => {
    setOpen(false);
  };
  const showModal = (id) => {
    setOpen(true);
    setBlogCategoryId(id);
  };

  useEffect(() => {
    dispatch(getBlogCategory());
  }, []);

  const { bCategory, isLoading } = useSelector((state) => state.bCategory);

  const data1 = [];
  if (!isLoading) {
    for (let i = 0; i < bCategory.length; i++) {
      data1.push({
        key: i,
        blog: bCategory[i].title,
        action: (
          <div className="action-menu">
            <Link
              className="fs-2"
              to={`/admin/blog-category/${bCategory[i]._id}`}
            >
              <BiEdit />
            </Link>
            <button
              className="ms-3 fs-2 text-danger bg-transparent border-0"
              onClick={() => showModal(bCategory[i]._id)}
            >
              <AiFillDelete />
            </button>
          </div>
        ),
      });
    }
  }

  const deleteBLogCategoryHandler = async (id) => {
    await dispatch(deleteBlogCategory(id));
    hideModal();
    // Refetch the brand list after deletion
    dispatch(getBlogCategory());
  };
  return (
    <>
      {isLoading && <Loader />}
      <div>
        <h3 className="mb-4 title">Blog Categories</h3>
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>
        <CustomModel
          open={open}
          hideModal={hideModal}
          performAction={() => deleteBLogCategoryHandler(BlogCategoryId)}
          title="Are you sure want to delete this Blog"
        />
      </div>
    </>
  );
};

export default BlogCategoryList;
