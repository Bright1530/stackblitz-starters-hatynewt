import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Layout from './components/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Module from './pages/Module';
import Leaderboard from './pages/Leaderboard';
import Statistics from './pages/Statistics';
import GenerationsRoyales from './pages/GenerationsRoyales';
import GrandeGeneration from './pages/GrandeGeneration';
import PetiteGeneration from './pages/PetiteGeneration';
import PrivateRoute from './components/PrivateRoute';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<PrivateRoute />}>
            <Route element={<Layout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/module/:id" element={<Module />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/statistics" element={<Statistics />} />
              <Route path="/generations" element={<GenerationsRoyales />} />
              <Route path="/generations/grande" element={<GrandeGeneration />} />
              <Route path="/generations/petite" element={<PetiteGeneration />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}