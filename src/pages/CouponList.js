import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { deleteCoupon, getCoupon } from "../features/coupon/couponSlice";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import CustomModel from "../components/CustomModel";
import { formatDate } from "../utils/importantFunctions";
const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Coupon",
    dataIndex: "coupon",
    sorter: (a, b) => a.coupon.length - b.coupon.length,
  },
  {
    title: "Discount",
    dataIndex: "discount",
  },
  {
    title: "Expiry Date",
    dataIndex: "expiryDate",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const CouponList = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [couponId, setCouponId] = useState("");
  const hideModal = () => {
    setOpen(false);
  };
  const showModal = (id) => {
    setOpen(true);
    setCouponId(id);
  };

  useEffect(() => {
    dispatch(getCoupon());
  }, []);

  const { coupons, isLoading } = useSelector((state) => state.coupon);

  const data1 = [];

  if (!isLoading) {
    for (let i = 0; i < coupons.length; i++) {
      data1.push({
        key: i,
        coupon: coupons[i].name,
        expiryDate: formatDate(coupons[i].expiry),
        discount: `${coupons[i].discount + `%`}`,
        action: (
          <div className="action-menu">
            <Link className="fs-2" to={`/admin/coupon/${coupons[i]._id}`}>
              <BiEdit />
            </Link>
            <button
              className="ms-3 fs-2 text-danger bg-transparent border-0"
              onClick={() => showModal(coupons[i]._id)}
            >
              <AiFillDelete />
            </button>
          </div>
        ),
      });
    }
  }

  const deleteCouponHandler = async (id) => {
    await dispatch(deleteCoupon(id));
    hideModal();
    // Refetch the brand list after deletion
    dispatch(getCoupon());
  };

  return (
    <div>
      <h3 className="mb-4 title">coupon List</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModel
        open={open}
        hideModal={hideModal}
        performAction={() => deleteCouponHandler(couponId)}
        title="Are you sure want to delete this Coupon"
      />
    </div>
  );
};

export default CouponList;
