import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getBlogCategory } from "../features/blogs/blogSlice";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
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
  useEffect(() => {
    dispatch(getBlogCategory());
  }, [dispatch]);
  const { blogs, isLoading } = useSelector((state) => state.blog);
  const data1 = [];
  if (!isLoading) {
    for (let i = 0; i < blogs.length; i++) {
      data1.push({
        key: i,
        blog: blogs[i].title,
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
      <h3 className="mb-4 title">Blog Categories</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default BlogCategoryList;
