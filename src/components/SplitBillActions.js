import Image from "next/image";

export default function SplitBillActions(props) {
  return (
    <div className="flex-col flex grow ">
      <div className="h-1/10"></div>
      <div className="h-8/10 grow grid grid-cols-3 items-center justify-center">
        {props.receiptDetails.map((data) => (
          <div
            className="flex flex-col items-center justify-center"
            key={data.id}
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
      <div className="flex h-1/10 items-end mr-4 ml-4 ">
        <button
          className="text-8xl active:opacity-30"
          onClick={props.toTaxAndTip}
        >
          ←
        </button>
        <div className="grow">
          <button onClick={() => window.location.reload()}>start over</button>
        </div>
      </div>
    </div>
  );
}
