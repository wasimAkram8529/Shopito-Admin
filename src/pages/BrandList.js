import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { deleteBrand, getbrands } from "../features/brand/brandSlice";
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
    title: "Brand",
    dataIndex: "brand",
    sorter: (a, b) => a.brand.length - b.brand.length,
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const BrandList = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [brandId, setBrandId] = useState("");
  const hideModal = () => {
    setOpen(false);
  };
  const showModal = (id) => {
    setOpen(true);
    setBrandId(id);
  };
  useEffect(() => {
    dispatch(getbrands());
  }, []);

  const { brands, isLoading } = useSelector((state) => state.brand);

  const data1 = [];

  if (!isLoading) {
    for (let i = 0; i < brands.length; i++) {
      data1.push({
        key: i,
        brand: brands[i].title,
        action: (
          <div className="action-menu">
            <Link
              className="fs-2"
              to={`/admin/brand/update-brand/${brands[i]._id}`}
            >
              <BiEdit />
            </Link>
            <button
              className="ms-3 fs-2 text-danger bg-transparent border-0"
              onClick={() => showModal(brands[i]._id)}
            >
              <AiFillDelete />
            </button>
          </div>
        ),
      });
    }
  }
  const deleteBrandHandler = async (id) => {
    await dispatch(deleteBrand(id));
    hideModal();
    // Refetch the brand list after deletion
    dispatch(getbrands());
  };

  return (
    <>
      {isLoading && <Loader />}
      <div>
        <h3 className="mb-4 title">Brand List</h3>
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>
        <CustomModel
          open={open}
          hideModal={hideModal}
          performAction={() => deleteBrandHandler(brandId)}
          title="Are you sure want to delete this brand"
        />
      </div>
    </>
  );
};

export default BrandList;
