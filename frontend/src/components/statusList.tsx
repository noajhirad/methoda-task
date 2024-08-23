import { useEffect } from "react";
import { StatusItem } from "./statusItem";
import { statusListProps } from "../types";

export function StatusList({
  list,
  setList,
  fetchStatusList,
  fetchTransitionList,
  setNewInitStatus,
}: statusListProps) {
  return (
    <div>
      {list.map((item, index) => (
        <StatusItem
          status={item}
          fetchStatusList={fetchStatusList}
          fetchTransitionList={fetchTransitionList}
          setNewInitStatus={setNewInitStatus}
          key={index}
        />
      ))}
    </div>
  );
}
