import React from "react";
import PageLayout from "../../components/PageLayout";
import Carousel from "../../components/Carousel";
import HomeProduct from "../../components/Product/HomeProduct";

let HomePage = () => {
  return (
    <div >
      <PageLayout >
        <div className=" px-32">
          <Carousel />
          <HomeProduct />
        </div>
      </PageLayout>
    </div>
  );
}

export default HomePage;
