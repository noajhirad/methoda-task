import { transition, transitionItemProps } from "../types";

export function TransitionItem({
  transition,
  fetchTransitionList,
}: transitionItemProps) {
  async function removeTransition() {
    const response = await fetch("http://localhost:5001/delete-transition", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: transition.name }),
    });
    if (!response.ok) {
      console.log("server error!");
    }
  }

  return (
    <div>
      {`${transition.name}: ${transition.fromStatus} -> ${transition.toStatus}`}
      <button
        onClick={async () => {
          await removeTransition();
          await fetchTransitionList();
        }}
      >
        remove
      </button>
    </div>
  );
}
