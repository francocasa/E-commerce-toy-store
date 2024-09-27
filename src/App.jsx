import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import ProductsPage from './pages/ProductsPage';
import AboutUs from './pages/AboutUs';
import CategoriesPage from './pages/CategoriesPage';
import DetailsProductPage from './pages/DetailsProductPage';
import CartPage from './pages/CartPage';
import PromotionsPage from './pages/PromotionsPage';
import TestimoniosPage from './pages/TestimoniosPage';
import PromotionDetailPage from './pages/PromotionDetailPage';
import Header from './components/Header';
import Footer from './components/Footer';
import './index.css';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:cat" element={<ProductsPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/detailsproduct/:id" element={<DetailsProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/promotions" element={<PromotionsPage />} />
        <Route path="/promotion/:id" element={<PromotionDetailPage />} />
        <Route path="/testimonios" element={<TestimoniosPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
