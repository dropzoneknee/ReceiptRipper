import Image from "next/image";
import { MdKeyboardArrowLeft, MdRefresh } from "react-icons/md";

export default function SplitBillAction(props) {
  return (
    <div className="flex-col flex grow">
      <div className="h-1/10 flex items-start mr-3 ml-1">
        <button
          className="text-5xl active:opacity-100 opacity-50"
          onClick={props.toItemEntryPage}
        >
          <MdKeyboardArrowLeft />
        </button>
        <div className="grow"></div>
        <button
          className="mt-1 text-4xl active:opacity-100 opacity-50"
          onClick={() => location.reload()}
        >
          <MdRefresh />
        </button>
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
        <div className="w-full grid grid-cols-5 justify-center items-center">
          <div></div>
          <div className="flex justify-end">
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
          <div className="flex items-center justify-center">
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
          <div></div>
        </div>

        <div className="w-full grid grid-cols-5 items-center justify-center">
          <div></div>
          <div className="flex justify-end">
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
          <div className="flex items-center justify-center">
            <h2 className="text-2xl">tip</h2>
          </div>
          <div className="flex">
            <button
              className={props.currentActiveMod === 4 ? null : "opacity-30"}
              onClick={() => props.activateTipOrTax(4)}
            >
              <h1 className="text-2xl">{props.tipPercentage.toFixed(2)}</h1>
            </button>
            %
          </div>
          <div></div>
        </div>

        <div className="flex items-center w-full space-x-5">
          <div className="flex w-1/2 justify-end items-center">
            <h2 className="text-xl opacity-50">subtotal</h2>
          </div>
          <div className="flex w-1/2 justify-start items-center">
            $<h1 className="text-2xl">{props.subtotal.toFixed(2)}</h1>
          </div>
        </div>

        <div className="flex justify-center items-center w-full space-x-5">
          <div className="flex w-1/2 justify-end items-center">
            <h2 className="text-xl opacity-50">grand total</h2>
          </div>

          <div className="flex w-1/2 items-center justify-start">
            $
            <h1 className="text-2xl">
              {(
                (props.taxPercentage / 100) * props.subtotal +
                (props.tipPercentage / 100) * props.subtotal +
                props.subtotal
              ).toFixed(2)}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
