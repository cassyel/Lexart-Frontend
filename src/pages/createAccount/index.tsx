import { ChangeEvent, useState } from 'react';
import { Box, FormHelperText, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ApiError } from '../../errors/apiError';
import { useRegister } from '../../services/useRegister';
import lexartLogo from '../../assets/lexart-labs-logo.svg';

type eventAcceptted = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>

function CreateAccount() {
  const navigate = useNavigate();

  const [loginState, setLoginState] = useState(
    {
      email: '',
      password: '',
      wrong: false,
      errorMessage: '',
    },
  );

  const [loadingButton, setLoadButton] = useState(false);

  const handleInputChange = (e: eventAcceptted) => {
    const { name, value } = e.target;
    setLoginState((prev) => ({ ...prev, [name]: value, wrong: false }));
  };

  const handleRegisterAndNavigate = async () => {
    try {
      setLoadButton(true);

      await useRegister({
        email: loginState.email,
        password: loginState.password,
      });

      setLoadButton(false);

      navigate('/login');
    } catch (error) {
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
          <h1 className="text-white text-2xl ">Crie sua conta</h1>
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
              <FormHelperText
                className="self-center !text-red-500"
              >
                {loginState.errorMessage.replace('Password', 'Senha')}
              </FormHelperText>
            )
          }

          <button
            className="text-white font-bold bg-[#6EDAA1] p-3 rounded-lg"
            type="submit"
            onClick={handleRegisterAndNavigate}
          >
            {loadingButton ? (
              <div className="spinner-border spinner-border-sm" role="status">
                <span className="visually-hidden">Carregando...</span>
              </div>
            ) : (
              'Entrar'
            )}
          </button>
        </Box>
      </div>
    </section>
  );
}

export default CreateAccount;
