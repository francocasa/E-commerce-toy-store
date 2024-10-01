import {
  HeroSection,
  ProductsSection,
  TestimonialSection,
  PromotionSection,
} from '../components';

const LandingPage = () => {
  return (
    <main className="container mx-auto p-4 md:p-8 lg:p-12">
      <HeroSection />
      <ProductsSection />
      <PromotionSection />
      <TestimonialSection />
    </main>
  );
};

export default LandingPage;
