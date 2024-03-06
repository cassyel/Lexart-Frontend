import axios, { AxiosResponse } from 'axios';
import { ApiError } from '../errors/apiError';
import { UnexpectedError } from '../errors/unexpectedError';

interface ILogin {
  email?: string;
  password?: string;
}

export async function useRegister({ email, password }: ILogin) {
  try {
    const { data }: AxiosResponse = await axios.post('/register', { email, password });
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const { status, data } = error.response;

      switch (status) {
        case 400:
        case 401:
          throw new ApiError(data.errorMessage, status);

        default:
          throw new UnexpectedError('Ocorreu um erro ao efetuar login, tente novamente');
      }
    }

    throw new UnexpectedError('Ocorreu um erro ao efetuar login, tente novamente');
  }
}
