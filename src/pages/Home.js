import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import useHttp from "../hooks/use-http";
import useInput from "../hooks/use-input";

const Home = () => {
  const [region, setRegion] = useState([]);
  const [kdCountry, setKdCountry] = useState(null);
  const [harbors, setHarbors] = useState([]);

  const { error: errorRegion, sendRequest: getRequestRegion } = useHttp();
  const { error: errortHarbor, sendRequest: getRequestHarbor } = useHttp();

  // const {
  //   value: npwpValue,
  //   valueChangeHandler: npwpChangeHandler,
  //   inputBlurHandler: npwpBlurHandler,
  // } = useInput();

  const getRegions = (data) => {
    data = data?.data?.map((d) => {
      return {
        label: d.ur_negara,
        ...d,
      };
    });
    console.log(data);
    setRegion(data);
  };
  console.log("Region", region);

  const getHarbors = (data) => {
    data = data?.data?.map((d, index) => {
      // console.log(index);
      return {
        id: index,
        label: d.ur_pelabuhan,
        ...d,
      };
    });
    const id = harbors.map((har) => {
      return har.id
    })
       console.log(id) 
    setHarbors(data);
  };

  console.log("ini data harbors", );
  useEffect(() => {
    console.log(kdCountry);
    getRequestRegion(
      { url: "https://insw-dev.ilcs.co.id/n/negara?ur_negara=IND" },
      getRegions
    );
    if (kdCountry) {
      getRequestHarbor(
        {
          url: `https://insw-dev.ilcs.co.id/n/pelabuhan?kd_negara=${kdCountry}`,
        },
        getHarbors
      );
    }
  }, [getRequestRegion, getRequestHarbor, kdCountry]);

  return (
    <div className="flex flex-row m-10 h-screen">
      <div className="border border-gray-400 w-1/4 mr-6 pt-10 ">
        <p>
          <a href="/" className="text-lg text-gray-800 pl-10">
            Perusahan
          </a>
        </p>
        <p>
          <a href="/barang" className="text-lg text-gray-800 pl-10">
            Barang
          </a>
        </p>
      </div>
      <div className="border border-gray-400 w-3/4">
        <form className="flex flex-row m-10">
          <div>
            <p htmlFor="npwp" className="mb-10">
              NPWP
            </p>
            <p htmlFor="nama" className="mb-10">
              NAMA
            </p>
            <p htmlFor="transaksi" className="mb-10">
              TRANSAKSI
            </p>
            <p htmlFor="negaraTujuan" className="mb-10">
              NEGARA TUJUAN
            </p>
            <p htmlFor="pelabuhanTujuan" className="mb-10">
              PELABUHAN TUJUAN
            </p>
          </div>
          <div className="flex flex-col ml-20">
            <input
              type="text"
              id="npwp"
              className="border-2 border-teal-700 rounded px-2 mb-4 h-14"
            />
            <input
              type="text"
              id="nama"
              className="border-2 border-teal-700 h-14 rounded px-2 mb-4"
            />
            <select
              name="transaksi"
              id="transaksi"
              className="border-2 border-teal-700 h-14 rounded px-2 mb-4 bg-white"
            >
              <option value="export">EXPORT</option>
              <option value="import">IMPORT</option>
            </select>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              onChange={(e, value) => setKdCountry(value.kd_negara)}
              isOptionEqualToValue={(option, value) =>
                option.value === value.value
              }
              options={region}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Negara Tujuan" />
              )}
            />
            <Autocomplete
              key={harbors.id === undefined ? '' : harbors.id}
              disablePortal
              id="combo-box-demo"
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
