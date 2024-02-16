import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProductsCategory,
  getProductsCategory,
} from "../features/pCategory/pCategorySlice";
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
  const [open, setOpen] = useState(false);
  const [productId, setProductId] = useState("");
  const hideModal = () => {
    setOpen(false);
  };
  const showModal = (id) => {
    setOpen(true);
    setProductId(id);
  };

  useEffect(() => {
    dispatch(getProductsCategory());
  }, []);

  const { pCategory, isLoading } = useSelector((state) => state.pCategory);

  const data1 = [];

  if (!isLoading) {
    for (let i = 0; i < pCategory.length; i++) {
      data1.push({
        key: i,
        pCategory: pCategory[i].title,
        action: (
          <div className="action-menu">
            <Link className="fs-2" to={`/admin/category/${pCategory[i]._id}`}>
              <BiEdit />
            </Link>
            <button
              className="ms-3 fs-2 text-danger bg-transparent border-0"
              onClick={() => showModal(pCategory[i]._id)}
            >
              <AiFillDelete />
            </button>
          </div>
        ),
      });
    }
  }
  const deleteProductCategoryHandler = async (id) => {
    await dispatch(deleteProductsCategory(id));
    hideModal();
    // Refetch the brand list after deletion
    dispatch(getProductsCategory());
  };

  return (
    <>
      {isLoading && <Loader />}
      <div>
        <h3 className="mb-4 title">Product Categories</h3>
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>
        <CustomModel
          open={open}
          hideModal={hideModal}
          performAction={() => deleteProductCategoryHandler(productId)}
          title="Are you sure want to delete this Product Category"
        />
      </div>
    </>
  );
};

export default CategoryList;
