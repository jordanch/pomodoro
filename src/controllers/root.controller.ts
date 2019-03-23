import { IRootController } from "../models"
import { debug } from "."

const info = `

//////////////////////////////////////////////////////
/// info

/// Glossary

pt pomodoro timer

/// routes

GET / get the index page with info about api

GET /start start a pt session

GET /end stop a pt session

`

export function root(): IRootController {
  const response = {
    status: 200,
    body: info
  }

  debug(response.status)

  return response
}
