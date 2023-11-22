import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import FormBankUser from "./FormBankUser";
// import { getBankData, reset } from "../../features/deposit/idr/depositIDRSlice";
import { getBankUser } from "../../features/banks/bankUser/bankUserSlice";
import { getEvm } from "../../features/evm/evmSlice";
import { createOTP } from "../../features/otp/otpSlice";
import { createWithdrawXAU } from "../../features/withdraw/xau/withdrawXAUSlice";
import Modal from "../utilities/modal";

function FormWithdrawXAU() {
  const { user } = useSelector((state) => state.auth);
  const { evm } = useSelector((state) => state.evm);
  const { otp } = useSelector((state) => state);
  const { withdrawXAU, isLoading, isError, isSuccess, message } = useSelector((state) => state.withdrawXAU);

  const [showModalAddBank, setShowModalAddBank] = useState(false); // toggle update bank

  const getInitialToken = evm.data && evm.data.find((evm) => evm);

  const [getToken, setGetToken] = useState(getInitialToken ? getInitialToken.chain_id : 97);
  // const [test, setTest] = useState(getInitialToken ? getInitialToken.chain_id : 97);

  // const [getTokenEvm] = useState(getToken.id)
  console.log(getInitialToken && getInitialToken.chain_id);

  // console.log(otp.message);

  const [formData, setFormData] = useState({
    chain_id: getToken,
    withdraw_to: "",
    otp: "",
    amount: "",
  });

  const { withdraw_to, amount, otpResponse } = formData;

  const [messageBankName, setMessageBankName] = useState();
  const [messageETHAddress, setMessageETHAddress] = useState();
  const [messageTotalAmount, setMessageTotalAmount] = useState();
  const [messageButtonOTP, setMessageButtonOTP] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    console.log(formData);
    // if (isSuccess) {
    //   navigate("/deposit-idr");
    // }

    // dispatch(reset());
    // dispatch(getBankData());
    // dispatch(getBankXaurius());
    dispatch(getEvm());
    // console.log(showAddBank);
    // getBankData();
  }, [user, otp, getEvm, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    console.log(e.target.value);
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

    // cek pemilihan bank
    if (e.target.value !== "") {
      setMessageBankName("");
    }

    setGetToken(e.target.value);
    // setGetTokenChainID(e.target.value);
    console.log(e.target.value);

    // cek jika user typing . di jumlah withdraw
    if (amount === "") {
      setMessageTotalAmount("");
    } else {
      setMessageTotalAmount("");
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    console.log(formData);
    // cek jika user typing . di jumlah withdraw
    if (withdraw_to === "" && amount === "") {
      // setMessageBankName("Please select bank name");
      setMessageETHAddress("Input your ETH Address");
      setMessageTotalAmount("Fill the amount");
    } else if (withdraw_to === "") {
      // setMessageBankName("Bank name couldn't be empty");
    } else if (amount === "") {
      setMessageTotalAmount("Fill the amount");
    } else {
      setMessageBankName("");
      setMessageETHAddress("");
      setMessageTotalAmount("");
      navigate("/status-withdraw-xau", { state: formData });
      dispatch(createWithdrawXAU(formData));
    }
  };

  const onClickShow = (e) => {
    e.preventDefault();
    // setShowAddBank(!showAddBank);
    setShowModalAddBank(!showModalAddBank);
  };

  const onClickClose = (e) => {
    setShowModalAddBank(!showModalAddBank);
  };

  const onClickRequestOTP = (e) => {
    setMessageButtonOTP(true);
    dispatch(createOTP());
  };

  const modal = (
    <Modal onClose={onClickClose}>
      <FormBankUser />
    </Modal>
  );

  return (
    <>
      <div className="rounded-xl shadow-lg p-4 mb-12">
        <h1 className="pb-4 mb-8 border-b border-b-gray-200">Withdraw</h1>
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="chain_id">
              Network
            </label>
            <select id="withdrawXAUSelectToken" name="chain_id" value={getToken} onChange={onChange} className="block w-full mt-1 p-2 rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
              {evm.data && evm.data ? (
                evm.data.map((token) => {
                  // console.log(token);
                  return (
                    <option key={token.id} value={token.id}>
                      {token.token_name}
                      {/* {token.chain_id} */}
                    </option>
                  );
                })
              ) : (
                <option defaultValue>Choose Bank</option>
              )}
            </select>
            {messageBankName && <div className="mt-1 text-sm text-red-500">{messageBankName}</div>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="withdraw_to">
              Ethereum Address
            </label>
            <input id="withdrawXAUETHAddress" name="withdraw_to" type="text" value={withdraw_to} onChange={onChange} className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            {messageETHAddress && <div className="mt-1 text-sm text-red-500">{messageETHAddress}</div>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">
              Total (XAU)
            </label>
            <input id="withdrawXAUTotal" name="amount" type="text" value={amount} placeholder="0" onChange={onChange} className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            {messageTotalAmount && <div className="mt-1 text-sm text-red-500">{messageTotalAmount}</div>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">
              OTP
            </label>
            <div className="flex justify-between">
              <input id="withdrawOTP" name="otp" type="text" value={otpResponse} placeholder="" onChange={onChange} className="shadow appearance-none border border-gray-300 rounded w-50 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              <div className="w-50 bg-[#FCCF08] hover:bg-blue-70 text-black font-bold py-2 px-4 rounded-[34px] focus:outline-none focus:shadow-outline" type="submit" onClick={onClickRequestOTP}>
                Request OTP
              </div>
            </div>
            {/* <div className={messageButtonOTP ? "mt-1 text-sm text-red-500 block" : "mt-1 text-sm text-red-500 hidden"}>{otp.message}</div> */}
            <div className={`mt-1 text-sm ${messageButtonOTP ? "block" : "hidden"} ${otp.createOTP.success === false ? "text-red-500" : "text-blue-500"}`}>{otp.message}</div>
          </div>
          <div className="flex flex-col items-center justify-between">
            <button className="w-full bg-[#FCCF08] hover:bg-blue-70 text-black font-bold py-2 px-4 mb-3 rounded-[34px] focus:outline-none focus:shadow-outline" type="submit">
              Send
            </button>
            {/* <button className="w-full bg-[#FCCF08] hover:bg-blue-70 text-black font-bold py-2 px-4 mb-3 rounded-[34px] focus:outline-none focus:shadow-outline" type="submit">
              Cancel
            </button> */}
          </div>
        </form>
      </div>

      {/* popup add bank */}
      {showModalAddBank && modal}
    </>
  );
}

export default FormWithdrawXAU;
