import axios from 'axios';

interface ILogin {
  email?: string;
  password?: string
}

export class RequestError extends Error {
  constructor(message: string = 'Erro ao efetuar login') {
    super(message);
    this.name = 'RequestError';
    this.message = message;
  }
}

async function useLogin({ email, password }: ILogin) {
  const { data, status } = await axios
    .post('/login', { email, password });

  if (status !== 200 || !data.success) throw new RequestError();

  delete data.success;

  return { data };
}

export { useLogin };
