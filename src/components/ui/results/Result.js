import {
  MdKeyboardArrowLeft,
  MdRefresh,
  MdClose,
  MdAddCard,
  MdAddCircle,
} from "react-icons/md";
import { useState } from "react";
import Image from "next/image";

export default function Result(props) {
  const DEFAULT_TAX = 8.38;
  const DEFAULT_TIP = 20;
  const DEFAULT_MODIFIERS = [
    {
      id: 1,
      name: "tax",
      total: props.toPrice(props.subtotal * (DEFAULT_TAX / 100)),
      percentage: DEFAULT_TAX,
      isDiscount: false,
    },
    {
      id: 2,
      name: "tip",
      total: props.toPrice(props.subtotal * (DEFAULT_TIP / 100)),
      percentage: DEFAULT_TIP,
      isDiscount: false,
    },
  ];

  const [modifiers, setModifiers] = useState(DEFAULT_MODIFIERS);
  const [title, setTitle] = useState("order details");
  const [payment, setPayment] = useState([]);

  function applyModifiers(num) {
    return (
      num +
      modifiers
        .map((mod) =>
          mod.isDiscount
            ? (mod.percentage * num) / -100
            : (mod.percentage * num) / 100
        )
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

  function handleAddModifier() {
    setModifiers([
      ...modifiers,
      {
        id: modifiers.length + 1,
        name: "",
        total: 0,
        percentage: 0,
        isDiscount: false,
      },
    ]);
  }

  function handleChangeModifierName(index, event) {
    const newModifiers = [...modifiers];
    newModifiers[index].name = event.target.value;

    setModifiers(newModifiers);
  }

  function addPayment() {
    setPayment([
      ...payment,
      {
        id: payment.length + 1,
        type: "",
        username: "",
      },
    ]);
  }

  function handleChangePaymentType(index, event) {
    const newPayment = [...payment];
    newPayment[index].type = event.target.value;

    setPayment(newPayment);
  }

  function handleChangePaymentUsername(index, event) {
    const newPayment = [...payment];
    newPayment[index].username = event.target.value;

    setPayment(newPayment);
  }

  return (
    <div className="max-w-md bg-neutral-900 flex flex-col grow items-center h-full">
      <div className="flex items-center h-14 w-full bg-neutral-900 text-white">
        <button
          className="text-5xl active:opacity-100 opacity-50 ml-1 mt-2"
          onClick={props.toItemEntryPage}
        >
          <MdKeyboardArrowLeft />
        </button>
        <div className="grow flex justify-center items-center h-full mt-2">
          <Image
            src="/logo.png"
            alt="Logo"
            className=""
            width={1000 / 31}
            height={965 / 31}
            priority
          />
        </div>
        <button
          className="text-4xl active:opacity-100 opacity-50 mr-3 mt-2"
          onClick={() => location.reload()}
        >
          <MdRefresh />
        </button>
      </div>

      <div className="h-min text-white w-full mt-2 mb-4 bg-neutral-900">
        <h1 className="ml-4 mt-4 mb-4 mr-4 text-xl">
          <input
            name="name"
            value={title}
            className="w-full bg-transparent text-white"
            autoComplete="off"
            maxLength="20"
            onClick={(event) =>
              event.target.setSelectionRange(0, event.target.value.length)
            }
            onChange={(event) => setTitle(event.target.value)}
          />
        </h1>
        {props.receiptDetails.map((data, index) => (
          <div className="flex flex-col ml-4 mb-4 mr-4 text-sm" key={data.id}>
            <div className="flex grow">
              <input
                name="name"
                placeholder="Enter Name"
                value={data.name}
                className="w-20 bg-transparent text-white "
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
                  {props.itemsList.find((items) => items.id === item.id).name}
                  {index < data.items.length - 1 ? "," : null}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="h-min bg-neutral-900 text-white w-full mb-4 text-sm">
        <h1 className="ml-4 mt-2 mb-4 text-xl">total</h1>
        <div className="flex ml-4 mr-4 mb-2">
          <h1>subtotal</h1>
          <div className="grow"></div>
          <h1 className="">$</h1>
          <h1 className="w-12 text-right">{props.subtotal.toFixed(2)}</h1>
        </div>

        {modifiers.map((data, index) => (
          <div className="flex ml-4 mr-4 mb-2" key={"modifiers" + index}>
            {index < 2 ? (
              <h1 className="mr-2">{data.name}</h1>
            ) : (
              <div className="flex">
                <button
                  className="flex justify-center items-center mr-2 text-red-500"
                  onClick={() =>
                    setModifiers((modifiers) =>
                      modifiers.filter((i) => i.id !== data.id)
                    )
                  }
                >
                  <MdClose />
                </button>
                <input
                  name="name"
                  value={data.name}
                  className="w-28 bg-transparent text-white"
                  placeholder="enter mod"
                  autoComplete="off"
                  maxLength="15"
                  onClick={(event) =>
                    event.target.setSelectionRange(0, event.target.value.length)
                  }
                  onChange={(event) => handleChangeModifierName(index, event)}
                />
              </div>
            )}
            <input
              value={data.percentage}
              className="w-10 bg-transparent"
              autoComplete="off"
              type="number"
              onChange={(event) => handlePercentageChange(index, event)}
            />
            %<div className="grow"></div>
            $
            <input
              value={data.total}
              className="w-12 text-right bg-transparent"
              autoComplete="off"
              type="number"
              onChange={(event) => handleTotalChange(index, event)}
            />
          </div>
        ))}

        <div className="flex ml-4 mr-4 mb-4">
          <h1 className="">grand total</h1>
          <div className="grow"></div>
          <h1 className="">$</h1>
          <h1 className="w-12 text-right">
            {props.toPrice(applyModifiers(props.subtotal)).toFixed(2)}
          </h1>
        </div>
      </div>

      {payment.length > 0 ? (
        <div className="h-min bg-neutral-900 text-white w-full mb-4 text-sm">
          <h1 className="ml-4 mt-2 mb-4 text-xl">payment options</h1>
          {payment.map((data, index) => (
            <div className="flex ml-4 mr-4 mb-2" key={"payment" + index}>
              <button
                className="flex justify-center items-center mr-2 text-red-500"
                onClick={() =>
                  setPayment((payment) =>
                    payment.filter((i) => i.id !== data.id)
                  )
                }
              >
                <MdClose />
              </button>
              <input
                name="name"
                value={data.type}
                className="w-44 bg-transparent text-white"
                placeholder="venmo, cash app, etc."
                autoComplete="off"
                maxLength="15"
                onClick={(event) =>
                  event.target.setSelectionRange(0, event.target.value.length)
                }
                onChange={(event) => handleChangePaymentType(index, event)}
              />
              <div className="grow"></div>
              <input
                name="name"
                value={data.username}
                className="w-28 bg-transparent text-white text-right"
                placeholder="@username"
                autoComplete="off"
                maxLength="15"
                onClick={(event) =>
                  event.target.setSelectionRange(0, event.target.value.length)
                }
                onChange={(event) => handleChangePaymentUsername(index, event)}
              />
            </div>
          ))}
        </div>
      ) : null}

      <div className="flex justify-center items-center h-16 w-full space-x-3">
        <button className="text-3xl text-white" onClick={handleAddModifier}>
          <MdAddCircle />
        </button>
        <button className="text-3xl text-white" onClick={addPayment}>
          <MdAddCard />
        </button>
      </div>
    </div>
  );
}
