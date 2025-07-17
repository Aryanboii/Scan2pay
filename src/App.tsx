import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import QRGenerator from './components/QRGenerator';
import PaymentConfirmation from './components/PaymentConfirmation';
import { AuthProvider, useAuth } from './context/AuthContext';
import Auth from './components/Auth';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  return user ? <>{children}</> : <Navigate to="/auth" />;
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/login" element={<Login />} />
          <Route path="/payment-confirmation" element={<PaymentConfirmation />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <QRGenerator />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;