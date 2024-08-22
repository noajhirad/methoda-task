import { useEffect } from "react";
import { transitionListProps } from "../types";
import { TransitionItem } from "./transitionItem";

export function TransitionList({ list, setList }: transitionListProps) {
  async function fetchList() {
    const response = await fetch("http://localhost:5001/transition-list");
    if (!response.ok) {
      // error
    }
    const data = await response.json();
    setList(data);
  }

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div>
      {list.map((item, index) => (
        <TransitionItem
          name={item.name}
          fromStatus={item.fromStatus}
          toStatus={item.toStatus}
          key={index}
        />
      ))}
    </div>
  );
}
