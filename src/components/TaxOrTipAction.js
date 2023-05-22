import Image from "next/image";

export default function TaxOrTipAction(props) {
  return (
    <div className="flex-col flex grow">
      <div className="h-1/10 flex items-end mr-4 ml-4">
        <button
          className="text-8xl active:opacity-30"
          onClick={props.toItemEntryPage}
        >
          ←
        </button>
        <div className="grow"></div>
      </div>

      <div className="h-8/10 grow grid grid-cols-3 items-center justify-center">
        {props.receiptDetails.map((data) => (
          <div
            className="flex flex-col items-center justify-center"
            key={data.id}
          >
            <Image
              src="/receipt.svg"
              alt="Receipt"
              className="mb-2"
              width={64}
              height={92}
              priority
            />
            <h1 className="opacity-50">{data.name}</h1>

            <h1>
              {(
                data.total +
                (props.taxPercentage * data.total) / 100 +
                (props.tipPercentage * data.total) / 100
              ).toFixed(2)}
            </h1>
          </div>
        ))}
      </div>

      <div className="flex flex-col justify-start items-center ">
        <div className="w-full flex items-center mx-4">
          <div className="grow flex justify-end">
            $
            <button
              className={props.currentActiveMod === 1 ? null : "opacity-30"}
              onClick={() => props.activateTipOrTax(1)}
            >
              <h1 className="text-2xl">
                {((props.taxPercentage / 100) * props.subtotal).toFixed(2)}
              </h1>
            </button>
          </div>
          <div className="flex items-center justify-cente mx-4">
            <h2 className="text-2xl">tax</h2>
          </div>
          <div className="grow flex justify-start">
            <button
              className={props.currentActiveMod === 2 ? null : "opacity-30"}
              onClick={() => props.activateTipOrTax(2)}
            >
              <h1 className="text-2xl">{props.taxPercentage.toFixed(2)}</h1>
            </button>
            %
          </div>
        </div>

        <div className="w-full flex items-center">
          <div className="flex justify-end grow">
            $
            <button
              className={props.currentActiveMod === 3 ? null : "opacity-30"}
              onClick={() => props.activateTipOrTax(3)}
            >
              <h1 className="text-2xl">
                {((props.tipPercentage / 100) * props.subtotal).toFixed(2)}
              </h1>
            </button>
          </div>
          <div className="flex justify-center mx-4">
            <h2 className="text-2xl">tip</h2>
          </div>
          <div className="flex justify-start grow">
            <button
              className={props.currentActiveMod === 4 ? null : "opacity-30"}
              onClick={() => props.activateTipOrTax(4)}
            >
              <h1 className="text-2xl">{props.tipPercentage.toFixed(2)}</h1>
            </button>
            %
          </div>
        </div>
        <div className="flex items-center">
          <h2 className="text-xl opacity-50">subtotal</h2>
          <div className="flex justify-center ml-5">
            $<h1 className="text-2xl">{props.subtotal.toFixed(2)}</h1>
          </div>
        </div>

        <div className=" flex justify-center items-center">
          <h2 className="text-xl opacity-50">grand total</h2>
          <div className="flex justify-center ml-5">
            $<h1 className="text-2xl">{props.grandTotal.toFixed(2)}</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
