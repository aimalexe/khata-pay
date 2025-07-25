import React from "react";

export default function Settings() {
  return (
    <div className="flex flex-col min-h-[84vh] justify-between">
      <div>
        <h1 className="text-md font-bold text-green-700 mb-2">Settings</h1>
        <div className="flex justify-center items-center mt-40">
          <p className="text-gray-800 text-sm max-w-md text-center">
            Sometimes, taking a break and reflecting is the best setting you can
            choose. Remember, you’re doing great—keep going!
          </p>
        </div>
      </div>
    </div>
  );
}
