export default function Receipts(props) {
  return (
    <div className="howMany flex justify-center items-center grow ">
      <div className="flex flex-col justify-center">
        <div className="flex justify-center">
          <h1 className="text-8xl">{props.receiptAmount}</h1>
          <div className="flex flex-col ml-7">
            <button
              className="plusButton text-5xl active:opacity-30"
              onClick={props.addReceipt}
            >
              +
            </button>
            <button
              className="minusButton text-5xl active:opacity-30"
              onClick={props.subtractReceipt}
            >
              -
            </button>
          </div>
        </div>
        <h2 className="text-2xl">how many?</h2>
      </div>
    </div>
  );
}
