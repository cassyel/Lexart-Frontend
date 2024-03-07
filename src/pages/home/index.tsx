import React, { useEffect, useState } from 'react';
import * as MUI from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import TuneIcon from '@mui/icons-material/Tune';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import LoadingSpinner from '../../components/LoadingSpinner';
import { useGetProducts } from '../../services/useGetProducts';
import { Product, ProductFilterOptions } from '../../types/products';
import VariantBox from '../../components/VariantBox';
import { useDeleteProduct } from '../../services/useDeleteProduct';
import DetailsProduct from '../../components/DetailsProduct';
import SpinnerButton from '../../components/SpinnerButton';
import EmptyProducts from '../../components/EmptyProducts';

function Home() {
  const navigate = useNavigate();

  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [deletingProduct, setDeletingProduct] = useState<string | null>(null);
  const [searchVisible, setSearchVisible] = useState(false);
  const [filterType, setFilterType] = useState('name');
  const [filterValue, setFilterValue] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, success } = await useGetProducts();
        setProducts(data);
        setFilteredProducts(data);
        setTimeout(() => setLoadingProducts(!success), 1500);
      } catch (error) {
        setProducts([]);
        setFilteredProducts([]);
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
        setFilteredProducts((prev) => prev
          .filter((product) => product.id !== id));
      }
    } catch (error) {
      setDeletingProduct(null);
    }
  }

  const toggleSearch = () => {
    setSearchVisible((prev) => !prev);
    if (!searchVisible) {
      setFilterType('name');
      setFilterValue('');
      setFilteredProducts(products);
    }
  };

  const handleFilterTypeChange = (event: MUI.SelectChangeEvent<string>) => {
    setFilterType(event.target.value);
  };

  const filterProducts = (value: string, type: string) => {
    const filtered = products
      .filter((product) => product[type as keyof ProductFilterOptions]
        .toLowerCase().includes(value.toLowerCase()));
    setFilteredProducts(filtered);
  };

  const handleFilterValueChange = (event:
    React.ChangeEvent<HTMLInputElement>) => {
    setFilterValue(event.target.value);
    filterProducts(event.target.value, filterType);
  };

  if (loadingProducts) {
    return <LoadingSpinner getProducts />;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <MUI.Container>
        <Box component="div" className="bg-white p-6 rounded-md shadow-md my-8 mx-auto flex flex-col gap-3">
          <div className="flex justify-between mb-4">
            <MUI.Typography variant="h6" className="!font-bold uppercase text-[#5b5b5b] mb-6">
              Produtos em Estoque (
              {' '}
              {filteredProducts.length}
              {' '}
              )
            </MUI.Typography>

            <div className="flex items-center gap-4">
              <div className="relative group">
                <MUI.IconButton onClick={toggleSearch}>
                  <TuneIcon />
                  <MUI.Typography>Filtros</MUI.Typography>
                </MUI.IconButton>

                {searchVisible && (
                <div className="absolute border rounded-lg p-3 right-0 top-11 flex flex-col gap-2 transition-all duration-300 ease-in-out">
                  <MUI.Select value={filterType} onChange={handleFilterTypeChange} className="mr-2 w-28 h-11">
                    <MUI.MenuItem value="name">Nome</MUI.MenuItem>
                    <MUI.MenuItem value="brand">Marca</MUI.MenuItem>
                    <MUI.MenuItem value="model">Modelo</MUI.MenuItem>
                  </MUI.Select>
                  <MUI.TextField
                    label="Filtrar"
                    variant="outlined"
                    size="small"
                    value={filterValue}
                    onChange={handleFilterValueChange}
                    className={`h-11 w-60 ${filterValue ? 'border-b-2 border-blue-500' : ''}`}
                  />
                </div>
                )}
              </div>
            </div>

          </div>
          {filteredProducts.length === 0 ? (
            <EmptyProducts />
          ) : (
            <MUI.TableContainer component={MUI.Paper} className={`ransition-all duration-300 ease-in-out ${searchVisible ? 'mt-28' : 'mt-4'}`}>
              <MUI.Table>
                <MUI.TableHead>
                  <MUI.TableRow>
                    <MUI.TableCell>Nome</MUI.TableCell>
                    <MUI.TableCell>Marca</MUI.TableCell>
                    <MUI.TableCell>Modelo</MUI.TableCell>
                    <MUI.TableCell>Variações</MUI.TableCell>
                    <MUI.TableCell>Ações</MUI.TableCell>
                  </MUI.TableRow>
                </MUI.TableHead>
                <MUI.TableBody>
                  {filteredProducts.map((product) => (
                    <React.Fragment key={product.id}>
                      <MUI.TableRow
                        onClick={() => handleItemClick(product.id)}
                        className="cursor-pointer hover:shadow-xl hover:shadow-[#F3F4F6]"
                      >
                        <MUI.TableCell>{product.name}</MUI.TableCell>
                        <MUI.TableCell>{product.brand}</MUI.TableCell>
                        <MUI.TableCell>{product.model}</MUI.TableCell>
                        <MUI.TableCell>
                          <div className="flex flex-wrap max-w-96">
                            {product.variants.map((variant) => (
                              <VariantBox key={variant.id} variant={variant} />
                            ))}
                          </div>
                        </MUI.TableCell>
                        <MUI.TableCell
                          className="border"
                          width={200}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <MUI.Button
                            variant="outlined"
                            color="primary"
                            size="small"
                            style={{ marginRight: '8px' }}
                          >
                            Editar
                          </MUI.Button>
                          <MUI.Button
                            onClick={() => handleDeleteProduct(product.id)}
                            variant="outlined"
                            color="secondary"
                            size="small"
                          >
                            {deletingProduct === product.id ? (<SpinnerButton />) : ('Excluir')}
                          </MUI.Button>
                        </MUI.TableCell>
                      </MUI.TableRow>
                      {expandedItem === product.id && (
                      <DetailsProduct product={product} />)}
                    </React.Fragment>
                  ))}
                </MUI.TableBody>
              </MUI.Table>
            </MUI.TableContainer>
          )}
          <MUI.Button variant="contained" color="primary" size="small" onClick={() => navigate('/create-product')}>
            <div className="flex items-center gap-2">
              <AddBoxIcon style={{ fontSize: 30 }} />
              <span>Cadastrar produto</span>
            </div>
          </MUI.Button>
        </Box>
      </MUI.Container>
    </div>
  );
}

export default Home;
