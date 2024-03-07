import axios, { AxiosResponse } from 'axios';
import { ApiError } from '../errors/apiError';
import { UnexpectedError } from '../errors/unexpectedError';
import { CreateProductFields } from '../utils/zodCreateProduct';

export async function useCreateProduct(productData: CreateProductFields) {
  try {
    const { data }: AxiosResponse = await axios.post('/product', [productData]);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const { status, data } = error.response;

      switch (status) {
        case 400:
        case 401:
          throw new ApiError(data.errorMessage, status);

        default:
          throw new UnexpectedError('Ocorreu um erro ao criar o produto, tente novamente');
      }
    }

    throw new UnexpectedError('Ocorreu um erro ao criar o produto, tente novamente');
  }
}
