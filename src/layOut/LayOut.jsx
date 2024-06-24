import React from "react";
import Header from "../component/Header/Header";
import Footer from "../component/Footer/Footer";

function LayOut({ children }) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export default LayOut;
