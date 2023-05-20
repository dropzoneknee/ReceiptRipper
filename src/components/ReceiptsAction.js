import Image from "next/image";

export default function ReceiptsAction(props) {
  return (
    <div className="flex-col grow justify-center items-center">
      <div className="h-1/10"></div>
      <div className="h-8/10 grow grid grid-cols-3">
        {props.receiptDetails.map((data) => (
          <div className="" key={data.name}>
            <h1>{data.name}</h1>
            <Image
              src="/receipt.svg"
              alt="Receipt"
              className=""
              width={100}
              height={144}
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
