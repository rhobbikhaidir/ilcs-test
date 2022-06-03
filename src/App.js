import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Page2 from "./pages/Page2";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/barang" element={<Page2 />} />

    </Routes>
  );
}

export default App;
