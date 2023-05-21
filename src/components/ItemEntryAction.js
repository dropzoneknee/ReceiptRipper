import Image from "next/image";

export default function ItemEntryAction(props) {
  return (
    <div className="flex-col grow justify-center items-center">
      <div className="flex justify-center items-center">
        <div className="flex-col h-2/10">
          <div className="flex justify-center mb-3">
            <h2 className="text-2xl">enter item</h2>
          </div>
          <div
            className={
              props.itemCost == 0
                ? "opacity-30 flex justify-center mb-3"
                : "flex justify-center mb-3"
            }
          >
            $<h1 className="text-6xl">{props.itemCost.toFixed(2)}</h1>
          </div>
          <h3 className="">
            remaining subtotal {props.remainingSubtotal.toFixed(2)}
          </h3>
        </div>
      </div>
      <div className="h-6/10 grow grid grid-cols-3 justify-center items-center">
        {props.receiptDetails.map((data) => (
          <div
            className="flex justify-center items-center flex-col "
            key={data.id}
          >
            <h1>{data.name}</h1>
            <button
              className="active:opacity-30"
              onClick={() => {
                props.splitItem(data.id);
              }}
            >
              <Image
                src="/receipt.svg"
                alt="Receipt"
                className=""
                width={80}
                height={115}
                priority
              />
            </button>
            <h1>${data.total.toFixed(2)}</h1>
            {data.active ? (
              <h1 className="opacity-30">&#40;${data.name}&#41;</h1>
            ) : null}
          </div>
        ))}
      </div>
      <div className="h-2/10 flex items-end mr-4 ml-4 grow">
        <div className="w-1/5 flex justify-start">
          <button className="text-8xl" onClick={props.toSubtotalPage}>
            ←
          </button>
        </div>
        <div className="grow flex justify-center self-center">
          <button>add item</button>
        </div>
        <div className="w-1/5 flex justify-end">
          {true ? (
            <button className="text-8xl" onClick={props.toTaxAndTip}>
              →
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
