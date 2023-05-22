import Image from "next/image";

export default function ReceiptsAction(props) {
  return (
    <div className="flex-col flex grow ">
      <div className="h-1/10 flex justify-center items-center"></div>
      <div className="h-8/10 flex items-center justify-center">
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
      <div className="flex h-1/10 items-end mr-4 ml-4">
        <div className="grow"></div>
        <button
          className="text-8xl active:opacity-30"
          onClick={props.toSubtotalPage}
        >
          →
        </button>
      </div>
    </div>
  );
}
