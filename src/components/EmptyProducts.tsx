import { Typography } from '@mui/material';

function EmptyProducts() {
  return (
    <div className="text-center mt-16">
      <Typography variant="h6" color="textSecondary">
        Ops... estamos com o estoque vazio!
      </Typography>
      <Typography variant="subtitle1" color="textSecondary">
        Cadastre um novo produto
      </Typography>
    </div>
  );
}

export default EmptyProducts;
