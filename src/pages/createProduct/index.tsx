import { useState } from 'react';
import {
  Container, Typography, TextField, Button, Autocomplete,
} from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import { Variant } from '../../types/products';
import { listaCoresCSS } from '../../utils/listColor';

function CreateProduct() {
  const navigate = useNavigate();
  const [variants, setVariants] = useState([{ price: '', color: '' }]);

  const handleAddVariant = () => {
    setVariants([...variants, { price: '', color: '' }]);
  };

  const handleVariantChange = (
    index: number,
    key: keyof Variant,
    value: string | null,
  ) => {
    const updatedVariants = [...variants];
    updatedVariants[index] = {
      ...updatedVariants[index],
      [key]: value,
    };

    if (key === 'color') {
      const isColorAlreadyChosen = updatedVariants.some(
        (variant, i) => i !== index && variant.color === value,
      );

      if (isColorAlreadyChosen) {
        updatedVariants[index] = {
          ...updatedVariants[index],
          [key]: '',
        };
        console.log('A mesma cor já foi escolhida em outra variante.');
      }
    }

    setVariants(updatedVariants);
  };

  const handleRemoveVariant = (index: number) => {
    const updatedVariants = [...variants];
    updatedVariants.splice(index, 1);
    setVariants(updatedVariants);
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
              Para cadastrar um produto
              deve ser informado pelo menos uma variante
            </Typography>
          </div>

          <TextField label="Nome do produto" variant="outlined" className="mb-4 w-full" />

          <div className="flex w-full gap-4">
            <TextField label="Marca" variant="outlined" className="mb-4 w-full" />
            <TextField label="Modelo" variant="outlined" className="mb-4 w-full" />
          </div>

          <Typography
            variant="subtitle2"
            className="text-[#5b5b5b] self-start"
          >
            (Preencha abaixo os dados da variante)
          </Typography>

          {variants.map((variant, index) => (
            <div key={variant.color} className="flex mb-4 w-full gap-4">
              <TextField
                label="Preço"
                variant="outlined"
                className="mr-4"
                value={variant.price}
                onChange={(e) => handleVariantChange(index, 'price', e.target.value)}
              />
              <Autocomplete
                options={listaCoresCSS}
                renderInput={(params) => (
                  <TextField {...params} label="Cor" variant="outlined" className="mr-4" />
                )}
                value={variant.color}
                onChange={(_, newValue) => handleVariantChange(index, 'color', newValue)}
                className="min-w-48"
              />
              {
                index > 0 ? (
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleRemoveVariant(index)}
                  >
                    <DeleteIcon />
                  </Button>
                ) : undefined
              }

            </div>
          ))}

          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={handleAddVariant}
            className="mb-4 self-start"
          >
            <div className="flex justify-center items-center gap-2">
              <AddBoxIcon style={{ fontSize: 30 }} />
              <span>Adicionar outra variante</span>
            </div>
          </Button>

          <div className=" w-full flex gap-5 justify-end">
            <Button variant="contained" color="primary">
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
        </Box>
      </Container>
    </div>
  );
}

export default CreateProduct;
