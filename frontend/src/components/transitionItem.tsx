import { transition } from "../types";

export function TransitionItem(props: transition) {
  return (
    <div>
      {`${props.name}: ${props.fromStatus} -> ${props.toStatus}`}
      <button>remove</button>
    </div>
  );
}
