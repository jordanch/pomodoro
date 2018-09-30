import { Pomodoro } from "../runtime"

export interface IStateQueryResponse extends Pomodoro {
  ms: number
  min: number
  hasFinished: boolean
}