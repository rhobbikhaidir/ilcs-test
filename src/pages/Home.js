import React, { useEffect, useState } from "react";
import useHttp from "../hooks/use-http";

const Home = () => {
  const [task, setTask] = useState([]);
  const { error, sendRequest: getData } = useHttp();

  const getTasks = (data) => {
    setTask(data.data);
  };

  console.log(task)

  useEffect(() => {
    getData({ url: "https://insw-dev.ilcs.co.id/n/negara?ur_negara=IND" }, getTasks);
  }, [getData]);

  return (
    <div className="flex flex-row px-12 mt-10">
      <div className="border border-gray-400 w-1/4 mx-6 text-center ">
        <div>
          <a href="/" className="text-lg text-gray-800">
            Perusahan
          </a>
        </div>
        <div>
          <a href="/" className="text-lg text-gray-800">
            Barang
          </a>
        </div>
      </div>
      <div className="border border-gray-400 w-3/4">test</div>
    </div>
  );
};

export default Home;
