import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './styles/index.css';
import GuideListPage from './pages/GuideListPage';
import GuidePage from './pages/GuidePage';
import LoginPage from './pages/LoginPage';
import NewGuidePage from './pages/NewGuidePage';
import ModifyGuidePage from './pages/ModifyGuidePage';
import CreateAccountPage from './pages/CreateAccountPage';

function ProtectedRoute({ children }) {
  const currentUser = localStorage.getItem('currentUser');

  if (!currentUser) {
    return <Navigate to="/" replace />;
  }

  return children;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/guides" element={<ProtectedRoute><GuideListPage /></ProtectedRoute>} />
        <Route path="/guide/:id" element={<ProtectedRoute><GuidePage /></ProtectedRoute>} />
        <Route path="/new-guide" element={<ProtectedRoute><NewGuidePage /></ProtectedRoute>} />
        <Route path="/modify-guide/:id" element={<ProtectedRoute><ModifyGuidePage /></ProtectedRoute>} />
        <Route path="/new-user" element={<CreateAccountPage />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
