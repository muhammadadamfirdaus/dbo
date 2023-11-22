import React from "react";
import { Link, useNavigate } from "react-router-dom";

function NotLogin() {
  return (
    <>
      <div className="flex flex-col justify-center md:items-center md:w-2/4 xl:w-2/6 mx-auto h-screen">
        <div className="flex flex-col items-center px-8 mb-3">
          <h1 className="font-medium text-2xl md:text-3xl mb-2">
            Welcome to <span className="font-semibold text-[#FCCF08]">Xaurius</span>
          </h1>
          <p>
            Anda belum login. <Link to={"/login"}>Login di sini</Link>.
          </p>
        </div>
      </div>
    </>
  );
}

export default NotLogin;
