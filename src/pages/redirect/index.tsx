import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface ErrorElementProps {
  invalidRoute?: boolean;
}

function ErrorElement({ invalidRoute }: ErrorElementProps) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!invalidRoute) {
      const timeout = setTimeout(() => {
        navigate('/login');
      }, 1500);

      return () => clearTimeout(timeout);
    }

    return undefined;
  }, [navigate]);

  return (
    <section className="bg-[#26333D] h-screen flex flex-col justify-center items-center">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-white mb-4 animate-bounce">{ invalidRoute ? '404' : '401' }</h1>
        <h2 className="text-3xl font-bold text-white mb-8 animate__animated animate__fadeInDown">{ invalidRoute ? 'Página não encontrada' : 'Acesso Negado' }</h2>
        <div className="flex flex-col gap-3 justify-center items-center text-white animate__animated animate__fadeInUp">
          <div className="flex items-center">
            {
              !invalidRoute && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="animate-spin h-8 w-8 mr-2"
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
              )
            }
            <p>{!invalidRoute ? 'Redirecionando para o login...' : ''}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ErrorElement;
