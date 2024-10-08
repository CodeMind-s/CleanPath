import React, { useState } from "react";

const PaymentGateway = ({ onSubmitPayment, onClose }) => {
  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [errors, setErrors] = useState({});

  const validateCardNumber = (number) => {
    const regex = /^\d{16}$/; // Card number must be 16 digits
    return regex.test(number);
  };

  const validateExpiry = (date) => {
    const regex = /^(0[1-9]|1[0-2])\/\d{2}$/; // Format MM/YY
    if (!regex.test(date)) return false;

    const [month, year] = date.split("/").map(Number);
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100; // Last 2 digits of the current year
    const currentMonth = currentDate.getMonth() + 1; // JavaScript months are 0-indexed

    // Ensure the year is greater than the current year, or the same year but future month
    if (year > currentYear || (year === currentYear && month >= currentMonth)) {
      return true;
    }
    return false;
  };

  const validateCVC = (code) => {
    const regex = /^\d{3}$/; // CVC must be exactly 3 digits
    return regex.test(code);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    // Validate card number
    if (!validateCardNumber(cardNumber)) {
      newErrors.cardNumber = "Card number must be exactly 16 digits.";
    }

    // Validate expiry date
    if (!validateExpiry(expiry)) {
      newErrors.expiry =
        "Expiry date must be in MM/YY format and be in the future.";
    }

    // Validate CVC
    if (!validateCVC(cvc)) {
      newErrors.cvc = "CVC must be exactly 3 digits.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Clear errors and submit form
    setErrors({});
    const paymentData = { name, cardNumber, expiry, cvc };
    onSubmitPayment(paymentData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Payment</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Name on Card
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="John Doe"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Card Number
            </label>
            <input
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              className={`w-full p-2 border ${
                errors.cardNumber ? "border-red-500" : "border-gray-300"
              } rounded`}
              placeholder="1234 5678 9012 3456"
              maxLength="16"
              required
            />
            {errors.cardNumber && (
              <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>
            )}
          </div>
          <div className="flex space-x-4 mb-4">
            <div className="w-1/2">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Expiry Date
              </label>
              <input
                type="text"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                className={`w-full p-2 border ${
                  errors.expiry ? "border-red-500" : "border-gray-300"
                } rounded`}
                placeholder="MM/YY"
                required
              />
              {errors.expiry && (
                <p className="text-red-500 text-xs mt-1">{errors.expiry}</p>
              )}
            </div>
            <div className="w-1/2">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                CVC
              </label>
              <input
                type="number"
                value={cvc}
                onChange={(e) => setCvc(e.target.value)}
                className={`w-full p-2 border ${
                  errors.cvc ? "border-red-500" : "border-gray-300"
                } rounded`}
                placeholder="123"
                maxLength="3"
                required
              />
              {errors.cvc && (
                <p className="text-red-500 text-xs mt-1">{errors.cvc}</p>
              )}
            </div>
          </div>
          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={onClose}
              className="text-red-500 underline"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Submit Payment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentGateway;
