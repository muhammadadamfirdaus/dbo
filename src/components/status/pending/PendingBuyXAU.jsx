import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiChevronLeft } from "react-icons/hi2";

export const PendingBuyXAU = ({ status }) => {
  // console.log(status);
  const navigate = useNavigate();
  return (
    <>
      <div className="flex flex-col items-center p-4 mb-4">
        <h1 className="text-xl font-semibold ml-4">Pembelian Sedang Diproses</h1>
        <span>Pembelianmu akan diproses dalam waktu 3 jam.</span>
        <Link to={"/history"}>
          <span className="font-semibold">Cek Status Pembelian</span>
        </Link>
      </div>
    </>
  );
};
