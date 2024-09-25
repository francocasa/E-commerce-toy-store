import { useParams } from 'react-router-dom';
import { promotions } from '../data/Promotions';

function PromotionDetailPage() {
  const { id } = useParams();
  const promotion = promotions.find(promo => promo.id === id);

  if (!promotion) return <p>Promoción no encontrada</p>;

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">{promotion.category}</h1>
      <img src={promotion.image} alt={promotion.category} className="w-full h-64 object-cover mb-4" />
      <p className="text-xl">{promotion.description}</p>
    </div>
  );
}

export default PromotionDetailPage;
