"use client";

import { useState } from "react";
import Receipts from "@/components/Receipts";
import ReceiptsAction from "@/components/ReceiptsAction";

export default function Home() {
  const [seatAmount, setSeatAmount] = useState(2);
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [taxPercentage, setTaxPercentage] = useState(0);
  const [tip, setTip] = useState(0);
  const [tipPercentage, setTipPercentage] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);

  const [showReceiptCount, setShowReceiptCount] = useState(true);
  const [showSubtotal, setShowSubtotal] = useState(false);

  function addSeat() {
    if (seatAmount < 9) setSeatAmount(seatAmount + 1);
  }

  function subtractSeat() {
    if (seatAmount > 2) setSeatAmount(seatAmount - 1);
  }

  function toSubtotalPage() {
    setShowReceiptCount(false);
    setShowSubtotal(true);
  }

  return (
    <main className="bg-slate-300 h-screen flex justify-center items-center">
      <div className="max-w-md h-screen bg-white overflow-hidden flex-col grow">
        <div className="actionScreen h-2/3 overflow-hidden flex">
          {showReceiptCount ? (
            <ReceiptsAction toSubtotalPage={toSubtotalPage} />
          ) : null}
          <div className="flex justify-center items-center grow">
            <div className="flex-col items-center justify-center">
              <h2 className="text-2xl">enter subtotal</h2>
              <h1 className="text-2xl">{subtotal}</h1>
            </div>
          </div>
        </div>
        <div className="interactionScreen h-1/3 bg-primary text-white overflow-hidden flex">
          {showReceiptCount ? (
            <Receipts
              seatAmount={seatAmount}
              addSeat={addSeat}
              subtractSeat={subtractSeat}
            />
          ) : null}
          {showSubtotal ? (
            <div className="flex subtotalScreen justify-center grow items-center">
              <div className="flex-col">
                <div className="flex gap-10 mb-6">
                  <button className="text-5xl">1</button>
                  <button className="text-5xl">2</button>
                  <button className="text-5xl">3</button>
                </div>
                <div className="flex gap-10 mb-6">
                  <button className="text-5xl">4</button>
                  <button className="text-5xl">5</button>
                  <button className="text-5xl">6</button>
                </div>
                <div className="flex gap-10 mb-6">
                  <button className="text-5xl">7</button>
                  <button className="text-5xl">8</button>
                  <button className="text-5xl">9</button>
                </div>
                <div className="flex gap-10 self-end">
                  <button className="text-5xl">0</button>
                  <button className="text-3xl">⌫</button>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </main>
  );
}
