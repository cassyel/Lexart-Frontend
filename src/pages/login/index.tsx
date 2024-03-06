import { ChangeEvent, useState } from 'react';
import { Box, FormHelperText, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useLogin } from '../../services/useLogin';
import lexartLogo from '../../assets/lexart-labs-logo.svg';
import { ApiError } from '../../errors/apiError';

type eventAcceptted = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>

function Login() {
  const navigate = useNavigate();

  const [loginState, setLoginState] = useState(
    {
      email: undefined,
      password: undefined,
      wrong: false,
      errorMessage: '',
    },
  );

  const handleInputChange = (e: eventAcceptted) => {
    const { name, value } = e.target;
    setLoginState((prev) => ({ ...prev, [name]: value, wrong: false }));
  };

  const handleLoginAndNavigate = async () => {
    try {
      const { data } = await useLogin({
        email: loginState.email,
        password: loginState.password,
      });

      axios.defaults.headers.authorization = data.token;
      navigate('/');
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
          <img src={lexartLogo} alt="Shift Logo" width="400" />
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
            label="Password"
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
                {loginState.errorMessage}
              </FormHelperText>
            )
          }

          <button
            className="text-white font-bold bg-[#6EDAA1] p-3 rounded-lg"
            type="submit"
            onClick={handleLoginAndNavigate}
          >
            Login
          </button>
        </Box>
      </div>
    </section>
  );
}

export default Login;
