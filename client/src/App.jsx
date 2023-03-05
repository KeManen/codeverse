import Login from './pages/LoginPage';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import Register from './pages/RegisterPage';
import PostPage from "./pages/PostPage"
import { Routes, Route } from 'react-router-dom'
import './App.css';

function App() {

  return <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login  />} />
        <Route path="/register" element={<Register  />} />
        <Route path="/post/:slug" element={<PostPage />} />
      </Routes>
    </div>
}

export default App;
