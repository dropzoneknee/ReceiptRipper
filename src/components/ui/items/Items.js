import ItemEntryAction from "./ItemEntryAction";
import Keypad from "@/components/form/Keypad";

export default function Items(props) {
  return (
    <div className="max-w-md bg-white overflow-hidden flex flex-col grow h-full">
      <div className="actionScreen h-2/3 overflow-hidden flex">
        <ItemEntryAction
          itemCost={props.itemCost}
          remainingSubtotal={props.remainingSubtotal}
          sumOfItemsEntered={props.sumOfItemsEntered}
          receiptDetails={props.receiptDetails}
          toSubtotalPage={props.toSubtotalPage}
          toSplitBill={props.toSplitBill}
          splitItem={props.splitItem}
          splitItems={props.splitItems}
          splitComplete={props.splitComplete}
        />
      </div>
      <div className="interactionScreen h-1/3 bg-indigo-600 text-white overflow-hidden flex">
        <Keypad
          changeState={props.changeState}
          subtractState={props.subtractState}
        />
      </div>
    </div>
  );
}
