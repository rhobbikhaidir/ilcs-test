import useInput from "../hooks/use-input";
import React, { useEffect, useState } from "react";
import useHttp from "../hooks/use-http";
import { useSelector } from "react-redux";
import SideBar from "../components/SideBar";
import { useNavigate } from "react-router-dom";

const amountIsValid = (value) => value.trim().length >= 1;
const priceIsValid = (value) => value.trim().length >= 2;

const Barang = () => {
  const navigate = useNavigate();
  // const allData = useSelector((state) => state.allData);
  const [hsCodeData, setHsCodeData] = useState([]);
  const [hasCodeFormat, setHasCodeFormat] = useState(null);
  const [trfData, setTrfData] = useState({
    hsCode: "",
    bm: "",
    ppnbm: "",
    bk: "",
    ppnbk: "",
  });

  const [uraianHsCode, setUraianHsCode] = useState("");
  const [subHeaderHsCode, setSubHeaderHsCode] = useState("");

  // getData using CostumHooks
  const { error: errorHsCode, sendRequest: hsCodeGetRequest } = useHttp();
  const { error: errorTrfCode, sendRequest: trfCodeGetRequest } = useHttp();

  // costum hooks Input
  const {
    value: hgBarangVal,
    inputOnlyNumber: hgBarangChangeHandler,
    hasError: hgBarangHasError,
    inputBlurHandler: hgBarangBlurHandler,
  } = useInput(priceIsValid);
  const {
    value: jmlBarangVal,
    inputOnlyNumber: jmlBarangChangeHandler,
    hasError: jmlHasError,
    inputBlurHandler: jmlBlurHanlder,
  } = useInput(amountIsValid);

  const getHsCode = (data) => {
    const res = data.data;
    res.map((d) => {
      setHasCodeFormat(d.hs_code_format);
      setSubHeaderHsCode(d.sub_header);
      setUraianHsCode(d.uraian_id);
      return null;
    });
    console.log("test res hsCode", res);
    setHsCodeData(res);
  };

  const getTrf = (data) => {
    const response = data.data;
    response?.map((res) =>
      setTrfData({
        hsCode: res.hs_code,
        bm: res.bm,
        ppnbm: res.ppnbm,
        bk: res.bk,
        ppnbk: res.ppnbk,
      })
    );
    console.log(trfData);
  };

  useEffect(() => {
    if (trfData) {
      const totalHarga =
        +hgBarangVal +
        +trfData.bk * +hgBarangVal +
        +trfData.ppnbk * +hgBarangVal;
      console.log(totalHarga);
    }

    const local = localStorage.getItem("transaction");
    console.log(local);
    hsCodeGetRequest(
      { url: "https://insw-dev.ilcs.co.id/n/barang?hs_code=01063300" },
      getHsCode
    );
    if (hasCodeFormat) {
      trfCodeGetRequest(
        { url: `https://insw-dev.ilcs.co.id/n/tarif?hs_code=${hasCodeFormat}` },
        getTrf
      );
    }
  }, [hsCodeGetRequest, trfCodeGetRequest, hasCodeFormat]);

  const hsCodeChangeHandler = (e) => {
    setUraianHsCode(e.target.value);
  };

  const subHeaderHandler = (e) => {
    setSubHeaderHsCode(e.target.value);
  };

  const trfChangeHandler = (e) => {
    setTrfData((prevState) => {
      return {
        ...prevState,
        bk: e.target.value,
      };
    });
  };

  const trfPpnChangeHandler = (e) => {
    setTrfData((prevState) => {
      return {
        ...prevState,
        ppnbk: e.target.value,
      };
    });
  };

  const backClickHandler = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-row m-10 h-screen">
      <SideBar onBack={backClickHandler} />
      <div className="border border-gray-400 w-3/4">
        <form className="flex flex-row m-10">
          <div className="min-w-fit">
            <p htmlFor="hsCode" className="mb-12">
              HS CODE
            </p>
            <p htmlFor="jumlahBarang" className="mb-12">
              JUMLAH BARANG
            </p>
            <p htmlFor="tarif" className="mb-12">
              TARIF *
            </p>
            <p htmlFor="totalHarga" className="mb-12">
              TOTAL HARGA
            </p>
          </div>
          <div className="flex flex-col mx-10 ">
            {errorHsCode && <p className="text-red-500">{errorHsCode}</p>}
            <select
              name="hsCode"
              id="hsCode"
              className="border-2 border-teal-700 rounded px-2 mb-12 bg-white "
              style={{ width: 200 }}
            >
              {hsCodeData.map((data) => {
                return (
                  <option value="export" key={data.hs_code_format}>
                    {data.hs_code_format}
                  </option>
                );
              })}
            </select>
            {jmlHasError && (
              <p className="text-red-600">minimal jumlah adalah 1</p>
            )}
            <input
              type="text"
              id="jumlahBarang"
              value={jmlBarangVal}
              onBlur={jmlBlurHanlder}
              onChange={jmlBarangChangeHandler}
              className={`border-2  ${
                jmlHasError ? "border-red-500" : "border-gray-300"
              } rounded px-2 mb-4`}
              style={{ width: 200 }}
            />
            {errorTrfCode && <p className="text-red-500">{errorTrfCode}</p>}
            <input
              type="text"
              id="tarif"
              onChange={trfChangeHandler}
              value={trfData.bk}
              className="border-2 border-teal-700 rounded px-2 mb-12"
              style={{ width: 200 }}
            />
            <input
              type="text"
              placeholder="totalHarga"
              id="totalHarga"
              className="border-2 border-teal-700 rounded px-2 mb-11"
              style={{ width: 200 }}
            />
          </div>
          <div className="min-w-fit">
            <input
              type="text"
              value={uraianHsCode}
              onChange={hsCodeChangeHandler}
              id="npwp"
              className="border-2 border-teal-700 rounded px-2 mb-11"
              style={{ width: 200 }}
            />
            <p htmlFor="nama" className="mb-11">
              HARGA BARANG
            </p>
            <p htmlFor="transaksi" className="mb-11">
              TARIF PPN *
            </p>
          </div>
          <div className="flex flex-col ml-10">
            <input
              type="text"
              id="npwp"
              onChange={subHeaderHandler}
              value={subHeaderHsCode}
              className="border-2 border-teal-700 rounded px-2 mb-11"
              style={{ width: 200 }}
            />
            {hgBarangHasError && (
              <p className="text-red-600">Minimal 2 Digit </p>
            )}
            <input
              type="text"
              id="text"
              placeholder="harga"
              value={hgBarangVal}
              onBlur={hgBarangBlurHandler}
              onChange={hgBarangChangeHandler}
              className={`1border-2 ${
                hgBarangHasError ? "border-red-600" : "border-gray-300"
              }  rounded px-2 mb-11`}
              style={{ width: 200 }}
            />
            <input
              placeholder="ppn"
              value={trfData.ppnbk}
              onChange={trfPpnChangeHandler}
              type="text"
              id="tarifPPN"
              className="border-2 border-teal-700 rounded px-2 mb-10"
              style={{ width: 200 }}
            />
          </div>
        </form>
        <div className="flex justify-end mr-12 -mt-10">
          <button className="border-2 border-teal-800 px-3 rounded bg-teal-100">
            ADD
          </button>
        </div>
      </div>
    </div>
  );
};

export default Barang;
