import { MdKeyboardArrowLeft, MdCancel } from "react-icons/md";
import Image from "next/image";

export default function SubtotalAction(props) {
  return (
    <div className="flex-col flex grow justify-center items-center text-white">
      <div className="flex h-14 items-start mr-1 ml-1 w-full">
        <button
          className="text-5xl active:opacity-100 opacity-50 text-white mt-2 ml-1"
          onClick={props.toReceiptsPage}
        >
          <MdKeyboardArrowLeft />
        </button>
        <div className="mt-2 grow flex justify-center items-center"></div>
      </div>
      <div className="flex flex-col justify-center items-center grow">
        <div className="flex justify-center mb-2 flex-col items-center">
          <h2 className="text-xl text-white">enter subtotal</h2>
          <p className="text-white text-xs opacity-30">
            &#40;before tax & tip&#41;
          </p>
        </div>

        <div className="grid grid-cols-4">
          <h1
            className={
              props.subtotal > 0
                ? "flex justify-end"
                : "flex justify-end opacity-30"
            }
          >
            $
          </h1>
          <h1
            className={
              props.subtotal > 0
                ? "text-5xl col-span-2"
                : "text-5xl col-span-2 opacity-30"
            }
          >
            {props.subtotal.toFixed(2)}
          </h1>
          <div className="flex items-center">
            <div className="cursor"></div>
            <div className="flex items-start grow h-full mt-2 ml-3">
              <button onClick={() => props.setSubtotal(0)}>
                <MdCancel />
              </button>
            </div>
          </div>
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
