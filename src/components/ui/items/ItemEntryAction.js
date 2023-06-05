import Image from "next/image";
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdEdit,
  MdAddCircle,
} from "react-icons/md";
import ItemEntry from "./ItemEntry";

export default function ItemEntryAction(props) {
  return (
    <div className="overflow-hidden">
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

      <div className="h-5/10">
        <div className="grow h-full overflow-x-scroll flex items-center mb-4">
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
                  className="active:opacity-30 flex flex-col justify-center items-center"
                  onClick={() => {
                    props.splitItem(data.id);
                  }}
                >
                  <Image
                    src="/receipt.png"
                    alt="Receipt"
                    className={data.active ? "mb-2" : "mb-2 opacity-30"}
                    width={64}
                    height={92}
                    priority
                  />

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
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="h-1/10 flex justify-center items-end mb-4">
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
      <div className="grow"></div>
      <ItemEntry
        itemCost={props.itemCost}
        setItemCost={props.setItemCost}
        sumOfItemsEntered={props.sumOfItemsEntered}
        subtotal={props.subtotal}
        toPrice={props.toPrice}
      />
    </div>
  );
}
