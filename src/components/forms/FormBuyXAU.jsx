import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createBuy, reset } from "../../features/buy/xau/buyXAUSlice";

function FormBuyXAU() {
  const { user, buyXAU, isLoading, isError, isSuccess, message } = useSelector((state) => state.buyXAU);

  const [formData, setFormData] = useState({
    price: "",
  });

  const { price } = formData;

  const [messagePrice, setMessagePrice] = useState();
  // const [messageTotalAmount, setMessageTotalAmount] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (isSuccess) {
      dispatch(reset());
      navigate("/buy-xau");
    }

    dispatch(reset());
  }, [user, buyXAU, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    console.log(e.target.value);
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

    // cek jika user typing . di jumlah deposit
    if (price === "") {
      setMessagePrice("");
    } else if (isNaN(price)) {
      setMessagePrice(`Hanya nomor aja lah woy. Jangan yg aneh-aneh...`);
    } else {
      setMessagePrice("");
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(createBuy(price));

    // cek jika user typing . di jumlah deposit
    if (price === "") {
      setMessagePrice("Pilih bank dulu lah woy!");
    } else if (price === "") {
      setMessagePrice("Pilih bank dulu lah woy!");
    } else {
      setMessagePrice("");
      console.log(formData);
      navigate("/status-buy-xau", {
        state: {
          formData,
          status: "pending",
        },
      });
    }
  };

  return (
    <>
      <div className="rounded-xl shadow-lg p-4 mb-12">
        <h1 className="pb-4 mb-8 border-b border-b-gray-200">Buy XAU Token</h1>
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
              Saya Ingin Membeli
            </label>
            <input id="buyXAUAmount" name="price" type="text" value={price} placeholder="0" onChange={onChange} className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            {messagePrice && <div className="mt-1 text-sm text-red-500">{messagePrice}</div>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Taksiran</label>
          </div>
          <div className="flex flex-col items-center justify-between">
            <button className="w-full bg-[#FCCF08] hover:bg-blue-70 text-black font-bold py-2 px-4 mb-3 rounded-[34px] focus:outline-none focus:shadow-outline" type="submit">
              Buy
            </button>
            {/* <button className="w-full bg-[#FCCF08] hover:bg-blue-70 text-black font-bold py-2 px-4 mb-3 rounded-[34px] focus:outline-none focus:shadow-outline" type="submit">
              Cancel
            </button> */}
          </div>
        </form>
      </div>
    </>
  );
}

export default FormBuyXAU;
