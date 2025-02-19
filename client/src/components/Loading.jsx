import React from "react";

export default function Skeleton() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-18 h-18 bg-gray-800 animate-pulse rounded-full flex justify-center items-center overflow-hidden">
        <p className="text-white  text-center">Loading</p>
      </div>
    </div>
  );
}
