export default function Keypad(props) {
  return (
    <div className="flex justify-center grow items-center">
      <div className="grid grid-cols-3">
        <button
          className="text-4xl active:opacity-30"
          onClick={() => props.changeState(1)}
        >
          <div className="w-20 h-14 flex items-center justify-center">1</div>
        </button>
        <button
          className="text-4xl active:opacity-30"
          onClick={() => props.changeState(2)}
        >
          <div className="w-20 h-14 flex items-center justify-center">2</div>
        </button>
        <button
          className="text-4xl active:opacity-30"
          onClick={() => props.changeState(3)}
        >
          <div className="w-20 h-14 flex items-center justify-center">3</div>
        </button>

        <button
          className="text-4xl active:opacity-30"
          onClick={() => props.changeState(4)}
        >
          <div className="w-20 h-14 flex items-center justify-center">4</div>
        </button>
        <button
          className="text-4xl active:opacity-30"
          onClick={() => props.changeState(5)}
        >
          <div className="w-20 h-14 flex items-center justify-center">5</div>
        </button>
        <button
          className="text-4xl active:opacity-30"
          onClick={() => props.changeState(6)}
        >
          <div className="w-20 h-14 flex items-center justify-center">6</div>
        </button>

        <button
          className="text-4xl active:opacity-30"
          onClick={() => props.changeState(7)}
        >
          <div className="w-20 h-14 flex items-center justify-center">7</div>
        </button>
        <button
          className="text-4xl active:opacity-30"
          onClick={() => props.changeState(8)}
        >
          <div className="w-20 h-14 flex items-center justify-center">8</div>
        </button>
        <button
          className="text-4xl active:opacity-30"
          onClick={() => props.changeState(9)}
        >
          <div className="w-20 h-14 flex items-center justify-center">9</div>
        </button>
        <div className="w-20 h-14"></div>

        <button
          className="text-4xl active:opacity-30"
          onClick={() => props.changeState(0)}
        >
          <div className="w-20 h-14 flex items-center justify-center">0</div>
        </button>
        <button
          className="text-3xl active:opacity-30"
          onClick={props.subtractState}
        >
          <div className="w-20 h-14 flex items-center justify-center">⌫</div>
        </button>
      </div>
    </div>
  );
}
