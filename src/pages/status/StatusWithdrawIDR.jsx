import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import NotLogin from "../../components/auth/NotLogin";
import { SuccessWithdrawIDR } from "../../components/status/success/SuccessWithdrawIDR";
import { PendingWithdrawIDR } from "../../components/status/pending/PendingWithdrawIDR";

function StatusWithdrawIDR() {
  const { user } = useSelector((state) => state.auth);
  const { state } = useLocation();
  // console.log(state.status);

  return (
    <>
      {user && user.success ? (
        <>
          <div className="flex flex-col justify-center md:items-center md:w-2/4 xl:w-2/6 mx-auto h-screen">
            <div className="flex flex-col items-center px-8 mb-3">{state.status === "success" ? <SuccessWithdrawIDR state={state} status={state.status} /> : <PendingWithdrawIDR state={state} status={state.status} />}</div>
          </div>
        </>
      ) : (
        <>
          <NotLogin />
        </>
      )}
    </>
  );
}

export default StatusWithdrawIDR;
