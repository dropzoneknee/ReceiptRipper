export default function SubtotalAction(props) {
  return (
    <div className="flex-col grow justify-center items-center">
      <div className="h-1/5"></div>
      <div className="flex h-3/5 justify-center items-center grow">
        <div className="flex-col ">
          <div className="flex justify-center mb-4">
            <h2 className="text-2xl">enter subtotal</h2>
          </div>
          <div
            className={
              props.subtotal == 0
                ? "opacity-30 flex justify-center"
                : "flex justify-center"
            }
          >
            $<h1 className="text-6xl">{props.subtotal.toFixed(2)}</h1>
          </div>
        </div>
      </div>
      <div className="h-1/5 flex items-end mr-4 ml-4">
        <button
          className="text-8xl active:opacity-30"
          onClick={props.toReceiptsPage}
        >
          ←
        </button>
        <div className="grow"></div>
        {props.subtotal > 0 ? (
          <button
            className="text-8xl active:opacity-30"
            onClick={props.toItemEntryPage}
          >
            →
          </button>
        ) : null}
      </div>
    </div>
  );
}
