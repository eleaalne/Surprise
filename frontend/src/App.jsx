import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Page from './components/Page'; // Verifica que este archivo exista
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
    
      <Routes>
        <Route path="/" element={<Page />} />
        {/* Agrega otras rutas si las tienes */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
