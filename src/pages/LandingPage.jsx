import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import ProductsSection from '../components/ProductsSection';
import TestimonialSection from '../components/TestimonialSection';
import PromotionSection from '../components/PromotionSection';

const LandingPage = () => {

  return (
    <>
      <Header />
      <main className="container mx-auto p-8">
             {/* Hero Section */}
      <HeroSection />
        <ProductsSection />
        <PromotionSection />
        <TestimonialSection />
      </main>
      <Footer />
    </>
  );
}

export default LandingPage;
