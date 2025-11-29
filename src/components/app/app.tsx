import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  Navigate
} from 'react-router-dom';
import { useEffect } from 'react';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader } from '@components';
import { Modal } from '@components';
import { IngredientDetails } from '@components';
import { OrderInfo } from '@components';

import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';

import { useDispatch, useSelector } from '../../services/store';
import { getUser as getUserThunk } from '../../services/slices/userSlice';
import { getIsAuthenticated } from '@selectors';
import { Preloader } from '../ui';

const ProtectedRouteElement = ({ element }: { element: JSX.Element }) => {
  const isAuthenticated = useSelector(getIsAuthenticated);

  if (isAuthenticated) {
    return <Navigate to='/' replace />;
  }

  return element;
};

const ProtectedRouteAuth = ({ element }: { element: JSX.Element }) => {
  const location = useLocation();
  const isAuthenticated = useSelector(getIsAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return element;
};

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const background = location.state && location.state.background;

  useEffect(() => {
    dispatch(getUserThunk());
  }, [dispatch]);

  const handleModalClose = () => {
    navigate(-1);
  };

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/login'
          element={<ProtectedRouteElement element={<Login />} />}
        />
        <Route
          path='/register'
          element={<ProtectedRouteElement element={<Register />} />}
        />
        <Route
          path='/forgot-password'
          element={<ProtectedRouteElement element={<ForgotPassword />} />}
        />
        <Route
          path='/reset-password'
          element={<ProtectedRouteElement element={<ResetPassword />} />}
        />
        <Route
          path='/profile'
          element={<ProtectedRouteAuth element={<Profile />} />}
        />
        <Route
          path='/profile/orders'
          element={<ProtectedRouteAuth element={<ProfileOrders />} />}
        />
        <Route path='/feed/:number' element={<Feed />} />
        <Route path='/ingredients/:id' element={<ConstructorPage />} />
        <Route
          path='/profile/orders/:number'
          element={<ProtectedRouteAuth element={<ProfileOrders />} />}
        />
        <Route path='*' element={<NotFound404 />} />
      </Routes>
      {background && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal title='Детали заказа' onClose={handleModalClose}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal title='Детали ингредиента' onClose={handleModalClose}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <ProtectedRouteAuth
                element={
                  <Modal title='Детали заказа' onClose={handleModalClose}>
                    <OrderInfo />
                  </Modal>
                }
              />
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
