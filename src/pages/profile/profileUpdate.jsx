import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../../components/Loading";
import { Link, useNavigate } from "react-router-dom";

import { HiChevronRight } from "react-icons/hi2";
import Nav from "../../components/Nav";
import NotLogin from "../../components/auth/NotLogin";
import { BreadcrumbGoBack } from "../../components/breadcrumb/Breadcrumb";
import { logout, reset } from "../../features/auth/authSlice";
import { getProfile } from "../../features/profile/profileSlice";
import { updateProfile } from "../../features/profile/updateProfileSlice";

function ProfileUpdate() {
  const { user } = useSelector((state) => state.auth);
  const { profile, isLoading, isSuccess, message } = useSelector((state) => state.profile);
  // const { isSuccess } = useSelector((state) => state.profileUpdate);
  console.log(profile);

  const [formData, setFormData] = useState({
    full_name: profile.data && profile.data.full_name,
    phone_number: profile.data && profile.data.phone_number,
    address: profile.data && profile.data.address,
    id_number: profile.data && profile.data.id_number,
    npwp_number: profile.data && profile.data.npwp_number,
    country: profile.data && profile.data.country,
    file_ktp_url: profile.data && profile.data.file_ktp_url,
    file_npwp_url: profile.data && profile.data.file_npwp_url,
    image: profile.data && profile.data.image_url,
    // file_avatar_url: profile.data && profile.data.file_avatar_url,
  });

  const { full_name, phone_number, address, id_number, npwp_number, country, file_npwp_url, file_ktp_url, image } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  if (isLoading) {
    return <Loading />;
  }

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  const onChange = (e) => {
    // console.log(e.target.value);
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

    // cek jika user typing . di jumlah deposit
    // if (price === "") {
    //   setMessagePrice("");
    // } else if (isNaN(price)) {
    //   setMessagePrice(`Hanya nomor aja lah woy. Jangan yg aneh-aneh...`);
    // } else {
    //   setMessagePrice("");
    // }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    console.log(formData);
    // console.log(isSuccess);

    dispatch(updateProfile(formData));

    // cek jika user typing . di jumlah deposit
    // if (!isSuccess) {
    //   console.log(isSuccess);
    //   setMessageKYCStep1(message);
    // } else {
    //   setMessageKYCStep1("");
    //   navigate("/status-sell-xau", {
    //     state: {
    //       formData,
    //       status: "pending",
    //     },
    //   });
    // }

    if (!isSuccess) {
      // console.log(profile.msg);
    }

    // if (isError) {
    //   setMessageKYCStep1(message);
    // } else if (!isError) {
    //   dispatch(createSell(formData));
    // }
  };

  const userProfilePic = profile.data && profile.data.image_url;
  const userFullName = profile.data && profile.data.full_name;
  const userEmail = user && user.email;

  // const [name, setName] = useState(userFullName);

  return (
    <>
      {user.success ? (
        <>
          <Nav />
          <div className="md:pl-[30vw] xl:pl-[20vw]">
            <BreadcrumbGoBack title={"Edit Profile"} />
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
                {/* <div> */}
                <form onSubmit={onSubmit}>
                  <div className="mb-4 md:flex">
                    <div className="flex-auto border-b border-gray-100 py-2">
                      <h3 className="font-semibold">Nama Lengkap</h3>
                      <span className="text-base text-gray-400 mb-2">Nama harus sesuai kartu identitas</span>
                      <input id="ProfileFullName" name="full_name" type="text" value={full_name} onChange={onChange} className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                  </div>
                  <div className="mb-4 md:flex">
                    <div className="flex-auto border-b border-gray-100 py-2">
                      <h3 className="font-semibold">Alamat</h3>
                      <span className="text-base text-gray-400 mb-2">Alamat</span>
                      <textarea id="ProfileAddress" name="address" type="text" value={address} placeholder="Place text here" onChange={onChange} className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                  </div>
                  <div className="mb-4 md:flex">
                    <div className="flex-auto border-b border-gray-100 py-2 md:pr-2">
                      <h3 className="font-semibold">Phone Number</h3>
                      <span className="text-base text-gray-400 mb-2">Nomor telepon</span>
                      <input id="ProfilePhoneNumber" name="phone_number" type="text" value={phone_number} onChange={onChange} className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="flex-auto border-b border-gray-100 py-2 md:pl-2">
                      <h3 className="font-semibold">NPWP Number</h3>
                      <span className="text-base text-gray-400 mb-2">Nama harus sesuai kartu identitas</span>
                      <input id="ProfileNPWPNumber" name="npwp_number" type="text" value={npwp_number} onChange={onChange} className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                  </div>
                  <div className="mb-4 md:flex">
                    <div className="flex-auto border-b border-gray-100 py-2 md:pr-2">
                      <h3 className="font-semibold">ID Number</h3>
                      <span className="text-base text-gray-400 mb-2">Nama harus sesuai kartu identitas</span>
                      <input id="ProfileIDNumber" name="id_number" type="text" value={id_number} onChange={onChange} className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="flex-auto border-b border-gray-100 py-2 md:pl-2">
                      <h3 className="font-semibold">NPWP Number</h3>
                      <span className="text-base text-gray-400 mb-2">Nama harus sesuai kartu identitas</span>
                      <input id="ProfileNPWPNumber" name="npwp_number" type="text" value={npwp_number} onChange={onChange} className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                  </div>

                  <div className="flex flex-col items-center justify-between">
                    <button className="w-full bg-[#FCCF08] hover:bg-blue-70 text-black font-bold py-2 px-4 mb-3 rounded-[34px] focus:outline-none focus:shadow-outline" type="submit">
                      Save
                    </button>
                  </div>
                </form>
                {/* </div> */}
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

export default ProfileUpdate;
