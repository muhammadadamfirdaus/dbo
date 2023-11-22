import React from "react";
import { Link } from "react-router-dom";
import imageLogoXaurius from "../../assets/images/logo-xaurius-light.png";
import MenuHeader from "../menus/MenuHeader";

function Header() {
  return (
    <>
      <div className="px-4 md:px-8 lg:px-20 border-b-[0.5px] border-slate-400">
        <div className="flex py-4 md:py-7">
          <div className="basis-2/4 logo">
            <Link to={"/"}>
              <img src={imageLogoXaurius} className="w-[116px]" alt="Xaurius Logo" />
            </Link>
          </div>
          <div className="basis-2/4">
            <MenuHeader />
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
