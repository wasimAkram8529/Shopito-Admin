import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getBlogs } from "../features/blogs/blogSlice";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
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
  useEffect(() => {
    dispatch(getBlogs());
  }, [dispatch]);
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
          <>
            <Link className="fs-2" to="/">
              <BiEdit />
            </Link>
            <Link className="ms-3 fs-2 text-danger" to="/">
              <AiFillDelete />
            </Link>
          </>
        ),
      });
    }
  }
  return (
    <div>
      <h3 className="mb-4 title">Blog List</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default BlogList;
