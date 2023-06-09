import { useState } from "react";
import ItemEntryAction from "./ItemEntryAction";
import Keypad from "@/components/form/Keypad";

import { MdClose, MdFastfood, MdCancel } from "react-icons/md";
import EditItemsModal from "./EditItemsModal";

export default function Items(props) {
  const [editItemsModal, setEditItemsModal] = useState(false);
  const [toResultsPageModal, setToResultsPageModal] = useState(false);

  return (
    <div className="max-w-md bg-neutral-900 overflow-hidden flex flex-col grow h-full relative">
      <EditItemsModal
        editItemsModal={editItemsModal}
        setEditItemsModal={setEditItemsModal}
        handleDeleteItem={props.handleDeleteItem}
        itemsList={props.itemsList}
        handleChangeItemName={props.handleChangeItemName}
      />
      <div className="actionScreen h-2/3 overflow-hidden flex">
        <ItemEntryAction
          toPrice={props.toPrice}
          itemCost={props.itemCost}
          sumOfItemsEntered={props.sumOfItemsEntered}
          receiptDetails={props.receiptDetails}
          toSubtotalPage={props.toSubtotalPage}
          toSplitBill={props.toSplitBill}
          splitItem={props.splitItem}
          splitItems={props.splitItems}
          splitComplete={props.splitComplete}
          setEditItemsModal={setEditItemsModal}
          setItemCost={props.setItemCost}
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
