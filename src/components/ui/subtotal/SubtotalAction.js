import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

export default function SubtotalAction(props) {
  return (
    <div className="flex-col flex grow justify-center items-center">
      <div className="flex h-14 items-start mr-1 ml-1 w-full">
        <button
          className="text-5xl active:opacity-100 opacity-50 text-white"
          onClick={props.toReceiptsPage}
        >
          <MdKeyboardArrowLeft />
        </button>
        <div className="grow"></div>
      </div>
      <div className="flex flex-col justify-center items-center grow">
        <div className="flex justify-center mb-2">
          <h2 className="text-2xl text-white">enter subtotal</h2>
        </div>
        <div
          className={
            props.subtotal == 0
              ? "opacity-30 flex justify-center mb-2 text-white"
              : "flex justify-center mb-2 text-white"
          }
        >
          $<h1 className="text-6xl">{props.subtotal.toFixed(2)}</h1>
        </div>
      </div>
      <div className="h-1/5 flex items-end justify-center">
        {props.subtotal > 0 ? (
          <button
            className="bg-neutral-800 mb-2 text-white rounded w-32 h-12 active:brightness-50 shadow-lg border-b-4 border-neutral-950"
            onClick={props.toItemEntryPage}
          >
            next
          </button>
        ) : (
          <button className="bg-neutral-800 mb-2 text-white rounded w-32 h-12 shadow-lg border-b-4 border-neutral-950 opacity-20 cursor-not-allowed">
            next
          </button>
        )}
      </div>
    </div>
  );
}
