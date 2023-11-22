import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { HiChevronRight } from "react-icons/hi2";
import Nav from "../../components/Nav";
import NotLogin from "../../components/auth/NotLogin";
import { BreadcrumbGoBack } from "../../components/breadcrumb/Breadcrumb";
import { logout, reset } from "../../features/auth/authSlice";
import { getProfile } from "../../features/profile/profileSlice";

function Profile() {
  const { user } = useSelector((state) => state.auth);
  const { profile, isLoading, isSuccess } = useSelector((state) => state.profile);
  // console.log(user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  const userProfilePic = profile.data && profile.data.image_url;
  const userFullName = profile.data && profile.data.full_name;
  const userEmail = user && user.email;

  return (
    <>
      {user ? (
        <>
          <Nav />
          <div className="md:pl-[30vw] xl:pl-[20vw]">
            <BreadcrumbGoBack title={"Profile"} />
            <div className="px-6 pb-32">
              <div className="md:px-8 my-8 flex flex-col flex-wrap h-[80px]">
                {/* <img className="w-[80px] h-[80px] border border-radius rounded-[50%] bg-black grow-3 shrink-0 basis-full" src="/images/profile.jpg" /> */}
                <img className="w-[80px] h-[80px] border border-radius rounded-[50%] bg-black grow-3 shrink-0 basis-full" src={userProfilePic} />
                {/* <span className="basis-[33.33%] shrink-0">ID</span> */}
                <span className="basis-[33.33%] shrink-0 font-semibold">{userFullName && userFullName.length > 15 ? userFullName.slice(0, 15) + " ..." : userFullName}</span>
                <span className="basis-[33.33%] shrink-0">{userEmail && userEmail.length > 15 ? userEmail.slice(0, 15) + " ..." : userEmail}</span>
              </div>
              <div className="md:px-8">
                <div className="mt-4 title">
                  <h3 className="text-base text-gray-400">Akun</h3>
                </div>
                <div className="py-2 flex justify-between items-center border-b border-gray-100">
                  <Link to={"/profile-edit"}>
                    <span className="font-semibold">Edit Profile</span>
                  </Link>
                  <Link to={"/profile-edit"}>
                    <HiChevronRight />
                  </Link>
                </div>
                <div className="py-2 flex justify-between items-center border-b border-gray-100">
                  <Link to={"/"}>
                    <span className="font-semibold">KYC</span>
                  </Link>
                  <Link to={"/"}>
                    <HiChevronRight />
                  </Link>
                </div>
                <div className="mt-4 title">
                  <h3 className="text-base text-gray-400">Keamanan</h3>
                </div>
                <div className="py-2 flex justify-between items-center border-b border-gray-100">
                  <Link to={"/"}>
                    <span className="font-semibold">Kata Sandi Masuk</span>
                  </Link>
                  <Link to={"/"}>
                    <HiChevronRight />
                  </Link>
                </div>
                <div className="mt-4 title">
                  <h3 className="text-base text-gray-400">Preferensi</h3>
                </div>
                <div className="py-2 flex justify-between items-center border-b border-gray-100">
                  <Link to={"/"}>
                    <span className="font-semibold">Tema</span>
                  </Link>
                  <Link to={"/"}>
                    <HiChevronRight />
                  </Link>
                </div>
                <div className="py-2 flex justify-between items-center border-b border-gray-100">
                  <Link to={"/"}>
                    <span className="font-semibold">Bahasa</span>
                  </Link>
                  <Link to={"/"}>
                    <HiChevronRight />
                  </Link>
                </div>
                <div className="mt-4 title">
                  <h3 className="text-base text-gray-400">App</h3>
                </div>
                <div className="py-2 flex justify-between items-center border-b border-gray-100">
                  <Link to={"/"}>
                    <span className="font-semibold">Terms & Condition</span>
                  </Link>
                  <Link to={"/"}>
                    <HiChevronRight />
                  </Link>
                </div>
                <div className="py-2 flex justify-between items-center border-b border-gray-100">
                  <Link to={"/"}>
                    <span className="font-semibold">Privacy Policy</span>
                  </Link>
                  <Link to={"/"}>
                    <HiChevronRight />
                  </Link>
                </div>
                <div className="py-2 flex justify-between items-center border-b border-gray-100">
                  <button onClick={onLogout}>
                    <span className="font-semibold">Logout</span>
                  </button>
                </div>
                <div className="py-2 flex justify-between items-center border-b border-gray-100">
                  <Link to={"/"}>
                    <span className="font-semibold">App Version</span>
                  </Link>
                  <span>1.0.0</span>
                </div>
              </div>
            </div>
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

export default Profile;
