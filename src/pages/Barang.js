import useInput from "../hooks/use-input";
import React, { Fragment, useEffect, useState } from "react";
import useHttp from "../hooks/use-http";
import { useDispatch, useSelector } from "react-redux";
import SideBar from "../components/SideBar";
import { useNavigate } from "react-router-dom";

const amountIsValid = (value) => value.trim().length >= 1;
const priceIsValid = (value) => value.trim().length >= 2;

const Barang = () => {
  const navigate = useNavigate();
  const transactionType = useSelector((state) => state.transaction);
  const homeData = useSelector((state) => state.homeData);
  const hsCode = useSelector((state) => state.hsCode);
  const dispatch = useDispatch();

  const [hasCodeFormat, setHasCodeFormat] = useState(null);
  const [trfData, setTrfData] = useState({
    tarif: "",
    ppn: "",
  });

  const [totalHarga, setTotalHarga] = useState("");
  const [uraianHsCode, setUraianHsCode] = useState("");
  const [subHeaderHsCode, setSubHeaderHsCode] = useState("");

  // getData using CostumHooks
  const { error: errorHsCode, sendRequest: hsCodeGetRequest } = useHttp();
  const { error: errorTrfCode, sendRequest: trfCodeGetRequest } = useHttp();
  const { error: errorSubmit, sendRequest: postDataRequest } = useHttp();

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
    dispatch({ type: "hsCode", payload: res });
  };

  const getTrf = (data) => {
    const response = data.data;
    response?.map((res) => {
      if (transactionType === "export") {
        setTrfData({
          tarif: res.bk,
          ppn: res.ppnbk,
        });
      } else if (transactionType === "import") {
        setTrfData({
          tarif: res.bm,
          ppn: res.ppnbm,
        });
      } else {
        setTrfData({
          ...trfData,
        });
      }
      return null;
    });
  };

  useEffect(() => {
    if (trfData) {
      const totalPrice =
        +hgBarangVal +
        +trfData.tarif * +hgBarangVal +
        +trfData.ppn * +hgBarangVal;
      setTotalHarga(totalPrice);
      console.log("test", totalPrice);
    }

    console.log(transactionType)

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
  }, [
    trfCodeGetRequest,
    hasCodeFormat,
    jmlBarangVal,
    hgBarangVal,
    transactionType
  ]);

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

  const onSubmit = () => {
    const dataHome = homeData;
    const dataBarang = {
      dataHome,
      hgBarangVal,
      hsCode,
      totalHarga,
      trfData,
    };

    console.log(dataBarang);
    // const res = postDataRequest({
    //   url: "https://insw-dev.ilcs.co.id/n/simpan",
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: dataBarang,
    // });

    // console.log(res);
  };

  const backClickHandler = () => {
    navigate("/");
  };

  return (
    <Fragment>
      <div className="flex flex-row m-10 h-screen">
        <SideBar onBack={backClickHandler} />
        <div className="border border-gray-400 w-3/4">
          {transactionType === "" ? (
            <h1 className="text-center my-10 text-xl text-red-600">
              Please enter value before
            </h1>
          ) : (
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
                  {hsCode.map((data) => {
                    return (
                      <option value="export" key={data.hs_code_format}>
                        {data.hs_code_format}
                      </option>
                    );
                  })}
                </select>

                <input
                  type="text"
                  id="jumlahBarang"
                  value={jmlBarangVal}
                  onBlur={jmlBlurHanlder}
                  onChange={jmlBarangChangeHandler}
                  placeholder={
                    jmlHasError ? "minimal jumlah adalah 1" : "Jumlah Harga"
                  }
                  className={`border-2  ${
                    jmlHasError ? "border-red-500" : "border-teal-700"
                  } rounded px-2 mb-10`}
                  style={{ width: 200 }}
                />
                {errorTrfCode && <p className="text-red-500">{errorTrfCode}</p>}
                <input
                  type="text"
                  id="tarif"
                  onChange={trfChangeHandler}
                  value={trfData.tarif}
                  className="border-2 border-teal-700 rounded px-2 mb-12"
                  style={{ width: 200 }}
                />
                <p>{totalHarga ?? "total"}</p>
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
                <input
                  type="text"
                  id="text"
                  placeholder={hgBarangHasError ? "Minimal 2 Digit" : "Harga"}
                  value={hgBarangVal}
                  onBlur={hgBarangBlurHandler}
                  onChange={hgBarangChangeHandler}
                  className={`border-2 ${
                    hgBarangHasError ? "border-red-600" : "border-teal-700"
                  }  rounded px-2 mb-11`}
                  style={{ width: 200 }}
                />
                <input
                  placeholder="ppn"
                  value={trfData.ppn}
                  onChange={trfPpnChangeHandler}
                  type="text"
                  id="tarifPPN"
                  className="border-2 border-teal-700 rounded px-2 mb-10"
                  style={{ width: 200 }}
                />
              </div>
              <div className="flex justify-end flex-col  ">
                <button
                  className="border-2 border-teal-800 px-3 rounded bg-teal-100"
                  onClick={onSubmit}
                >
                  ADD
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Barang;
