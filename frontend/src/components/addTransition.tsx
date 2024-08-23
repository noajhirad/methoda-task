import { useEffect, useState } from "react";
import { addTransitionProps, transition } from "../types";

export function AddTransition({
  statusList,
  fetchTransitionList,
}: addTransitionProps) {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [name, setName] = useState("");

  async function addTransition() {
    if (from === "" || to === "" || name === "") {
      console.log("error! please assign non empty values!");
    } else {
      const t: transition = {
        name: name.toString(),
        fromStatus: from.toString(),
        toStatus: to.toString(),
      };

      const response = await fetch("http://localhost:5001/add-transition", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(t),
      });
      if (!response.ok) {
        console.log("server error!");
      } else {
        await fetchTransitionList();
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
      <select
        name="from"
        id="from"
        value={from}
        onChange={(e) => setFrom(e.target.value)}
      >
        <option value=""></option>
        {statusList.map((status, index) => (
          <option key={index} value={status.name}>
            {status.name}
          </option>
        ))}
      </select>
      <select
        name="to"
        id="to"
        value={to}
        onChange={(e) => setTo(e.target.value)}
      >
        <option value=""></option>
        {statusList.map((status, index) => (
          <option key={index} value={status.name}>
            {status.name}
          </option>
        ))}
      </select>
      <button
        onClick={async () => {
          await addTransition();
          //await fetchTransitionList();
        }}
      >
        Add
      </button>
    </div>
  );
}
