export default function TaxOrTipAction(props) {
  return (
    <div className="flex-col flex grow">
      <div className="h-1/10"></div>
      <div className="flex flex-col h-4/5 justify-start items-center grow">
        <div className="h-1/4 flex flex-col items-center">
          <h2 className="text-2xl">subtotal</h2>
          <div className="flex justify-center">
            $<h1 className="text-6xl">{props.subtotal.toFixed(2)}</h1>
          </div>
        </div>

        <div className="w-full h-1/4 flex items-center mx-4">
          <div className="flex justify-start items-start">
            $
            <button
              className={props.currentActiveMod === 1 ? null : "opacity-30"}
              onClick={() => props.activateTipOrTax(1)}
            >
              <h1 className="text-4xl">{props.tax.toFixed(2)}</h1>
            </button>
          </div>
          <div className="grow  flex items-center justify-center">
            <h2 className="text-1xl">tax</h2>
          </div>
          <div className="flex justify-center">
            <button
              className={props.currentActiveMod === 2 ? null : "opacity-30"}
              onClick={() => props.activateTipOrTax(2)}
            >
              <h1 className="text-4xl">{props.taxPercentage.toFixed(2)}</h1>
            </button>
            %
          </div>
        </div>

        <div className="w-full h-1/4 flex items-center">
          <div className="flex justify-center">
            $
            <button
              className={props.currentActiveMod === 3 ? null : "opacity-30"}
              onClick={() => props.activateTipOrTax(3)}
            >
              <h1 className="text-4xl">{props.tip.toFixed(2)}</h1>
            </button>
          </div>
          <div className="grow flex justify-center">
            <h2 className="text-1xl">tip</h2>
          </div>
          <div className="flex justify-center">
            <button
              className={props.currentActiveMod === 4 ? null : "opacity-30"}
              onClick={() => props.activateTipOrTax(4)}
            >
              <h1 className="text-4xl">{props.tipPercentage.toFixed(2)}</h1>
            </button>
            %
          </div>
        </div>

        <div className="h-1/4 ">
          <h2 className="text-2xl">grand total</h2>
          <div className="flex justify-center">
            $<h1 className="text-6xl">{props.grandTotal.toFixed(2)}</h1>
          </div>
        </div>
      </div>

      <div className="h-1/10 flex items-end mr-4 ml-4">
        <button
          className="text-8xl active:opacity-30"
          onClick={props.toItemEntryPage}
        >
          ←
        </button>
        <div className="grow"></div>
        <button
          className="text-8xl active:opacity-30"
          onClick={props.toCompleteSplitBill}
        >
          →
        </button>
      </div>
    </div>
  );
}
