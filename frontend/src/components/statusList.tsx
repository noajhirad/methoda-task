import { useEffect } from "react";
import { StatusItem } from "./statusItem";
import { statusListProps } from "../types";

export function StatusList({ list, setList }: statusListProps) {
  async function fetchList() {
    const response = await fetch("http://localhost:5001/status-list");
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
        <StatusItem
          name={item.name}
          isInit={item.isInit}
          isOrphan={item.isOrphan}
          isFinal={item.isFinal}
          key={index}
        />
      ))}
    </div>
  );
}
