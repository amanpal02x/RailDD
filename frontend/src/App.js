import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Divisions from './pages/Divisions';
import DivisionPage from './pages/DivisionPage';
import SectionPage from './pages/SectionPage';
import StaffApproval from './pages/StaffApproval';
import StaffRequester from './pages/StaffRequester';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/divisions" element={<Divisions />} />
          <Route path="/:division" element={<DivisionPage />} />
          <Route path="/:division/:section" element={<SectionPage />} />
          <Route path="/:division/staff-approval" element={<StaffApproval />} />
          <Route path="/:division/staff-requestor" element={<StaffRequester />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
