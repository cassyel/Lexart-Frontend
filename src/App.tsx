import { BrowserRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import PrivateRoutes from './components/PrivateRoutes';
import { AuthProvider } from './context/authContext';
import Login from './pages/login';
import CreateAccount from './pages/createAccount';
import ErrorElement from './pages/redirect';
import Home from './pages/home';
import CreateProduct from './pages/createProduct';
import EditProduct from './pages/editProduct';

function App() {
  axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL;
  return (
    <BrowserRouter>
      <ToastContainer />
      <AuthProvider>
        <Routes>
          <Route element={<Login />} path="/login" />
          <Route element={<CreateAccount />} path="/register" />
          <Route element={<ErrorElement invalidRoute />} path="*" />
          <Route element={<PrivateRoutes />}>
            <Route element={<Home />} path="/" />
            <Route element={<CreateProduct />} path="/create-product" />
            <Route element={<EditProduct />} path="/edit-product/:id" />
          </Route>
        </Routes>
      </AuthProvider>

    </BrowserRouter>
  );
}

export default App;
