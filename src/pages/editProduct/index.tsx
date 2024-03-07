import { useEffect, useState } from 'react';
import * as MUI from '@mui/material';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../components/Header';
import { useGetProductById } from '../../services/useGetProductById';
import { Product, Variant } from '../../types/products';
import LoadingSpinner from '../../components/LoadingSpinner';
import UnavailableProduct from '../../components/UnavailableProduct';
import { CreateProductFields, schema } from '../../utils/zodCreateProduct';
import { listaCoresCSS } from '../../utils/listColor';
import { useUpdateProduct } from '../../services/useUpdateProduct';
import SpinnerButton from '../../components/SpinnerButton';

function EditProduct() {
  const navigate = useNavigate();
  const { id } = useParams() as { id: string };
  const [product, setProduct] = useState<Product>();
  const [loadingProduct, setLoadingProduct] = useState<boolean>(true);
  const [loadingUpdate, setLoadingUpdate] = useState<boolean>(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    control,
  } = useForm<CreateProductFields>({
    resolver: zodResolver(schema),
  });

  const { fields } = useFieldArray({ control, name: 'data' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, success } = await useGetProductById(id);
        setProduct(data);
        setTimeout(() => setLoadingProduct(!success), 1500);

        if (success) {
          reset({
            name: data.name,
            brand: data.brand,
            model: data.model,
            data: data.variants.map((variant: Variant) => ({
              id: variant.id,
              color: variant.color,
              price: String(variant.price),
            })),
          });
        }
      } catch (error) {
        setProduct(undefined);
        setLoadingProduct(false);
      }
    };

    fetchData();
  }, [id, reset]);

  async function handleEditProduct(data: CreateProductFields) {
    if (product) {
      setLoadingUpdate(true);
      await useUpdateProduct(data, product?.id);
    }

    setLoadingUpdate(false);
    navigate('/');
  }

  if (loadingProduct) {
    return <LoadingSpinner getProduct />;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <MUI.Container>
        <MUI.Box
          component="div"
          className="bg-white p-6 rounded-md shadow-md my-8 mx-auto flex flex-col items-center gap-4 max-w-3xl"
        >
          {product ? (
            <>
              <div className="self-start">
                <MUI.Typography
                  variant="h6"
                  className="!font-bold uppercase text-[#5b5b5b] mb-6"
                >
                  Edite seu produto
                </MUI.Typography>
              </div>

              <form onSubmit={handleSubmit(handleEditProduct)} className="w-full flex flex-col gap-4">
                <MUI.TextField
                  label="Nome do produto"
                  variant="outlined"
                  className="mb-4 w-full"
                  {...register('name')}
                />
                {errors.name && (
                  <MUI.FormHelperText error>
                    {errors.name.message}
                  </MUI.FormHelperText>
                )}

                <div className="flex gap-8">
                  <div className="flex flex-col w-full gap-4">
                    <MUI.TextField
                      label="Marca"
                      variant="outlined"
                      className="mb-4 w-full"
                      {...register('brand')}
                    />
                    {errors.brand && (
                      <MUI.FormHelperText error>
                        {errors.brand.message}
                      </MUI.FormHelperText>
                    )}
                  </div>

                  <div className="flex flex-col w-full gap-4">
                    <MUI.TextField
                      label="Modelo"
                      variant="outlined"
                      className="mb-4 w-full"
                      {...register('model')}
                    />
                    {errors.model && (
                      <MUI.FormHelperText error>
                        {errors.model.message}
                      </MUI.FormHelperText>
                    )}
                  </div>
                </div>

                {fields.map((variant, index) => (
                  <div key={variant.id} className="flex mb-4 w-full gap-4">
                    <div>
                      <input
                        type="hidden"
                        {...register(`data.${index}.id`)}
                        value={variant.id}
                      />
                      <Controller
                        name={`data.${index}.color`}
                        control={control}
                        render={({ field }) => (
                          <MUI.FormControl>
                            <MUI.InputLabel
                              id={`select-label-${index}`}
                            >
                              Cor
                            </MUI.InputLabel>
                            <MUI.Select
                              {...field}
                              variant="outlined"
                              className="mr-4"
                              label="Cor"
                              name={`data.${index}.color`}
                              style={{ width: '300px' }}
                              labelId={`select-label-${index}`}
                            >
                              {listaCoresCSS.map((cor) => (
                                <MUI.MenuItem key={cor} value={cor}>
                                  {cor}
                                </MUI.MenuItem>
                              ))}
                            </MUI.Select>
                          </MUI.FormControl>
                        )}
                      />
                      {errors.data?.[index]?.color && (
                      <MUI.FormHelperText
                        error
                      >
                        {errors.data?.[index]?.color?.message}
                      </MUI.FormHelperText>
                      )}
                    </div>

                    <div>
                      <Controller
                        name={`data.${index}.price`}
                        control={control}
                        render={({ field }) => (
                          <MUI.TextField
                            {...field}
                            label="Preço"
                            variant="outlined"
                            className="mr-4"
                          />
                        )}
                      />
                      {errors.data?.[index]?.price && (
                      <MUI.FormHelperText
                        error
                      >
                        {errors.data?.[index]?.price?.message}
                      </MUI.FormHelperText>
                      )}
                    </div>
                  </div>
                ))}

                <div className="w-full flex mt-5 justify-between">
                  <div>
                    <MUI.Button
                      variant="text"
                      color="primary"
                      className="self"
                      onClick={() => navigate('/')}
                    >
                      Visualizar produtos
                    </MUI.Button>
                  </div>
                  <div className="flex gap-5">
                    <MUI.Button variant="contained" type="submit" color="primary">
                      {loadingUpdate ? (<SpinnerButton />) : 'Salvar alterações'}
                    </MUI.Button>
                    <MUI.Button
                      variant="contained"
                      color="error"
                      onClick={() => navigate('/')}
                    >
                      Cancelar
                    </MUI.Button>
                  </div>
                </div>
              </form>
            </>
          ) : (
            <UnavailableProduct />
          )}
        </MUI.Box>
      </MUI.Container>
    </div>
  );
}

export default EditProduct;
