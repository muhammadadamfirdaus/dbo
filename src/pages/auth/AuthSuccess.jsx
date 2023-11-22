import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import imageKYCAlert from "../../assets/images/auth/kyc-alert.png";
import Button from "../../components/utilities/button/button";

function AuthSuccess() {
  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);
  console.log(user);

  const [messageAuth, setMessageAuth] = useState(message);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setMessageAuth(message);

    // dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  return (
    <>
      <div className="flex flex-col justify-center md:items-center md:w-2/4 xl:w-2/6 mx-auto h-screen">
        <div className="flex flex-col items-center px-8 mb-3">
          <img src={imageKYCAlert} alt="KYC" />
          <h1 className="mb-4">{messageAuth && messageAuth}</h1>
          <Link to={"/kyc"}>
            <Button width={"full"}>Lengkapi KYC</Button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default AuthSuccess;
