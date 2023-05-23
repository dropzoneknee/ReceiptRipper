import Image from "next/image";
import { MdKeyboardArrowRight, MdRefresh } from "react-icons/md";

export default function ReceiptsAction(props) {
  return (
    <div className="flex-col flex grow ">
      <div className="flex h-1/6 items-start mr-1 ml-1">
        <button
          className="mt-2 text-5xl active:opacity-100 opacity-50"
          onClick={() => location.reload()}
        >
          <MdRefresh />
        </button>
        <div className="grow"></div>
        <button
          className="text-6xl active:opacity-100 opacity-50"
          onClick={props.toSubtotalPage}
        >
          <MdKeyboardArrowRight />
        </button>
      </div>
      <div className="h-4/6 flex items-center justify-center grow">
        <div className="grid grid-cols-3 gap-8">
          {props.receiptDetails.map((data) => (
            <div
              className="flex flex-col items-center justify-center text-sm"
              key={data.name}
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
            </div>
          ))}
        </div>
      </div>
      <div className="h-1/6 flex justify-center items-end">
        <button
          className="bg-indigo-500 text-white rounded w-32 h-12 active:brightness-50 shadow-lg border-b-4 mb-2 border-indigo-700"
          onClick={props.toSubtotalPage}
        >
          confirm
        </button>
      </div>
    </div>
  );
}
