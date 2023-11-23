import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Nav from "../../components/Nav";
import NotLogin from "../../components/auth/NotLogin";
import Button from "../../components/utilities/button/button";
import Loading from "../../components/Loading";

import { getCustomerDetail, getCustomers } from "../../features/customers/customerSlice";
import Pagination from "../../components/utilities/pagination/Pagination";
import Card from "../../components/utilities/card/card";
import { BreadcrumbGoBack } from "../../components/breadcrumb/Breadcrumb";

function DetailCustomer({ match }) {
  const { user } = useSelector((state) => state.auth);
  const { customer, isLoading } = useSelector((state) => state.customer);

  const dispatch = useDispatch();
  const params = useParams();

  console.log(customer);

  const { id } = useParams();

  useEffect(() => {
    dispatch(getCustomerDetail(id));
  }, [dispatch]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {user ? (
        <>
          <Nav />
          <div className="md:pl-[30vw] xl:pl-[20vw]">
            <BreadcrumbGoBack title={"Back"} />
            <div className="px-2 pb-32 pt-4">
              <div className="flex flex-wrap">
                <h1>
                  <span className="mr-1">{customer.firstName}</span>
                  <span>{customer.lastName}</span>
                </h1>
                <div>
                  <img src={customer.image} alt="" />
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

export default DetailCustomer;
