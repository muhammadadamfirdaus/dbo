import React, { useState, useEffect } from "react";
import QRCode from "react-qr-code";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAddressDeposit } from "../../features/deposit/xau/depositXAUSlice";
import { createDeposit, reset } from "../../features/deposit/idr/depositIDRSlice";
import Button from "../utilities/button";

function FormDepositXAU() {
  const { user } = useSelector((state) => state.auth);
  const { depositXAU } = useSelector((state) => state.depositXAU);
  const { depositIDR, isLoading, isError, isSuccess, message } = useSelector((state) => state.depositIDR);

  // console.log(bankXaurius);
  const [formData, setFormData] = useState({
    bank_id: "",
    // name_bank: "",
    total: "",
  });

  // const [name_bank, setNameBank] = useState();
  // const [total, setTotal] = useState();

  const { bank_id, total } = formData;

  const [messageBankName, setMessageBankName] = useState();
  const [messageTotalAmount, setMessageTotalAmount] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      // console.log(message);
    }

    if (isSuccess) {
      navigate("/deposit-idr");
    }

    // dispatch(reset());
    dispatch(getAddressDeposit());
    // getBankData();

    console.log(depositXAU && depositXAU.success);
  }, [user, isError, isSuccess, message, navigate, dispatch]);

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

    // cek jika user typing . di jumlah deposit
    if (total === "") {
      setMessageTotalAmount("");
    } else if (isNaN(total) || total.indexOf(".") !== -1) {
      setMessageTotalAmount(`Number only. Don't use period (.)`);
    } else {
      setMessageTotalAmount("");
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(createDeposit(formData));

    console.log(formData);

    // cek jika user typing . di jumlah deposit
    if (bank_id === "" && total === "") {
      setMessageBankName("Please select bank name");
      setMessageTotalAmount("Fill the amount");
    } else if (bank_id === "") {
      setMessageBankName("Bank name couldn't be empty");
    } else if (total === "") {
      setMessageTotalAmount("Fill the amount");
    } else {
      setMessageBankName("");
      setMessageTotalAmount("");
      console.log(formData);
      navigate("/transfer-bank", { state: formData });
    }
  };

  const onClickRequestAddress = (e) => {
    console.log("requesting address");
    dispatch(getAddressDeposit());
  };

  return (
    <>
      <div className="rounded-xl shadow-lg p-4 mb-12">
        <h1 className="pb-4 mb-8 border-b border-b-gray-200">Deposit</h1>
        <form onSubmit={onSubmit}>
          {depositXAU && depositXAU.success === true ? (
            <div className="mb-4 flex justify-between items-center">
              <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="amount">
                XAU Address
              </label>
              <div className="w-50 bg-[#FCCF08] hover:bg-blue-70 text-black font-bold py-2 px-4 rounded-[34px] focus:outline-none focus:shadow-outline" type="submit" onClick={onClickRequestAddress}>
                Request Address
              </div>
            </div>
          ) : (
            <div className="mb-4 flex justify-center items-center py-4">
              <QRCode value="0xaddressdisini" />
            </div>
          )}
          <div className="mb-4">
            <label className="block text-gray-900 text-base font-medium mb-2" htmlFor="total">
              Informasi Token
            </label>
            <div className="mb-4 text-sm">Mendukung deposit via EVM:</div>
            <div>
              <div className="flex justify-evenly bg-gray-300 py-3">
                <div className="">Chain ID</div>
                <div className="">Contact Address</div>
              </div>
              <div className="flex justify-evenly bg-gray-200 py-3 text-gray-500">
                <div className="">4216</div>
                <div className="">0xdjdb36746t3274bhhsxbhs</div>
              </div>
              <div className="flex justify-evenly bg-gray-200 py-3 text-gray-500">
                <div className="">1</div>
                <div className="">0xdjdb36746t3274bhhsxbhs</div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between">
            <Button width={"full"} type={"submit"}>
              Send
            </Button>
            {/* <button className="w-full bg-[#FCCF08] hover:bg-blue-70 text-black font-bold py-2 px-4 mb-3 rounded-[34px] focus:outline-none focus:shadow-outline" type="submit">
              Cancel
            </button> */}
          </div>
        </form>
      </div>
    </>
  );
}

export default FormDepositXAU;
