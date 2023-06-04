import Image from "next/image";
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdEdit,
  MdAddCircle,
  MdCancel,
} from "react-icons/md";

export default function ItemEntryAction(props) {
  return (
    <div className="flex-col grow justify-center items-center overflow-hidden">
      <div className="flex h-14 grow text-center justify-center text-white">
        <div className="flex items-start ml-1">
          <button
            className="text-5xl active:opacity-100 opacity-50 mt-2"
            onClick={props.toSubtotalPage}
          >
            <MdKeyboardArrowLeft />
          </button>
        </div>
        <div className="grow"></div>
        <div className="items-end mr-1">
          {props.toPrice(props.subtotal - props.sumOfItemsEntered()) <= 0 ? (
            <button
              className="text-5xl active:opacity-100 opacity-50 mt-2"
              onClick={props.toSplitBill}
            >
              <MdKeyboardArrowRight />
            </button>
          ) : (
            <button className="text-5xl opacity-10 cursor-not-allowed mt-2">
              <MdKeyboardArrowRight />
            </button>
          )}
        </div>
      </div>
      <div className="h-2/10 flex-col flex grow justify-center items-center text-white">
        <div className="flex justify-center mb-1">
          <h2 className="text-2xl">enter item</h2>
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
        <h3 className="opacity-50 text-sm">
          &#40;remaining subtotal{" "}
          {props.toPrice(props.subtotal - props.sumOfItemsEntered()).toFixed(2)}
          &#41;
        </h3>
      </div>

      <div className="h-6/10 overflow-x-scroll flex items-center">
        <div
          className={
            props.receiptDetails.length < 4
              ? "space-x-5 flex items-center justify-center grow"
              : "space-x-5 w-max flex items-center"
          }
        >
          {props.receiptDetails.map((data) => (
            <div
              className="flex justify-start items-center flex-col min-w-scroll text-white"
              key={data.id}
            >
              <button
                className="active:opacity-30"
                onClick={() => {
                  props.splitItem(data.id);
                }}
              >
                <Image
                  src="/receipt.png"
                  alt="Receipt"
                  className="mb-2"
                  width={64}
                  height={92}
                  priority
                />
              </button>
              <h1 className="text-sm opacity-50">{data.name}</h1>
              <div className="text-sm flex">
                <h1>${data.total.toFixed(2)}</h1>
                {data.active ? (
                  <h1 className="opacity-30">
                    &#40;+$
                    {(props.itemCost / props.splitItems.length).toFixed(2)}
                    &#41;
                  </h1>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="h-1/10 flex justify-center items-end grow ">
        <div className="grow flex justify-center space-x-2">
          {props.itemCost > 0 && props.splitItems.length > 0 ? (
            <button
              className="bg-neutral-800 mb-2 text-white rounded w-32 h-12 active:brightness-50 shadow-lg border-b-4 border-neutral-950"
              onClick={props.splitComplete}
            >
              <div className="flex justify-center items-center space-x-1">
                <h1>add</h1>
                <MdAddCircle />
              </div>
            </button>
          ) : (
            <button className="bg-neutral-800 mb-2 text-white rounded w-32 h-12 active:brightness-50 shadow-lg border-b-4 border-neutral-950 opacity-20 cursor-not-allowed">
              <div className="flex justify-center items-center space-x-1">
                <h1>add</h1>
                <MdAddCircle />
              </div>
            </button>
          )}
          <button
            className="bg-neutral-800 mb-2 text-white rounded w-32 h-12 active:brightness-50 shadow-lg border-b-4 border-neutral-950"
            onClick={() => props.setEditItemsModal(true)}
          >
            <div className="flex justify-center items-center space-x-1">
              <h1>edit</h1>
              <MdEdit />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
