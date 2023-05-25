import { MdKeyboardArrowLeft, MdRefresh } from "react-icons/md";
import { useState } from "react";

export default function Result(props) {
  const DEFAULT_TAX = 8.38;
  const DEFAULT_TIP = 20;

  const [tax, setTax] = useState(
    Math.round((props.subtotal / DEFAULT_TAX) * 100) / 100
  );
  const [tip, setTip] = useState(
    Math.round((props.subtotal / DEFAULT_TIP) * 100) / 100
  );

  const [taxPercentage, setTaxPercentage] = useState(DEFAULT_TAX);
  const [tipPercentage, setTipPercentage] = useState(DEFAULT_TIP);

  return (
    <div className="max-w-md bg-gray-100 overflow-hidden flex flex-col grow items-center h-full">
      <div className="flex bg-white items-center h-14 shadow mb-2 w-full">
        <button
          className="text-5xl active:opacity-100 opacity-50 ml-1"
          onClick={props.toItemEntryPage}
        >
          <MdKeyboardArrowLeft />
        </button>
        <div className="grow flex justify-center items-center h-full"></div>
        <button
          className="text-4xl active:opacity-100 opacity-50 mr-3 "
          onClick={() => location.reload()}
        >
          <MdRefresh />
        </button>
      </div>

      <div className="h-min bg-white  shadow w-11/12 mb-2">
        <h1 className="ml-4 mt-2 mb-2 text-xl">order details</h1>
        {props.receiptDetails.map((data) => (
          <div className="flex felx-col ml-4 mb-2 mr-4" key={data.id}>
            <div className="flex grow">
              <h1 className="">{data.name}</h1>
              <div className="flex grow"></div>
              <div className="flex justify-end items-end ">
                <h1>
                  $
                  {(
                    data.total +
                    (taxPercentage * data.total) / 100 +
                    (tipPercentage * data.total) / 100
                  ).toFixed(2)}
                </h1>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="h-min bg-white shadow w-11/12 mb-2">
        <h1 className="ml-4 mt-2 mb-2 text-xl">total</h1>
        <div className="flex ml-4 mr-4 mb-2">
          <h1>subtotal</h1>
          <div className="grow"></div>
          <h1>${props.subtotal.toFixed(2)}</h1>
        </div>

        <div className="flex ml-4 mr-4 mb-2">
          <h1>tax</h1>
          <input
            value={taxPercentage}
            className="w-20 text-center "
            autoComplete="off"
            type="number"
            onChange={(event) => {
              setTaxPercentage(event.target.value);
              setTax((event.target.value / 100) * props.subtotal);
            }}
          />
          %<div className="grow"></div>
          $
          <input
            value={tax}
            className="w-12 text-right "
            autoComplete="off"
            type="number"
            onChange={(event) => {
              setTaxPercentage((event.target.value / props.subtotal) * 100);
              setTax(event.target.value);
            }}
          />
        </div>

        <div className="flex ml-4 mr-4 mb-2">
          <h1>tip</h1>
          <input
            value={tipPercentage}
            className="w-20 text-center "
            autoComplete="off"
            type="number"
            onChange={(event) => {
              setTipPercentage(event.target.value);
              setTip((event.target.value / 100) * props.subtotal);
            }}
          />
          %<div className="grow"></div>
          $
          <input
            value={tip}
            className="w-12 text-right "
            autoComplete="off"
            type="number"
            onChange={(event) => {
              setTipPercentage((event.target.value / props.subtotal) * 100);
              setTip(event.target.value);
            }}
          />
        </div>

        <div className="flex ml-4 mr-4 mb-2">
          <h1>grand total</h1>
          <div className="grow"></div>
          <h1>
            $
            {(
              (taxPercentage / 100) * props.subtotal +
              (tipPercentage / 100) * props.subtotal +
              props.subtotal
            ).toFixed(2)}
          </h1>
        </div>
      </div>
    </div>
  );
}
