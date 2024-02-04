import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getAEnquiry, upadteEnquiry } from "../features/enquiry/enquirySlice";
import { BiArrowBack } from "react-icons/bi";

const ViewEnquiry = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const getEnquiryId = location.pathname.split("/")[3];

  useEffect(() => {
    dispatch(getAEnquiry(getEnquiryId));
  }, [getEnquiryId]);

  const { enquiries } = useSelector((state) => state.enquiry);

  const goBack = () => {
    navigate(-1);
  };

  const [selectedOption, setSelectedOption] = useState("");

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = () => {
    const data = { id: getEnquiryId, data: { status: selectedOption } };
    dispatch(upadteEnquiry(data));
    setTimeout(() => {
      navigate("/admin/enquiries");
    }, 3000);
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h3 className="mb-4 title"> View Enquiry</h3>
        <button
          className="transparent border-0 fs-5 mb-0"
          onClick={() => {
            goBack();
          }}
        >
          <BiArrowBack className="fs-5" /> Go Back
        </button>
      </div>
      <div className="mt-5 bg-white p-4 rounded d-flex gap-3 flex-column">
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Name: </h6>
          <p className="mb-0">{enquiries.name}</p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Mobile Number: </h6>
          <p className="mb-0">
            <a
              style={{ textDecoration: "none", color: "black" }}
              href={`tel:+91${enquiries.mobile}`}
            >
              {enquiries.mobile}
            </a>
          </p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Email: </h6>
          <p className="mb-0">
            <a
              style={{ textDecoration: "none", color: "black" }}
              href={`mailto:${enquiries.email}`}
            >
              {enquiries.email}
            </a>
          </p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Comment: </h6>
          <p className="mb-0">{enquiries.comment}</p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Status: </h6>
          <p className="mb-0">{enquiries.status}</p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Change Status: </h6>
          <div>
            <select
              name=""
              className="form-control form-select"
              id=""
              onChange={handleSelectChange}
            >
              <option value="" defaultChecked>
                {enquiries.status}
              </option>
              <option value="Created">Created</option>
              <option value="Contacted">Contacted</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
        </div>
        <button
          className="btn btn-success border-0 rounded-3"
          onClick={() => handleSubmit()}
        >
          Update Enquiry
        </button>
      </div>
    </div>
  );
};

export default ViewEnquiry;
