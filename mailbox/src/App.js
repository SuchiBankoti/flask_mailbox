import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import './App.css';
import AuthUser from './Auth/AuthUser';
import Welcome from './Welcome';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<AuthUser/>} />
      <Route path="/welcome" element={<Welcome/>} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
