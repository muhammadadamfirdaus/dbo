import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import imageEmailVerification from "../../assets/images/auth/email-verification.png";
import { register, emailVerification, reset } from "../../features/auth/authSlice";
import Button from "../../components/utilities/button/button";

function VerifyEmail() {
  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);
  // console.log(user);
  // const [userEmail] = useState(user.email);
  const [formData, setFormData] = useState({
    // email: userEmail,
    code: "",
  });

  const { code } = formData;

  const [messageVerificationCode, setMessageVerificationCode] = useState(message);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  // console.log(location.pathname);

  useEffect(() => {
    // console.log(message);
    if (isError) {
      // console.log(message);
      setMessageVerificationCode(message);
      // navigate("/login");
    }

    if (isSuccess && message === "Selamat, Anda berhasil mendaftar.") {
      navigate("/auth-success");
    }

    // dispatch(reset());
  }, [isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

    // potong jika lebih dari atribut maxLength
    if (e.target.value.length > e.target.maxLength) {
      e.target.value = e.target.value.slice(0, e.target.maxLength);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const codeVerification = {
      // fullname,
      // email,
      code,
    };

    // console.log(codeVerification);
    dispatch(emailVerification(codeVerification));
  };

  // console.log(isError);

  return (
    <>
      <div className="flex flex-col justify-center md:items-center md:w-4/6 xl:w-2/6 mx-auto h-screen">
        <div className="flex flex-col items-center px-8 mb-3">
          <img src={imageEmailVerification} alt="email verification" />
          <h1 className="font-medium text-xl md:text-2xl lg:text-4xl mb-2">Periksa Email Anda</h1>
          <p>{user && user.msg}</p>
          {/* <p>{user.email}</p> */}
        </div>
        <form onSubmit={onSubmit} className="w-full px-8 pt-6 pb-8 mb-4">
          <div className="flex justify-center mx-2 mb-4">
            <input id="codeVerification" name="code" type="number" value={code} placeholder="00000" onChange={onChange} maxLength="5" className="appearance-none border-0 border-b-2 max-w-[200px] tracking-[1rem] text-2xl text-center py-2 px-3 text-gray-700 leading-tight focus:outline-none outline-0 focus:border-t-0 focus:border-r-0 focus:border-l-0 focus:ring-0" />
          </div>
          {/* <div className="mb-4">{isError && <div className="mt-1 text-sm text-red-500">{messageVerificationCode}</div>}</div> */}
          <div className="flex flex-col items-center justify-between">
            <Button width={"full"} type={"submit"}>
              Verifikasi
            </Button>
            {/* <p>
              Belum menerima link verifikasi?
              <Link to={"/register"}>
                <span className="inline-block align-baseline font-bold text-black hover:text-blue-800 ml-1" href="#">
                  Kirim Ulang
                </span>
              </Link>
            </p> */}
          </div>
        </form>
      </div>
    </>
  );
}

export default VerifyEmail;
