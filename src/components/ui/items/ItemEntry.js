import { MdCancel } from "react-icons/md";

export default function ItemEntry(props) {
  return (
    <div className="h-2/10 flex-col flex grow justify-center items-center text-white">
      <div className="flex justify-center mb-1">
        <h2 className="text-xl">enter item</h2>
      </div>
      <div className="grid grid-cols-4">
        <h1
          className={
            props.itemCost > 0
              ? "flex justify-end"
              : "flex justify-end opacity-30"
          }
        >
          $
        </h1>
        <h1
          className={
            props.itemCost > 0
              ? "text-5xl col-span-2"
              : "text-5xl col-span-2 opacity-30"
          }
        >
          {props.itemCost.toFixed(2)}
        </h1>
        <div className="flex items-center">
          <div className="cursor"></div>
          <div className="flex items-start grow h-full mt-2 ml-3">
            <button onClick={() => props.setItemCost(0)}>
              <MdCancel />
            </button>
          </div>
        </div>
      </div>
      <h3 className="opacity-50 text-xs">
        &#40;remaining subtotal{" "}
        {props.toPrice(props.subtotal - props.sumOfItemsEntered()).toFixed(2)}
        &#41;
      </h3>
    </div>
  );
}
