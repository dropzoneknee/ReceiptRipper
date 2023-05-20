export default function Keypad(props) {
  return (
    <div className="flex justify-center grow items-center">
      <div className="grid grid-cols-3 gap-y-6 gap-x-12">
        <button
          className="text-5xl active:opacity-30"
          onClick={() => props.changeState(1)}
        >
          1
        </button>
        <button
          className="text-5xl active:opacity-30"
          onClick={() => props.changeState(2)}
        >
          2
        </button>
        <button
          className="text-5xl active:opacity-30"
          onClick={() => props.changeState(3)}
        >
          3
        </button>

        <button
          className="text-5xl active:opacity-30"
          onClick={() => props.changeState(4)}
        >
          4
        </button>
        <button
          className="text-5xl active:opacity-30"
          onClick={() => props.changeState(5)}
        >
          5
        </button>
        <button
          className="text-5xl active:opacity-30"
          onClick={() => props.changeState(6)}
        >
          6
        </button>

        <button
          className="text-5xl active:opacity-30"
          onClick={() => props.changeState(7)}
        >
          7
        </button>
        <button
          className="text-5xl active:opacity-30"
          onClick={() => props.changeState(8)}
        >
          8
        </button>
        <button
          className="text-5xl active:opacity-30"
          onClick={() => props.changeState(9)}
        >
          9
        </button>
        <div className="emptyGrid"></div>
        <button
          className="text-5xl active:opacity-30"
          onClick={() => props.changeState(0)}
        >
          0
        </button>
        <button
          className="text-3xl active:opacity-30"
          onClick={props.subtractState}
        >
          ⌫
        </button>
      </div>
    </div>
  );
}
