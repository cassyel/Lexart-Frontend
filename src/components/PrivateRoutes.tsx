import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import ErrorElement from '../pages/redirect';

import LoadingSpinner from '../components/LoadingSpinner';
import { useAuth } from '../hooks/useAuth';

function PrivateRoutes() {
  const authContext = useAuth();
  const [routeLoading, setRouteLoading] = useState(true);
  const [auth, setAuth] = useState<undefined | boolean>(undefined);

  useEffect(() => {
    setRouteLoading(true);
    setAuth(authContext.user.auth);
    setRouteLoading(false);
  }, []);

  if (routeLoading) {
    return <LoadingSpinner />;
  }

  if (!auth) {
    return <ErrorElement />;
  }

  return (
    <section className="h-[calc(100vh-128px)] bg-[#26333D]">
      <Outlet />
    </section>
  );
}

export default PrivateRoutes;
