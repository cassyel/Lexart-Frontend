import axios, { AxiosResponse } from 'axios';
import { ApiError } from '../errors/apiError';
import { UnexpectedError } from '../errors/unexpectedError';

interface ILogin {
  email?: string;
  password?: string;
}

export async function useLogin({ email, password }: ILogin) {
  try {
    const { data }: AxiosResponse = await axios.post('/login', { email, password });
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const { status } = error.response;

      switch (status) {
        case 400:
        case 401:
          throw new ApiError('Credenciais inválidas', status);

        default:
          throw new UnexpectedError('Ocorreu um erro ao efetuar login, tente novamente');
      }
    }

    throw new UnexpectedError('Ocorreu um erro ao efetuar login, tente novamente');
  }
}
