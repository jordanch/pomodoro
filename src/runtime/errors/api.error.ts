export class ApiError {
  protected status: number
  protected body: string
  constructor({ status, body }: { status: number; body: string }) {
    this.status = status
    this.body = body
  }
}
