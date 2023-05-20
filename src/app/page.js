"use client";

import { useState } from "react";
import Receipts from "@/components/Receipts";
import ReceiptsAction from "@/components/ReceiptsAction";
import SubtotalAction from "@/components/SubtotalAction";
import Keypad from "@/components/Keypad";

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
  const [subtotalNumberChecker, setSubtotalNumberChecker] = useState(0);

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

  function changeSubtotal(num) {
    if (subtotalNumberChecker < 9) {
      setSubtotalNumberChecker(subtotalNumberChecker + 1);
      const MOVE_SUBTOTAL_DECIMAL = Math.round(subtotal * 100) * 10;
      const ADD_NUM_AND_MOVE_DECIMAL = (MOVE_SUBTOTAL_DECIMAL + num) / 100;
      setSubtotal(ADD_NUM_AND_MOVE_DECIMAL);
    }
  }

  function subtractSubtotal() {
    subtotalNumberChecker > 0
      ? setSubtotalNumberChecker(subtotalNumberChecker - 1)
      : null;
    const SET_SUBTOTAL_TO_DECIMAL_THEN_ROUND = Math.floor(subtotal * 10);
    const SET_SUBTOTAL_BACK = SET_SUBTOTAL_TO_DECIMAL_THEN_ROUND / 100;
    setSubtotal(SET_SUBTOTAL_BACK);
  }

  function toReceiptsPage() {
    setShowReceiptCount(true);
    setShowSubtotal(false);
  }

  function toItemEntryPage() {}

  return (
    <main className="bg-slate-300 h-screen flex justify-center items-center">
      <div className="max-w-md h-screen bg-white overflow-hidden flex-col grow ">
        <div className="actionScreen h-2/3 overflow-hidden flex">
          {showReceiptCount ? (
            <ReceiptsAction toSubtotalPage={toSubtotalPage} />
          ) : null}
          {showSubtotal ? (
            <SubtotalAction
              toReceiptsPage={toReceiptsPage}
              toItemEntryPage={toItemEntryPage}
              subtotal={subtotal}
            />
          ) : null}
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
            <Keypad
              changeState={changeSubtotal}
              subtractState={subtractSubtotal}
            />
          ) : null}
        </div>
      </div>
    </main>
  );
}
