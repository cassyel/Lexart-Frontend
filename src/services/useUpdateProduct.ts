import axios, { AxiosResponse } from 'axios';
import { UnexpectedError } from '../errors/unexpectedError';
import { CreateProductFields } from '../utils/zodCreateProduct';

export async function useUpdateProduct(
  productData: CreateProductFields,
  productId: string,
) {
  try {
    const { data }: AxiosResponse = await axios
      .patch('/product', {
        id: productId,
        model: productData.model,
        brand: productData.brand,
        name: productData.name,
      });

    await Promise.all(
      productData.data.map(async (variant) => {
        try {
          const { data: dataVariant } = await axios.patch('/product/variant', {
            id: variant.id,
            price: variant.price,
            color: variant.color,
          });

          return dataVariant;
        } catch (error) {
          throw new UnexpectedError('Ocorreu um erro ao atualizar as variantes dp produto');
        }
      }),
    );

    return data;
  } catch (error) {
    throw new UnexpectedError('Ocorreu um erro ao editar o produto');
  }
}
