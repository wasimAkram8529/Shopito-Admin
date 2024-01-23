import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../features/order/orderSlice";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
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
    title: "Product Title",
    dataIndex: "productTitle",
  },
  {
    title: "Product Brand",
    dataIndex: "productBrand",
  },
  {
    title: "Product Count",
    dataIndex: "productCount",
  },
  {
    title: "Product Color",
    dataIndex: "productColor",
  },
  {
    title: "Total Amount",
    dataIndex: "totalAmount",
  },
  {
    title: "Order Status",
    dataIndex: "orderStatus",
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
  if (!isLoading) {
    for (let i = 0; i < orders.length; i++) {
      let product = orders[i].products;
      for (let j = 0; j < product.length; j++) {
        const inputDateString = orders[i].createdAt;
        const dateObject = new Date(inputDateString);
        const day = dateObject.getDate().toString().padStart(2, "0");
        const month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
        const year = dateObject.getFullYear();
        const formattedDateString = `${day}-${month}-${year}`;

        data1.push({
          key: sNumber(),
          orderId: `11010${j + 1}`,
          orderDate: formattedDateString,
          productTitle: product[j].product.title,
          productBrand: product[j].product.brand,
          productCount: product[j].count,
          productColor: product[j].color,
          customerInfo:
            orders[i].orderby.firstName + " " + orders[i].orderby.lastName,
          totalAmount: product[j].product.price,
          orderStatus: (
            <select className="form-control form-select">
              <option>Select Status</option>
              <option>Processing</option>
              <option>Packed</option>
            </select>
          ),
          action: (
            <>
              <Link className="ms-3 fs-2 text-danger" to="/">
                <AiFillDelete />
              </Link>
            </>
          ),
        });
      }
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
