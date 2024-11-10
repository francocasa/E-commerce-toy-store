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
  habilitarProducto,
  deshabilitarProducto,
  consultaProductosInhabilitados,
} from '../../services/products';
import Swal from 'sweetalert2';
import Modal from 'react-modal';
import axios from 'axios';

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
    images: [],
    deleteImages: [],
    newImages: [], // Asegúrate de que siempre sea un array vacío
    discountId: null,
  });

  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [discounts, setDiscounts] = useState([]);
  const [brandMap, setBrandMap] = useState({});
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalInhabilitadosIsOpen, setModalInhabilitadosIsOpen] =
    useState(false);
  const [productosInhabilitados, setProductosInhabilitados] = useState([]);

  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    if (!adminToken) {
      window.location.href = '/'; // Redirigir si no hay token
    } else {
      const fetchData = async () => {
        try {
          const fetchedProducts = await consultaProductos();
          const fetchedBrands = await consultaMarcas();
          const fetchedCategories = await consultaCategories();
          const fetchedMaterials = await consultaMaterials();
          const fetchedDiscounts = await consultaDescuentos();

          // Filtrar los datos para solo incluir los que no estén eliminados (isDeleted: false)
          const filteredBrands = fetchedBrands.filter(
            (brand) => !brand.isDeleted,
          );
          const filteredCategories = fetchedCategories.filter(
            (category) => !category.isDeleted,
          );
          const filteredMaterials = fetchedMaterials.filter(
            (material) => !material.isDeleted,
          );
          const filteredDiscounts = fetchedDiscounts.filter(
            (discount) => !discount.isDeleted,
          );

          setProducts(fetchedProducts);
          setBrands(filteredBrands); // Usar los datos filtrados
          setCategories(filteredCategories); // Usar los datos filtrados
          setMaterials(filteredMaterials); // Usar los datos filtrados
          setDiscounts(filteredDiscounts); // Usar los datos filtrados

          const brandMapping = {};
          filteredBrands.forEach((brand) => {
            brandMapping[brand.id] = brand.name;
          });
          setBrandMap(brandMapping);
        } catch (error) {
          console.error('Error al cargar datos:', error);
        }
      };

      fetchData();
    }
  }, []);

  const handleOpenInhabilitadosModal = async () => {
    const inhabilitados = await consultaProductosInhabilitados();
    setProductosInhabilitados(inhabilitados);
    setModalInhabilitadosIsOpen(true);
  };
  const handleHabilitar = async (id) => {
    // Encontramos el producto que estamos habilitando
    const productoHabilitado = productosInhabilitados.find(
      (product) => product.id === id,
    );

    // Si encontramos el producto, actualizamos su 'isdeleted' a false
    if (productoHabilitado) {
      productoHabilitado.isdeleted = false; // Actualizamos el atributo isdeleted

      try {
        // Hacer una llamada al servicio para habilitar el producto en el backend
        const success = await habilitarProducto(id); // Llamamos a la función habilitarProducto

        if (success) {
          // Actualizamos el estado de productos inhabilitados (lo eliminamos de la lista)
          setProductosInhabilitados((prevProductos) =>
            prevProductos.filter((product) => product.id !== id),
          );

          // Actualizamos el estado de productos habilitados, agregando el producto habilitado
          setProducts((prevProducts) => [...prevProducts, productoHabilitado]);

          // Notificación de éxito
          Swal.fire(
            '¡Producto Habilitado!',
            'El producto ha sido habilitado con éxito.',
            'success',
          );
        } else {
          Swal.fire(
            'Error',
            'No se pudo habilitar el producto en el backend.',
            'error',
          );
        }
      } catch (error) {
        console.error('Error al habilitar el producto:', error);
        Swal.fire('Error', 'Hubo un error al habilitar el producto.', 'error');
      }
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: '¿Confirma Deshabilitar?',
      text: '¡Esta acción la hará invisible en el listado!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Deshabilitar',
      cancelButtonText: 'Cancelar',
    });

    if (result.isConfirmed) {
      const success = await deshabilitarProducto(id);
      if (success) {
        setProducts(products.filter((product) => product.id !== id));
        Swal.fire(
          'Deshabilitado!',
          'El producto ha sido deshabilitado.',
          'success',
        );
      } else {
        Swal.fire('Error', 'No se pudo deshabilitar el producto.', 'error');
      }
    }
  };

  const handleEdit = async (product) => {
    const productDetails = await consultaProductoPorId(product.id);
    if (productDetails) {
      setNewProduct({
        ...productDetails,
        images: productDetails.images || [],
        deleteImages: [], // Resetear las imágenes a eliminar
        newImages: [], // Resetear las nuevas imágenes
      });
    }
    setModalIsOpen(true);
  };

  const handleAddOrEditProduct = async (e) => {
    e.preventDefault();

    // Validación básica de campos obligatorios
    if (
      !newProduct.name ||
      !newProduct.price ||
      !newProduct.stock ||
      !newProduct.categoryId ||
      !newProduct.brandId ||
      !newProduct.materialId
    ) {
      Swal.fire(
        'Error',
        'Por favor, complete todos los campos obligatorios.',
        'error',
      );
      return;
    }

    const productData = {
      name: newProduct.name,
      description: newProduct.description,
      price: parseFloat(newProduct.price),
      stock: parseInt(newProduct.stock, 10),
      categoryId: newProduct.categoryId,
      brandId: newProduct.brandId,
      materialId: newProduct.materialId,
      discountId: newProduct.discountId || null,
    };

    // Obtener el token desde localStorage
    const token = localStorage.getItem('adminToken'); // Asegúrate de usar la clave correcta

    // Verificar si el token existe
    if (!token) {
      Swal.fire(
        'Error',
        'No se encontró el token de autenticación. Por favor, inicia sesión.',
        'error',
      );
      window.location.href = '/login'; // Redirige al login si no hay token
      return;
    }

    try {
      let response;
      if (newProduct.id) {
        // Edición de producto
        response = await editarProducto(newProduct.id, productData);
        if (response) {
          setProducts(
            products.map((product) =>
              product.id === newProduct.id ? response : product,
            ),
          );
          Swal.fire('Éxito', 'Producto editado correctamente.', 'success');
        }
      } else {
        // Nuevo producto
        response = await agregarProducto(productData);
        if (response) {
          setProducts([...products, response]);
          Swal.fire('Éxito', 'Producto agregado correctamente.', 'success');
        }
      }

      // Subir nuevas imágenes (POST)
      if (newProduct.newImages.length > 0) {
        for (let i = 0; i < newProduct.newImages.length; i++) {
          const formData = new FormData();
          formData.append('image', newProduct.newImages[i]);

          const uploadUrl = `${import.meta.env.VITE_API_URL}/images/product/${newProduct.id || response.id}`;

          try {
            const uploadResponse = await axios.post(uploadUrl, formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`, // Incluir el token correctamente
              },
            });
            console.log(
              'Respuesta de la carga de imagen:',
              uploadResponse.data,
            );
          } catch (uploadError) {
            console.error(
              'Error al cargar la imagen:',
              uploadError.response || uploadError,
            );
            // Verificar si el error es por autenticación
            if (uploadError.response && uploadError.response.status === 401) {
              Swal.fire(
                'Error',
                'El token ha expirado. Por favor, inicia sesión nuevamente.',
                'error',
              );
              window.location.href = '/login'; // Redirigir al login
            } else {
              Swal.fire(
                'Error',
                'Hubo un error al subir la imagen. Revisa los permisos o la configuración del servidor.',
                'error',
              );
            }
          }
        }
      }

      // Eliminar imágenes antiguas (DELETE)
      if (newProduct.deleteImages.length > 0) {
        for (let i = 0; i < newProduct.deleteImages.length; i++) {
          const imageId = newProduct.deleteImages[i];

          try {
            const deleteUrl = `${import.meta.env.VITE_API_URL}/images/${imageId}`;

            // Incluir el token en las cabeceras de la solicitud DELETE
            await axios.delete(deleteUrl, {
              headers: {
                Authorization: `Bearer ${token}`, // Incluir el token correctamente
              },
            });
            console.log('Imagen eliminada:', imageId);
          } catch (deleteError) {
            console.error(
              'Error al eliminar la imagen:',
              deleteError.response || deleteError,
            );
            // Verificar si el error es por autenticación
            if (deleteError.response && deleteError.response.status === 401) {
              Swal.fire(
                'Error',
                'El token ha expirado. Por favor, inicia sesión nuevamente.',
                'error',
              );
              window.location.href = '/login'; // Redirigir al login
            } else {
              Swal.fire(
                'Error',
                'Hubo un error al eliminar la imagen. Revisa los permisos o la configuración del servidor.',
                'error',
              );
            }
          }
        }
        Swal.fire('Éxito', 'Imágenes eliminadas correctamente.', 'success');
      }

      // Cerrar el modal
      handleCloseModal();
    } catch (error) {
      console.error(
        'Error al agregar o editar el producto:',
        error.response || error,
      );
      // Manejar el error de autenticación si ocurre (como token expirado)
      if (error.response && error.response.status === 401) {
        Swal.fire(
          'Error',
          'El token ha expirado. Por favor, inicia sesión nuevamente.',
          'error',
        );
        window.location.href = '/login'; // Redirigir al login
      } else {
        Swal.fire(
          'Error',
          error.response?.data?.details[0]?.message ||
            'Ocurrió un error inesperado.',
          'error',
        );
      }
    }
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
      images: [],
      deleteImages: [],
      newImages: [],
      discountId: null,
    });
    setModalIsOpen(false);
  };

  const handleImageChange = (e) => {
    setNewProduct({
      ...newProduct,
      newImages: Array.from(e.target.files),
    });
  };

  const handleDeleteImage = (imageId) => {
    setNewProduct({
      ...newProduct,
      deleteImages: [...newProduct.deleteImages, imageId],
    });
  };

  // Aquí termina la parte del código antes del return

  return (
    <main className="container max-w-6xl mx-auto p-4 sm:p-6 md:p-8 lg:p-10">
      <h2 className="text-2xl font-bold mb-4 ml-4">Productos</h2>
      <button
        onClick={() => setModalIsOpen(true)}
        className="bg-blue-500 text-white py-2 px-4 rounded shadow mb-4"
      >
        Agregar Nuevo Producto
      </button>
      <button
        onClick={handleOpenInhabilitadosModal}
        className="bg-green-500 text-white py-2 px-4 rounded shadow mb-4 ml-4"
      >
        Habilitar Productos
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
          {/* Ordenar los productos por nombre alfabéticamente */}
          {products
            .sort((a, b) => a.name.localeCompare(b.name)) // Orden alfabético (A-Z)
            .map((product, index) => (
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
                    className="bg-yellow-500 text-white py-1 px-2 rounded mr-2"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="bg-red-500 text-white py-1 px-2 rounded"
                  >
                    Deshabilitar
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* Modal de agregar/editar producto */}
      <Modal isOpen={modalIsOpen} onRequestClose={handleCloseModal}>
        <h3 className="text-xl mb-2 mt-10">
          {newProduct.id ? 'Editar Producto' : 'Agregar Nuevo Producto'}
        </h3>
        <form onSubmit={handleAddOrEditProduct}>
          <div className="mb-4">
            <label htmlFor="name" className="block">
              Nombre
            </label>
            <input
              type="text"
              id="name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
              required
              className="border p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block">
              Descripción
            </label>
            <textarea
              id="description"
              value={newProduct.description}
              onChange={(e) =>
                setNewProduct({ ...newProduct, description: e.target.value })
              }
              className="border p-2 w-full"
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block">
              Precio
            </label>
            <input
              type="number"
              id="price"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
              required
              className="border p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="stock" className="block">
              Stock
            </label>
            <input
              type="number"
              id="stock"
              value={newProduct.stock}
              onChange={(e) =>
                setNewProduct({ ...newProduct, stock: e.target.value })
              }
              required
              className="border p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="category" className="block">
              Categoría
            </label>
            <select
              id="category"
              value={newProduct.categoryId}
              onChange={(e) =>
                setNewProduct({ ...newProduct, categoryId: e.target.value })
              }
              required
              className="border p-2 w-full"
            >
              <option value="">Selecciona una categoría</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="brand" className="block">
              Marca
            </label>
            <select
              id="brand"
              value={newProduct.brandId}
              onChange={(e) =>
                setNewProduct({ ...newProduct, brandId: e.target.value })
              }
              required
              className="border p-2 w-full"
            >
              <option value="">Selecciona una marca</option>
              {brands.map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="material" className="block">
              Material
            </label>
            <select
              id="material"
              value={newProduct.materialId}
              onChange={(e) =>
                setNewProduct({ ...newProduct, materialId: e.target.value })
              }
              required
              className="border p-2 w-full"
            >
              <option value="">Selecciona un material</option>
              {materials.map((material) => (
                <option key={material.id} value={material.id}>
                  {material.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="discount" className="block">
              Descuento
            </label>
            <select
              id="discount"
              value={newProduct.discountId || ''}
              onChange={(e) =>
                setNewProduct({ ...newProduct, discountId: e.target.value })
              }
              className="border p-2 w-full"
            >
              <option value="">Selecciona un descuento (opcional)</option>
              {discounts.map((discount) => (
                <option key={discount.id} value={discount.id}>
                  {discount.description}{' '}
                  {/* Usar description en lugar de name */}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="images" className="block">
              Imágenes
            </label>
            <input
              type="file"
              id="images"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="border p-2 w-full"
            />
            {newProduct.images.length > 0 && (
              <div className="mt-2">
                <h4>Imágenes seleccionadas:</h4>
                <ul>
                  {newProduct.images.map((image, index) => (
                    <li key={index}>
                      {image.name}
                      <button
                        type="button"
                        onClick={() => handleDeleteImage(image.id)}
                        className="text-red-500 ml-2"
                      >
                        Eliminar
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="mb-4 flex justify-between">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              {newProduct.id ? 'Guardar Cambios' : 'Agregar Producto'}
            </button>
            <button
              type="button"
              onClick={handleCloseModal}
              className="bg-gray-500 text-white py-2 px-4 rounded"
            >
              Cancelar
            </button>
          </div>
        </form>
      </Modal>

      {/* Modal de productos inhabilitados */}
      <Modal
        isOpen={modalInhabilitadosIsOpen}
        onRequestClose={() => setModalInhabilitadosIsOpen(false)}
      >
        <h3 className="text-xl mb-2 mt-10">Productos Inhabilitados</h3>
        <table className="min-w-full border">
          <thead>
            <tr>
              <th className="border p-2">Item</th>
              <th className="border p-2">Nombre</th>
              <th className="border p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productosInhabilitados.map((product, index) => (
              <tr key={product.id}>
                <td className="border p-2">{index + 1}</td>
                <td className="border p-2">{product.name}</td>
                <td className="border p-2">
                  <button
                    onClick={() => handleHabilitar(product.id)}
                    className="bg-green-500 text-white py-1 px-2 rounded"
                  >
                    Habilitar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          onClick={() => setModalInhabilitadosIsOpen(false)}
          className="mt-4 bg-gray-500 text-white py-2 px-4 rounded"
        >
          Cerrar
        </button>
      </Modal>
    </main>
  );
}

export default DashboardProducts;
