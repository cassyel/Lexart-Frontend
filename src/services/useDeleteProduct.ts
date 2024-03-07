import axios, { AxiosResponse } from 'axios';
import { UnexpectedError } from '../errors/unexpectedError';

export async function useDeleteProduct(id: string) {
  try {
    const { data }: AxiosResponse = await axios.delete(`/product/${id}`);
    return data;
  } catch (error) {
    throw new UnexpectedError('Ocorreu um erro ao deletar o produto');
  }
}
