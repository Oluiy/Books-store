import React from "react";

export const Spinner = () => {
  return (
    <>
      <div className="grid grid-flow-col grid-cols-2 w-[250px] h-[250px]">
        <div
          className="animate-spin w-[200px] h-[200px] ml-[610px] mt-[200px] bg-gray-400 rounded-[1.8rem] justify-center grid-col"
          viewbox="0 0 0 0"
        ></div><span className="text-4xl ml-[725px] mt-[285px]">Loading...</span>
      </div>
      
    </>
  );
};
