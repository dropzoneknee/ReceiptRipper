import Image from "next/image";

export default function ReceiptsAction(props) {
  return (
    <div className="flex-col flex grow ">
      <div className="h-1/10"></div>
      <div className="h-8/10 grow grid grid-cols-3 items-center justify-center">
        {props.receiptDetails.map((data) => (
          <div
            className="flex flex-col items-center justify-center"
            key={data.name}
          >
            <h1>{data.name}</h1>
            <Image
              src="/receipt.svg"
              alt="Receipt"
              className=""
              width={80}
              height={115}
              priority
            />
          </div>
        ))}
      </div>
      <div className="flex h-1/10 items-end mr-4 ml-4 ">
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
