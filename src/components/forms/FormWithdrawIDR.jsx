import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import FormBankUser from "./FormBankUser";
// import { getBankData, reset } from "../../features/deposit/idr/depositIDRSlice";
import { getBankUser } from "../../features/banks/bankUser/bankUserSlice";
import Modal from "../utilities/modal";
import { createWithdrawIDR } from "../../features/withdraw/idr/withdrawIDRSlice";

function FormWithdrawIDR() {
  const { user } = useSelector((state) => state.auth);
  const { bankUser } = useSelector((state) => state.bankUser);
  const { withdrawIDR, isLoading, isError, isSuccess, message } = useSelector((state) => state.withdrawIDR);

  const [showModalAddBank, setShowModalAddBank] = useState(false); // toggle update bank

  // console.log(bankUser.map((bank) => bank.nomor_rekening));

  // const bankData = bankUser && bankUser.find((bank) => bank);
  const bankData = bankUser && bankUser[0];

  const [bank_id] = useState(bankData.id);
  const [account_number] = useState(bankData.nomor_rekening);
  const [name] = useState(bankData.nama_akun);

  const [formData, setFormData] = useState({
    bank_id: bank_id,
    account_number: account_number,
    name: name,
    ammount: "",
  });

  const { ammount } = formData;

  const [messageBankName, setMessageBankName] = useState();
  const [messageAccountNumber, setMessageAccountNumber] = useState();
  const [messageTotalAmount, setMessageTotalAmount] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    // if (isSuccess) {
    //   navigate("/deposit-idr");
    // }

    // dispatch(reset());
    // dispatch(getBankData());
    // dispatch(getBankXaurius());
    dispatch(getBankUser());
    // console.log(showAddBank);
    // getBankData();
  }, [user, withdrawIDR, isError, isSuccess, message, navigate, dispatch]);

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

    // cek jika user typing . di jumlah withdraw
    if (ammount === "") {
      setMessageTotalAmount("");
    } else if (isNaN(ammount) || ammount.indexOf(".") !== -1) {
      setMessageTotalAmount(`Number only. Don't use period (.)`);
    } else {
      setMessageTotalAmount("");
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    console.log(formData);
    // cek jika user typing . di jumlah withdraw
    if (bank_id === "" && ammount === "") {
      setMessageBankName("Please select bank name");
      setMessageAccountNumber("Input your account bank number");
      setMessageTotalAmount("Fill the ammount");
    } else if (bank_id === "") {
      setMessageBankName("Bank name couldn't be empty");
    } else if (account_number === "") {
      setMessageAccountNumber("Account number couldn't be empty");
    } else if (ammount === "") {
      setMessageTotalAmount("Fill the ammount");
    } else {
      setMessageBankName("");
      setMessageAccountNumber("");
      setMessageTotalAmount("");
      navigate("/status-withdraw-idr", { state: formData });
      dispatch(createWithdrawIDR(formData));
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
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bank_id">
              Bank
            </label>
            <select id="withdrawBankName" name="bank_id" value={bank_id} onChange={onChange} className="block w-full mt-1 p-2 rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
              {bankUser ? (
                bankUser.map((bank) => {
                  console.log(bank);
                  return (
                    <option key={bank.id} value={bank.id}>
                      {bank.nama_bank}
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
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="account_number">
              Nomor Rekening
            </label>
            <input id="WithdrawIDRAccountNumber" name="account_number" type="text" value={account_number} onChange={onChange} className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            {messageAccountNumber && <div className="mt-1 text-sm text-red-500">{messageAccountNumber}</div>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Nama Pemilik Rekening
            </label>
            <input id="withdrawIDRAccountName" name="name" type="text" value={name} placeholder="0" onChange={onChange} className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            {messageAccountNumber && <div className="mt-1 text-sm text-red-500">{messageAccountNumber}</div>}
          </div>
          {!bankUser ? (
            <div className="flex flex-col items-center justify-between">
              <div className="w-full bg-[#FCCF08] hover:bg-blue-70 text-black font-bold py-2 px-4 mb-3 rounded-[34px] focus:outline-none focus:shadow-outline" onClick={onClickShow}>
                Ubah Akun Bank
              </div>
            </div>
          ) : null}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ammount">
              Total (IDR)
            </label>
            <input id="withdrawIDRTotal" name="ammount" type="text" value={ammount} placeholder="0" onChange={onChange} className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            {messageTotalAmount && <div className="mt-1 text-sm text-red-500">{messageTotalAmount}</div>}
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

export default FormWithdrawIDR;
