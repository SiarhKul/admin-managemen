export class DatabaseError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);

    this.name = 'DatabaseError';
    this.statusCode = statusCode;
  }
}
