import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/index.css';
import GuideListPage from './pages/GuideListPage';
import GuidePage from './pages/GuidePage';
import LoginPage from './pages/LoginPage';
import NewGuidePage from './pages/NewGuidePage';
import ModifyGuidePage from './pages/ModifyGuidePage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/guides" element={<GuideListPage />} />
        <Route path="/guide/:id" element={<GuidePage />} />
        <Route path="/new-guide" element={<NewGuidePage />} />
        <Route path="/modify-guide/:id" element={<ModifyGuidePage />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
