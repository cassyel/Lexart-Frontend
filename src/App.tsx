import { BrowserRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/login';
import ErrorElement from './pages/redirect';
import PrivateRoutes from './components/PrivateRoutes';
import { AuthProvider } from './context/authContext';

function App() {
  axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL;
  return (
    <BrowserRouter>
      <ToastContainer />
      <AuthProvider>
        <Routes>
          <Route element={<Login />} path="/login" />
          <Route element={<ErrorElement invalidRoute />} path="*" />
          <Route element={<PrivateRoutes />}>
            <Route element={<div>TESTE</div>} path="/" />
          </Route>
        </Routes>
      </AuthProvider>

    </BrowserRouter>
  );
}

export default App;
