import { useState } from "react";
import "./App.css";
import { StatusList } from "./components/statusList";
import { status, transition } from "./types";
import { TransitionList } from "./components/transitionList";
import { AddStatus } from "./components/addStatus";
import { AddTransition } from "./components/addTransition";

function App() {
  const [statusList, setStatusList] = useState<status[]>([]);
  const [trasitionList, setTransitionList] = useState<transition[]>([]);

  return (
    <div className="App">
      <div>
        <AddStatus />
        <StatusList list={statusList} setList={setStatusList} />
      </div>
      <div>
        <AddTransition list={statusList} />
        <TransitionList list={trasitionList} setList={setTransitionList} />
      </div>
    </div>
  );
}

export default App;
