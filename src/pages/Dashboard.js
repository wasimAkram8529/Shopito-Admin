import React, { useEffect, useState } from "react";
import { BsArrowDownRight, BsArrowUpRight } from "react-icons/bs";
import { Column } from "@ant-design/plots";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrders,
  getMonthlyIncomeAndCount,
  getYearlyOrderCountAndAmount,
} from "../features/auth/authSlice";
import Loader from "../components/loader/Loader";

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

const Dashboard = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [monthlyIncome, setMonthlyIncome] = useState([]);

  useEffect(() => {
    dispatch(getMonthlyIncomeAndCount());
    dispatch(getYearlyOrderCountAndAmount());
    dispatch(getAllOrders());
  }, []);

  const { orders, monthlyData, yearlyData, isLoading } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    let data1 = [];
    let data2 = [];
    let monthName = [
      "Jan",
      "Feb",
      "March",
      "April",
      "May",
      "June",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    for (let i = 0; i < monthlyData?.length; i++) {
      data1.push({
        type: `${monthName[monthlyData?.[i]?._id?.month]}`,
        sales: `${monthlyData?.[i]?.count}`,
      });
      data2.push({
        type: `${monthName[monthlyData?.[i]?._id?.month]}`,
        income: `${monthlyData?.[i]?.amount}`,
      });
    }
    //console.log(data2);
    setData(data1);
    setMonthlyIncome(data2);
  }, [monthlyData]);

  let data1 = [];
  if (!isLoading && orders?.length !== 0) {
    for (let i = 0; i < orders?.length; i++) {
      data1.push({
        key: i,
        name: `${
          orders?.[i]?.user?.firstName + " " + orders?.[i]?.user?.lastName
        }`,
        product: `${orders?.[i]?.orderItems?.length}`,
        status: `${orders?.[i]?.orderStatus}`,
      });
    }
  }

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
        alias: "Sales",
      },
    },
  };

  const configIncome = {
    data: monthlyIncome,
    xField: "type",
    yField: "income",
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
    <>
      {isLoading && <Loader />}
      <div>
        <h3>Dashboard</h3>
        <div className="product-stats">
          <div>
            <div className="product-stats-card">
              <p className="desc">Total Yearly Income</p>
              <h4 className="sub-title">{`₹${yearlyData?.[0]?.amount}`}</h4>
            </div>
            <div className="" style={{ color: "green" }}>
              <h6>
                <BsArrowUpRight /> 32%
              </h6>
              <p className="desc">
                Compared To April {new Date().getFullYear() - 1}
              </p>
            </div>
          </div>
          <div>
            <div className="product-stats-card">
              <p className="desc">Total Yearly Sales</p>
              <h4 className="sub-title">{`${yearlyData?.[0]?.count}`}</h4>
            </div>
            <div className="text-danger">
              <h6>
                <BsArrowDownRight /> 8%
              </h6>
              <p className="desc">
                Compared To April {new Date().getFullYear() - 1}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <h3 className="mb-4">Order Count Statistics</h3>
          <div>
            <Column {...config} />
          </div>
        </div>
        <div className="mt-4">
          <h3 className="mb-4">Income Statistics</h3>
          <div>
            <Column {...configIncome} />
          </div>
        </div>
        <div className="mt-4">
          <h3 className="mb-4">Recent Orders</h3>
          <div>
            <Table columns={columns} dataSource={data1} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

/* d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3 */
