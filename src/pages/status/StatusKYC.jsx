import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import NotLogin from "../../components/auth/NotLogin";
import { SuccessKYC } from "../../components/status/success/SuccessKYC";
import { PendingKYC } from "../../components/status/pending/PendingKYC";

function StatusKYC() {
  const { user } = useSelector((state) => state.auth);
  const { state } = useLocation();
  // console.log(state.status);

  return (
    <>
      {user && user.success ? (
        <>
          <div className="flex flex-col justify-center md:items-center md:w-2/4 xl:w-2/6 mx-auto h-screen">
            <div className="flex flex-col items-center px-8 mb-3">{state.status === "success" ? <SuccessKYC state={state} status={state.status} /> : <PendingKYC state={state} status={state.status} />}</div>
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

export default StatusKYC;
