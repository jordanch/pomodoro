import { Pomodoro } from "../runtime";

export interface ISessionCache {
  sessions: {
    byId: {
      [id: number]: Pomodoro;
    };
    allIds: number[];
  };
}
