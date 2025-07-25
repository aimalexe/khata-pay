import React, { useEffect, useState } from "react";
import {
  getCustomersFromAPI,
  getCustomerWithTransactions,
} from "@/services/customerHandling.services";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function AnalyticsSection() {
  const [customers, setCustomers] = useState([]);
  const [transactionsData, setTransactionsData] = useState({});

  useEffect(() => {
    getCustomersFromAPI(async (customerList) => {
      setCustomers(customerList);
      const dataObj = {};
      for (const customer of customerList) {
        try {
          const data = await getCustomerWithTransactions(customer.id);
          dataObj[customer.id] = data.transactions || [];
        } catch (err) {
          dataObj[customer.id] = [];
        }
      }
      setTransactionsData(dataObj);
    });
  }, []);

  return (
    <div>
      <h1 className="text-md font-bold text-green-700 mb-4">
        Transaction Analytics
      </h1>
      {customers.length === 0 ? (
        <p className="text-gray-900 text-center mt-10 font-medium">
          No customers found
        </p>
      ) : (
        <div className="space-y-8">
          {customers.map((customer) => (
            <div key={customer.id} className="bg-white shadow-xs rounded p-4">
              <h2
                className="text-xs font-bold mb-2"
                style={{ fontSize: "13px" }}
              >
                {customer.name}
              </h2>
              {transactionsData[customer.id] &&
              transactionsData[customer.id].length > 0 ? (
                <ResponsiveContainer width="100%" height={130}>
                  <LineChart
                    data={transactionsData[customer.id]
                      .filter((txn) => !(txn.cashIn === 0 && txn.cashOut === 0))
                      .map((txn, idx) => ({
                        date: `${new Date(
                          txn.createdAt
                        ).toLocaleDateString()} ${new Date(
                          txn.createdAt
                        ).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })} #${idx + 1}`,
                        balance: txn.remainingBalance,
                        cashIn: txn.cashIn,
                        cashOut: txn.cashOut,
                      }))}
                    margin={{ top: 2, right: 10, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="2 2" />
                    <XAxis dataKey="date" fontSize={8} height={20} />
                    <YAxis fontSize={8} width={30} />
                    <Tooltip wrapperStyle={{ fontSize: "10px" }} />
                    <Legend wrapperStyle={{ fontSize: "10px" }} iconSize={8} />
                    <Line
                      type="monotone"
                      dataKey="balance"
                      stroke="#2fcc5e"
                      name="Running Balance"
                      strokeWidth={1.5}
                      dot={false}
                    />
                    <Line
                      type="monotone"
                      dataKey="cashIn"
                      stroke="#385ab0"
                      name="Cash In"
                      strokeWidth={1.5}
                      dot={false}
                    />
                    <Line
                      type="monotone"
                      dataKey="cashOut"
                      stroke="#f71652"
                      name="Cash Out"
                      strokeWidth={1.5}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-xs text-gray-500 mt-2">
                  No transactions found.
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
