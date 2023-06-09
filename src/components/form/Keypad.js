export default function Keypad(props) {
  const keypadStyles =
    "text-2xl w-20 h-14 flex items-center justify-center drop-shadow-md";

  const buttonStyles = "active:brightness-50 ";

  return (
    <div className="flex justify-center grow items-center text-white">
      <div className="grid grid-cols-3 gap-1">
        <button className={buttonStyles} onClick={() => props.changeState(1)}>
          <div className={keypadStyles}>1</div>
        </button>
        <button className={buttonStyles} onClick={() => props.changeState(2)}>
          <div className={keypadStyles}>2</div>
        </button>
        <button className={buttonStyles} onClick={() => props.changeState(3)}>
          <div className={keypadStyles}>3</div>
        </button>

        <button className={buttonStyles} onClick={() => props.changeState(4)}>
          <div className={keypadStyles}>4</div>
        </button>
        <button className={buttonStyles} onClick={() => props.changeState(5)}>
          <div className={keypadStyles}>5</div>
        </button>
        <button className={buttonStyles} onClick={() => props.changeState(6)}>
          <div className={keypadStyles}>6</div>
        </button>

        <button className={buttonStyles} onClick={() => props.changeState(7)}>
          <div className={keypadStyles}>7</div>
        </button>
        <button className={buttonStyles} onClick={() => props.changeState(8)}>
          <div className={keypadStyles}>8</div>
        </button>
        <button className={buttonStyles} onClick={() => props.changeState(9)}>
          <div className={keypadStyles}>9</div>
        </button>
        <div className={keypadStyles}></div>

        <button className={buttonStyles} onClick={() => props.changeState(0)}>
          <div className={keypadStyles}>0</div>
        </button>
        <button className={buttonStyles} onClick={props.subtractState}>
          <div className={keypadStyles}>⌫</div>
        </button>
      </div>
    </div>
  );
}
