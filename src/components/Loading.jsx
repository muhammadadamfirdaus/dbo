import React from "react";
import spinner from "../assets/images/spinner.gif";

function Loading() {
  return (
    <div className="bg-white h-screen flex justify-center items-center">
      <img src={spinner} width="72" alt="Loading..." />
      <span>Loading...</span>
    </div>
  );
}

export default Loading;
