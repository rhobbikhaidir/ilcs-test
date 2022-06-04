import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import useHttp from "../hooks/use-http";
import useInput from "../hooks/use-input";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SideBar from "../components/SideBar";

const npIsValid = (value) => value.trim().length >= 16;
const nameIsValid = (value) => value.trim() !== "";

const Home = () => {
  const navigate = useNavigate();

  // state from Redux
  const transaction = useSelector((state) => state.transaction);
  const harbors = useSelector((state) => state.harbor);
  const region = useSelector((state) => state.region);
  const idCountry = useSelector((state) => state.idCountry)
  const dispatch = useDispatch();

  // get ID
  const [destination, setDestination] = useState("");

  // GET DATA using costum Hooks
  const { error: errorRegion, sendRequest: getRequestRegion } = useHttp();
  const { error: errortHarbor, sendRequest: getRequestHarbor } = useHttp();

  // costum hooks for input
  const {
    value: npwpValue,
    hasError: npwpHasError,
    inputBlurHandler: npwpBlurHandler,
    inputOnlyNumber: npwpChangeHandler,
  } = useInput(npIsValid);
  const {
    value: name,
    hasError: nameHasError,
    inputBlurHandler: nameBlurHandler,
    valueChangeHandler: nameChangeHandler,
  } = useInput(nameIsValid);

  const changeTransactionHandler = (e) =>
    dispatch({ type: "transaction", payload: e.target.value });




  const getRegions = (data) => {
    data = data?.data?.map((d) => {
      return {
        // labelForAutoComplete INPUT
        label: d.ur_negara,
        ...d,
      };
    });
    dispatch({ type: "getRegion", payload: data });
  };

  const getHarbors = (data) => {
    data = data?.data?.map((d, index) => {
      return {
        // labelForAutoComplete INPUT
        id: index,
        label: d.ur_pelabuhan,
        ...d,
      };
    });
    dispatch({ type: "getHarbor", payload: data });
  };

  const getDataAPIRegion = () => {
    getRequestRegion(
      { url: "https://insw-dev.ilcs.co.id/n/negara?ur_negara=IND" },
      getRegions
    );
  };

  const getDataAPIHarbor = (id) => {
    getRequestHarbor(
      {
        url: `https://insw-dev.ilcs.co.id/n/pelabuhan?kd_negara=${id}`,
      },
      getHarbors
    );
  };

  useEffect(() => {
    console.log(idCountry)
    getDataAPIRegion();
    if (idCountry) {
      getDataAPIHarbor(idCountry.kd_negara);
    }
  }, [idCountry]);



  const getAllData = (e) => {
    e.preventDefault();
    const checkData = { idCountry, destination, name, npwpValue};
    console.log(checkData, transaction);
    if(name && idCountry && npwpValue && destination) {     
      dispatch({
        type: "homeData",
        payload: checkData,
      });
      dispatch({type: 'transaction', payload: transaction})
      navigate("/barang");
    }
  };

  return (
    <div className="flex flex-row m-10 h-screen">
      <SideBar onClick={getAllData} />
      <div className="border border-gray-400 w-3/4">
        <form className="flex flex-row m-10">
          <div>
            <p htmlFor="npwp" className="my-5">
              NPWP
            </p>
            <p htmlFor="nama" className=" my-10">
              NAMA
            </p>
            <p htmlFor="transaksi" className=" my-12 ">
              TRANSAKSI
            </p>
            <p htmlFor="negaraTujuan" className=" my-14">
              NEGARA {transaction === "export" ? "TUJUAN" : "ASAL"}
            </p>
            <p htmlFor="pelabuhanTujuan" className=" ">
              PELABUHAN TUJUAN
            </p>
          </div>
          <div className="flex flex-col ml-20">
            {npwpHasError && (
              <p className="text-red-400">
                Please Enter Valid Npwp (max 16 Digit)
              </p>
            )}
            <input
              onChange={npwpChangeHandler}
              onBlur={npwpBlurHandler}
              value={npwpValue}
              maxLength="16"
              type="text"
              className={`border-2  ${
                npwpHasError ? "border-red-500" : "border-gray-300"
              } rounded px-2 mb-4 h-14`}
            />
            {nameHasError && (
              <p className="text-red-400">Please Enter Valid Name</p>
            )}
            <input
              value={name}
              onChange={nameChangeHandler}
              onBlur={nameBlurHandler}
              type="text"
              id="nama"
              className={`border-2  ${
                nameHasError ? "border-red-500" : "border-gray-300"
              } rounded px-2 mb-4 h-14`}
            />
            <select
              name="transaksi"
              value={transaction}
              id="transaksi"
              onChange={changeTransactionHandler}
              className={`border-2 border-gray-300 h-14 rounded px-2 mb-4 bg-white`}
            >
              <option value="export">EXPORT</option>
              <option value="import">IMPORT</option>
            </select>
            {errorRegion && <p className="text-red-600">{errorRegion}</p>}
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              onChange={(e, value) => dispatch({type: 'idCountry', payload: value})}
              isOptionEqualToValue={(option, value) =>
                option.value === value.value
              }
              options={region}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Negara Tujuan" />
              )}
            />
            <div style={{ paddingTop: "20px" }} />
            {errortHarbor && <p className="text-red-600"> {errortHarbor}</p>}
            <Autocomplete
              key={harbors.id === undefined ? "" : harbors.id}
              disablePortal
              id="combo-box-demo"
              onChange={(e, value) => setDestination(value)}
              isOptionEqualToValue={(option, value) =>
                option.value === value.value
              }
              options={harbors}
              sx={{ width: 300, height: 30 }}
              renderInput={(params) => (
                <TextField {...params} label="Negara Tujuan" />
              )}
            />
          </div>
        </form>
      </div>


    </div>
  );
};

export default Home;
