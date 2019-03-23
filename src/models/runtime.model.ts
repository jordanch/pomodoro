import { Pomodoro } from "../runtime"

export interface IStorage {
  addPomodoro(pomodoro: Pomodoro): Promise<number>
  queryPomodoro(id: number): Promise<Pomodoro | undefined>
  updatePomodoro(pomodoro: Pomodoro, id: number): Promise<number>
  getNextId(): Promise<number>
}

export interface IControllerResponse {
  status: number
}

export interface IRootController extends IControllerResponse {
  body: string
}

export interface IStartController extends IControllerResponse {
  body: number
}

export interface IStateController extends IControllerResponse {
  body:
    | string
    | {
        ms: number
        min: number
        hasFinished: boolean
        id: number
        startedAt: Date
        stoppedAt: Date | null
      }
}

export interface IStopController extends IControllerResponse {
  body: string
}

export interface IPomodoroSqlRecord {
  id: number
  started_at: string
  stopped_at: string | null
}
