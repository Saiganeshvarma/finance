import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { AppProvider } from './contexts/AppContext';
import Layout from './components/Layout/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import DepositorDashboard from './pages/Dashboards/DepositorDashboard';
import BorrowerDashboard from './pages/Dashboards/BorrowerDashboard';
import AdminDashboard from './pages/Dashboards/AdminDashboard';

const AppRoutes: React.FC = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={user ? <Navigate to={`/${user.role}`} replace /> : <Login />} />
      <Route path="/register" element={user ? <Navigate to={`/${user.role}`} replace /> : <Register />} />
      
      <Route
        path="/depositor"
        element={
          <ProtectedRoute allowedRoles={['depositor']}>
            <DepositorDashboard />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/borrower"
        element={
          <ProtectedRoute allowedRoles={['borrower']}>
            <BorrowerDashboard />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <Router>
          <Layout>
            <AppRoutes />
          </Layout>
        </Router>
      </AppProvider>
    </AuthProvider>
  );
}

export default App;