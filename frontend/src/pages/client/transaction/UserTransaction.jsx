import React, { useState, useEffect } from "react";
import UserDrawer from "../components/UserDrawer";
import {
  getUserTransactions,
  updateTransaction,
} from "../../../api/transactionApi";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { toast } from "react-toastify"; // Assuming react-toastify is used for notifications
import PaymentGateway from "../components/PaymentGateway";

const UserTransaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [isPaymentModalOpen, setPaymentModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const fetchAllUserTransactions = async () => {
    try {
      const res = await getUserTransactions();
      setTransactions(res);
    } catch (error) {
      toast.error(error.message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.error("Error fetching transactions: ", error.message);
    }
  };

  useEffect(() => {
    fetchAllUserTransactions();
  }, []);

  function getTypeClassName(type) {
    switch (type) {
      case true:
        return "bg-green-100 text-green-800";
      case false:
        return "bg-red-100 text-red-800";
      default:
        return "";
    }
  }

  const handleMakePaidClick = (transactionId) => {
    setSelectedTransaction(transactionId);
    setPaymentModalOpen(true);
  };

  const handleClosePayment = () => {
    setPaymentModalOpen(false);
  };

  const handlePaymentSubmit = async (paymentData) => {
    try {
      // console.log(`pa => `, paymentData);
      // console.log(`sele => `, selectedTransaction);
      await updateTransaction(selectedTransaction);
      toast.success("Payment successful");
      setPaymentModalOpen(false);
      fetchAllUserTransactions();
    } catch (error) {
      toast.error("Payment failed");
    }
  };

  // Calculate summary data
  const summary = transactions.reduce(
    (acc, transaction) => {
      if (transaction.isRefund) {
        acc.refunded += transaction.amount;
      } else if (!transaction.isPaid) {
        acc.toBePaid += transaction.amount;
      }
      return acc;
    },
    { refunded: 0, toBePaid: 0 }
  );

  summary.total = summary.toBePaid - summary.refunded;

  return (
    <UserDrawer>
      <div className="mb-6 p-4 bg-white shadow-md rounded-lg">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Transaction Summary
        </h2>
        <div className="grid grid-cols-2 gap-6">
          {/* <div className="bg-blue-100 p-4 rounded-lg text-center">
            <h3 className="text-md font-semibold text-blue-600">
              Amount to be paid
            </h3>
            <p className="text-lg font-bold">LKR {summary.total}.00</p>
          </div> */}
          <div className="bg-yellow-100 p-5 rounded-lg text-left flex items-center justify-between">
            <h3 className="text-md font-semibold text-gray-600">
              Total Amount To Be Paid
            </h3>
            <p className="text-[50px] font-bold text-yellow-600">
              LKR {summary.toBePaid}.00
            </p>
          </div>
          <div className="bg-green-100 p-5 rounded-lg text-left flex items-center justify-between">
            <h3 className="text-md font-semibold text-gray-600">
              Wallet Amount
            </h3>
            <p className="text-[50px] font-bold text-green-600">
              LKR {summary.refunded}.00
            </p>
          </div>
        </div>
      </div>

      <div className="mb-28 shadow-md rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 :text-gray-400">
          <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-[#48752c] bg-white :text-white :bg-gray-800">
            My Transactions
          </caption>
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 :bg-gray-700 :text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Transaction ID
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Refund
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Amount
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions.length > 0 ? (
              transactions
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort by createdAt in descending order
                .map((transaction) => (
                  <tr
                    className="bg-white border-b :bg-gray-800 :border-gray-700"
                    key={transaction._id}
                  >
                    <td className="px-6 py-4">{transaction._id}</td>
                    <td className="px-6 py-4">{transaction.description}</td>
                    <td
                      className={`px-6 py-4 font-semibold ${
                        transaction.isRefund ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {transaction.isRefund ? "Yes" : "No"}
                    </td>
                    <td className="px-6 py-4 capitalize">
                      <span
                        className={`uppercase font-semibold text-[12px] px-2.5 py-0.5 rounded ${getTypeClassName(
                          transaction.isPaid
                        )}`}
                      >
                        {transaction.isPaid ? "Received" : "Not Paid"}
                      </span>
                    </td>
                    <td
                      className={`px-5 py-4 font-semibold ${
                        transaction.isRefund === true
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {transaction.isRefund ? (
                        <ArrowDropUpIcon />
                      ) : (
                        <ArrowDropDownIcon />
                      )}
                      LKR {transaction.amount}.00
                    </td>
                    <td className="px-6 py-4">
                      {new Date(transaction.createdAt).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {!transaction.isPaid && (
                        <button
                          onClick={() => handleMakePaidClick(transaction._id)}
                          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                        >
                          Make Payment
                        </button>
                      )}
                    </td>
                  </tr>
                ))
            ) : (
              <tr>
                <td
                  colSpan="8"
                  className="w-full text-md text-gray-600 font-semibold text-center py-4"
                >
                  No transaction requests found!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* Payment Modal */}
      {isPaymentModalOpen && (
        <PaymentGateway
          onSubmitPayment={handlePaymentSubmit}
          onClose={handleClosePayment}
        />
      )}
    </UserDrawer>
  );
};

export default UserTransaction;
