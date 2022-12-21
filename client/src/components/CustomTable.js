import React, { useState } from "react";
import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { paginate } from "./paginate";
import Paginations from "./pagination";

const CustomTable = ({ auction: product, count, handler }) => {
  const [filter, setFilter] = useState("");
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const authContext = useContext(AuthContext);
  const { user } = authContext;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (count === 0)
    return <p className="text-red-400 text-[30px]">There is no product </p>;

  let filteredAuction = product?.filter((field) =>
    field?.product?.productName?.match(new RegExp(filter, "i"))
  );

  const auctions = paginate(filteredAuction, currentPage, pageSize);

  return (
    <div className="w-full">
      <div className="flex flex-col justify-center  w-[100%]">
        <div className="flex flex-row rounded-md bg-[#48a9a6] my-3 place-self-start">
          <label
            className="text-lg text-white font-semibold p-1"
            htmlFor="filter"
          >
            Filter
          </label>
          <input
            type="text"
            name="filter"
            className="border border-slate-400 m-2 focus:outline-none rounded-sm focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
            value={filter}
            onChange={(e) => setFilter(e.currentTarget.value)}
          ></input>
        </div>

        <div className="flex flex-col">
          <div className="overflow-x-auto">
            <div className="min-w-full inline-block align-middle">
              <div className="border rounded-[20px] overflow-hidden dark:border-[#69dc9e]">
                <table className="min-w-full  divide-y divide-[#69dc9e] dark:divide-[#69dc9e]">
                  <thead className="bg-[#48a9a6]  w-[100%]">
                    <tr>
                      <th className="border text-sm md:text-md lg:text-lg w-[20%] text-white p-5 border-slate-100">
                        Product Name
                      </th>
                      <th className="border text-sm md:text-md lg:text-lg w-[20%] text-white p-5 border-slate-100">
                        Quantitiy
                      </th>
                      <th className="border text-sm md:text-md lg:text-lg w-[20%] text-white p-5 border-slate-100">
                        Payment
                      </th>
                      {/* <th className="border text-[18px] w-[25%] text-white p-5 border-slate-100">
                        Status
                      </th> */}
                      <th className="border text-[18px] w-[25%] text-white p-5 border-slate-100">
                        Add to auction
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {auctions?.map((auction, index) => (
                      <tr
                        className={`cursor-pointer  ${
                          index % 2 == 0 ? "bg-[#d7f8ee]" : "bg-[#f6f7f6]"
                        }`}
                        key={index}
                      >
                        <td className="border border-slate-100 text-slate-800 p-2 text-sm md:text-md lg:text-lg text-left ">
                          {auction.product.productName}
                        </td>
                        <td className="border border-slate-100 text-slate-800 p-2 text-sm md:text-md lg:text-lg text-left ">
                          {auction.productQuantity}
                        </td>
                        <td className="border border-slate-100 text-slate-800 p-2 text-sm md:text-md lg:text-lg text-left ">
                          {auction?.product?.productType}
                        </td>
                        {/* 
                        <td className="border border-slate-100 text-slate-800 p-2 text-lg text-left ">
                          {auction?.owner == user.id ? (
                            <p className="bg-green-800 rounded-md text-center text-white">
                              Not sold
                            </p>
                          ) : (
                            <p className="bg-red-800 rounded-md text-center text-white">
                              Sold
                            </p>
                          )} 
                        </td>
                          */}

                        {auction.owner == auction.product.seller ? (
                          <td className="border-slate-100 text-slate-800 p-2  text-center ">
                            <Link
                              to={`/productDetail/${auction?.product?._id}`}
                              className="p-1 px-20 rounded-md text-[#3f3f3f] bg-[orange] w-full text-sm md:text-md lg:text-lg text-left "
                            >
                              Add to auction
                            </Link>
                          </td>
                        ) : auction?.paymentDone ? (
                          <td className="flex border-slate-100 text-slate-800 p-2  w-full text-center ">
                            <Link
                              to={`/productDetail/${auction?.product?._id}`}
                              className="p-1 w-[90%] rounded-md text-[#ffffff] bg-[purple] text-sm md:text-md lg:text-lg text-center "
                            >
                              Add to auctions
                            </Link>
                          </td>
                        ) : (
                          <td className="border-slate-100 text-slate-800 p-2  text-center ">
                            <Link
                              to={`/pay/${auction._id}`}
                              className="p-1 px-20 rounded-md text-[#3f3f3f] bg-orange-300 w-full text-sm md:text-md lg:text-lg text-left "
                            >
                              Pay
                            </Link>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="m-5">
          <Paginations
            itemsCount={count}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          ></Paginations>
        </div>
      </div>
    </div>
  );
};

export default CustomTable;
