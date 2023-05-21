export default function SplitBill(props) {
  return (
    <div className="flex flex-col justify-center items-center grow">
      <div className="">
        <h1>subtotal ${props.subtotal.toFixed(2)}</h1>
      </div>
      <div className="flex flex-col justify-center items-center">
        <h1>tip {props.tipPercentage.toFixed(2)}%</h1>
        <h1>${props.tip.toFixed(2)}</h1>
      </div>
      <div className="flex flex-col justify-center items-center">
        <h1>tax {props.taxPercentage.toFixed(2)}%</h1>
        <h1>${props.tax.toFixed(2)}</h1>
      </div>
      <div className="">
        <h1>grand total ${props.grandTotal.toFixed(2)}</h1>
      </div>
    </div>
  );
}
