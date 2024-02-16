import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getOrders, updateOrderStatus } from "../features/order/orderSlice";
import { AiFillDelete, AiOutlineEye } from "react-icons/ai";
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
  {
    title: "View Order",
    dataIndex: "viewOrder",
  },
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
        viewOrder: (
          <Link className="" to={`/admin/order/${orders?.[i]?._id}`}>
            Click Here
          </Link>
        ),
        totalAmount: orders?.[i]?.totalPrice,
        orderStatus: (
          <select
            className="form-control form-select"
            onClick={(e) => {
              handleStatus(e, orders?.[i]?._id, orders?.[i]?.orderStatus);
            }}
          >
            <option defaultChecked>{orders?.[i]?.orderStatus}</option>
            <option value="Not Processed">Not Processed</option>
            <option value="Processing">Processing</option>
            <option value="Dispatched">Dispatched</option>
            <option value="Cancelled">Cancelled</option>
            <option value="Delivered">Delivered</option>
          </select>
        ),
        action: (
          <div className="action-menu">
            <Link className="ms-3 fs-2 text-danger" to="/">
              <AiOutlineEye className="fs-5" />
            </Link>
            <Link className="ms-3 fs-2 text-danger" to="/">
              <AiFillDelete className="fs-5" />
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
