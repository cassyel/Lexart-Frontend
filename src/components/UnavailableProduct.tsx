import * as MUI from '@mui/material';
import { useNavigate } from 'react-router-dom';

function UnavailableProduct() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-4 justify-center items-center">
      <MUI.Typography
        variant="h6"
        className="!font-bold uppercase text-[#5b5b5b] mb-6"
      >
        Produto indisponivel
      </MUI.Typography>

      <MUI.Button
        variant="contained"
        color="warning"
        className="self"
        onClick={() => navigate('/')}
      >
        Consulte a lista de produtos disponiveis
      </MUI.Button>
    </div>
  );
}

export default UnavailableProduct;
