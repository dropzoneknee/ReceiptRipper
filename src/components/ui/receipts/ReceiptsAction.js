import Image from "next/image";
import { MdKeyboardArrowRight, MdRefresh } from "react-icons/md";

export default function ReceiptsAction(props) {
  const submit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex-col flex grow">
      <div className="flex h-14 items-center mr-1 ml-3">
        <button
          className="mt-2 text-4xl active:opacity-100 opacity-50 text-white"
          onClick={() => location.reload()}
        >
          <MdRefresh />
        </button>
        <div className="mt-2 grow flex justify-center items-center ml-1">
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
          className="text-5xl active:opacity-100 opacity-50 text-white"
          onClick={props.toSubtotalPage}
        >
          <MdKeyboardArrowRight />
        </button>
      </div>
      <div className="flex items-center justify-center grow">
        <form
          autoComplete="off"
          className="grid grid-cols-3 gap-6"
          onSubmit={submit}
        >
          {props.receiptDetails.map((data, index) => (
            <div
              className="flex flex-col items-center justify-center text-sm bg-neutral-900"
              key={index}
            >
              <Image
                src="/receipt.png"
                alt="Receipt"
                className="mb-2"
                width={64}
                height={92}
                priority
              />

              <input
                name="name"
                placeholder="Enter Name"
                value={data.name}
                className="w-20 text-center bg-neutral-900 text-white"
                autoComplete="off"
                maxLength="10"
                onClick={(event) =>
                  event.target.setSelectionRange(0, event.target.value.length)
                }
                onChange={(event) => props.handleInputChange(index, event)}
              />
            </div>
          ))}
        </form>
      </div>
      <div className="h-1/6 flex justify-center items-end">
        <button
          className="bg-neutral-800 text-white rounded w-32 h-12 active:brightness-50 shadow-lg border-b-4 mb-2 border-neutral-950"
          onClick={props.toSubtotalPage}
        >
          confirm
        </button>
      </div>
    </div>
  );
}
