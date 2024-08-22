import React from "react";
import { status } from "../types";

export function StatusItem(props: status) {
  return (
    <div>
      {`${props.name} ${props.isInit ? `[INIT]` : ``} ${
        props.isOrphan ? `[ORPHAN]` : ``
      } ${props.isFinal ? `[FINAL]` : ``}`}
      <button>remove</button>
    </div>
  );
}
