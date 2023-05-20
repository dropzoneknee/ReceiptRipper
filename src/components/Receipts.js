export default function Receipts(props) {
  return (
    <div className="howMany flex justify-center items-center grow ">
      <div className="flex flex-col justify-center">
        <div className="flex justify-center">
          <h1 className="text-8xl">{props.seatAmount}</h1>
          <div className="flex flex-col ml-7">
            <button className="plusButton text-5xl" onClick={props.addSeat}>
              +
            </button>
            <button
              className="minusButton text-5xl"
              onClick={props.subtractSeat}
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
