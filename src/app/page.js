import Image from "next/image";

export default function Home() {
  let seatAmount = 2,
    subtotal,
    tax,
    taxPercentage,
    tip,
    tipPercentage,
    grandTotal;

  function addSeat() {
    seatAmount++;
  }

  return (
    <main className="bg-slate-300 h-screen flex justify-center items-center">
      <div className="max-w-md h-screen bg-white overflow-hidden">
        <div className="actionScreen w-screen h-2/3"></div>
        <div className="interactionScreen w-screen h-1/3 bg-primary text-white overflow-hidden">
          <div className="howMany relative w-screen">
            <div className="absolute w-max top-12 left-1/2 transform -translate-x-1/2 ">
              <div className="flex relative mb-4">
                <h1 className="text-8xl">{seatAmount}</h1>
                <div className="flex-none">
                  <button className="plusButton text-5xl" onClick={addSeat}>
                    +
                  </button>
                  <button className="minusButton text-5xl">-</button>
                </div>
              </div>
              <h2 className="text-2xl">how many?</h2>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
