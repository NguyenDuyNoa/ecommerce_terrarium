import React, { useState, useEffect } from "react";
import { slides } from "../../constant.js";

const Carousel = () => {
  const [curr, setCurr] = useState(0);

  const next = () =>
    setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1));

  useEffect(() => {
    const interval = setInterval(() => {
      next();
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative m-auto flex justify-center mb-6">
      <div
        className="relative h-96 w-full block bg-cover bg-no-repeat rounded-lg transition duration-700 ease-in-out"
        style={{
          backgroundImage: `url(${slides[curr].url})`,
        }}
      />
    </div>
  );
};

export default Carousel;
