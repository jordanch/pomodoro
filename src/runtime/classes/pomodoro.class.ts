import diff from "date-fns/difference_in_milliseconds"
import { IPomodoroSqlRecord } from "../../models"

export class Pomodoro {
  static fromDB(record: IPomodoroSqlRecord) {
    const { id, started_at, stopped_at } = record

    return new Pomodoro({
      id,
      startedAt: new Date(started_at),
      stoppedAt: stopped_at ? new Date(stopped_at) : undefined
    })
  }

  public id: number

  public startedAt: Date

  public stoppedAt: Date | null

  constructor({
    id,
    startedAt,
    stoppedAt
  }: {
    id: number
    startedAt: Date
    stoppedAt?: Date
  }) {
    this.id = id
    this.startedAt = startedAt
    this.stoppedAt = stoppedAt || null
  }

  getElapsedMs() {
    return diff(new Date(), new Date(this.startedAt))
  }

  stop() {
    if (!Boolean(this.stoppedAt)) {
      this.stoppedAt = new Date()
    }
  }

  toDB() {
    return {
      id: this.id,
      started_at: this.startedAt,
      stopped_at: this.stoppedAt
    }
  }
}
