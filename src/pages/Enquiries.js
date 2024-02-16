import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { deleteEnquiry, getEnquiries } from "../features/enquiry/enquirySlice";
import { AiFillDelete, AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import CustomModel from "../components/CustomModel";
import Loader from "../components/loader/Loader";
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
    title: "Status",
    dataIndex: "status",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Enquiries = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [enquiryId, setEnquiryId] = useState("");

  const hideModal = () => {
    setOpen(false);
  };
  const showModal = (id) => {
    setOpen(true);
    setEnquiryId(id);
  };

  useEffect(() => {
    dispatch(getEnquiries());
  }, []);

  const { enquiries, isLoading } = useSelector((state) => state.enquiry);

  const data1 = [];

  if (!isLoading) {
    for (let i = 0; i < enquiries.length; i++) {
      data1.push({
        key: i,
        name: enquiries[i].name,
        email: enquiries[i].email,
        mobile: enquiries[i].mobile,
        status: enquiries[i].status,
        action: (
          <div className="action-menu">
            <Link
              className="ms-3 fs-2 text-danger"
              to={`/admin/enquiries/${enquiries[i]._id}`}
            >
              <AiOutlineEye />
            </Link>
            <button
              className="ms-3 fs-2 text-danger bg-transparent border-0"
              onClick={() => showModal(enquiries[i]._id)}
            >
              <AiFillDelete />
            </button>
          </div>
        ),
      });
    }
  }

  const deleteEnquiryHandler = async (id) => {
    await dispatch(deleteEnquiry(id));
    hideModal();
    // Refetch the brand list after deletion
    dispatch(getEnquiries());
  };
  return (
    <>
      {isLoading && <Loader />}
      <div>
        <h3 className="mb-4 title">Enquiries</h3>
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>
        <CustomModel
          open={open}
          hideModal={hideModal}
          performAction={() => deleteEnquiryHandler(enquiryId)}
          title="Are you sure want to delete this Enquiry"
        />
      </div>
    </>
  );
};

export default Enquiries;
