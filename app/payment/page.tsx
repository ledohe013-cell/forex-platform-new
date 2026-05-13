"use client";
import React from "react";

export default function Page() {
  const handlePayment = () => {
    alert("Payment failed. Redirecting...");
    window.location.href = "/markets";
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Payment</h1>
      <p className="text-lg text-gray-700 mb-6">
        Click the button below to attempt payment.
      </p>
      <button
        onClick={handlePayment}
        className="bg-red-600 text-white px-6 py-3 rounded hover:bg-red-700"
      >
        Pay Now
      </button>
    </div>
  );
}
