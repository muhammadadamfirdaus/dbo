import React from "react";

function Button({ title, background, type, width, children }) {
  // console.log(background);
  return (
    <>
      <button className={`${width === "full" ? "w-full" : "inline-block"} bg-[#${background ? background : "FCCF08"}] hover:bg-blue-70 text-black font-bold py-2 px-8 rounded-[34px] focus:outline-none focus:shadow-outline`} type={type}>
        <span className="text-slate-600">{title ? title : children}</span>
      </button>
    </>
  );
}

export default Button;
