import { useState } from "react";
import ItemEntryAction from "./ItemEntryAction";
import Keypad from "@/components/form/Keypad";

import { MdClose, MdFastfood } from "react-icons/md";

export default function Items(props) {
  const [editItemsModal, setEditItemsModal] = useState(false);
  const [toResultsPageModal, setToResultsPageModal] = useState(false);

  return (
    <div className="max-w-md bg-neutral-900 overflow-hidden flex flex-col grow h-full relative">
      {editItemsModal ? (
        <div
          className="fixed left-0 right-0 top-0 bottom-0 h-full z-40 flex items-center justify-center"
          onClick={() => setEditItemsModal(false)}
        >
          <div
            className="w-10/12 h-1/2 bg-neutral-800 rounded-lg shadow-md flex flex-col text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex h-16 items-center ml-8 mr-8">
              <h1 className="text-lg">
                <MdFastfood />
              </h1>
              <h1 className="text-xl mt-1 ml-2">items</h1>
              <div className="grow"></div>
              <button
                className="text-white opacity-70 text-2xl"
                onClick={() => setEditItemsModal(false)}
              >
                <MdClose />
              </button>
            </div>
            <div>
              {props.itemsList.map((item, index) => (
                <div
                  className="flex items-center space-x-2 ml-7 mb-2 mr-8"
                  key={"items" + index}
                >
                  <button
                    className="text-red-500"
                    onClick={() => props.handleDeleteItem(item.id)}
                  >
                    <MdClose />
                  </button>
                  <input
                    name="name"
                    value={item.name}
                    className="w-28 bg-transparent text-white"
                    autoComplete="off"
                    maxLength="15"
                    onClick={(event) =>
                      event.target.setSelectionRange(
                        0,
                        event.target.value.length
                      )
                    }
                    onChange={(event) =>
                      props.handleChangeItemName(index, event)
                    }
                  />
                  <div className="grow"></div>
                  <h1 className="">${item.total.toFixed(2)}</h1>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
      <div className="actionScreen h-2/3 overflow-hidden flex">
        <ItemEntryAction
          itemCost={props.itemCost}
          sumOfItemsEntered={props.sumOfItemsEntered}
          receiptDetails={props.receiptDetails}
          toSubtotalPage={props.toSubtotalPage}
          toSplitBill={props.toSplitBill}
          splitItem={props.splitItem}
          splitItems={props.splitItems}
          splitComplete={props.splitComplete}
          setEditItemsModal={setEditItemsModal}
          subtotal={props.subtotal}
        />
      </div>
      <div className="interactionScreen h-1/3 overflow-hidden flex">
        <Keypad
          changeState={props.changeState}
          subtractState={props.subtractState}
        />
      </div>
    </div>
  );
}
