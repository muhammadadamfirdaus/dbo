import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiChevronLeft } from "react-icons/hi2";
import { useSelector } from "react-redux";

export const PendingWithdrawIDR = ({ status }) => {
  const withdrawIDR = useSelector((state) => state.withdrawIDR);
  // console.log(status);
  const navigate = useNavigate();
  return (
    <>
      <div className="flex flex-col items-center p-4 mb-4">
        <h1 className="text-xl font-semibold ml-4">Penarikan Anda Sedang Diproses</h1>
        <span>Penarikanmu akan diproses dalam waktu 3 jam.</span>
        <Link to={"/history"}>
          <span className="font-semibold">Cek Status Penarikan</span>
        </Link>
      </div>
    </>
  );
};
