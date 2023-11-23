import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BreadcrumbGoBack } from "../../components/breadcrumb/Breadcrumb";
import { register, reset } from "../../features/auth/authSlice";
import Button from "../../components/utilities/button/button";

function Register() {
  const { user, isLoading, isError, isRegisterSuccess, isSuccess, message } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    // fullname: "",
    email: "",
    password: "",
    password_confirm: "",
  });

  const { email, password, password_confirm } = formData;

  const [messageRegister, setMessageRegister] = useState(message);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(reset());
    if (isError) {
      // console.log(message);
      setMessageRegister(message);
    }

    if (isRegisterSuccess) {
      return navigate("/email-verification");
    }
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== password_confirm) {
      console.log("password gak sama", formData);
      setMessageRegister("Password Anda tidak sama.");
    } else {
      const formData = {
        // fullname,
        email,
        password,
        password_confirm,
      };
      console.log(formData);

      dispatch(register(formData));
    }
  };

  return (
    <>
      <div className="absolute top-0 left-0 w-full">
        <BreadcrumbGoBack title={"Register"} />
      </div>
      <div className="flex flex-col justify-center md:items-center md:w-2/4 xl:w-2/6 mx-auto h-screen">
        <div className="flex flex-col items-center px-8 mb-3">
          <h1 className="font-medium text-2xl md:text-3xl mb-2">
            Welcome to <span className="font-semibold text-[#FCCF08]">DBO</span>
          </h1>
          <p>To keep connected with us please login with your personal information by email address and password.</p>
        </div>
        <form onSubmit={onSubmit} className="w-full px-8 pt-6 pb-8 mb-4">
          {/* <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fullname">
              Full Name
            </label>
            <input id="registerFullName" name="fullname" type="text" value={fullname} placeholder="Full Name" onChange={onChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div> */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="registerEmail">
              Email
            </label>
            <input id="registerEmail" name="email" type="text" value={email} placeholder="Email" onChange={onChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="registerPassword">
              Password
            </label>
            <input id="registerPassword" name="password" type="password" value={password} placeholder="Enter your password" onChange={onChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" />
            {/* <p className="text-red-500 text-xs italic">Please choose a password.</p> */}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="registerPasswordConfirm">
              Confirm Password
            </label>
            <input id="registerPasswordConfirm" name="password_confirm" type="password" value={password_confirm} placeholder="Confirm your password" onChange={onChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" />
            {/* <p className="text-red-500 text-xs italic">Please choose a password.</p> */}
            {messageRegister && <div className="mt-1 text-sm text-red-500">{messageRegister}</div>}
          </div>
          <div className="flex flex-col items-center justify-between">
            <Button width={"full"} type={"submit"}>
              Create Account
            </Button>

            <p className="mt-3">
              Already have an account?
              <Link to={"/login"}>
                <span className="inline-block align-baseline font-bold text-black hover:text-blue-800 ml-1" href="#">
                  Login
                </span>
              </Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}

export default Register;
