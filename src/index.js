import React from 'react';
import ReactDOM from 'react-dom/client';
import {  BrowserRouter as Router,  Routes,  Route} from "react-router-dom";
import './styles/index.css';
import GuideListPage from './pages/GuideListPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<GuideListPage />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
