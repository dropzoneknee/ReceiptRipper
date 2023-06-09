import SubtotalAction from "./SubtotalAction";
import Keypad from "@/components/form/Keypad";

export default function Subtotal(props) {
  return (
    <div className="max-w-md bg-neutral-900 overflow-hidden flex flex-col grow h-full">
      <div className="actionScreen h-2/3 overflow-hidden flex">
        <SubtotalAction
          toReceiptsPage={props.toReceiptsPage}
          toItemEntryPage={props.toItemEntryPage}
          subtotal={props.subtotal}
          setSubtotal={props.setSubtotal}
        />
      </div>
      <div className="interactionScreen h-1/3 bg-neutral-900 text-white overflow-hidden flex">
        <Keypad
          changeState={props.changeState}
          subtractState={props.subtractState}
        />
      </div>
    </div>
  );
}
