import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';

export default function PrivateRoute() {
  const token = useAuthStore(state => state.token);

  if (!token) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}