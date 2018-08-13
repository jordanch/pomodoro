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

///////////////////////////////////////////////////////////////////////////////
// Start controller

export interface IPomoStartCtrl200 {
  data: Pomodoro
  status: 200
}

///////////////////////////////////////////////////////////////////////////////
// State controller

export interface IPomoStateCtrl200 {
  data: IStateQueryResponse
  status: 200
}

export interface IPomoStateCtrl40x {
  data: string
  status: number
}

///////////////////////////////////////////////////////////////////////////////
// Stop controller

export interface IPomoStopCtrl200 {
  data: string
  status: number
}

export interface IPomoStopCtrl40x {
  data: string
  status: number
}
