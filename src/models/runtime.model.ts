import { Pomodoro } from "../runtime";

export interface IRuntimeCache {
  sessions: {
    byId: {
      [id: number]: Pomodoro;
    };
    allIds: number[];
  };
}
