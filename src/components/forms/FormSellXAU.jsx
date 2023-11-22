import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getBalance } from "../../features/balance/idr/balanceIDRSlice";
import { createSell, reset } from "../../features/sell/xau/sellXAUSlice";

function FormSellXAU() {
  const { balanceIDR } = useSelector((state) => state.balanceIDR);
  const { user, sellXAU, isLoading, isError, isSuccess, message } = useSelector((state) => state.sellXAU);

  const [formData, setFormData] = useState({
    amount_xau: "",
  });

  // console.log(balanceIDR);

  const { amount_xau } = formData;

  const [messageAmountXAU, setMessageAmountXAU] = useState(message);
  // const [messageTotalAmount, setMessageTotalAmount] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      console.log(message);
      setMessageAmountXAU(message);
    }

    if (isSuccess) {
      console.log(amount_xau, message);
      // dispatch(reset());
      navigate("/status-sell-xau", {
        state: {
          formData,
          status: "success",
        },
      });
    }

    dispatch(getBalance());
    // dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    console.log(e.target.value);
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

    // cek jika user typing . di jumlah deposit
    if (amount_xau === "") {
      setMessageAmountXAU("");
    } else if (isNaN(amount_xau)) {
      setMessageAmountXAU(`Hanya nomor aja lah woy. Jangan yg aneh-aneh...`);
    } else {
      setMessageAmountXAU("");
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    console.log(formData, isSuccess, amount_xau);

    // cek jika user typing . di jumlah deposit
    // if (!isSuccess) {
    //   console.log(isSuccess);
    //   setMessageAmountXAU(message);
    // } else {
    //   setMessageAmountXAU("");
    //   navigate("/status-sell-xau", {
    //     state: {
    //       formData,
    //       status: "pending",
    //     },
    //   });
    // }

    if (amount_xau === "" || amount_xau == 0) {
      setMessageAmountXAU("Nilai tidak boleh kosong");
    } else if (isError) {
      setMessageAmountXAU(message);
    } else if (!isError) {
      dispatch(createSell(formData));
    }
  };

  return (
    <>
      <div className="rounded-xl shadow-lg p-4 mb-12">
        <h1 className="pb-4 mb-8 border-b border-b-gray-200">Sell XAU Token</h1>
        <div className="flex justify-between mb-8">
          <span className="text-gray-500">Token Tersedia</span>
          <span className="text-gray-500">
            {balanceIDR && balanceIDR.data ? balanceIDR.data[0].balance_value.slice(0, 4) : null}&nbsp;
            {balanceIDR && balanceIDR.data ? balanceIDR.data[0].currency : null}
          </span>
        </div>
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount_xau">
              Saya Ingin Menjual
            </label>
            <input id="sellXAUAmount" name="amount_xau" type="number" value={amount_xau} placeholder="0" onChange={onChange} className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            {messageAmountXAU && <div className="mt-1 text-sm text-red-500">{messageAmountXAU}</div>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Taksiran</label>
          </div>
          <div className="flex flex-col items-center justify-between">
            <button className="w-full bg-[#FCCF08] hover:bg-blue-70 text-black font-bold py-2 px-4 mb-3 rounded-[34px] focus:outline-none focus:shadow-outline" type="submit">
              Sell
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

export default FormSellXAU;
