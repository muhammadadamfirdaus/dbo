import React from "react";

function Card({ children }) {
  return (
    <>
      <div className="rounded-xl shadow-lg bg-gradient-to-r from-gold1 to-gold2 h-full">{children}</div>
    </>
  );
}

export default Card;
