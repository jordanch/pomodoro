import knex from "knex"
import { IStorage, IPomodoroSqlRecord } from "../../models"
import { Pomodoro } from "./pomodoro.class"

// TODO: inversion of control for driver
export class PostgresStorage implements IStorage {
  static TABLES = {
    pomodoro: "pomodoro"
  }
  //@ts-ignore
  private client: knex

  // constructor(url: string) {
  constructor() {
    try {
      this.client = knex({
        client: "pg",
        // connection:
        // "postgres://skivcuaw:6U7yYj_RbcNrQSL2Cdv2-a3OaSsXV1_C@manny.db.elephantsql.com:5432/skivcuaw"
        connection: {
          host: "127.0.0.1",
          user: "jch",
          // password: "",
          database: "pomodoro-local"
        }
      })
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  //@ts-ignore
  async addPomodoro(pomodoro: Pomodoro) {
    await this.client(PostgresStorage.TABLES.pomodoro).insert(pomodoro.toDB())

    return pomodoro.id
  }

  async queryPomodoro(id: number) {
    //@ts-ignore
    const [record]: [IPomodoroSqlRecord] = await this.client(
      PostgresStorage.TABLES.pomodoro
    ).where("id", id)

    if (record) {
      const { id, started_at, stopped_at } = record

      return new Pomodoro({
        id,
        startedAt: new Date(started_at),
        stoppedAt: stopped_at ? new Date(stopped_at) : undefined
      })
    }

    return undefined
  }

  //@ts-ignore
  updatePomodoro() {}

  //@ts-ignore
  async getNextId() {
    // todo:
    // this.client(PostgresStorage.TABLES.pomodoro)
    const [col] = (await this.client(PostgresStorage.TABLES.pomodoro).count(
      "id"
    )) as [{ count: string }]

    const parsed = parseInt(col.count, 10)

    if (isNaN(parsed)) {
      throw new Error("could not get next pomodoro id")
    }

    return parsed + 1
  }
}
