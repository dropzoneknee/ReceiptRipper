"use client";

import { useState } from "react";
import Seats from "./Seats";

export default function Home() {
  const [seatAmount, setSeatAmount] = useState(2);
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [taxPercentage, setTaxPercentage] = useState(0);
  const [tip, setTip] = useState(0);
  const [tipPercentage, setTipPercentage] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);

  function addSeat() {
    if (seatAmount < 9) setSeatAmount(seatAmount + 1);
  }

  function subtractSeat() {
    if (seatAmount > 2) setSeatAmount(seatAmount - 1);
  }

  function toSubtotalPage() {}

  return (
    <main className="bg-slate-300 h-screen flex justify-center items-center">
      <div className="max-w-md h-screen bg-white overflow-hidden flex flex-col grow">
        <div className="actionScreen h-2/3 overflow-hidden flex items-end justify-end">
          <button className="text-8xl mr-3">→</button>
        </div>
        <div className="interactionScreen h-1/3 bg-primary text-white overflow-hidden flex">
          <Seats
            seatAmount={seatAmount}
            addSeat={addSeat}
            subtractSeat={subtractSeat}
          />
        </div>
      </div>
    </main>
  );
}
