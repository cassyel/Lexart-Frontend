import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import LoadingSpinner from '../../components/LoadingSpinner';
import { useGetProducts } from '../../services/useGetProducts';
import { Product } from '../../types/products';
import VariantBox from '../../components/VariantBox';
import { formatCurrency } from '../../utils/formatCurrency';
import { useDeleteProduct } from '../../services/useDeleteProduct';

function Home() {
  const navigate = useNavigate();

  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [deletingProduct, setDeletingProduct] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, success } = await useGetProducts();
        setProducts(data);
        setTimeout(() => setLoadingProducts(!success), 1500);
      } catch (error) {
        setProducts([]);
      }
    };

    fetchData();
  }, []);

  const handleItemClick = (productId: string) => {
    setExpandedItem((prevExpandedItem) => (prevExpandedItem === productId
      ? null
      : productId
    ));
  };

  async function handleDeleteProduct(id: string) {
    try {
      setDeletingProduct(id);
      const deletedProduct = await useDeleteProduct(id);

      setTimeout(() => setDeletingProduct(null), 1000);

      if (deletedProduct.success) {
        setProducts((prev) => prev.filter((product) => product.id !== id));
      }
    } catch (error) {
      setDeletingProduct(null); // Reseta o estado em caso de erro
    }
  }

  if (loadingProducts) {
    return <LoadingSpinner />;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <Container>
        <Box
          component="div"
          className="bg-white p-6 rounded-md shadow-md my-8 mx-auto"
        >
          <div className="flex justify-between">
            <Typography
              variant="h4"
              className="font-bold uppercase text-gray-800 mb-6"
            >
              Produtos em Estoque (
              {products.length}
              )
            </Typography>

            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() => navigate('/create-product')}
            >
              <div className="flex justify-center items-center gap-2">
                <AddBoxIcon style={{ fontSize: 30 }} />
                <span>Cadastrar produto</span>
              </div>

            </Button>
          </div>
          { products.length === 0 ? (
            <div className="text-center mt-16">
              <Typography variant="h6" color="textSecondary">
                Ops... estamos com o estoque vazio!
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                Cadastre um novo produto
              </Typography>

            </div>
          ) : (
            <TableContainer component={Paper} className="mt-4">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Nome</TableCell>
                    <TableCell>Marca</TableCell>
                    <TableCell>Modelo</TableCell>
                    <TableCell>Variações</TableCell>
                    <TableCell>Ações</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products.map((product) => (
                    <React.Fragment key={product.id}>
                      <TableRow
                        onClick={() => handleItemClick(product.id)}
                        className="cursor-pointer hover:shadow-xl hover:shadow-[#F3F4F6]"
                      >
                        <TableCell>{product.name}</TableCell>
                        <TableCell>{product.brand}</TableCell>
                        <TableCell>{product.model}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap max-w-96">
                            {product.variants.map((variant) => (
                              <VariantBox key={variant.id} variant={variant} />
                            ))}
                          </div>
                        </TableCell>
                        <TableCell
                          className="border"
                          width={200}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Button
                            variant="outlined"
                            color="primary"
                            size="small"
                            style={{ marginRight: '8px' }}
                          >
                            Editar
                          </Button>
                          <Button
                            onClick={() => handleDeleteProduct(product.id)}
                            variant="outlined"
                            color="secondary"
                            size="small"
                          >
                            {deletingProduct === product.id ? (
                              <div className="spinner-border spinner-border-sm" role="status">
                                <span className="visually-hidden">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="animate-spin h-5 w-5 mr-2"
                                  >
                                    <circle
                                      cx="12"
                                      cy="12"
                                      r="10"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="4"
                                      strokeDasharray="80"
                                      strokeDashoffset="60"
                                    />
                                  </svg>
                                </span>
                              </div>
                            ) : (
                              'Excluir'
                            )}
                          </Button>
                        </TableCell>

                      </TableRow>
                      {expandedItem === product.id && (
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
                      )}
                    </React.Fragment>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}

        </Box>
      </Container>
    </div>
  );
}

export default Home;
