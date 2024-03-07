import { ChangeEvent, useState } from 'react';
import { Box, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../../services/useLogin';
import lexartLogo from '../../assets/lexart-labs-logo.svg';
import { ApiError } from '../../errors/apiError';
import { useAuth } from '../../hooks/useAuth';

type eventAcceptted = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>

function Login() {
  const navigate = useNavigate();
  const authContext = useAuth();

  const [loginState, setLoginState] = useState(
    {
      email: '',
      password: '',
      wrong: false,
      errorMessage: '',
    },
  );
  const [loadingButton, setLoadButton] = useState(false);

  const handleLoginAndNavigate = async () => {
    try {
      setLoadButton(true);

      const loginData = await useLogin({
        email: loginState.email,
        password: loginState.password,
      });

      authContext.login({ token: loginData.token, auth: loginData.success });
      setLoadButton(false);

      navigate('/');
    } catch (error) {
      setLoadButton(false);

      if (error instanceof ApiError) {
        const apiError = error as ApiError; // Type assertion
        setLoginState((prev) => ({
          ...prev,
          wrong: true,
          errorMessage: apiError.message,
        }));
      }
    }
  };

  const handleInputChange = (e: eventAcceptted) => {
    const { name, value } = e.target;
    setLoginState((prev) => ({ ...prev, [name]: value, wrong: false }));
  };

  return (
    <section
      className="bg-[#26333D] w-full h-full flex justify-center items-center p-4"
    >
      <div className="h-[200px] w-full flex flex-col m:flex-row justify-center items-center gap-16">
        <div className="border-red-500">
          <img src={lexartLogo} alt="Lexart Logo" width="400" />
        </div>
        <div
          className="w-[1px] bg-gray-500 h-full opacity-50 rounded-md border-none"
        />
        <Box
          noValidate
          component="form"
          autoComplete="off"
          onSubmit={(e) => e.preventDefault()}
          className="max-w-[400px] w-full flex flex-col gap-6"
        >
          <h1 className="text-white text-2xl">Entre na sua conta</h1>
          <TextField
            name="email"
            label="Email"
            color="success"
            variant="filled"
            autoComplete="username"
            value={loginState.email}
            InputProps={{ autoFocus: true }}
            onChange={(e) => handleInputChange(e)}
            style={{ backgroundColor: 'white', borderRadius: 8 }}
          />
          <TextField
            color="success"
            name="password"
            type="password"
            variant="filled"
            label="Senha"
            autoComplete="password"
            value={loginState.password}
            onChange={(e) => handleInputChange(e)}
            style={{ backgroundColor: 'white', borderRadius: 8 }}
          />

          {
            loginState.wrong && (
              <span
                className="self-start !text-red-500 text-xs"
              >
                {loginState.errorMessage}
              </span>
            )
          }

          <button
            className="text-white font-bold bg-[#6EDAA1] p-3 rounded-lg"
            type="submit"
            onClick={handleLoginAndNavigate}
          >
            {loadingButton ? (
              <div className="spinner-border spinner-border-sm" role="status">
                <span className="visually-hidden">Carregando...</span>
              </div>
            ) : (
              'Entrar'
            )}
          </button>

          <button
            className="text-white underline w-fit"
            type="submit"
            onClick={() => navigate('/register')}
          >
            Criar conta
          </button>
        </Box>
      </div>
    </section>
  );
}

export default Login;
