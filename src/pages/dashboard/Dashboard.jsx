import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import Nav from "../../components/Nav";
import NotLogin from "../../components/auth/NotLogin";

import { getProfile } from "../../features/profile/profileSlice";
import Button from "../../components/utilities/button/button";

function Dashboard() {
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfile());
  }, [user, dispatch]);

  return (
    <>
      {user ? (
        <>
          <Nav />
          <div className="md:pl-[30vw] xl:pl-[20vw]">
            <div className="px-6 pb-32">
              <div className="pt-6">
                <h3>
                  Hello <strong>{user ? user.username : null}</strong>
                </h3>
                {/* <span>In order to use this application, you need to complete the KYC compliance. Please complete your data.</span> */}
              </div>
              <div className="pt-6 flex flex-col items-center">
                <Link to={"/customers"}>
                  <Button>Lihat Customer</Button>
                </Link>
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

export default Dashboard;
