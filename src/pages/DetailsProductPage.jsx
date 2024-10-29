import { useParams } from 'react-router-dom';
import {
  consultaProductoPorId,
  consultaMarcas,
  consultaMaterials,
  consultaCategories,
  consultaDescuentos,
} from '../services/products';
import { AddToCart, ProductsSection } from '../components';
import { useEffect, useState } from 'react';
const IMAGES_URL = import.meta.env.VITE_IMAGES_URL; // Obtener la URL base desde el .env

function DetailsProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [brands, setBrands] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [categories, setCategories] = useState([]);
  const [discounts, setDiscounts] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const data = await consultaProductoPorId(id);
        if (data) {
          setProduct(data);
        } else {
          setError('Producto no encontrado');
        }
      } catch (err) {
        setError('Error al cargar el producto');
      } finally {
        setLoading(false);
      }
    };

    const fetchAdditionalData = async () => {
      try {
        const [brandsData, materialsData, categoriesData, discountsData] =
          await Promise.all([
            consultaMarcas(),
            consultaMaterials(),
            consultaCategories(),
            consultaDescuentos(),
          ]);
        setBrands(brandsData);
        setMaterials(materialsData);
        setCategories(categoriesData);
        setDiscounts(discountsData);
      } catch (err) {
        setError('Error al cargar datos adicionales');
      }
    };

    fetchProduct();
    fetchAdditionalData();
  }, [id]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!product)
    return <p className="text-center text-red-500">Producto no encontrado</p>;

  const imageUrl =
    Array.isArray(product.images) && product.images.length > 0
      ? IMAGES_URL + '/' + product.images[0].url
      : '';
  const brand = brands.find((b) => b.id === product.brandId);
  const material = materials.find((m) => m.id === product.materialId);
  const category = categories.find((c) => c.id === product.categoryId);
  const discount = discounts.find((d) => d.id === product.discountId);

  return (
    <main className="container mx-auto p-5 md:mt-8 lg:mt-10">
      <div className="flex flex-col gap-6 md:flex-row md:justify-center">
        <div className="flex justify-center items-center">
          {imageUrl ? (
            <img
              crossOrigin="anonymous"
              src={imageUrl}
              alt={product.name}
              className="w-full h-64 object-contain md:h-72 lg:h-80"
            />
          ) : (
            <p>Imagen no disponible</p>
          )}
        </div>

        <div className="px-8 space-y-4 w-fit md:max-w-96">
          <div className="text-md">
            <h1 className="font-bold text-2xl">{product.name}</h1>

            {discount === '' ? (
              <p className="font-medium text-xl">${product.price.toFixed(2)}</p>
            ) : (
              <div className="text-gray-600 mb-3 flex gap-3 items-center h-7">
                <p className="font-medium text-xl text-gray-400 line-through ">
                  ${product.price.toFixed(2)}
                </p>
                <p className="font-medium text-xl">
                  $
                  {(product.price * (1 - product.discount.discount)).toFixed(2)}
                </p>
              </div>
            )}

            <p className="my-3">{product.description}</p>
            <p className="mb-1">
              <strong>Marca:</strong> {brand ? brand.name : 'No disponible'}
            </p>
            <p className="mb-1">
              <strong>Material:</strong>{' '}
              <span className="capitalize">
                {material ? material.name : 'No disponible'}
              </span>
            </p>
            <p className="">
              <strong>Categoría:</strong>{' '}
              {category ? category.title : 'No disponible'}
            </p>

            {/* Sección de promociones si aplica */}
            {product.discountId && discount ? (
              <div className="mt-4 border-t pt-4">
                <h2 className="text-xl font-bold mb-2">PROMOCIÓN</h2>
                <h3 className="text-lg font-bold mb-2">
                  {product.discount.description}
                </h3>
                <p className="text-md mb-2">
                  {`Descuento del ${(product.discount.discount * 100).toFixed(0)}%`}
                </p>
              </div>
            ) : null}
          </div>

          <AddToCart product={product} />
        </div>
      </div>

      <div className="md:mt-4">
        <ProductsSection />
      </div>
    </main>
  );
}

export default DetailsProductPage;
