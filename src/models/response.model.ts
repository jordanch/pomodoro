import { Pomodoro } from "../runtime"

export interface IStateQueryResponse extends Pomodoro {
  ms: number
  min: number
  hasFinished: boolean
}

export interface IControllerResponse {
  status: number
  data: any
}

export interface IPomoStartCtrl200 {
  data: Pomodoro
  status: 200
}

export interface IPomoStateCtrl200 {
  data: IStateQueryResponse
  status: 200
}

export interface IPomoStateCtrl40x {
  data: string
  status: number
}
