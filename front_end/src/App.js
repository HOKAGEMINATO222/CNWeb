import './App.css';
import Login from "./pages/Login/index";
import RegisterPage from './pages/RegisterAccount';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// import Test from './pages/test/Test';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
}



export default App;

