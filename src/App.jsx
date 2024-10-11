import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CounterProvider } from './components/counter/Context';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import LoginAdmPage from './pages/LoginAdmPage';
import ProductsPage from './pages/ProductsPage';
import HistoryPage from './pages/HistoryPage';
import AboutUs from './pages/AboutUs';
import Politica from './pages/Politica';
import FaqPage from './pages/FaqPage';
import CategoriesPage from './pages/CategoriesPage';
import DetailsProductPage from './pages/DetailsProductPage';
import SignupPage from './pages/SignupPage';
import CartPage from './pages/CartPage';
import DashboardAdmin from './pages/DashboardAdmin';
import DashboardProducts from './pages/DashboardProducts';
import DashboardCategories from './pages/adminCRUD/DashboardCategories';
import DashboardReportes from './pages/DashboardReportes';
import PromotionsPage from './pages/PromotionsPage';
import ProfilePage from './pages/ProfilePage';
import TestimoniosPage from './pages/TestimoniosPage';
import Header from './components/Header';
import Footer from './components/Footer';
import './index.css';

function App() {
  return (
    <>
      <CounterProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/admin/dashboard" element={<DashboardAdmin />} />
            <Route
              path="/admin/dashboard/products"
              element={<DashboardProducts />}
            />
            <Route
              path="/admin/dashboard/categories"
              element={<DashboardCategories />}
            />
            <Route
              path="/admin/dashboard/reportes"
              element={<DashboardReportes />}
            />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/loginAdm" element={<LoginAdmPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/perfil" element={<ProfilePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:cat" element={<ProductsPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/politica" element={<Politica />} />
            <Route
              path="/detailsproduct/:id"
              element={<DetailsProductPage />}
            />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/promotions" element={<PromotionsPage />} />
            <Route path="/testimonios" element={<TestimoniosPage />} />
            <Route path="/history/:id" element={<HistoryPage />} />
          </Routes>
          <Footer />
        </Router>
      </CounterProvider>
    </>
  );
}

export default App;
