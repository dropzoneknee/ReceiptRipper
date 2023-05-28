import { MdKeyboardArrowLeft, MdRefresh } from "react-icons/md";
import { useState } from "react";

export default function Result(props) {
  const DEFAULT_TAX = 8.38;
  const DEFAULT_TIP = 20;

  const [tax, setTax] = useState(
    props.toPrice(props.subtotal * (DEFAULT_TAX / 100))
  );
  const [tip, setTip] = useState(
    props.toPrice(props.subtotal * (DEFAULT_TIP / 100))
  );

  const [taxPercentage, setTaxPercentage] = useState(DEFAULT_TAX);
  const [tipPercentage, setTipPercentage] = useState(DEFAULT_TIP);

  return (
    <div className="max-w-md bg-neutral-950 flex flex-col grow items-center h-full">
      <div className="flex items-center h-14 shadow mb-2 w-full bg-neutral-900 text-white">
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

      <div className="h-min bg-neutral-900 text-white mt-2 shadow w-11/12 mb-4">
        <h1 className="ml-4 mt-2 mb-4 text-xl">order details</h1>
        {props.receiptDetails.map((data, index) => (
          <div className="flex flex-col ml-4 mb-4 mr-4 text-sm" key={data.id}>
            <div className="flex grow">
              <input
                name="name"
                placeholder="Enter Name"
                value={data.name}
                className="w-20 bg-neutral-900 text-white"
                autoComplete="off"
                maxLength="10"
                onClick={(event) =>
                  event.target.setSelectionRange(0, event.target.value.length)
                }
                onChange={(event) => props.handleInputChange(index, event)}
              />

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
            <div className="flex opacity-40">
              {data.items.map((item, index) => (
                <div key={data.id + index} className="mr-2">
                  item {item}
                  {index < data.items.length - 1 ? "," : null}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="h-min bg-neutral-900 text-white shadow w-11/12 mb-2 text-sm">
        <h1 className="ml-4 mt-2 mb-4 text-xl">total</h1>
        <div className="flex ml-4 mr-4 mb-2">
          <h1>subtotal</h1>
          <div className="grow"></div>
          <h1>${props.subtotal.toFixed(2)}</h1>
        </div>

        <div className="flex ml-4 mr-4 mb-2">
          <h1>tax</h1>
          <input
            value={taxPercentage}
            className="w-20 text-center bg-neutral-900"
            autoComplete="off"
            type="number"
            onChange={(event) => {
              setTaxPercentage(event.target.value);
              setTax(
                props.toPrice((event.target.value / 100) * props.subtotal)
              );
            }}
          />
          %<div className="grow"></div>
          $
          <input
            value={tax}
            className="w-12 text-right bg-neutral-900"
            autoComplete="off"
            type="number"
            onChange={(event) => {
              setTaxPercentage(
                props.toPrice((event.target.value / props.subtotal) * 100)
              );
              setTax(event.target.value);
            }}
          />
        </div>

        <div className="flex ml-4 mr-4 mb-2">
          <h1>tip</h1>
          <input
            value={tipPercentage}
            className="w-20 text-center bg-neutral-900"
            autoComplete="off"
            type="number"
            onChange={(event) => {
              setTipPercentage(event.target.value);
              setTip(
                props.toPrice((event.target.value / 100) * props.subtotal)
              );
            }}
          />
          %<div className="grow"></div>
          $
          <input
            value={tip}
            className="w-12 text-right bg-neutral-900"
            autoComplete="off"
            type="number"
            onChange={(event) => {
              setTipPercentage(
                props.toPrice((event.target.value / props.subtotal) * 100)
              );
              setTip(event.target.value);
            }}
          />
        </div>

        <div className="flex ml-4 mr-4 mb-2">
          <h1>grand total</h1>
          <div className="grow"></div>
          <h1>${(props.subtotal + tax + tip).toFixed(2)}</h1>
        </div>
      </div>
    </div>
  );
}
