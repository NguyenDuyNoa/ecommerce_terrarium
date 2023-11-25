import React from "react";
import Header from "../Header";
import Navigation from "../Navigation";
import Footer from "../Footer";
import FAB from "../FAB";

const PageLayout = ({ children }) => {

  return (
    <div >
      <Header />
      <Navigation />
      {children}
      <div className="w-10 absolute z-50 ">
        <FAB />
      </div>
      <Footer />
    </div>
  );
};

export default PageLayout;
