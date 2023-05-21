"use client";

import { useState } from "react";
import Receipts from "@/components/Receipts";
import ReceiptsAction from "@/components/ReceiptsAction";
import SubtotalAction from "@/components/SubtotalAction";
import Keypad from "@/components/Keypad";
import ItemEntryAction from "@/components/ItemEntryAction";

export default function Home() {
  const initialReceipts = [
    {
      id: 1,
      name: "receipt1",
      items: [],
      total: 0,
      active: false,
    },
    {
      id: 2,
      name: "receipt2",
      items: [],
      total: 0,
      active: false,
    },
  ];

  const [receiptAmount, setReceiptAmount] = useState(2);
  const [subtotal, setSubtotal] = useState(0);
  const [remainingSubtotal, setRemainingSubtotal] = useState(0);
  const [receiptDetails, setReceiptDetails] = useState(initialReceipts);
  const [itemCost, setItemCost] = useState(0);
  const [tax, setTax] = useState(0);
  const [taxPercentage, setTaxPercentage] = useState(0);
  const [tip, setTip] = useState(0);
  const [tipPercentage, setTipPercentage] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);

  const [showReceiptCount, setShowReceiptCount] = useState(true);
  const [showSubtotal, setShowSubtotal] = useState(false);
  const [showItemEntry, setShowItemEntry] = useState(false);
  const [splitItems, setSplitItems] = useState([]);

  function addReceipt() {
    if (receiptAmount < 6) {
      setReceiptAmount(receiptAmount + 1);
      setReceiptDetails((receiptDetail) => [
        ...receiptDetail,
        {
          id: receiptDetails.length + 1,
          name: `receipt${receiptDetails.length + 1}`,
          items: [],
          total: 0,
          active: false,
        },
      ]);
    }
  }

  function subtractReceipt() {
    if (receiptAmount > 2) {
      setReceiptAmount(receiptAmount - 1);
      setReceiptDetails((receiptDetails) =>
        receiptDetails.filter(
          (receipt) => receipt.name !== `receipt${receiptDetails.length}`
        )
      );
    }
  }

  function toSubtotalPage() {
    setShowReceiptCount(false);
    setShowSubtotal(true);
    setShowItemEntry(false);
  }

  function changeSubtotal(keypadNum) {
    const MOVE_DECIMAL = Math.round(subtotal * 100) * 10;
    const ADD_NUM_AND_MOVE_DECIMAL = (MOVE_DECIMAL + keypadNum) / 100;
    if (ADD_NUM_AND_MOVE_DECIMAL < 10000) {
      setSubtotal(ADD_NUM_AND_MOVE_DECIMAL);
    }
  }

  function subtractSubtotal() {
    const SET_AMOUNT_TO_DECIMAL_THEN_ROUND = Math.floor(subtotal * 10);
    const SET_AMOUNT_BACK = SET_AMOUNT_TO_DECIMAL_THEN_ROUND / 100;
    setSubtotal(SET_AMOUNT_BACK);
  }

  function changeItemCost(keypadNum) {
    const MOVE_DECIMAL = Math.round(itemCost * 100) * 10;
    const ADD_NUM_AND_MOVE_DECIMAL = (MOVE_DECIMAL + keypadNum) / 100;
    if (ADD_NUM_AND_MOVE_DECIMAL <= remainingSubtotal) {
      setItemCost(ADD_NUM_AND_MOVE_DECIMAL);
    }
  }

  function subtractItemCost() {
    const SET_AMOUNT_TO_DECIMAL_THEN_ROUND = Math.floor(itemCost * 10);
    const SET_AMOUNT_BACK = SET_AMOUNT_TO_DECIMAL_THEN_ROUND / 100;
    setItemCost(SET_AMOUNT_BACK);
  }

  function splitItem(receipt) {
    if (itemCost > 0) {
      if (splitItems.includes(receipt)) {
        setSplitItems((splitItems) => splitItems.filter((i) => i !== receipt));
      } else {
        setSplitItems((splitItems) => [...splitItems, receipt]);
      }

      const newState = receiptDetails.map((obj) => {
        if (obj.id === receipt) {
          return { ...obj, active: !obj.active };
        }
        return obj;
      });

      setReceiptDetails(newState);
    }
  }

  function splitComplete() {}

  function toReceiptsPage() {
    setShowReceiptCount(true);
    setShowSubtotal(false);
  }

  function toItemEntryPage() {
    setShowSubtotal(false);
    setShowItemEntry(true);
    setRemainingSubtotal(subtotal);
  }

  function toTaxAndTip() {}

  return (
    <main className="bg-slate-300 h-screen flex justify-center items-center">
      <div className="max-w-md h-screen bg-white overflow-hidden flex-col grow ">
        <div className="actionScreen h-2/3 overflow-hidden flex">
          {showReceiptCount ? (
            <ReceiptsAction
              toSubtotalPage={toSubtotalPage}
              receiptDetails={receiptDetails}
            />
          ) : null}
          {showSubtotal ? (
            <SubtotalAction
              toReceiptsPage={toReceiptsPage}
              toItemEntryPage={toItemEntryPage}
              subtotal={subtotal}
            />
          ) : null}
          {showItemEntry ? (
            <ItemEntryAction
              itemCost={itemCost}
              remainingSubtotal={remainingSubtotal}
              receiptDetails={receiptDetails}
              toSubtotalPage={toSubtotalPage}
              toTaxAndTip={toTaxAndTip}
              splitItem={splitItem}
            />
          ) : null}
        </div>
        <div className="interactionScreen h-1/3 bg-primary text-white overflow-hidden flex">
          {showReceiptCount ? (
            <Receipts
              receiptAmount={receiptAmount}
              addReceipt={addReceipt}
              subtractReceipt={subtractReceipt}
            />
          ) : null}
          {showSubtotal ? (
            <Keypad
              changeState={changeSubtotal}
              subtractState={subtractSubtotal}
            />
          ) : null}
          {showItemEntry ? (
            <Keypad
              changeState={changeItemCost}
              subtractState={subtractItemCost}
            />
          ) : null}
        </div>
      </div>
    </main>
  );
}
