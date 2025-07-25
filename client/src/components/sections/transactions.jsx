import React, { useEffect, useState } from 'react';
import { getCustomersFromAPI, getCustomerWithTransactions } from '@/services/customerHandling.services';

export default function TransactionsSection() {
  const [customers, setCustomers] = useState([]);
  const [showHistory, setShowHistory] = useState({}); 
  const [transactionsData, setTransactionsData] = useState({});

  useEffect(() => {
    getCustomersFromAPI(setCustomers);
  }, []);

  const handleToggle = async (customerId) => {
    setShowHistory((prev) => ({ ...prev, [customerId]: !prev[customerId] }));
    if (!transactionsData[customerId]) {
      try {
        const data = await getCustomerWithTransactions(customerId);
        setTransactionsData((prev) => ({ ...prev, [customerId]: data }));
      } catch (err) {
        console.error('Error In transactions:', err);
      }
    }
  };

  return (
    <div>
      <h1 className="text-md font-bold text-green-700 ">Transactions History</h1>
      {customers.length === 0 ? (
        <p className="text-gray-900 text-center mt-10 font-medium">No customers found</p>
      ) : (
        <ul className="grid md:grid-cols-1 gap-2">
          {customers.map((customer) => (
            <li key={customer.id} className="p-2 bg-white shadow-xs rounded mb-2">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xs font-bold" style={{fontSize:"11px"}}>{customer.name}</p>
                  <p className="text-xs text-gray-600" style={{fontSize:"11px"}} >Phone: {customer.phone_number}</p>
                  <p className="text-xs font-medium" style={{fontSize:"11px"}}>Running Balance: Rs. {customer.runningBalance}</p>
                </div>
                <button
                  onClick={() => handleToggle(customer.id)}
                  className={`px-3 hover:cursor-pointer rounded text-xs font-normal ${showHistory[customer.id] ? ' hover:cursor-pointer bg-green-700 text-white' : 'bg-gray-200 text-green-700'} transition duration-150 ` }
                  style={{fontSize:"11px",
                    marginRight:"30px",
                    fontFamily:"poppins"
                  }}
                >
                  {showHistory[customer.id] ? 'Hide Transaction History' : 'Show Transaction History'}
                </button>
              </div>
              <div className={`transaction-slider${showHistory[customer.id] && transactionsData[customer.id] ? ' open' : ''} mt-3`}>
                {transactionsData[customer.id] && transactionsData[customer.id].transactions && transactionsData[customer.id].transactions.length > 0 ? (
                  <table className="w-full text-xs border border-green-900  mt-1 text-center">
                    <thead >
                      <tr className="bg-[#f0faf2]">
                        <th className="p-1 border text-xs" style={{fontFamily:"monospace"}}>Date</th>
                        <th className="p-1 border text-xs" style={{fontFamily:"monospace"}}>Cash In</th>
                        <th className="p-1 border text-xs" style={{fontFamily:"monospace"}}>Cash Out</th>
                        <th className="p-1 border text-xs" style={{fontFamily:"monospace"}}>Running Balance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactionsData[customer.id].transactions.map((txn, idx) => (
                        <tr key={txn.id || idx} style={{fontSize:"11px"}}>
                          <td className=" border text-xs">{new Date(txn.createdAt).toLocaleDateString()}</td>
                          <td className="p-1 border text-xs text-green-700">{txn.cashIn}</td>
                          <td className="p-1 border text-xs text-red-700">{txn.cashOut}</td>
                          <td className="p-1 border text-xs">{txn.remainingBalance}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p className="text-xs text-gray-500 mt-2">No transactions found.</p>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
