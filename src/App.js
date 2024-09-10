import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import RegisterForm from './Pages/RegisterForm';
import LoginForm from './Pages/LoginForm';
import ProfilePage from './Pages/ProfilePage';
import ShowManagerPage from './Pages/ShowManagerPage';
import PrivateRoute from './components/PrivateRoute';
import NavigationBar from './components/NavigationBar';
import Footer from './components/Footer';
import ShowDetails from './Pages/Details';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/profile" element={<PrivateRoute roles={['regular']}><ProfilePage /></PrivateRoute>} />
        <Route path="/admin-dashboard" element={<PrivateRoute roles={['admin']}><ShowManagerPage /></PrivateRoute>} />
        <Route path="/details/:id" element={<ShowDetails />} /> 
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
