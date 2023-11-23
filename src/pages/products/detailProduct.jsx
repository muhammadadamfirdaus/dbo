import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Nav from "../../components/Nav";
import NotLogin from "../../components/auth/NotLogin";
import Button from "../../components/utilities/button/button";
import Loading from "../../components/Loading";

import { getCustomers } from "../../features/customers/customerSlice";
import Pagination from "../../components/utilities/pagination/Pagination";
import Card from "../../components/utilities/card/card";

function Customers() {
  const { user } = useSelector((state) => state.auth);
  const { customers, isLoading } = useSelector((state) => state.product);

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
  // console.log(currentPosts);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      {user ? (
        <>
          <Nav />
          <div className="md:pl-[30vw] xl:pl-[20vw]">
            <div className="px-2 pb-32 pt-4">
              <div className="flex flex-wrap">
                {customers
                  ? currentPosts.map((x) => (
                      <div key={x.id} className="md:basis-1/4 mb-6 px-2">
                        <Card>
                          <div className="mx-4 h-full">
                            <div className="flex px-2 py-2">
                              <div className="basis-2/4 flex">
                                <span className="text-xs capitalize">{x.category}</span>
                              </div>
                              <div className="basis-2/4 flex justify-end">
                                <span className="text-xs capitalize">{x.brand}</span>
                              </div>
                            </div>
                            <div className="px-2 mb-4 h-[56px] overflow-hidden">
                              <h1 className="font-bold text-xl">{x.title}</h1>
                            </div>
                            <div className="h-[180px] overflow-hidden">
                              <img src={x.thumbnail} className="w-full" alt="" />
                            </div>
                            <div className="py-2">
                              <span className="text-sm">{x.description.slice(0, 100) + " ..."}</span>
                            </div>
                          </div>
                        </Card>
                      </div>
                    ))
                  : "Produk tidak ditemukan"}
              </div>
            </div>
            <Pagination postPerPage={postsPerPage} totalPosts={customers.length} paginate={paginate} />
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
