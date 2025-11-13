import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import RMs from './pages/RMs';
import Teams from './pages/Teams';
import Branches from './pages/Branches';
import TeamsMessages from './pages/TeamsMessages';
import AccessInfo from './pages/AccessInfo';
import Dailys from './pages/Dailys';
import ImportantLinks from './pages/ImportantLinks';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { token, isLoading } = useAuth();

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Carregando...</div>;
  }

  return token ? <>{children}</> : <Navigate to="/login" />;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/rms"
        element={
          <PrivateRoute>
            <RMs />
          </PrivateRoute>
        }
      />
      <Route
        path="/teams"
        element={
          <PrivateRoute>
            <Teams />
          </PrivateRoute>
        }
      />
      <Route
        path="/branches"
        element={
          <PrivateRoute>
            <Branches />
          </PrivateRoute>
        }
      />
      <Route
        path="/messages"
        element={
          <PrivateRoute>
            <TeamsMessages />
          </PrivateRoute>
        }
      />
      <Route
        path="/access"
        element={
          <PrivateRoute>
            <AccessInfo />
          </PrivateRoute>
        }
      />
      <Route
        path="/dailys"
        element={
          <PrivateRoute>
            <Dailys />
          </PrivateRoute>
        }
      />
      <Route
        path="/links"
        element={
          <PrivateRoute>
            <ImportantLinks />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
