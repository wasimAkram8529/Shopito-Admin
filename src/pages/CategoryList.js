import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getProductsCategory } from "../features/pCategory/pCategorySlice";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Product Category",
    dataIndex: "pCategory",
    sorter: (a, b) => a.pCategory.length - b.pCategory.length,
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];
const CategoryList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductsCategory());
  }, [dispatch]);
  const { pCategory, isLoading } = useSelector((state) => state.pCategory);
  const data1 = [];
  if (!isLoading) {
    for (let i = 0; i < pCategory.length; i++) {
      data1.push({
        key: i,
        pCategory: pCategory[i].title,
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
      <h3 className="mb-4 title">Product Categories</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default CategoryList;
