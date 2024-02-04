import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../features/order/orderSlice";
import { AiFillDelete, AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import { formatDate } from "../utils/importantFunctions";
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

  if (!isLoading && orders.length !== 0) {
    for (let i = 0; i < orders.length; i++) {
      const inputDateString = orders[i].createdAt;
      const formattedDateString = formatDate(inputDateString);

      data1.push({
        key: sNumber(),
        orderId: `11010${i + 1}`,
        orderDate: formattedDateString,
        customerInfo: orders[i].orderby.firstName + orders[i].orderby.lastName,
        viewOrder: (
          <Link className="" to={`/admin/order/${orders[i]._id}`}>
            Click Here
          </Link>
        ),
        totalAmount: orders[i].paymentIntent.amount,
        orderStatus: (
          <select className="form-control form-select">
            <option defaultChecked>{orders[i].orderStatus}</option>
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
    <div>
      <h3 className="mb-4 title">Orders</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default Orders;
