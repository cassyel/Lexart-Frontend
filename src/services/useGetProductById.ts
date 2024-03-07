import axios, { AxiosResponse } from 'axios';
import { UnexpectedError } from '../errors/unexpectedError';

export async function useGetProductById(productId: string) {
  try {
    const { data }: AxiosResponse = await axios.get(`/product/${productId}`);
    return data;
  } catch (error) {
    throw new UnexpectedError('Ocorreu um erro ao buscar o produto');
  }
}
