import { Pomodoro } from "../runtime";

export interface IRuntimeCache {
  sessions: {
    byId: {
      [id: number]: Pomodoro;
    };
    allIds: number[];
  };
}

export interface IStorage {
  addPomodoro(pomodoro: Pomodoro, id: number): Promise<number>,
  queryPomodoro(id: number): Promise<Pomodoro>,
  updatePomodoro(pomodoro: Pomodoro, id: number): Promise<number>,
  getNextId(): Promise<number>
}
