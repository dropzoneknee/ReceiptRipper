import { MdKeyboardArrowLeft, MdRefresh } from "react-icons/md";
import { useState } from "react";

export default function Result(props) {
  const DEFAULT_TAX = 8.38;
  const DEFAULT_TIP = 20;
  const DEFAULT_MODIFIERS = [
    {
      id: 1,
      name: "tax",
      total: props.toPrice(props.subtotal * (DEFAULT_TAX / 100)),
      percentage: DEFAULT_TAX,
    },
    {
      id: 2,
      name: "tip",
      total: props.toPrice(props.subtotal * (DEFAULT_TIP / 100)),
      percentage: DEFAULT_TIP,
    },
  ];

  const [modifiers, setModifiers] = useState(DEFAULT_MODIFIERS);

  function applyModifiers(num) {
    return (
      num +
      modifiers
        .map((mod) => (mod.percentage * num) / 100)
        .reduce(function (a, b) {
          return a + b;
        })
    );
  }

  function handlePercentageChange(index, event) {
    const newModifiers = [...modifiers];
    newModifiers[index].percentage = event.target.value;
    newModifiers[index].total = props.toPrice(
      (event.target.value / 100) * props.subtotal
    );

    setModifiers(newModifiers);
  }

  function handleTotalChange(index, event) {
    const newModifiers = [...modifiers];
    newModifiers[index].percentage = props.toPrice(
      (event.target.value / props.subtotal) * 100
    );
    newModifiers[index].total = event.target.value;

    setModifiers(newModifiers);
  }

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
                <h1>${applyModifiers(data.total).toFixed(2)}</h1>
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

        {modifiers.map((data, index) => (
          <div className="flex ml-4 mr-4 mb-2" key={"modifiers" + index}>
            <h1 className="mr-2">{data.name}</h1>
            <input
              value={data.percentage}
              className="w-10 bg-neutral-900"
              autoComplete="off"
              type="number"
              onChange={(event) => handlePercentageChange(index, event)}
            />
            %<div className="grow"></div>
            $
            <input
              value={data.total}
              className="w-12 text-right bg-neutral-900"
              autoComplete="off"
              type="number"
              onChange={(event) => handleTotalChange(index, event)}
            />
          </div>
        ))}

        <div className="flex ml-4 mr-4 mb-2">
          <h1>grand total</h1>
          <div className="grow"></div>
          <h1>${props.toPrice(applyModifiers(props.subtotal))}</h1>
        </div>
      </div>
    </div>
  );
}
