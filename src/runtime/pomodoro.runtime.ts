import diff from "date-fns/difference_in_milliseconds";

export class Pomodoro {
  constructor(public id: number, public startedAt: Date = new Date()) {}

  get elapsedMs() {
    return diff(new Date(), new Date(this.startedAt));
  }
}
