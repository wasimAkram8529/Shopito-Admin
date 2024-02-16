import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../features/customers/customerSlice";
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
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Mobile",
    dataIndex: "mobile",
  },
];

const Customers = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);
  const { customers, isLoading } = useSelector((state) => state.customer);
  const data1 = [];
  if (!isLoading) {
    for (let i = 0; i < customers.length; i++) {
      data1.push({
        key: i,
        name: customers[i].firstName
          ? customers[i].firstName + " " + customers[i].lastName
          : "Puneeth Sharma",
        email: customers[i].email,
        mobile: customers[i].mobile ? customers[i].mobile : "7979700554",
      });
    }
  }
  return (
    <>
      {isLoading && <Loader />}
      <div>
        <h3 className="mb-4 title">Customers</h3>
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>
      </div>
    </>
  );
};

export default Customers;
