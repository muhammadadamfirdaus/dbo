import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getBankXaurius } from "../../features/banks/bankXAU/bankXAUSlice";
import { createDeposit, reset } from "../../features/deposit/idr/depositIDRSlice";
import Button from "../utilities/button";

function FormDepositIDR() {
  const { user } = useSelector((state) => state.auth);
  const { bankXaurius } = useSelector((state) => state.bankXAU);
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

    // if (isSuccess) {
    //   navigate("/deposit-idr");
    // }

    // dispatch(reset());
    dispatch(getBankXaurius());
    // getBankData();
  }, [user, depositIDR, isError, isSuccess, message, navigate, dispatch]);

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
      // navigate("/transfer-bank", { state: formData });
    }
  };

  return (
    <>
      <div className="rounded-xl shadow-lg p-4 mb-12">
        <h1 className="pb-4 mb-8 border-b border-b-gray-200">Deposit</h1>
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name_bank">
              Bank
            </label>
            <select id="depositBankName" name="bank_id" value={bankXaurius && bankXaurius.name_bank} onChange={onChange} className="block w-full mt-1 p-2 rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
              <option defaultValue>Choose Bank</option>
              {bankXaurius &&
                bankXaurius.map((bank) => {
                  // console.log(bank.name_bank);
                  return (
                    <option key={bank.id} value={bank.id}>
                      {bank.name_bank}
                    </option>
                  );
                })}
            </select>
            {messageBankName && <div className="mt-1 text-sm text-red-500">{messageBankName}</div>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="total">
              Total (IDR)
            </label>
            <input id="depositIDRAmount" name="total" type="text" value={total} placeholder="0" onChange={onChange} className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            {messageTotalAmount && <div className="mt-1 text-sm text-red-500">{messageTotalAmount}</div>}
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

export default FormDepositIDR;
