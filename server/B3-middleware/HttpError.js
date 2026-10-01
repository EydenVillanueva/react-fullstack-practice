// An Error that carries an HTTP status code. Throw it from any route:
//   throw new HttpError(404, 'User not found');
export class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}
