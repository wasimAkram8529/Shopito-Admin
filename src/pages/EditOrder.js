import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AiFillDelete, AiOutlineEye } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import { formatDate } from "../utils/importantFunctions";
import { getAOrder } from "../features/auth/authSlice";
import Loader from "../components/loader/Loader";
import { updateOrderStatus } from "../features/order/orderSlice";
const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Order Category",
    dataIndex: "orderCategory",
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
  // {
  //   title: "Action",
  //   dataIndex: "action",
  // },
];

const ViewOrder = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const getOrderId = location.pathname.split("/")[3];

  useEffect(() => {
    dispatch(getAOrder(getOrderId));
  }, [getOrderId]);

  const handleStatus = (e, id, defaultValue) => {
    if (e.target.value !== defaultValue) {
      const payload = {
        id,
        status: e.target.value,
      };
      // console.log("payload", payload);
      dispatch(updateOrderStatus(payload));
    }
  };

  // const { userOrders, isLoading } = useSelector((state) => state.auth);
  const { userOrders, isLoading } = useSelector((state) => state.auth);
  // console.log("order", userOrders);
  // console.log(userOrders);

  let count = 0;
  let sNumber = function increment() {
    return ++count;
  };
  const data1 = [];
  if (!isLoading && userOrders?.[0]?.orderItems?.length !== 0) {
    for (let i = 0; i < userOrders?.[0]?.orderItems?.length; i++) {
      const product = userOrders?.[0]?.orderItems[i];
      data1.push({
        key: sNumber(),
        orderCategory: product?.product?.category,
        viewOrder: (
          <Link className="" to={`/admin/view-order/${userOrders?.[0]?._id}`}>
            Click Here
          </Link>
        ),
        totalAmount: `₹${userOrders?.[0]?.totalPrice}`,
        orderStatus: (
          <select
            className="form-control form-select"
            onClick={(e) => {
              handleStatus(e, getOrderId, userOrders?.[0]?.orderStatus);
            }}
          >
            <option defaultChecked>{userOrders?.[0]?.orderStatus}</option>
            <option value="Not Processed">Not Processed</option>
            <option value="Processing">Processing</option>
            <option value="Dispatched">Dispatched</option>
            <option value="Cancelled">Cancelled</option>
            <option value="Delivered">Delivered</option>
          </select>
        ),
        // action: (
        //   <div className="action-menu">
        //     {/* <Link className="ms-3 fs-2 text-danger" to="/">
        //       <AiOutlineEye className="fs-5" />
        //     </Link> */}
        //     <Link className="ms-3 fs-2 text-danger" to="/">
        //       <AiFillDelete className="fs-5" />
        //     </Link>
        //   </div>
        // ),
      });
    }
  }
  return (
    <>
      {isLoading && <Loader />}
      <div>
        <h3 className="mb-4 title">View Order</h3>
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>
      </div>
    </>
  );
};

export default ViewOrder;
