import Login from './pages/LoginPage';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import Register from './pages/RegisterPage';
import PostPage from "./pages/PostPage"
import { Routes, Route } from 'react-router-dom'
import Container from '@mui/material/Container';
import './App.css';

const App = () => (
  <Container>
    <NavBar />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register  />} />
      <Route path="/posts" element={<PostPage />} />
      <Route path="/post/:slug" element={<PostPage />} />
    </Routes>
  </Container>
);

export default App;
