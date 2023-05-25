import Image from "next/image";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

export default function ItemEntryAction(props) {
  return (
    <div className="flex-col grow justify-center items-center overflow-hidden">
      <div className="flex h-1/10 grow justify-center">
        <div className="flex items-start ml-1">
          <button
            className="text-5xl active:opacity-100 opacity-50"
            onClick={props.toSubtotalPage}
          >
            <MdKeyboardArrowLeft />
          </button>
        </div>
        <div className="grow"></div>
        <div className="items-end mr-1">
          {props.remainingSubtotal <= 0 ? (
            <button
              className="text-5xl active:opacity-100 opacity-50"
              onClick={props.toSplitBill}
            >
              <MdKeyboardArrowRight />
            </button>
          ) : (
            <button className="text-5xl opacity-10 cursor-not-allowed">
              <MdKeyboardArrowRight />
            </button>
          )}
        </div>
      </div>
      <div className="h-2/10 flex-col flex grow justify-center items-center ">
        <div className="flex justify-center mb-1">
          <h2 className="text-2xl">enter item</h2>
        </div>
        <div
          className={
            props.itemCost == 0
              ? "opacity-30 flex justify-center mb-1"
              : "flex justify-center mb-1"
          }
        >
          $<h1 className="text-6xl">{props.itemCost.toFixed(2)}</h1>
        </div>
        <h3 className="opacity-50">
          remaining subtotal {props.remainingSubtotal.toFixed(2)}
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
              className="flex justify-start items-center flex-col min-w-scroll"
              key={data.id}
            >
              <button
                className="active:opacity-30"
                onClick={() => {
                  props.splitItem(data.id);
                }}
              >
                <Image
                  src="/receipt.svg"
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
          <button
            className="bg-indigo-500 mb-2 text-white rounded w-32 h-12 active:brightness-50 shadow-lg border-b-4 border-indigo-700"
            onClick={props.splitComplete}
          >
            add item
          </button>
          {props.remainingSubtotal <= 0 ? (
            <button
              className="bg-indigo-500 mb-2 text-white rounded w-32 h-12 active:brightness-50 shadow-lg border-b-4 border-indigo-700"
              onClick={props.toSplitBill}
            >
              done
            </button>
          ) : (
            <button className="bg-indigo-500 mb-2 text-white rounded w-32 h-12 shadow-lg border-b-4 border-indigo-700 opacity-20 cursor-not-allowed">
              done
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
