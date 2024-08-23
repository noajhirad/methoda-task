import { useState } from "react";
import { addStatusProps } from "../types";

export function AddStatus({ statusList, fetchStatusList }: addStatusProps) {
  const [name, setName] = useState("");

  async function addStatus() {
    if (name === "") {
      console.log("error! please assign non empty values!");
    } else {
      const s = {
        name: name.toString(),
        isInit: statusList.length === 0,
      };

      const response = await fetch("http://localhost:5001/add-status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(s),
      });
      if (!response.ok) {
        const errorMessage = await response.text();
        console.log("server error!", errorMessage);
      } else {
        await fetchStatusList();
      }
    }
  }

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button
        onClick={async () => {
          await addStatus();
          //await fetchStatusList();
        }}
      >
        Add
      </button>
    </div>
  );
}
