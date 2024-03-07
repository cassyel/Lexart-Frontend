import {
  TableRow, TableCell, Table, TableHead, TableBody,
} from '@mui/material';
import { formatCurrency } from '../utils/formatCurrency';
import { Product } from '../types/products';

function DetailsProduct({ product }: { product: Product }) {
  return (
    <TableRow className="bg-gray-100">
      <TableCell colSpan={5}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Modelo</TableCell>
              <TableCell>Marca</TableCell>
              <TableCell>Cor</TableCell>
              <TableCell>Preço</TableCell>
              <TableCell>Número de Série</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {product.variants.map((variant) => (
              <TableRow key={variant.id}>
                <TableCell>{product.model}</TableCell>
                <TableCell>{product.brand}</TableCell>
                <TableCell>{variant.color}</TableCell>
                <TableCell>
                  {formatCurrency(variant.price)}
                </TableCell>
                <TableCell>{variant.id}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableCell>
    </TableRow>
  );
}

export default DetailsProduct;
