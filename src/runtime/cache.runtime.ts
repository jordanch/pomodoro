import { IRuntimeCache } from "../models";

export const cache: IRuntimeCache = {
  sessions: {
    byId: {},
    allIds: []
  }
};

// export class Persist {
//   public adapter: any
//   constructor(adapter: any) {
//     this.adapter = adapter
//   }

//   addPomodoro() {
//     this.adapter.addPomodoro()
//   }

//   queryPomodoro(id: number) {

//   }
// }
