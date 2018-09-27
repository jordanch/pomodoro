import { IRuntimeCache, IStorage } from "../../models"
import { Pomodoro } from "."

export class MemoryDatabase implements IStorage {
  private cache: IRuntimeCache

  constructor(cache: IRuntimeCache) {
    this.cache = cache
  }

  // TODO: type return
  addPomodoro(pomodoro: Pomodoro, id: number): Promise<number> {
    return new Promise((resolve, reject) => {
      try {
        this.cache.sessions.byId[id] = pomodoro
        this.cache.sessions.allIds.push(id)
        console.log(`Successfully added Pomodoro ID: ${id}`)
        resolve(id)
      } catch (e) {
        console.log(`Failed in adding Pomodoro ID: ${id}`)
        reject(e)
      }
    })
  }

  // TODO: type return
  queryPomodoro(id: number): Promise<Pomodoro> {
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
  updatePomodoro(pomodoro: Pomodoro, id: number): Promise<number> {
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
        const [lastId] = allIds.sort((a, b) => {
          if (a < b) return -1
          if (a > b) return 1
          return 0
        }).splice(-1)
        const nextId = !lastId ? 1 : lastId + 1;
        console.log(`Last id ${lastId}, new pomodoro id ${nextId}`)

        resolve(nextId)
      } catch (e) {
        reject(e)
      }

    })
  }
}
