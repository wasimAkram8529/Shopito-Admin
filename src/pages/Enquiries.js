import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getEnquiries } from "../features/enquiry/enquirySlice";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
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
  {
    title: "Comment",
    dataIndex: "comment",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
];

const Enquiries = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getEnquiries());
  }, [dispatch]);
  const { enquiries, isLoading } = useSelector((state) => state.enquiry);
  const data1 = [];
  if (!isLoading) {
    for (let i = 0; i < enquiries.length; i++) {
      data1.push({
        key: i,
        name: enquiries[i].name,
        comment: enquiries[i].comment,
        email: enquiries[i].email,
        mobile: enquiries[i].mobile,
        status: (
          <select className="form-control form-select">
            <option>Select Status</option>
            <option>Pending</option>
            <option>Resolved</option>
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
  return (
    <div>
      <h3 className="mb-4 title">Enquiries</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default Enquiries;
