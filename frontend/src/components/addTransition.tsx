import { addTransitionProps, transition } from "../types";

export function AddTransition({ list }: addTransitionProps) {
  return (
    <div>
      <input type="text" />
      <select name="from" id="from">
        {list.map((status, index) => (
          <option key={index} value={status.name}>
            {status.name}
          </option>
        ))}
      </select>
      <select name="to" id="to">
        {list.map((status, index) => (
          <option key={index} value={status.name}>
            {status.name}
          </option>
        ))}
      </select>
      <button>Add</button>
    </div>
  );
}
