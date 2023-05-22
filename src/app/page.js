"use client";

import { useState } from "react";
import Receipts from "@/components/Receipts";
import ReceiptsAction from "@/components/ReceiptsAction";
import SubtotalAction from "@/components/SubtotalAction";
import Keypad from "@/components/Keypad";
import ItemEntryAction from "@/components/ItemEntryAction";
import TaxOrTipAction from "@/components/TaxOrTipAction";
import SplitBillActions from "@/components/SplitBillActions";
import SplitBill from "@/components/SplitBill";

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
  const [showTaxAndTip, setShowTaxAndTip] = useState(false);
  const [showCompleteSplitBill, setShowCompleteSplitBill] = useState(false);
  const [splitItems, setSplitItems] = useState([]);
  const [splitAmount, setSplitAmount] = useState(0);
  const [currentActiveMod, setCurrentActiveMod] = useState(0);

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
        changeSplitAmount(-1);
      } else {
        setSplitItems((splitItems) => [...splitItems, receipt]);
        changeSplitAmount(1);
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

  function splitComplete() {
    if (splitItems.length > 0) {
      const newReceiptDetails = receiptDetails.map((receipt) => {
        if (splitItems.includes(receipt.id)) {
          return {
            ...receipt,
            active: false,
            total: receipt.total + splitAmount,
            items: [...receipt.items, splitAmount],
          };
        }
        return receipt;
      });

      setItemCost(0);
      setSplitAmount(0);
      setSplitItems([]);
      setReceiptDetails(newReceiptDetails);
      setRemainingSubtotal(remainingSubtotal - itemCost);
    }
  }

  function changeSplitAmount(opr) {
    setSplitAmount(itemCost / (splitItems.length + parseInt(opr)));
  }

  function changeTaxOrTip(keypadNum) {
    let MOVE_DECIMAL, ADD_NUM_AND_MOVE_DECIMAL;
    switch (currentActiveMod) {
      case 1:
        MOVE_DECIMAL = Math.round(tax * 100) * 10;
        ADD_NUM_AND_MOVE_DECIMAL = (MOVE_DECIMAL + keypadNum) / 100;
        if (ADD_NUM_AND_MOVE_DECIMAL < subtotal) {
          setTax(ADD_NUM_AND_MOVE_DECIMAL);
          setTaxPercentage((ADD_NUM_AND_MOVE_DECIMAL / subtotal) * 100);
          setGrandTotal(subtotal + ADD_NUM_AND_MOVE_DECIMAL + tip);
        }
        break;

      case 2:
        MOVE_DECIMAL = Math.round(taxPercentage * 100) * 10;
        ADD_NUM_AND_MOVE_DECIMAL = (MOVE_DECIMAL + keypadNum) / 100;
        if (ADD_NUM_AND_MOVE_DECIMAL < 100) {
          setTaxPercentage(ADD_NUM_AND_MOVE_DECIMAL);
          setTax((ADD_NUM_AND_MOVE_DECIMAL * subtotal) / 100);
          setGrandTotal(
            subtotal + (ADD_NUM_AND_MOVE_DECIMAL * subtotal) / 100 + tip
          );
        }
        break;

      case 3:
        MOVE_DECIMAL = Math.round(tip * 100) * 10;
        ADD_NUM_AND_MOVE_DECIMAL = (MOVE_DECIMAL + keypadNum) / 100;
        if (ADD_NUM_AND_MOVE_DECIMAL < subtotal) {
          setTip(ADD_NUM_AND_MOVE_DECIMAL);
          setTipPercentage((ADD_NUM_AND_MOVE_DECIMAL / subtotal) * 100);
          setGrandTotal(subtotal + ADD_NUM_AND_MOVE_DECIMAL + tax);
        }
        break;

      case 4:
        MOVE_DECIMAL = Math.round(tipPercentage * 100) * 10;
        ADD_NUM_AND_MOVE_DECIMAL = (MOVE_DECIMAL + keypadNum) / 100;
        if (ADD_NUM_AND_MOVE_DECIMAL < 100) {
          setTipPercentage(ADD_NUM_AND_MOVE_DECIMAL);
          setTip((ADD_NUM_AND_MOVE_DECIMAL * subtotal) / 100);
          setGrandTotal(
            subtotal + (ADD_NUM_AND_MOVE_DECIMAL * subtotal) / 100 + tax
          );
        }
        break;
    }
  }

  function subtractTaxOrTip() {
    let SET_AMOUNT_TO_DECIMAL_THEN_ROUND;
    let SET_AMOUNT_BACK;

    switch (currentActiveMod) {
      case 1:
        SET_AMOUNT_TO_DECIMAL_THEN_ROUND = Math.floor(tax * 10);
        SET_AMOUNT_BACK = SET_AMOUNT_TO_DECIMAL_THEN_ROUND / 100;
        setTax(SET_AMOUNT_BACK);
        setTaxPercentage((SET_AMOUNT_BACK / subtotal) * 100);
        setGrandTotal(subtotal + SET_AMOUNT_BACK + tip);
        break;

      case 2:
        SET_AMOUNT_TO_DECIMAL_THEN_ROUND = Math.floor(taxPercentage * 10);
        SET_AMOUNT_BACK = SET_AMOUNT_TO_DECIMAL_THEN_ROUND / 100;
        setTaxPercentage(SET_AMOUNT_BACK);
        setTax((SET_AMOUNT_BACK * subtotal) / 100);
        setGrandTotal(subtotal + (SET_AMOUNT_BACK * subtotal) / 100 + tip);

        break;

      case 3:
        SET_AMOUNT_TO_DECIMAL_THEN_ROUND = Math.floor(tip * 10);
        SET_AMOUNT_BACK = SET_AMOUNT_TO_DECIMAL_THEN_ROUND / 100;
        setTip(SET_AMOUNT_BACK);
        setTipPercentage((SET_AMOUNT_BACK / subtotal) * 100);
        setGrandTotal(subtotal + SET_AMOUNT_BACK + tax);

        break;

      case 4:
        SET_AMOUNT_TO_DECIMAL_THEN_ROUND = Math.floor(tipPercentage * 10);
        SET_AMOUNT_BACK = SET_AMOUNT_TO_DECIMAL_THEN_ROUND / 100;
        setTipPercentage(SET_AMOUNT_BACK);
        setTip((SET_AMOUNT_BACK * subtotal) / 100);
        setGrandTotal(subtotal + (SET_AMOUNT_BACK * subtotal) / 100 + tax);

        break;
    }
  }

  function activateTipOrTax(num) {
    setCurrentActiveMod(num);
    switch (num) {
      case 1:
      case 2:
        setTax(0);
        setTaxPercentage(0);
        setGrandTotal(subtotal + tip);
        break;

      case 3:
      case 4:
        setTip(0);
        setTipPercentage(0);
        setGrandTotal(subtotal + tax);
        break;
    }
  }

  function toReceiptsPage() {
    setShowReceiptCount(true);
    setShowSubtotal(false);
  }

  function toItemEntryPage() {
    setShowSubtotal(false);
    setShowItemEntry(true);
    setShowTaxAndTip(false);
    setRemainingSubtotal(subtotal);
  }

  function toTaxAndTip() {
    setGrandTotal(subtotal + tax + tip);
    setShowItemEntry(false);
    setShowTaxAndTip(true);
    setShowCompleteSplitBill(false);
  }

  function toCompleteSplitBill() {
    setShowCompleteSplitBill(true);
    setShowTaxAndTip(false);
  }

  return (
    <main className=" h-screen flex justify-center items-center touch-manipulation">
      <div className="max-w-md h-full bg-white overflow-hidden flex-col grow ">
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
              splitAmount={splitAmount}
              splitComplete={splitComplete}
            />
          ) : null}
          {showTaxAndTip ? (
            <TaxOrTipAction
              subtotal={subtotal}
              tax={tax}
              taxPercentage={taxPercentage}
              tip={tip}
              tipPercentage={tipPercentage}
              grandTotal={grandTotal}
              activateTipOrTax={activateTipOrTax}
              currentActiveMod={currentActiveMod}
              toCompleteSplitBill={toCompleteSplitBill}
              toItemEntryPage={toItemEntryPage}
            />
          ) : null}
          {showCompleteSplitBill ? (
            <SplitBillActions
              receiptDetails={receiptDetails}
              taxPercentage={taxPercentage}
              tipPercentage={tipPercentage}
              toTaxAndTip={toTaxAndTip}
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
          {showTaxAndTip ? (
            <Keypad
              changeState={changeTaxOrTip}
              subtractState={subtractTaxOrTip}
            />
          ) : null}
          {showCompleteSplitBill ? (
            <SplitBill
              tip={tip}
              tipPercentage={tipPercentage}
              tax={tax}
              taxPercentage={taxPercentage}
              subtotal={subtotal}
              grandTotal={grandTotal}
            />
          ) : null}
        </div>
      </div>
    </main>
  );
}
