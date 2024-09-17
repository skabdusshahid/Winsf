import React, { Suspense, useEffect, useContext } from 'react';
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { CSpinner, useColorModes } from '@coreui/react';
import { AuthContext, AuthProvider } from './AuthContext';
import './scss/style.scss';
import './App.css'

// Lazy-loaded Components
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'));
const Login = React.lazy(() => import('./views/pages/login/Login'));
const Register = React.lazy(() => import('./views/pages/register/Register'));
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'));

const App = () => {
  const { isColorModeSet, setColorMode } = useColorModes('coreui-free-react-admin-template-theme');
  const storedTheme = useSelector((state) => state.theme);
  const { isAuthenticated } = useContext(AuthContext); // Access authentication context

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.href.split('?')[1]);
    const theme = urlParams.get('theme') && urlParams.get('theme').match(/^[A-Za-z0-9\s]+/)[0];
    if (theme) {
      setColorMode(theme);
    }

    if (isColorModeSet()) {
      return;
    }

    setColorMode(storedTheme);
  }, [isColorModeSet, setColorMode, storedTheme]);

  return (
    <HashRouter>
      <Suspense
        fallback={
          <div className="pt-3 text-center">
            <CSpinner color="primary" variant="grow" />
          </div>
        }
      >
        <Routes>
          <Route
            exact
            path="/login"
            name="Login Page"
            element={isAuthenticated ? <Navigate to="/" /> : <Login />}
          />
          <Route
            exact
            path="/register"
            name="Register Page"
            element={isAuthenticated ? <Navigate to="/" /> : <Register />}
          />
          <Route
            exact
            path="/404"
            name="Page 404"
            element={<Page404 />}
          />
          <Route
            exact
            path="/500"
            name="Page 500"
            element={<Page500 />}
          />
          <Route
            path="*"
            name="Home"
            element={isAuthenticated ? <DefaultLayout /> : <Navigate to="/login" />}
          />
        </Routes>
      </Suspense>
    </HashRouter>
  );
};

// Wrap the App component with AuthProvider
const AppWrapper = () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);

export default AppWrapper;
