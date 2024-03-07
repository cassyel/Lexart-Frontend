import axios, { AxiosResponse } from 'axios';
import { UnexpectedError } from '../errors/unexpectedError';

export async function useGetProducts() {
  try {
    const { data }: AxiosResponse = await axios.get('/products');
    return data;
  } catch (error) {
    throw new UnexpectedError('Ocorreu um erro ao buscar os produtos');
  }
}
