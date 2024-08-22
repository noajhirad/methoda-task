export type status = {
  name: string;
  isInit: boolean;
  isOrphan: boolean;
  isFinal: boolean;
};

export type transition = {
  name: string;
  fromStatus: string;
  toStatus: string;
};

export type statusListProps = {
  list: status[];
  setList: Function;
};

export type transitionListProps = {
  list: transition[];
  setList: Function;
};

export type addTransitionProps = {
  list: status[];
};
