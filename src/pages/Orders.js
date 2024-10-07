import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getOrders, updateOrderStatus } from "../features/order/orderSlice";
import { AiTwotoneEdit, AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import { formatDate } from "../utils/importantFunctions";
import Loader from "../components/loader/Loader";
const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Order ID",
    dataIndex: "orderId",
  },
  {
    title: "Order Date",
    dataIndex: "orderDate",
  },
  {
    title: "Customer Info",
    dataIndex: "customerInfo",
  },
  // {
  //   title: "View Order",
  //   dataIndex: "viewOrder",
  // },
  {
    title: "Total Amount",
    dataIndex: "totalAmount",
  },
  {
    title: "Order Status",
    dataIndex: "orderStatus",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Orders = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  const { orders, isLoading } = useSelector((state) => state.order);
  let count = 0;
  let sNumber = function increment() {
    return ++count;
  };
  const data1 = [];

  //console.log(orders);

  const handleStatus = (e, id, defaultValue) => {
    if (e.target.value !== defaultValue) {
      const payload = {
        id,
        status: e.target.value,
      };
      dispatch(updateOrderStatus(payload));
    }
  };

  if (!isLoading && orders?.length !== 0) {
    for (let i = 0; i < orders?.length; i++) {
      const inputDateString = orders?.[i]?.createdAt;
      const formattedDateString = formatDate(inputDateString);

      data1.push({
        key: sNumber(),
        orderId: orders?.[i]?.paymentInfo?.razorpayOrderId,
        orderDate: formattedDateString,
        customerInfo:
          orders?.[i]?.user?.firstName + orders?.[i]?.user?.lastName,
        // viewOrder: (
        //   <Link className="" to={`/admin/order/${orders?.[i]?._id}`}>
        //     Click Here
        //   </Link>
        // ),
        totalAmount: `₹${orders?.[i]?.totalPrice}`,
        orderStatus: <p>{orders?.[i]?.orderStatus}</p>,
        action: (
          <div className="action-menu">
            <Link
              className="ms-3 fs-2 text-danger"
              to={`/admin/view-order/${orders?.[i]?._id}`}
            >
              <AiOutlineEye className="fs-5" />
            </Link>
            <Link
              className="ms-3 fs-2 text-danger"
              to={`/admin/edit-order/${orders?.[i]?._id}`}
            >
              <AiTwotoneEdit className="fs-5" />
            </Link>
          </div>
        ),
      });
    }
  }
  return (
    <>
      {isLoading && <Loader />}
      <div>
        <h3 className="mb-4 title">Orders</h3>
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>
      </div>
    </>
  );
};

export default Orders;
