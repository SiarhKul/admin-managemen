export class FetchError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'FetchError';

    Object.setPrototypeOf(this, FetchError.prototype);
  }
}
