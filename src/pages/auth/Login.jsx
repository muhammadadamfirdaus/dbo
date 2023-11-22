import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BreadcrumbGoBack } from "../../components/breadcrumb/Breadcrumb";
import { login, reset } from "../../features/auth/authSlice";
import Button from "../../components/utilities/button/button";

function Login() {
  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const [messageLogin, setMessageLogin] = useState(message);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      console.log(message);
      setMessageLogin(message);
    }

    if (isSuccess) {
      navigate("/dashboard");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      // fullname,
      email,
      password,
    };

    dispatch(login(userData));
  };

  return (
    <>
      <div className="absolute top-0 left-0 w-full">
        <BreadcrumbGoBack title={"Login"} />
      </div>
      <div className="flex flex-col justify-center md:items-center md:w-2/4 xl:w-2/6 mx-auto h-screen">
        <div className="flex flex-col items-center px-8 mb-3">
          <h1 className="font-medium text-2xl md:text-3xl mb-2">
            Welcome to <span className="font-semibold text-[#FCCF08]">Xaurius</span>
          </h1>
          <p>To keep connected with us please login with your personal information by email address and password.</p>
        </div>
        <form onSubmit={onSubmit} className="w-full px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="loginEmail">
              Email
            </label>
            <input id="loginEmail" name="email" type="text" value={email} placeholder="Email" onChange={onChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="loginPassword">
              Password
            </label>
            <input id="loginPassword" name="password" type="password" value={password} placeholder="Enter your password" onChange={onChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" />
            {/* <p className="text-red-500 text-xs italic">Please choose a password.</p> */}
            {messageLogin && <div className="mt-1 text-sm text-red-500">{messageLogin}</div>}
          </div>
          <div className="flex flex-col items-center justify-between">
            <Button width={"full"} type={"submit"}>
              Login
            </Button>
            <p className="mt-3">
              Don't have an account?
              <Link to={"/register"}>
                <span className="inline-block align-baseline font-bold text-black hover:text-blue-800 ml-1" href="#">
                  Register
                </span>
              </Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
