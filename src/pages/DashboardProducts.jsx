import { useState, useEffect } from 'react';
import {
  consultaProductos,
  agregarProducto,
  editarProducto,
  eliminarProducto,
} from '../services/products';
import { ProductCard } from '../components';
import { CategoryFilter } from '../components';
import Swal from 'sweetalert2';

function DashboardProducts() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    id: '',
    title: '',
    price: '',
    image: '',
    descripcion: '',
    marca: '',
    material: '',
    category: [],
    promocion: 'false',
    descriptionPromo: '',
    categoryPromo: '',
  });
  const [selectedCategory, setSelectedCategory] = useState('');

  const categories = ['Educativo', 'Acción'];

  useEffect(() => {
    const fetchProducts = async () => {
      const fetchedProducts = await consultaProductos(); // Cargar desde el servicio
      setProducts(fetchedProducts);
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: '¿Confirma eliminar?',
      text: '¡Esta acción no se puede deshacer!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    });

    if (result.isConfirmed) {
      const success = await eliminarProducto(id); // Eliminar desde el API
      if (success) {
        setProducts(products.filter((product) => product.id !== id));
        Swal.fire('Eliminado!', 'El producto ha sido eliminado.', 'success');
      } else {
        Swal.fire('Error', 'No se pudo eliminar el producto.', 'error');
      }
    }
  };

  const handleEdit = (product) => {
    setNewProduct(product);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setNewProduct({
      id: '',
      title: '',
      price: '',
      image: '',
      descripcion: '',
      marca: '',
      material: '',
      category: [],
      promocion: 'false',
      descriptionPromo: '',
      categoryPromo: '',
    });
  };

  const handleAddOrEditProduct = async () => {
    if (
      !newProduct.title ||
      !newProduct.price ||
      !newProduct.image ||
      !newProduct.descripcion ||
      !newProduct.marca ||
      !newProduct.material ||
      newProduct.category.length === 0
    ) {
      Swal.fire(
        'Error',
        'Por favor, completa todos los campos obligatorios.',
        'error',
      );
      return;
    }

    if (newProduct.promocion === 'true' && !newProduct.descriptionPromo) {
      Swal.fire(
        'Error',
        'Si hay promoción activa, es necesario darle un valor a la descripción de promoción.',
        'error',
      );
      return;
    }

    const productData = {
      ...newProduct,
      price: parseFloat(newProduct.price), // Convertir a número
    };

    if (newProduct.id) {
      // Modificación de producto existente
      const updatedProduct = await editarProducto(newProduct.id, productData);
      if (updatedProduct) {
        setProducts(
          products.map((product) =>
            product.id === newProduct.id ? updatedProduct : product,
          ),
        );
        Swal.fire('Éxito', 'Producto editado correctamente.', 'success');
      } else {
        Swal.fire('Error', 'No se pudo editar el producto.', 'error');
      }
    } else {
      // Creación de nuevo producto
      const addedProduct = await agregarProducto(productData);
      if (addedProduct) {
        setProducts([...products, addedProduct]);
        Swal.fire('Éxito', 'Producto agregado correctamente.', 'success');
      } else {
        Swal.fire('Error', 'No se pudo agregar el producto.', 'error');
      }
    }

    handleCancelEdit();
  };

  const handleDescriptionPromoChange = (value) => {
    setNewProduct((prev) => ({
      ...prev,
      descriptionPromo: value,
      categoryPromo:
        value === '30% de descuento en juguetes seleccionados'
          ? 'Navidad'
          : '3x2',
    }));
  };

  const filteredProducts = products.filter((product) => {
    return (
      selectedCategory === '' || product.category.includes(selectedCategory)
    );
  });

  return (
    <main className="my-8">
      <h2 className="text-2xl font-bold mb-4 ml-4">Productos</h2>

      {/* Formulario para agregar o editar un producto */}
      <div className="ml-4 mb-4">
        <h3 className="text-xl mb-2">
          {newProduct.id ? 'Editar Producto' : 'Agregar Nuevo Producto'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Título"
            value={newProduct.title}
            onChange={(e) =>
              setNewProduct({ ...newProduct, title: e.target.value })
            }
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            placeholder="Precio"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({
                ...newProduct,
                price: parseFloat(e.target.value),
              })
            }
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Imagen URL"
            value={newProduct.image}
            onChange={(e) =>
              setNewProduct({ ...newProduct, image: e.target.value })
            }
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Descripción"
            value={newProduct.descripcion}
            onChange={(e) =>
              setNewProduct({ ...newProduct, descripcion: e.target.value })
            }
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Marca"
            value={newProduct.marca}
            onChange={(e) =>
              setNewProduct({ ...newProduct, marca: e.target.value })
            }
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Material"
            value={newProduct.material}
            onChange={(e) =>
              setNewProduct({ ...newProduct, material: e.target.value })
            }
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={newProduct.category}
            onChange={(e) =>
              setNewProduct({ ...newProduct, category: [e.target.value] })
            }
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Seleccione categoría</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={newProduct.promocion === 'true'}
              onChange={() =>
                setNewProduct({
                  ...newProduct,
                  promocion: newProduct.promocion === 'true' ? 'false' : 'true',
                })
              }
              className="mr-2"
            />
            <span>Promoción</span>
          </label>
          <select
            value={newProduct.descriptionPromo}
            onChange={(e) => handleDescriptionPromoChange(e.target.value)}
            className={`border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              newProduct.promocion === 'false'
                ? 'bg-gray-200 cursor-not-allowed'
                : ''
            }`}
            disabled={newProduct.promocion === 'false'}
          >
            <option value="">Seleccione descripción de promoción</option>
            <option value="30% de descuento en juguetes seleccionados">
              30% de descuento en juguetes seleccionados
            </option>
            <option value="Compra 3 y paga 2">Compra 3 y paga 2</option>
          </select>
          <input
            type="text"
            value={newProduct.categoryPromo}
            className="border p-2 bg-gray-200 cursor-not-allowed rounded"
            readOnly
          />
        </div>
        <div className="mt-4">
          <button
            onClick={handleAddOrEditProduct}
            className="bg-blue-500 text-white py-2 px-4 rounded shadow hover:bg-blue-600 transition duration-200"
          >
            {newProduct.id ? 'Actualizar Producto' : 'Agregar Producto'}
          </button>
          {newProduct.id && (
            <button
              onClick={handleCancelEdit}
              className="ml-2 bg-gray-500 text-white py-2 px-4 rounded shadow hover:bg-gray-600 transition duration-200"
            >
              Cancelar Edición
            </button>
          )}
        </div>
      </div>

      <div className="ml-4">
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredProducts.map((product) => (
          <div key={product.id} className="relative w-[270px] mx-auto mt-20">
            <button
              onClick={() => handleDelete(product.id)}
              className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-red-500 bg-white border rounded shadow"
            >
              Eliminar
            </button>
            <button
              onClick={() => handleEdit(product)}
              className="absolute -top-16 left-1/2 transform -translate-x-1/2 text-blue-500 bg-white border rounded shadow"
            >
              Editar
            </button>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </main>
  );
}

export default DashboardProducts;
