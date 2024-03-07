/* eslint-disable jsx-a11y/control-has-associated-label */
import { useAuth } from '../hooks/useAuth';
import lexartLogo from '../assets/lexart-labs-logo.svg';
import logoutLogo from '../assets/logout-icon.svg';

function Header() {
  const authContext = useAuth();

  function logout() {
    authContext.logout();
  }

  return (
    <header className="bg-[#26333D] text-white">
      <div className="mx-8 flex justify-between items-center p-3">
        <div className="ml-2">
          <img src={lexartLogo} alt="" width={100} />
        </div>
        <div>
          <button type="button" className="w-fit h-fit" onClick={logout}>
            <img src={logoutLogo} width={28} alt="" />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
