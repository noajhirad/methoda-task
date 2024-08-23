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
  fetchStatusList: Function;
  fetchTransitionList: Function;
  setNewInitStatus: Function;
};

export type transitionListProps = {
  list: transition[];
  setList: Function;
  fetchTransitionList: Function;
};

export type addTransitionProps = {
  statusList: status[];
  fetchTransitionList: Function;
};

export type addStatusProps = {
  statusList: status[];
  fetchStatusList: Function;
};

export type statusItemProps = {
  status: status;
  fetchStatusList: Function;
  fetchTransitionList: Function;
  setNewInitStatus: Function;
};

export type transitionItemProps = {
  transition: transition;
  fetchTransitionList: Function;
};
