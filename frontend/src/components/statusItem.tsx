import React from "react";
import { status, statusItemProps } from "../types";

export function StatusItem({
  status,
  fetchStatusList,
  fetchTransitionList,
  setNewInitStatus,
}: statusItemProps) {
  async function removeStatus() {
    const response = await fetch("http://localhost:5001/delete-status", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: status.name }),
    });
    if (!response.ok) {
      console.log("server error!");
    }
  }

  return (
    <div>
      {`${status.name} ${status.isInit ? `[INIT]` : ``} ${
        status.isOrphan ? `[ORPHAN]` : ``
      } ${status.isFinal ? `[FINAL]` : ``}`}
      <button
        onClick={async () => {
          await removeStatus();
          //await fetchStatusList();
          //await fetchTransitionList();
          await setNewInitStatus();
          await fetchStatusList();
          await fetchTransitionList();
        }}
      >
        remove
      </button>
    </div>
  );
}
