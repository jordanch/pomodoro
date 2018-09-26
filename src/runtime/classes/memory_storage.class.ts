import { IRuntimeCache } from "../../models"
import { Pomodoro } from "."

export class MemoryDatabase {
  private cache: IRuntimeCache

  constructor(cache: IRuntimeCache) {
    this.cache = cache
  }

  // TODO: type return
  addPomodoro(pomodoro: Pomodoro, id: number) {
    return new Promise((resolve, reject) => {
      try {
        this.cache.sessions.byId[id] = pomodoro
        this.cache.sessions.allIds.push(id)
        resolve()
      } catch (e) {
        reject(e)
      }
    })
  }

  // TODO: type return
  queryPomodoro(id: number) {
    return new Promise((resolve, reject) => {
      try {
        const pomodoro = this.cache.sessions.byId[id]
        resolve(pomodoro)
      } catch (e) {
        reject(e)
      }
    })
  }

  // TODO: type return
  updatePomodoro(pomodoro: Pomodoro, id: number) {
    return new Promise((resolve, reject) => {
      try {
        this.cache.sessions.byId[id] = pomodoro
        resolve(id)
      } catch (e) {
        reject(e)
      }
    })
  }

  /**
   * Get the next pomodoro's id.
   */
  getNextId():Promise<number | Error> {
    return new Promise((resolve, reject) => {
      try {
        const allIds = this.cache.sessions.allIds.slice()
        const [lastId] = allIds.sort().splice(-1)
        console.log(`Last id ${lastId}, new pomodoro id ${nextId(lastId)}`)

        resolve(nextId(lastId))
      } catch (e) {
        reject(e)
      }

    })

    function nextId(lastId: undefined | number): number {
      if (!lastId) {
        return 1
      }

      return lastId + 1
    }
  }
}
