# Pomodoro Timer API

## What is a Pomodoro?

> The Pomodoro Technique is a time management method developed by Francesco Cirillo in the late 1980s. The technique uses a timer to break down work into intervals, traditionally 25 minutes in length, separated by short breaks. - [Wikipedia](https://en.wikipedia.org/wiki/Pomodoro_Technique)

## API features

- start a pomodoro
- query the state of a pomodoro
- stop a pomodoro

API consumers start and stop Pomodoros - it is their responsibility to stop a pomodoro at the appropriate time.

## Data interchange

- JSON over HTTP

## Endpoints

- GET /
- POST /start
- GET /state?id=<pomodoro_id>
- PUT /stop
  { id: <pomodoro_id> }

## Technology

- Node.js
- TypeScript

## Persistence

Postgres SQL Database
