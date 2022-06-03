import React, { useEffect, useState } from "react";
import useHttp from "../hooks/use-http";

const Barang = () => {
  const [hsCodeValue, setHsCodeValue] = useState([]);
  const [uraianHsCode, setUraianHsCode] = useState('')
  const [subHeaderHsCode, setSubHeaderHsCode] = useState('')

  const { error: errorHsCode, sendRequest: hsCodeGetRequest } = useHttp();

  const getHsCode = (data) => {
    const uraianId = data.data.map((d) => {
      setSubHeaderHsCode(d.sub_header)
      setUraianHsCode(d.uraian_id)
    })
    setHsCodeValue(data.data);
  };

  useEffect(() => {
    hsCodeGetRequest(
      { url: "https://insw-dev.ilcs.co.id/n/barang?hs_code=01063300" },
      getHsCode
    );
  }, [hsCodeGetRequest]);

  const hsCodeChangeHandler = (e) => {
    setUraianHsCode(e.target.value)
  }

  const subHeaderHandler = (e) => {
    setSubHeaderHsCode(e.target.value)
  }
 
  return (
    <div className="flex flex-row m-10 h-screen">
      <div className="border border-gray-400 w-1/4 mr-6 pt-10 ">
        <p>
          <a href="/" className="text-lg text-gray-800 pl-10">
            Perusahan
          </a>
        </p>
        <p className="text-lg text-gray-800 pl-10 pt-8">Barang</p>
      </div>
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
            <select
              name="hsCode"
              id="hsCode"
              className="border-2 border-teal-700 rounded px-2 mb-12 bg-white "
              style={{ width: 200 }}
            >
              {hsCodeValue.map((data) => {
                return (
                  <option value="expor" key={data.hs_code_format}>{data.hs_code_format}</option>
                )
              })}
            </select>
            <input
              type="text"
              id="jumlahBarang"
              className="border-2 border-teal-700 rounded px-2 mb-10"
              style={{ width: 200 }}
            />
            <input
              type="text"
              id="tarif"
              className="border-2 border-teal-700 rounded px-2 mb-12"
              style={{ width: 200 }}
            />
            <input
              type="text"
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
            <input
              type="text"
              id="nama"
              className="border-2 border-teal-700 rounded px-2 mb-11"
              style={{ width: 200 }}
            />
            <input
              type="text"
              id="negaraTujuan"
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
