import React, { useState, useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../Loading";
import { Link, useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-number-input";
import { HiChevronRight } from "react-icons/hi2";
import Nav from "../Nav";
import { BreadcrumbGoBack } from "../breadcrumb/Breadcrumb";
import { getCountries, getCountryCallingCode } from "react-phone-number-input/input";
import en from "react-phone-number-input/locale/en";
import { createKYC, reset } from "../../features/kyc/kycSlice";

import "react-phone-number-input/style.css";
import Button from "../utilities/button";

function FormKYC1() {
  // CAUTION!
  // di sini kita memisahkan form select negara karena menggunakan library beda sendiri dari form lainnya.

  const { user } = useSelector((state) => state.auth);
  const { kyc, isLoading, isError, isSuccess, message } = useSelector((state) => state.kyc);
  // console.log(createKYC);

  const labelCountry = en;
  const [formDataCountry, setFormDataCountry] = useState();

  const [formDataPhoneNumber, setFormDataPhoneNumber] = useState();

  const [formData, setFormData] = useState({
    full_name: "",

    address: "",
    id_number: "",
    npwp_number: "",
    file_npwp: "",
    file_ktp: "",
    image: "",
  });

  const { full_name, address, id_number, npwp_number, file_npwp, file_ktp, image } = formData;

  // gabungkan data negara dan lainnya
  const step1Data = {
    ...formData,
    country: formDataCountry ? formDataCountry : "",
    phone_number: formDataPhoneNumber ? formDataPhoneNumber : "",
  };

  // const [messageKYCStep1, setMessageKYCStep1] = useState(message);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      // console.log(message);
      // setMessageAmountXAU(message);
    }

    if (isSuccess) {
      // console.log(amount_xau, message);
      // dispatch(reset());
      navigate("/status-kyc", {
        state: {
          step1Data,
          status: "pending",
        },
      });
    }
  }, [user, isError, isSuccess, message, dispatch]);

  if (isLoading) {
    return <Loading />;
  }

  const onChange = (e) => {
    // console.log(e.target.value);
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

    // cek jika user typing . di jumlah deposit
    // if (price === "") {
    //   setMessagePrice("");
    // } else if (isNaN(price)) {
    //   setMessagePrice(`Hanya nomor aja lah woy. Jangan yg aneh-aneh...`);
    // } else {
    //   setMessagePrice("");
    // }
  };

  const onChangeCountry = (e) => {
    setFormDataCountry(e.target.value);
  };

  const onChangePhoneNumber = (e, b, c) => {
    setFormDataPhoneNumber(e);
    console.log(e, b, c);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    console.log();

    dispatch(createKYC(step1Data));

    // cek jika user typing . di jumlah deposit
    // if (!isSuccess) {
    //   console.log(isSuccess);
    //   setMessageKYCStep1(message);
    // } else {
    //   setMessageKYCStep1("");
    //   navigate("/status-sell-xau", {
    //     state: {
    //       formData,
    //       status: "pending",
    //     },
    //   });
    // }

    // if (isError) {
    //   setMessageKYCStep1(message);
    // } else if (!isError) {
    //   dispatch(createSell(formData));
    // }
  };

  console.log(step1Data);

  return (
    <>
      <div className="px-6 pb-32">
        <div className="md:px-8">
          <form onSubmit={onSubmit}>
            <h1 className="font-bold text-xl text-center mt-8 mb-4">Personal Information</h1>
            {/* full name */}
            <div className="py-2 flex flex-col border-b border-gray-100">
              <h3 className="font-semibold">Nama Lengkap</h3>
              <span className="text-base text-gray-400 mb-2">Nama harus sesuai kartu identitas</span>
              <input id="kycFullName" name="full_name" type="text" value={full_name} placeholder="Nama Lengkap" onChange={onChange} className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            {/* end full name */}
            {/* end citizenship */}
            <div className="py-2 flex flex-col border-b border-gray-100">
              <h3 className="font-semibold">Kewarganegaraan</h3>
              <span className="text-base text-gray-400 mb-2">Pilih negara asal.</span>

              <select value={formDataCountry} onChange={onChangeCountry}>
                <option value="">{labelCountry["ZZ"]}</option>
                {getCountries().map((negara) => {
                  // console.log(labelCountry[negara]);

                  return (
                    <option key={negara} value={labelCountry[negara]}>
                      {labelCountry[negara]}
                    </option>
                  );
                })}
              </select>
            </div>
            {/* end citizenship */}
            {/* phone number */}
            <div className="py-2 flex flex-col border-b border-gray-100">
              <h3 className="font-semibold">Telepon</h3>
              <span className="text-base text-gray-400 mb-2">Masukkan nomor telepon Anda.</span>
              <PhoneInput placeholder="Enter phone number" defaultCountry="ID" value={formDataPhoneNumber} onChange={onChangePhoneNumber} />
            </div>
            {/* end phone number */}
            {/* address */}
            <div className="py-2 flex flex-col border-b border-gray-100">
              <h3 className="font-semibold">Alamat</h3>
              <span className="text-base text-gray-400 mb-2">Alamat harus sesuai kartu identitas</span>
              <textarea id="kycAddress" name="address" type="text" value={address} placeholder="Place text here" onChange={onChange} className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            {/* end address */}

            {/* identity */}
            <div className="py-2 flex flex-col border-b border-gray-100">
              <h3 className="font-semibold">Nomor Identitas</h3>
              <span className="text-base text-gray-400 mb-2">Masukkan nomor induk kependudukan Anda.</span>
              <input id="kycIDNumber" name="id_number" type="text" value={id_number} placeholder="367098577439" onChange={onChange} className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            {/* end identity */}
            {/* upload identity */}
            <div className="py-2 flex flex-col border-b border-gray-100">
              <h3 className="font-semibold">Nomor Identitas</h3>
              <span className="text-base text-gray-400 mb-2">Masukkan nomor induk kependudukan Anda.</span>
              <input id="kycUploadIDNumber" name="file_ktp" type="file" value={file_ktp} placeholder="Drop your file" onChange={onChange} className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            {/* end upload identity */}
            {/* tax id */}
            <div className="py-2 flex flex-col border-b border-gray-100">
              <h3 className="font-semibold">Tax ID</h3>
              <span className="text-base text-gray-400 mb-2">Masukkan nomor npwp Anda.</span>
              <input id="kycTaxID" name="npwp_number" type="text" value={npwp_number} placeholder="367098577439" onChange={onChange} className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            {/* end tax id */}
            {/* upload tax id */}
            <div className="py-2 flex flex-col border-b border-gray-100">
              <h3 className="font-semibold">Nomor Identitas</h3>
              <span className="text-base text-gray-400 mb-2">Masukkan nomor induk kependudukan Anda.</span>
              <input id="kycUploadTaxID" name="file_npwp" type="file" value={file_npwp} placeholder="Drop your file" onChange={onChange} className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            {/* end upload tax id */}
            <div className="py-2 flex flex-row-reverse">
              {/* <div>x</div> */}
              {/* <Button type={"submit"}> */}
              {/* <Link to={""}> */}
              {/* Kirim */}
              {/* </Link> */}
              {/* </Button> */}
              <button className="inline-block bg-[#FCCF08] hover:bg-blue-70 text-black font-bold py-2 px-8 rounded-[34px] focus:outline-none focus:shadow-outline" type="submit">
                <span className="text-slate-600">Kirim</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default FormKYC1;
