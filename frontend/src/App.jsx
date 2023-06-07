// import logo from "./logo.svg";
import "./App.css";

import Product from "./components/product/index.jsx";
import AddProduct from "./components/product/addProduct.jsx";
import { Routes, Route } from "react-router-dom";
import CustomNavbar from "./components/layout/navbar.jsx";
import CustomFooter from "./components/layout/footer.jsx";
import Error from "./components/Error";

function App() {
  return (
    <>
      {/* Navbar */}
      <CustomNavbar />

      {/* Body */}
      <Routes>
        <Route path="/" element={<Product />} />
        <Route path="/add-Product" element={<AddProduct />} />
        <Route path="*" element={<Error />} />
      </Routes>

      {/* Footer */}
      <CustomFooter />
    </>
  );
}

export default App;
