import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { HiBars3, HiChevronDown, HiXMark } from "react-icons/hi2";
import Button from "../utilities/button";
import { logout, reset } from "../../features/auth/authSlice";
import { getProfile } from "../../features/profile/profileSlice";

function MenuHeader() {
  const { user } = useSelector((state) => state.auth);
  const { profile } = useSelector((state) => state.profile);

  const [showMenu, setShowMenu] = useState(false); // toggle menu
  const [showMenuSub, setShowMenuSub] = useState(false); // toggle menu

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getProfile());
  }, [user, dispatch]);

  const onClickShow = (e) => {
    e.preventDefault();

    setShowMenu(!showMenu);

    // console.log(showMenu);
  };

  const onClickClose = (e) => {
    e.preventDefault();

    setShowMenu(!showMenu);

    // console.log(showMenu);
  };

  const onClickSubMenu = (e) => {
    e.preventDefault();

    setShowMenuSub(!showMenuSub);
  };

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
    setShowMenu(!showMenu);
  };

  return (
    <nav className="h-full">
      <div className="flex items-center justify-end lg:hidden h-full">
        <button onClick={onClickShow}>
          <HiBars3 size={32} />
        </button>
      </div>

      {showMenu ? (
        <>
          <div className="fixed top-0 left-0 w-full h-full bg-white">
            <div className="flex justify-end py-2 px-2">
              <button onClick={onClickClose}>
                <HiXMark size={32} />
              </button>
            </div>
            <ul className="lg:flex items-center h-full">
              <li className="px-4 my-6">
                <Link to={"/"}>
                  <span>Home</span>
                </Link>
              </li>
              <li className="px-4 my-6">
                <span>Whitepaper</span>
              </li>
              <li className="px-4 my-6">
                <span>Contact</span>
              </li>
              <li className="px-4 my-6">
                <Link to={"/faq"}>
                  <span>FAQ</span>
                </Link>
              </li>
              {user && user.success ? (
                <>
                  <li className="px-4 my-6">
                    {/* <Link to={"/login"}> */}
                    <div className="flex items-center">
                      <div className="mx-2 bg-gray-400 w-8 h-8 rounded-full border border-slate-800"></div>
                      <div className="flex">
                        <span className="text-md font-medium mr-1">Halo,</span>
                        <span className="text-md font-medium">{profile.data && profile.data.full_name ? profile.data.full_name : user.email}</span>
                      </div>
                      <button className="basis-1/4 ml-2" onClick={onClickSubMenu}>
                        <HiChevronDown />
                      </button>
                    </div>
                    {/* </Link> */}
                    {showMenuSub ? (
                      <div className="relative top-0 left-0 w-full h-full">
                        <div className="bg-white border-b border-t border-gray-400 py-2 mt-2">
                          <li className="px-2 mx-4">
                            <button onClick={onLogout}>Logout</button>
                          </li>
                        </div>
                      </div>
                    ) : null}
                  </li>
                </>
              ) : (
                <>
                  <li className="px-4 my-6">
                    <Link to={"/login"}>
                      <span className="text-lg font-medium">Masuk</span>
                    </Link>
                  </li>
                  <li className="px-4 my-6">
                    <Link to={"/register"}>
                      <Button title="Daftar" />
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </>
      ) : null}

      <ul className="hidden lg:flex items-center h-full justify-end">
        <li className="px-2 mx-4">
          <Link to={"/"}>
            <span className="text-lg font-medium">Home</span>
          </Link>
        </li>
        <li className="px-2 mx-4">
          <span className="text-lg font-medium">Whitepaper</span>
        </li>
        <li className="px-2 mx-4">
          <span className="text-lg font-medium">Contact</span>
        </li>
        <li className="px-2 mx-4">
          <Link to={"/faq"}>
            <span className="text-lg font-medium">FAQ</span>
          </Link>
        </li>
        {user && user.success ? (
          <>
            <li className="px-2 mx-4 relative">
              {/* <Link to={"/login"}> */}
              <div className="flex items-center">
                <div className="basis-3/6 mx-2 bg-gray-400 w-8 h-8 rounded-full border border-slate-800"></div>
                <div className="flex">
                  <span className="text-md font-medium mr-1">Halo,</span>
                  <span className="text-md font-medium">{profile.data && profile.data.full_name ? profile.data.full_name : user.email}</span>
                </div>
                <button className="basis-1/4 ml-2" onClick={onClickSubMenu}>
                  <HiChevronDown />
                </button>
              </div>
              {/* </Link> */}
              {showMenuSub ? (
                <div className="absolute top-10 left-0 w-full h-full">
                  <div className="bg-white border border-gray-400 py-2">
                    <li className="px-2 mx-4">
                      <button onClick={onLogout}>Logout</button>
                    </li>
                  </div>
                </div>
              ) : null}
            </li>
          </>
        ) : (
          <>
            <li className="px-2 mx-4">
              <Link to={"/login"}>
                <span className="text-lg font-medium">Masuk</span>
              </Link>
            </li>
            <li className="px-2 mx-4">
              <Link to={"/register"}>
                <Button title="Daftar" />
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default MenuHeader;
