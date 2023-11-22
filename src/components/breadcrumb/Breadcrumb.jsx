import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiChevronLeft } from "react-icons/hi2";

export const BreadcrumbGoBack = ({ title }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex items-center p-4 mb-4 border-b border-b-slate-400">
        <Link
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
        >
          <div className="flex items-center">
            <span className="font-bold">
              <HiChevronLeft size={21} />
            </span>
            {/* <span className="flex ml-2">Back</span> */}
          </div>
        </Link>
        <h1 className="text-xl font-semibold ml-4">{title}</h1>
      </div>
    </>
  );
};
