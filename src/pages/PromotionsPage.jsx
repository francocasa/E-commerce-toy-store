import { promotions } from '../data/Promotions';
import PromotionCard from '../components/PromotionCard';

function PromotionsPage() {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Promociones</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {promotions.map(promo => (
          <PromotionCard key={promo.id} promotion={promo} />
        ))}
      </div>
    </section>
  );
}

export default PromotionsPage;
