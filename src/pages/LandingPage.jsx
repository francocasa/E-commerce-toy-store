import {
  HeroSection,
  ProductsSection,
  TestimonialSection,
  PromotionSection,
} from '../components';

const LandingPage = () => {
  return (
    <main className="container mx-auto p-8">
      {/* Hero Section */}
      <HeroSection />
      <ProductsSection />
      <PromotionSection />
      <TestimonialSection />
    </main>
  );
};

export default LandingPage;
