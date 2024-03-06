import { BrowserRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/login';

function App() {
  axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL;
  return (
    <BrowserRouter>

      <ToastContainer />
      <Routes>
        <Route element={<Login />} path="/login" />
        {/* <Route element={<PrivateRoutes />}>
          <Route element={<Home />} path="/" />
          <Route element={<Step2 />} path="/step-2" />
          <Route element={<Step3 />} path="/step-3" />
          <Route element={<Step4 />} path="/step-4" />
          <Route element={<Step5 />} path="/step-5" />
        </Route> */}
      </Routes>

    </BrowserRouter>
  );
}

export default App;
