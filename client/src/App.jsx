import './App.css'
import ArticleDetails from './pages/ArticleDetails';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProfilePage from './pages/ProfilePage';
import { useEffect, useState } from 'react';
import PrivateRoute from './services/PrivateRoute'; 


function App() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories data when the app loads
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/categories`);
        const data = await response.json();
        if (response.ok) {
          setCategories(data.data);
        } else {
          console.error("Failed to fetch categories");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        
        <Route path="/dashboard" element={<PrivateRoute element={<Dashboard categories={categories} />} />} />
        <Route path="/article-details/:id" element={<PrivateRoute element={<ArticleDetails />} />} />
        <Route path="/profile-page" element={<PrivateRoute element={<ProfilePage categories={categories} />} />} />
      </Routes>
    </Router>
  );
}

export default App
