import React, { useState } from "react";
import { Link } from "react-router-dom";
import imageLogoXaurius from "../assets/images/logo-xaurius-light.png";
import { HiChevronDown, HiChevronUp, HiOutlineArrowDownCircle, HiOutlineArrowUpCircle, HiOutlineArrowTrendingDown, HiOutlineArrowTrendingUp, HiOutlineArrowsUpDown, HiOutlineHome, HiOutlineCircleStack, HiOutlinePlusCircle, HiOutlineClock, HiOutlineUser, HiPlus, HiXMark } from "react-icons/hi2";

// menu approaches
// - menu dibagi 2 views, untuk mobile dan desktop/iPad/tablet.
// - jika desktop/iPad/tablet, menu sidebar. Jika mobile, menu bottom bar.
// - code dibagi 3, atas untuk menu desktop/iPad/tablet, tengah untuk mobile menu, dan terakhir popup slide untuk transactions.

function Nav() {
  const [showTransactionMenuMobile, setShowTransactionMenuMobile] = useState(false); // toggle transaction menu
  const [showTransactionMenuMobileDesktop, setShowTransactionMenuMobileDesktop] = useState(false); // toggle transaction menu

  return (
    <>
      {/* desktop & tablet menu */}
      <nav className="hidden md:block fixed top-0 left-0 md:w-[30vw] xl:w-[20vw] h-full  z-10">
        <ul className="wrapper px-4">
          <li className="flex my-6">
            <div className="logo">
              <Link to={"/"}>
                <img src={imageLogoXaurius} className="w-[116px]" alt="Xaurius Logo" />
              </Link>
            </div>
          </li>
          <li className="flex items-center my-6">
            <Link to={"/dashboard"}>
              <HiOutlineHome size={24} />
            </Link>
            <Link to={"/dashboard"}>
              <span className="inline-block ml-4 text-base">Dashboard</span>
            </Link>
          </li>
          <li className="flex items-center my-6">
            <Link to={"/deposit/idr"}>
              <HiOutlineCircleStack size={24} />
            </Link>
            <Link to={"/deposit/idr"}>
              <span className="inline-block ml-4 text-base">Redeem</span>
            </Link>
          </li>
          <li className="flex flex-col my-6 relative">
            <div className="flex items-center">
              <HiPlus size={24} />
              <span className="inline-block ml-4 text-base">Transactions</span>
              <button className="basis-1/4 ml-2" onClick={() => setShowTransactionMenuMobileDesktop(!showTransactionMenuMobileDesktop)}>
                {showTransactionMenuMobileDesktop === true ? <HiChevronUp /> : <HiChevronDown />}
              </button>
            </div>
            {showTransactionMenuMobileDesktop ? (
              // <div className="relative top-0 left-0">
              <ul className="py-2 ml-4">
                <li className="flex items-center my-4">
                  <Link to={"/deposit/idr"}>
                    <HiOutlineArrowDownCircle size={24} />
                  </Link>
                  <Link to={"/deposit/idr"}>
                    <span className="inline-block ml-2 text-base">Deposit</span>
                  </Link>
                </li>
                <li className="flex items-center my-4">
                  <Link to={"/buy-xau"}>
                    <HiOutlineArrowTrendingDown size={24} />
                  </Link>
                  <Link to={"/buy-xau"}>
                    <span className="inline-block ml-2 text-base">Buy</span>
                  </Link>
                </li>
                <li className="flex items-center my-4">
                  <Link to={"/sell-xau"}>
                    <HiOutlineArrowTrendingUp size={24} />
                  </Link>
                  <Link to={"/sell-xau"}>
                    <span className="inline-block ml-2 text-base">Sell</span>
                  </Link>
                </li>
                <li className="flex items-center my-4">
                  <Link to={"/transfer-xau"}>
                    <HiOutlineArrowsUpDown size={24} />
                  </Link>
                  <Link to={"/transfer-xau"}>
                    <span className="inline-block ml-2 text-base">Transfer</span>
                  </Link>
                </li>
                <li className="flex items-center mt-4">
                  <Link to={"/withdraw/idr"}>
                    <HiOutlineArrowUpCircle size={24} />
                  </Link>
                  <Link to={"/withdraw/idr"}>
                    <span className="inline-block ml-2 text-base">Withdraw</span>
                  </Link>
                </li>
              </ul>
            ) : // </div>
            null}
          </li>
          <li className="flex items-center my-6">
            <Link to={"/history"}>
              <HiOutlineClock size={24} />
            </Link>
            <Link to={"/history"}>
              <span className="inline-block ml-4 text-base">History</span>
            </Link>
          </li>
          <li className="flex items-center my-6">
            <Link to={"/profile"}>
              <HiOutlineUser size={24} />
            </Link>
            <Link to={"/profile"}>
              <span className="inline-block ml-4 text-base">Profile</span>
            </Link>
          </li>
          {/* user profile */}
          {/* <li className="flex items-center my-6">
            <Link to={"/dashboard"}>
              <span>Foto Profil</span>
            </Link>
            <Link to={"/dashboard"}>
              <span>Olivia Rhye</span>
            </Link>
            <Link to={"/dashboard"}>
              <span>username@email.com</span>
            </Link>
            <Link to={"/dashboard"}>
              <span>Logout</span>
            </Link>
          </li> */}
        </ul>
      </nav>

      {/* mobile menu */}
      {/* <nav className="md:hidden fixed bottom-0 left-0 z-[2] w-full bg-gray-600 text-white"> */}
      <nav className="md:hidden fixed bottom-0 left-0 z-[2] w-full bg-white text-gray-600 border-t-gray-100 border-t">
        <ul className="flex py-4">
          <li className="flex flex-col items-center grow shrink-0 basis-[64px]">
            <Link to={"/dashboard"}>
              <HiOutlineHome size={24} />
            </Link>
            <Link to={"/dashboard"}>
              <span className="inline-block mt-2 text-xs">Home</span>
            </Link>
          </li>
          <li className="flex flex-col items-center grow shrink-0 basis-[64px]">
            <Link to={"/deposit/idr"}>
              <HiOutlineCircleStack size={24} />
            </Link>
            <Link to={"/deposit/idr"}>
              <span className="inline-block mt-2 text-xs">Redeem</span>
            </Link>
          </li>
          <li className="flex flex-col items-center grow shrink-0 basis-[64px]" onClick={() => setShowTransactionMenuMobile(!showTransactionMenuMobile)}>
            <HiOutlinePlusCircle size={24} />
            <span className="inline-block mt-2 text-xs">Transactions</span>
          </li>
          <li className="flex flex-col items-center grow shrink-0 basis-[64px]">
            <Link to={"/history"}>
              <HiOutlineClock size={24} />
            </Link>
            <Link to={"/history"}>
              <span className="inline-block mt-2 text-xs">History</span>
            </Link>
          </li>
          <li className="flex flex-col items-center grow shrink-0 basis-[64px]">
            <Link to={"/profile"}>
              <HiOutlineUser size={24} />
            </Link>
            <Link to={"/profile"}>
              <span className="inline-block mt-2 text-xs">Profile</span>
            </Link>
          </li>
        </ul>
      </nav>

      {/* popup transactions menu */}
      {showTransactionMenuMobile ? (
        <>
          <div className="fixed bottom-0 z-[2] w-full">
            <div className={`bg-white border border-t-slate-400 rounded-lg md:hidden ${showTransactionMenuMobile ? "block" : "hidden"}`}>
              <ul className="flex flex-col p-4">
                <li className="flex justify-end" onClick={() => setShowTransactionMenuMobile(!showTransactionMenuMobile)}>
                  <span className="w-[32px] h-[32px] border border-radius rounded-[50%] bg-white flex items-center justify-center">
                    <HiXMark size={24} />
                  </span>
                </li>
                <li className="flex items-center my-4">
                  <Link to={"/deposit/idr"}>
                    <HiOutlineArrowDownCircle size={24} />
                  </Link>
                  <Link to={"/deposit/idr"}>
                    <span className="inline-block ml-2 text-base">Deposit</span>
                  </Link>
                </li>
                <li className="flex items-center my-4">
                  <Link to={"/buy-xau"}>
                    <HiOutlineArrowTrendingDown size={24} />
                  </Link>
                  <Link to={"/buy-xau"}>
                    <span className="inline-block ml-2 text-base">Buy</span>
                  </Link>
                </li>
                <li className="flex items-center my-4">
                  <Link to={"/sell-xau"}>
                    <HiOutlineArrowTrendingUp size={24} />
                  </Link>
                  <Link to={"/sell-xau"}>
                    <span className="inline-block ml-2 text-base">Sell</span>
                  </Link>
                </li>
                <li className="flex items-center my-4">
                  <Link to={"/transfer-xau"}>
                    <HiOutlineArrowsUpDown size={24} />
                  </Link>
                  <Link to={"/transfer-xau"}>
                    <span className="inline-block ml-2 text-base">Transfer</span>
                  </Link>
                </li>
                <li className="flex items-center my-4">
                  <Link to={"/withdraw/idr"}>
                    <HiOutlineArrowUpCircle size={24} />
                  </Link>
                  <Link to={"/withdraw/idr"}>
                    <span className="inline-block ml-2 text-base">Withdraw</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}

export default Nav;
