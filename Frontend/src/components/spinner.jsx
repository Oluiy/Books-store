import React from "react";

export const Spinner = () => {
  return (
    <>
      <div className="grid grid-cols-2">
        <div
          className="animate-spin w-[200px] h-[200px] ml-[620px] mt-[200px] bg-gray-700 rounded-3xl justify-center grid-cols-1"
          viewbox="0 0 0 0"
        ></div>
        <span className="text-3xl ml-[800px] mb-[300px]">Loading...</span>
      </div>
    </>
  );
};
