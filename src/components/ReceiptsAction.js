export default function ReceiptsAction(props) {
  return (
    <div className="flex grow justify-end items-end">
      <button className="text-8xl mr-3" onClick={props.toSubtotalPage}>
        →
      </button>
    </div>
  );
}
