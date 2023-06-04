"use client";
import { useState } from "react";
import Items from "@/components/ui/items/Items";
import Receipts from "@/components/ui/receipts/Receipts";
import Result from "@/components/ui/results/Result";
import Subtotal from "@/components/ui/subtotal/Subtotal";

export default function Home() {
  const initialReceipts = [
    {
      id: 1,
      name: "receipt 1",
      items: [],
      total: 0,
      active: false,
    },
    {
      id: 2,
      name: "receipt 2",
      items: [],
      total: 0,
      active: false,
    },
  ];

  const [receiptAmount, setReceiptAmount] = useState(2);
  const [subtotal, setSubtotal] = useState(0);
  const [receiptDetails, setReceiptDetails] = useState(initialReceipts);
  const [itemCost, setItemCost] = useState(0);

  const [showReceiptCount, setShowReceiptCount] = useState(true);
  const [showSubtotal, setShowSubtotal] = useState(false);
  const [showItemEntry, setShowItemEntry] = useState(false);
  const [showResultsScreen, setShowResultsScreen] = useState(false);
  const [splitItems, setSplitItems] = useState([]);
  const [itemsList, setItemsList] = useState([]);

  const [currentItemId, setCurrentItemId] = useState(0);
  const [currentReceiptId, setCurrentReceiptId] = useState(
    initialReceipts.length
  );

  function addReceipt() {
    if (receiptAmount < 9) {
      setReceiptAmount(receiptAmount + 1);
      setReceiptDetails((receiptDetail) => [
        ...receiptDetail,
        {
          id: currentReceiptId + 1,
          name: `receipt ${receiptDetail.length + 1}`,
          items: [],
          total: 0,
          active: false,
        },
      ]);
      setCurrentReceiptId(currentReceiptId + 1);
    }
  }

  function subtractReceipt() {
    if (receiptAmount > 2) {
      setReceiptAmount(receiptAmount - 1);
      setReceiptDetails(receiptDetails.splice(0, receiptDetails.length - 1));
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
    if (ADD_NUM_AND_MOVE_DECIMAL <= toPrice(subtotal - sumOfItemsEntered())) {
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

  function splitComplete() {
    if (splitItems.length > 0) {
      const splitAmount = toPrice(itemCost / splitItems.length);
      const newReceiptDetails = receiptDetails.map((receipt) => {
        if (splitItems.includes(receipt.id)) {
          return {
            ...receipt,
            active: false,
            total: receipt.total + splitAmount,
            items: [
              ...receipt.items,
              { id: currentItemId + 1, split: splitAmount },
            ],
          };
        }
        return receipt;
      });

      setItemsList((itemsList) => [
        ...itemsList,
        {
          id: currentItemId + 1,
          name: `item ${currentItemId + 1}`,
          total: itemCost,
          splitAmount: splitAmount,
        },
      ]);
      setCurrentItemId(currentItemId + 1);
      setItemCost(0);
      setSplitItems([]);
      setReceiptDetails(newReceiptDetails);
    }
  }

  function toReceiptsPage() {
    setShowReceiptCount(true);
    setShowSubtotal(false);
  }

  function toItemEntryPage() {
    setShowSubtotal(false);
    setShowItemEntry(true);
    setShowResultsScreen(false);
  }

  function toSplitBill() {
    setShowItemEntry(false);
    setShowResultsScreen(true);
  }

  function sumOfItemsEntered() {
    return receiptDetails
      .map((num) => num.total)
      .reduce(function (a, b) {
        return a + b;
      });
  }

  function handleInputChange(index, event) {
    const newReceiptDetails = [...receiptDetails];
    newReceiptDetails[index][event.target.name] = event.target.value;

    setReceiptDetails(newReceiptDetails);
  }

  function toPrice(num) {
    return Math.floor(num * 100) / 100;
  }

  function handleChangeItemName(index, event) {
    const newItemsList = [...itemsList];
    newItemsList[index][event.target.name] = event.target.value;

    setItemsList(newItemsList);
  }

  function handleDeleteItem(id) {
    const ITEM_TO_DELETE = itemsList.find((items) => items.id === id);

    let newReceiptDetails = structuredClone(receiptDetails);
    newReceiptDetails = newReceiptDetails.map((receipt) => {
      return {
        ...receipt,
        items: receipt.items.filter((items) => items.id !== id),
        total: receipt.total - ITEM_TO_DELETE.splitAmount,
      };
    });

    setReceiptDetails(newReceiptDetails);
    setItemsList((itemsList) => itemsList.filter((items) => items.id !== id));
  }

  return (
    <main className="h-full touch-manipulation flex justify-center bg-neutral-900">
      {showReceiptCount ? (
        <Receipts
          receiptDetails={receiptDetails}
          toSubtotalPage={toSubtotalPage}
          handleInputChange={handleInputChange}
          receiptAmount={receiptAmount}
          addReceipt={addReceipt}
          subtractReceipt={subtractReceipt}
        />
      ) : null}
      {showSubtotal ? (
        <Subtotal
          toReceiptsPage={toReceiptsPage}
          toItemEntryPage={toItemEntryPage}
          subtotal={subtotal}
          changeState={changeSubtotal}
          subtractState={subtractSubtotal}
        />
      ) : null}
      {showItemEntry ? (
        <Items
          itemCost={itemCost}
          sumOfItemsEntered={sumOfItemsEntered}
          receiptDetails={receiptDetails}
          toSubtotalPage={toSubtotalPage}
          toSplitBill={toSplitBill}
          splitItem={splitItem}
          splitItems={splitItems}
          splitComplete={splitComplete}
          changeState={changeItemCost}
          subtractState={subtractItemCost}
          itemsList={itemsList}
          handleChangeItemName={handleChangeItemName}
          handleDeleteItem={handleDeleteItem}
          subtotal={subtotal}
          toPrice={toPrice}
          setItemCost={setItemCost}
        />
      ) : null}
      {showResultsScreen ? (
        <Result
          subtotal={subtotal}
          toItemEntryPage={toItemEntryPage}
          receiptDetails={receiptDetails}
          itemsList={itemsList}
          handleInputChange={handleInputChange}
          toPrice={toPrice}
        />
      ) : null}
    </main>
  );
}
