import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Barang from "./pages/Barang";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/barang" element={<Barang />} />
    </Routes>
  );
}

export default App;
