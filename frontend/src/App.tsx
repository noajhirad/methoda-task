import { useEffect, useState } from "react";
import "./App.css";
import { StatusList } from "./components/statusList";
import { status, transition } from "./types";
import { TransitionList } from "./components/transitionList";
import { AddStatus } from "./components/addStatus";
import { AddTransition } from "./components/addTransition";

function App() {
  const [statusList, setStatusList] = useState<status[]>([]);
  const [transitionList, setTransitionList] = useState<transition[]>([]);

  // console.log(statusList);

  async function fetchTransitionList() {
    const response = await fetch("http://localhost:5001/transition-list");
    if (!response.ok) {
      const errorMessage = await response.text();
      console.log("server error!", errorMessage);
    }
    const data = await response.json();
    setTransitionList(data);
    setIfFinal(data);
    //setIfOrphan([...statusList]);
  }

  async function fetchStatusList() {
    const response = await fetch("http://localhost:5001/status-list");
    if (!response.ok) {
      const errorMessage = await response.text();
      console.log("server error!", errorMessage);
    }

    const data = await response.json();
    //setStatusList(data);
    setIfOrphan(data);
    //setIfFinal([...transitionList]);
  }

  async function resetData() {
    const response = await fetch("http://localhost:5001/delete-all", {
      method: "DELETE",
    });
    if (!response.ok) {
      const errorMessage = await response.text();
      console.log("server error!", errorMessage);
    } else {
      setStatusList([]);
      setTransitionList([]);
    }
  }

  async function setNewInitStatus() {
    statusList.shift();
    if (statusList.length > 0) {
      let newInit = statusList[0].name;
      const response = await fetch("http://localhost:5001/new-init", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newInit }),
      });
      if (!response.ok) {
        const errorMessage = await response.text();
        console.log("server error!", errorMessage);
      }
    }
  }

  function setIfOrphan(statusList: status[]) {
    if (statusList.length > 0) {
      const map = new Map();
      let init: string | undefined;

      for (const s of statusList) {
        s.isOrphan = true;
        map.set(s.name, s);
        if (s.isInit) init = s.name;
      }

      if (init) {
        const stack = [init];
        const visited = new Set<string>();

        while (stack.length > 0) {
          const curr = stack.shift()!;
          visited.add(curr);

          map.get(curr).isOrphan = false;

          for (const t of transitionList) {
            if (t.fromStatus === curr && !visited.has(t.toStatus)) {
              stack.push(t.toStatus);
            }
          }
        }
      }

      setStatusList([...statusList]);
    }
  }

  function setIfFinal(transitionList: transition[]) {
    if (statusList.length > 0) {
      const map = new Map<string, boolean>();

      for (const s of statusList) {
        s.isFinal = true;
        map.set(s.name, true);
      }

      for (const t of transitionList) {
        if (map.has(t.fromStatus)) {
          const status = statusList.find((s) => s.name === t.fromStatus);
          if (status) {
            status.isFinal = false;
          }
        }
      }

      setStatusList([...statusList]);
    }
  }

  useEffect(() => {
    fetchStatusList();
    fetchTransitionList();
  }, []);

  return (
    <div className="App">
      <div className="content">
        <div>
          <AddStatus
            statusList={statusList}
            fetchStatusList={fetchStatusList}
          />
          <StatusList
            list={statusList}
            setList={setStatusList}
            fetchStatusList={fetchStatusList}
            fetchTransitionList={fetchTransitionList}
            setNewInitStatus={setNewInitStatus}
          />
        </div>
        <div>
          <AddTransition
            statusList={statusList}
            fetchTransitionList={fetchTransitionList}
          />
          <TransitionList
            list={transitionList}
            setList={setTransitionList}
            fetchTransitionList={fetchTransitionList}
          />
        </div>
      </div>
      <button className="reset-btn" onClick={async () => await resetData()}>
        RESET
      </button>
    </div>
  );
}

export default App;
