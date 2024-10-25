import { useState, useEffect } from 'react';
import {
  consultaProductos,
  agregarProducto,
  editarProducto,
  eliminarProducto,
  consultaProductoPorId,
  consultaMarcas,
  consultaMaterials,
  consultaCategories,
  consultaDescuentos,
} from '../services/products';
import Swal from 'sweetalert2';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function DashboardProducts() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    id: '',
    name: '',
    description: '',
    price: '',
    stock: '',
    categoryId: '',
    brandId: '',
    materialId: '',
    image: [{ url: '' }],
    discountId: null,
  });
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [discounts, setDiscounts] = useState([]);
  const [brandMap, setBrandMap] = useState({});
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const fetchProductsAndBrands = async () => {
      const fetchedProducts = await consultaProductos();
      const fetchedBrands = await consultaMarcas();
      const fetchedCategories = await consultaCategories();
      const fetchedMaterials = await consultaMaterials();
      const fetchedDiscounts = await consultaDescuentos();

      setProducts(fetchedProducts);
      setBrands(fetchedBrands);
      setCategories(fetchedCategories);
      setMaterials(fetchedMaterials);
      setDiscounts(fetchedDiscounts);

      const brandMapping = {};
      fetchedBrands.forEach((brand) => {
        brandMapping[brand.id] = brand.name;
      });
      setBrandMap(brandMapping);
    };

    fetchProductsAndBrands();
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
      const success = await eliminarProducto(parseInt(id));
      console.log(success);
      let t = true;
      if (t) {
        setProducts(products.filter((product) => product.id !== id));
        Swal.fire('Eliminado!', 'El producto ha sido eliminado.', 'success');
      } else {
        Swal.fire('Error', 'No se pudo eliminar el producto.', 'error');
      }
    }
  };

  const handleEdit = async (product) => {
    const productDetails = await consultaProductoPorId(product.id);
    if (productDetails) {
      setNewProduct(productDetails);
    }
    setModalIsOpen(true);
  };

  const handleAddOrEditProduct = async () => {
    const productData = {
      ...newProduct,
      price: parseFloat(newProduct.price),
      stock: parseInt(newProduct.stock, 10),
      image: [{ url: newProduct.image[0].url }],
    };

    if (newProduct.id) {
      const updatedProduct = await editarProducto(newProduct.id, productData);
      if (updatedProduct) {
        setProducts(
          products.map((product) =>
            product.id === newProduct.id ? updatedProduct : product,
          ),
        );
        Swal.fire('Éxito', 'Producto editado correctamente.', 'success');
      }
    } else {
      const addedProduct = await agregarProducto(productData);
      if (addedProduct) {
        setProducts([...products, addedProduct]);
        Swal.fire('Éxito', 'Producto agregado correctamente.', 'success');
      }
    }

    handleCloseModal();
  };

  const handleCloseModal = () => {
    setNewProduct({
      id: '',
      name: '',
      description: '',
      price: '',
      stock: '',
      categoryId: '',
      brandId: '',
      materialId: '',
      image: [{ url: '' }],
      discountId: null,
    });
    setModalIsOpen(false);
  };

  return (
    <main className="container max-w-6xl mx-auto p-4 sm:p-6 md:p-8 lg:p-10">
      <h2 className="text-2xl font-bold mb-4 ml-4">Productos</h2>

      <button
        onClick={() => setModalIsOpen(true)}
        className="bg-blue-500 text-white py-2 px-4 rounded shadow mb-4"
      >
        Agregar Nuevo Producto
      </button>

      <table className="min-w-full border">
        <thead>
          <tr>
            <th className="border p-2">Item</th>
            <th className="border p-2">Nombre</th>
            <th className="border p-2">Precio</th>
            <th className="border p-2">Stock</th>
            <th className="border p-2">Marca</th>
            <th className="border p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.id}>
              <td className="border p-2">{index + 1}</td>
              <td className="border p-2">{product.name}</td>
              <td className="border p-2">{product.price}</td>
              <td className="border p-2">{product.stock}</td>
              <td className="border p-2">
                {brandMap[product.brandId] || 'Sin Marca'}
              </td>
              <td className="border p-2">
                <button
                  onClick={() => handleEdit(product)}
                  className="bg-yellow-500 text-white py-1 px-2 rounded"
                >
                  Modificar
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="bg-red-500 text-white py-1 px-2 rounded ml-2"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal isOpen={modalIsOpen} onRequestClose={handleCloseModal}>
        <h3 className="text-xl mb-2 mt-10">
          {newProduct.id ? 'Editar Producto' : 'Agregar Nuevo Producto'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Nombre del Producto"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Descripción del Producto"
            value={newProduct.description}
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
            className="border p-2 rounded"
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
            className="border p-2 rounded"
          />
          <input
            type="number"
            placeholder="Stock"
            value={newProduct.stock}
            onChange={(e) =>
              setNewProduct({
                ...newProduct,
                stock: parseInt(e.target.value, 10),
              })
            }
            className="border p-2 rounded"
          />
          <select
            value={newProduct.brandId}
            onChange={(e) =>
              setNewProduct({ ...newProduct, brandId: e.target.value })
            }
            className="border p-2 rounded"
          >
            <option value="">Seleccione una marca</option>
            {brands.map((brand) => (
              <option key={brand.id} value={brand.id}>
                {brand.name}
              </option>
            ))}
          </select>
          <select
            value={newProduct.categoryId}
            onChange={(e) =>
              setNewProduct({ ...newProduct, categoryId: e.target.value })
            }
            className="border p-2 rounded"
          >
            <option value="">Seleccione una categoría</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.title} {/* Mostrar título aquí */}
              </option>
            ))}
          </select>
          <select
            value={newProduct.materialId}
            onChange={(e) =>
              setNewProduct({ ...newProduct, materialId: e.target.value })
            }
            className="border p-2 rounded"
          >
            <option value="">Seleccione un material</option>
            {materials.map((material) => (
              <option key={material.id} value={material.id}>
                {material.name}
              </option>
            ))}
          </select>
          <select
            value={newProduct.discountId}
            onChange={(e) =>
              setNewProduct({ ...newProduct, discountId: e.target.value })
            }
            className="border p-2 rounded"
          >
            <option value="">Seleccione un descuento</option>
            <option value="null">Ninguno</option>{' '}
            {/* Opción para seleccionar ninguno */}
            {discounts.map((discount) => (
              <option key={discount.id} value={discount.id}>
                {discount.description}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="URL de la imagen"
            value={newProduct.image[0]?.url || ''} // Manejar caso vacío
            onChange={(e) =>
              setNewProduct({
                ...newProduct,
                image: [{ url: e.target.value }],
              })
            }
            className="border p-2 rounded"
          />
        </div>
        <div className="mt-4">
          <button
            onClick={handleAddOrEditProduct}
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            {newProduct.id ? 'Actualizar Producto' : 'Agregar Producto'}
          </button>
          <button
            onClick={handleCloseModal}
            className="ml-2 bg-gray-500 text-white py-2 px-4 rounded"
          >
            Cancelar
          </button>
        </div>
      </Modal>
    </main>
  );
}

export default DashboardProducts;
