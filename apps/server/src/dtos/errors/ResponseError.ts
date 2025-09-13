export class ResponseError extends Error {
  private statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);

    this.name = 'ResponseError';
    this.statusCode = statusCode;
  }
}
