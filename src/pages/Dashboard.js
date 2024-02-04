import React from "react";
import { BsArrowDownRight } from "react-icons/bs";
import { Column } from "@ant-design/plots";
import { Table } from "antd";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Product",
    dataIndex: "product",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
];

const data1 = [];
for (let i = 0; i < 46; i++) {
  data1.push({
    key: i,
    name: `Edward King ${i}`,
    product: 32,
    status: `London, Park Lane no. ${i}`,
  });
}

const Dashboard = () => {
  const data = [
    {
      type: "Jan",
      sales: 38,
    },
    {
      type: "Feb",
      sales: 52,
    },
    {
      type: "March",
      sales: 61,
    },
    {
      type: "April",
      sales: 145,
    },
    {
      type: "May",
      sales: 48,
    },
    {
      type: "June",
      sales: 38,
    },
    {
      type: "July",
      sales: 38,
    },
    {
      type: "Aug",
      sales: 38,
    },
    {
      type: "Sep",
      sales: 43,
    },
    {
      type: "Oct",
      sales: 32,
    },
    {
      type: "Nov",
      sales: 34,
    },
    {
      type: "Dec",
      sales: 48,
    },
  ];

  const config = {
    data,
    xField: "type",
    yField: "sales",
    color: "#ffd333",
    label: {
      position: "top",
      style: {
        fill: "#FFFFFF",
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "Month",
      },
      sales: {
        alias: "Income",
      },
    },
  };

  return (
    <div>
      <h3>Dashboard</h3>
      <div className="product-stats">
        <div className="">
          <div>
            <p className="desc">Total</p>
            <h4 className="sub-title">$1100</h4>
          </div>
          <div className="">
            <h6>
              <BsArrowDownRight /> 32%
            </h6>
            <p className="desc">Compared To April 2023</p>
          </div>
        </div>
        <div className="">
          <div>
            <p className="desc">Total</p>
            <h4 className="sub-title">$1100</h4>
          </div>
          <div className="">
            <h6 className="red">
              <BsArrowDownRight /> 32%
            </h6>
            <p className="desc">Compared To April 2023</p>
          </div>
        </div>
        <div className="">
          <div>
            <p className="desc">Total</p>
            <h4 className="sub-title">$1100</h4>
          </div>
          <div className="">
            <h6 className="green">
              <BsArrowDownRight /> 32%
            </h6>
            <p className="desc">Compared To April 2023</p>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="mb-4">Income Statistics</h3>
        <div>
          <Column {...config} />
        </div>
      </div>
      <div className="mt-4">
        <h3 className="mb-4">Recent Orders</h3>
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

/* d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3 */
