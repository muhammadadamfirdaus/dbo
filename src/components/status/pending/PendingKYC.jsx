import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { HiChevronLeft } from "react-icons/hi2";

export const PendingKYC = ({ status }) => {
  const { user, createKYC, isLoading, isError, isSuccess, message } = useSelector((state) => state.kyc);
  console.log(createKYC);
  const navigate = useNavigate();

  const [messageKYC, setMessageKYC] = useState(message);

  return (
    <>
      <div className="flex flex-col items-center p-4 mb-4">
        <h1 className="text-xl font-semibold ml-4">KYC Anda sedang dalam review.</h1>
        <span>{messageKYC}</span>
        <Link to={"/dashboard"}>
          <span className="font-semibold">Kembali ke Home</span>
        </Link>
      </div>
    </>
  );
};
