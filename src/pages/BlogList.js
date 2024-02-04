import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { deleteBlog, getBlogs } from "../features/blogs/blogSlice";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import CustomModel from "../components/CustomModel";
const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Title",
    dataIndex: "title",
    sorter: (a, b) => a.title.length - b.title.length,
  },
  {
    title: "Category",
    dataIndex: "category",
    sorter: (a, b) => a.category.length - b.category.length,
  },
  {
    title: "Auther",
    dataIndex: "auther",
    sorter: (a, b) => a.auther.length - b.auther.length,
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];
const BlogList = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [BlogId, setBlogId] = useState("");
  const hideModal = () => {
    setOpen(false);
  };
  const showModal = (id) => {
    setOpen(true);
    setBlogId(id);
  };

  useEffect(() => {
    dispatch(getBlogs());
  }, []);

  const { blogs, isLoading } = useSelector((state) => state.blog);

  const data1 = [];

  if (!isLoading) {
    for (let i = 0; i < blogs.length; i++) {
      data1.push({
        key: i,
        title: blogs[i].title,
        category: blogs[i].category,
        auther: blogs[i].auther,
        action: (
          <div className="action-menu">
            <Link className="fs-2" to={`/admin/blog/${blogs[i]._id}`}>
              <BiEdit />
            </Link>
            <button
              className="ms-3 fs-2 text-danger bg-transparent border-0"
              onClick={() => showModal(blogs[i]._id)}
            >
              <AiFillDelete />
            </button>
          </div>
        ),
      });
    }
  }
  const deleteBLogHandler = async (id) => {
    await dispatch(deleteBlog(id));
    hideModal();
    // Refetch the brand list after deletion
    dispatch(getBlogs());
  };
  return (
    <div>
      <h3 className="mb-4 title">Blog List</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModel
        open={open}
        hideModal={hideModal}
        performAction={() => deleteBLogHandler(BlogId)}
        title="Are you sure want to delete this Blog"
      />
    </div>
  );
};

export default BlogList;
