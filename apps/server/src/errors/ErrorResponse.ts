export class ErrorResponse {
  timestamp = new Date().toISOString();
  constructor(public statusCode: number, public error: string) {
    this.statusCode = statusCode;
  }
}
