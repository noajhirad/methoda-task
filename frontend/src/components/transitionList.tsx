import { useEffect } from "react";
import { transition, transitionListProps } from "../types";
import { TransitionItem } from "./transitionItem";

export function TransitionList({
  list,
  setList,
  fetchTransitionList,
}: transitionListProps) {
  return (
    <div>
      {list.map((item, index) => (
        <TransitionItem
          transition={item}
          fetchTransitionList={fetchTransitionList}
          key={index}
        />
      ))}
    </div>
  );
}
