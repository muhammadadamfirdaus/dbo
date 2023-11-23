import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Nav from "../../components/Nav";
import NotLogin from "../../components/auth/NotLogin";
import Button from "../../components/utilities/button/button";
import Loading from "../../components/Loading";

import { getCustomers } from "../../features/customers/customerSlice";
import Pagination from "../../components/utilities/pagination/Pagination";
import Card from "../../components/utilities/card/card";
import { Link } from "react-router-dom";

function Customers() {
  const { user } = useSelector((state) => state.auth);
  const { customers, isLoading } = useSelector((state) => state.customer);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCustomers());
  }, [dispatch]);

  if (isLoading) {
    return <Loading />;
  }

  console.log(customers);

  // get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  // console.log(indexOfFirstPost, indexOfLastPost);
  const currentPosts = customers.slice(indexOfFirstPost, indexOfLastPost);
  console.log(currentPosts);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      {user ? (
        <>
          <Nav />
          <div className="md:pl-[30vw] xl:pl-[20vw] h-screen relative">
            <div className="px-2 pt-4 flex flex-col h-full">
              <div className="flex flex-wrap">
                {customers
                  ? currentPosts.map((x) => (
                      <div key={x.id} className="md:basis-1/4 mb-6 px-2">
                        <Link to={`/customers/${x.id}`}>
                          <Card>
                            <div className="flex px-2 py-2 h-full">
                              <div className="flex basis-3/12 overflow-hidden rounded-md border border-slate-700 mr-2">
                                <img src={x.image} alt="" />
                              </div>
                              <div className="flex flex-col basis-full">
                                <div>
                                  <span className="font-semibold mr-2">{x.firstName}</span>
                                  <span className="font-semibold">{x.lastName}</span>
                                </div>
                                <div>
                                  <span>{x.address.address}</span>
                                </div>
                              </div>
                            </div>
                          </Card>
                        </Link>
                      </div>
                    ))
                  : "Produk tidak ditemukan"}
              </div>
              <div className="flex justify-center">
                <Pagination postPerPage={postsPerPage} totalPosts={customers.length} paginate={paginate} />
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

export default Customers;
