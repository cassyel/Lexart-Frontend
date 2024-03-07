import { useForm, useFieldArray, Controller } from 'react-hook-form';
import {
  TextField,
  Select,
  MenuItem,
  Button,
  Typography,
  Container,
  Box,
  InputLabel,
  FormControl,
} from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import { listaCoresCSS } from '../../utils/listColor';

function CreateProduct() {
  const navigate = useNavigate();
  const { control, handleSubmit, register } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'variants',
  });

  const handleCreateProduct = (data: unknown) => {
    console.log(data);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <Container>
        <Box
          component="div"
          className="bg-white p-6 rounded-md shadow-md my-8 mx-auto flex flex-col items-center gap-4 max-w-3xl"
        >
          <div className=" self-start">
            <Typography
              variant="h6"
              className="!font-bold uppercase text-[#5b5b5b] mb-6"
            >
              Cadastre um produto
            </Typography>
            <Typography
              variant="subtitle2"
              className="text-[#5b5b5b] underline"
            >
              Para cadastrar um produto deve ser
              informada pelo menos uma variante
            </Typography>
          </div>

          <form onSubmit={handleSubmit(handleCreateProduct)} className="w-full flex flex-col gap-4">
            <TextField label="Nome do produto" variant="outlined" className="mb-4 w-full" {...register('name')} />

            <div className="flex w-full gap-4">
              <TextField label="Marca" variant="outlined" className="mb-4 w-full" {...register('brand')} />
              <TextField label="Modelo" variant="outlined" className="mb-4 w-full" {...register('model')} />
            </div>

            <Typography
              variant="subtitle2"
              className="text-[#5b5b5b] self-start"
            >
              (Preencha abaixo os dados da variante)
            </Typography>

            {fields.map((variant, index) => (
              <div key={variant.id} className="flex mb-4 w-full gap-4">

                <Controller
                  name={`variants.${index}.color`}
                  control={control}
                  defaultValue="blue" // Define o valor padrão como "blue"
                  render={({ field }) => (
                    <FormControl>
                      <InputLabel id="select-label">Cor</InputLabel>
                      <Select
                        {...field}
                        variant="outlined"
                        className="mr-4"
                        label="Cor"
                        name="Cor"
                        style={{ width: '300px' }}
                        labelId="select-label"
                      >
                        {listaCoresCSS.map((cor) => (
                          <MenuItem key={cor} value={cor}>
                            {cor}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                />

                <Controller
                  name={`variants.${index}.price`}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Preço"
                      variant="outlined"
                      className="mr-4"
                      defaultValue="Blue"
                    />
                  )}
                />

                {index > 0 ? (
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => remove(index)}
                  >
                    <DeleteIcon />
                  </Button>
                ) : undefined}
              </div>
            ))}

            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() => append({ price: '', color: '' })}
              className="mb-4 self-start"
            >
              <div className="flex justify-center items-center gap-2">
                <AddBoxIcon style={{ fontSize: 30 }} />
                <span>Adicionar outra variante</span>
              </div>
            </Button>

            <div className=" w-full flex gap-5 justify-end">
              <Button variant="contained" type="submit" color="primary">
                Cadastrar Produto
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => navigate('/')}
              >
                Cancelar
              </Button>
            </div>
          </form>
        </Box>
      </Container>
    </div>
  );
}

export default CreateProduct;
