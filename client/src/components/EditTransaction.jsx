import React, { useState } from "react";
import { addTransactionForCustomer } from "@/services/customerHandling.services";
function EditTransaction({ customer, onClose, onSuccess, setCustomers }) {
  const [cashIn, setCashIn] = useState(0);
  const [cashOut, setCashOut] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    await addTransactionForCustomer(
      customer.id,
      parseFloat(cashIn) || 0,
      parseFloat(cashOut) || 0,
      setCustomers,
      () => {
        setLoading(false);
        if (onSuccess) onSuccess();
      }
    );
  };

  return (
    <div className="fixed inset-0 bg-[rgba(68,135,83,0.55)] backdrop-blur-xs flex items-center justify-center z-50">
      <div className="ml-60 bg-white flex flex-col items-center justify-center p-3 rounded-sm shadow-2xl w-80 max-w-sm">
        <h2 className="text-lg font-bold mb-4 text-green-700">
          Add Transaction for {customer.name}
        </h2>
        <div className="mb-3 w-full">
          <label className="block text-xs">Cash In</label>
          <input
            style={{ fontSize: "13px" }}
            type="number"
            className="w-full px-3 rounded-xl border border-gray-300 text-xs leading-tight focus:outline-none focus:ring-1 focus:ring-green-500"
            value={cashIn}
            onChange={(e) => setCashIn(e.target.value)}
            min="0"
          />
        </div>
        <div className="mb-3 w-full">
          <label className="block text-xs">Cash Out</label>
          <input
            style={{ fontSize: "13px" }}
            type="number"
            className="w-full px-3 rounded-xl border border-gray-300 text-xs leading-tight focus:outline-none focus:ring-1 focus:ring-green-500"
            value={cashOut}
            onChange={(e) => setCashOut(e.target.value)}
            min="0"
          />
        </div>
        <div className="flex justify-end gap-2 mt-6 w-full">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white rounded-xl hover:cursor-pointer hover:bg-gray-700"
            disabled={loading}
          >
            <span className="text-xs font-light px-2 py-1 flex items-center gap-1" style={{ fontFamily: "monospace" }}>
              Cancel
            </span>
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            style={{ fontFamily: "monospace" }}
          >
            {loading ?  <span className="text-xs font-light px-2 py-1 flex items-center gap-1  bg-green-700 rounded-xl  hover:bg-green-800 hover:cursor-pointer">Saving..</span> :<span className="flex bg-green-900  hover:bg-green-800 text-white justify-center items-center gap-1 rounded-xl py-1 px-2 text-xs  hover:cursor-pointer">Add transaction</span> }
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditTransaction; 