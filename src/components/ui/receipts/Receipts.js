import ReceiptsAction from "./ReceiptsAction";
import ReceiptsAddition from "./ReceiptsAddition";

export default function Receipts(props) {
  return (
    <div className="max-w-md bg-neutral-900 overflow-hidden flex flex-col grow h-full">
      <div className="actionScreen h-2/3 overflow-hidden flex">
        <ReceiptsAction
          receiptDetails={props.receiptDetails}
          toSubtotalPage={props.toSubtotalPage}
          handleInputChange={props.handleInputChange}
        />
      </div>
      <div className="interactionScreen h-1/3 bg-neutral-900 text-white overflow-hidden flex">
        <ReceiptsAddition
          receiptAmount={props.receiptAmount}
          addReceipt={props.addReceipt}
          subtractReceipt={props.subtractReceipt}
          toSubtotalPage={props.toSubtotalPage}
        />
      </div>
    </div>
  );
}
