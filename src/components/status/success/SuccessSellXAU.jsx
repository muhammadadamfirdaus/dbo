import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiChevronLeft } from "react-icons/hi2";

export const SuccessSellXAU = ({ state, status }) => {
  // console.log(state, status);
  const navigate = useNavigate();

  return (
    <>
      <div className="flex flex-col items-center p-4 mb-4">
        <h1 className="text-xl font-semibold ml-4">Penjualan XAU Berhasil</h1>
        <span>Baru saja kamu melakukan penjualan sebesar {state ? state.formData.amount_xau : null} XAU.</span>
        <Link to={"/history"}>
          <span className="font-semibold">Cek Status Pembelian</span>
        </Link>
      </div>
    </>
  );
};
