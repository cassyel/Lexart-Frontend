export class ApiError extends Error {
  constructor(message: string, public status: number) {
    super(message.replace('password', 'senha'));
    this.name = 'ApiError';
    this.status = status;
  }
}
