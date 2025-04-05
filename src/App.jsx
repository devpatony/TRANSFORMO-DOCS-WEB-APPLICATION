import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './components/homepage';

import Feature1 from './pages/feature1';
import Feature2 from './pages/feature2';
import Feature3 from './pages/feature3';
import Feature4 from './pages/Feature4';
import Feature5 from './pages/Feature5';
import Feature6 from './pages/feature6';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <Routes>
                  <Route path="/feature1" element={<Feature1 />} />
                  <Route path="/feature2" element={<Feature2 />} />
                  <Route path="/feature3" element={<Feature3 />} />
                  <Route path="/feature4" element={<Feature4 />} />
                  <Route path="/feature5" element={<Feature5 />} />
                  <Route path="/feature6" element={<Feature6 />} />
                </Routes>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;