import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import NotLogin from "../../components/auth/NotLogin";
import { SuccessSellXAU } from "../../components/status/success/SuccessSellXAU";
import { PendingSellXAU } from "../../components/status/pending/PendingSellXAU";

function StatusSellXAU() {
  const { user } = useSelector((state) => state.auth);
  const { state } = useLocation();
  // console.log(state.status);

  return (
    <>
      {user && user.success ? (
        <>
          <div className="flex flex-col justify-center md:items-center md:w-2/4 xl:w-2/6 mx-auto h-screen">
            <div className="flex flex-col items-center px-8 mb-3">{state.status === "success" ? <SuccessSellXAU state={state} status={state.status} /> : <PendingSellXAU state={state} status={state.status} />}</div>
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

export default StatusSellXAU;
