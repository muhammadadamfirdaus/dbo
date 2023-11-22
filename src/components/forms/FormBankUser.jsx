import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createBankUser, getBankUser, updateBankUser } from "../../features/banks/bankUser/bankUserSlice";

function FormBankUser() {
  const { user } = useSelector((state) => state.auth);
  const { bankUser } = useSelector((state) => state.bankUser);
  const bankData = bankUser && bankUser[0];

  console.log(bankUser);

  const [showAddBank, setShowAddBank] = useState(false); // toggle add bank

  const [formData, setFormData] = useState({
    nama_akun: bankData && bankData.nama_akun,
    nama_bank: bankData && bankData.nama_bank,
    nomor_rekening: bankData && bankData.nomor_rekening,
  });

  const { nama_akun, nama_bank, nomor_rekening } = formData;

  const [messageBankName, setMessageBankName] = useState();
  const [messageAccountNumber, setMessageAccountNumber] = useState();
  const [messageTotalAmount, setMessageTotalAmount] = useState();
  const [messageSuccess, setMessageSuccess] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    // if (isSuccess) {
    //   // navigate("/deposit-idr");
    // }

    console.log(showAddBank);
    // dispatch(reset());
    dispatch(getBankUser());
  }, [user, dispatch]);

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
  };

  const onSubmitAddBank = (e) => {
    e.preventDefault();

    dispatch(createBankUser(formData));
    setMessageSuccess(bankUser.msg);

    console.log(formData);
    // cek jika user typing . di jumlah withdraw
    // if (bankname === "" && totalamount === "") {
    //   setMessageBankName("Please select bank name");
    //   setMessageAccountNumber("Input your account bank number");
    //   setMessageTotalAmount("Fill the amount");
    // } else if (bankname === "") {
    //   setMessageBankName("Bank name couldn't be empty");
    // } else if (accountnumber === "") {
    //   setMessageAccountNumber("Account number couldn't be empty");
    // } else if (totalamount === "") {
    //   setMessageTotalAmount("Fill the amount");
    // } else {
    //   setMessageBankName("");
    //   setMessageAccountNumber("");
    //   setMessageTotalAmount("");
    //   console.log(formData);
    //   // navigate("/transfer-bank", { state: formData });
    // }
  };

  const onSubmitUpdateBank = (e) => {
    e.preventDefault();

    // dispatch(updateBankUser(formData));

    console.log(formData);
  };

  return (
    <>
      <div className="px-4 py-2">
        <span>{messageSuccess}</span>
      </div>
      <form onSubmit={bankUser && bankUser ? onSubmitAddBank : onSubmitUpdateBank}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nama_bank">
            Bank
          </label>
          <select id={bankUser && bankUser ? "createUserBankList" : "updateUserBankList"} name="nama_bank" value={nama_bank} onChange={onChange} className="block w-full mt-1 p-2 rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
            <>
              <option defaultValue>{nama_bank ? nama_bank : <>Choose Bank</>}</option>
              <option value="BCA">BCA</option>
              <option value="BNI">BNI</option>
              <option value="BRI">BRI</option>
              <option value="Mandiri">Mandiri</option>
            </>
          </select>
          {messageBankName && <div className="mt-1 text-sm text-red-500">{messageBankName}</div>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nomor_rekening">
            Nomor Rekening
          </label>
          <input id={bankUser && bankUser ? "createUserAccountNumber" : "udpateUserAccountNumber"} name="nomor_rekening" type="text" value={nomor_rekening} placeholder="0" onChange={onChange} className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          {messageAccountNumber && <div className="mt-1 text-sm text-red-500">{messageAccountNumber}</div>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nama_akun">
            Nama Pemilik Rekening
          </label>
          <input id={bankUser && bankUser ? "createUserAccountName" : "updateUserAccountName"} name="nama_akun" type="text" value={nama_akun} placeholder="John Doe" onChange={onChange} className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          {messageTotalAmount && <div className="mt-1 text-sm text-red-500">{messageTotalAmount}</div>}
        </div>
        <div className="flex flex-col items-center justify-between">
          {bankUser ? (
            <button className={`w-full bg-[#FCCF08] hover:bg-blue-70 text-black font-bold py-2 px-4 mb-3 rounded-[34px] focus:outline-none focus:shadow-outline`} type="submit">
              {bankUser && bankUser ? "Save" : "Update"}
            </button>
          ) : null}

          {/* <button className="w-full bg-[#FCCF08] hover:bg-blue-70 text-black font-bold py-2 px-4 mb-3 rounded-[34px] focus:outline-none focus:shadow-outline" type="submit">
              Cancel
            </button> */}
        </div>
      </form>
    </>
  );
}

export default FormBankUser;
