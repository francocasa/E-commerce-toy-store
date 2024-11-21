import { useState, useEffect } from 'react';
import {
  consultaProductos,
  agregarProducto,
  editarProducto,
  isProductNameDuplicated,
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
            'Token Inválido',
            'Tu sesión ha expirado o el token es inválido. Por favor, inicia sesión nuevamente.',
            'warning',
          );
        }
      } catch (error) {
        // Manejo del error si el token ha expirado (código 403)
        if (error.response && error.response.status === 403) {
          Swal.fire({
            icon: 'warning',
            title: 'Token Expirado',
            text: 'Tu sesión ha expirado. Por favor, inicia sesión nuevamente.',
          }).then(() => {
            localStorage.removeItem('adminToken'); // Eliminar el token expirado
            window.location.href = '/loginAdm'; // Redirigir al login de administrador
          });
        } else {
          // Manejo de otros errores
          console.error('Error al habilitar el producto:', error);
          Swal.fire(
            'Error',
            'Hubo un error al habilitar el producto.',
            'error',
          );
        }
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
      try {
        const success = await deshabilitarProducto(id);
        if (success) {
          setProducts(products.filter((product) => product.id !== id));
          Swal.fire(
            'Deshabilitado!',
            'El producto ha sido deshabilitado.',
            'success',
          );
        } else {
          Swal.fire(
            'Token Inválido',
            'Tu sesión ha expirado o el token es inválido. Por favor, inicia sesión nuevamente.',
            'warning',
          );
        }
      } catch (error) {
        if (error.response && error.response.status === 403) {
          // Si el error es 403 (token expirado)
          Swal.fire({
            icon: 'warning',
            title: 'Token Expirado',
            text: 'Tu sesión ha expirado. Por favor, inicia sesión nuevamente.',
          }).then(() => {});
        } else {
          // Manejar otros posibles errores
          console.error(
            'Error al deshabilitar el producto:',
            error.response || error,
          );
          Swal.fire('Error', 'Ocurrió un error inesperado.', 'error');
        }
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

  const handleDeleteImage = (imageId) => {
    setNewProduct({
      ...newProduct,
      deleteImages: [...newProduct.deleteImages, imageId], // Agregar la imagen a la lista de imágenes a eliminar
    });
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

    // Validación de nombre duplicado (solo si no se está editando el nombre)
    const isDuplicated = isProductNameDuplicated(
      newProduct.name,
      products,
      newProduct.id,
    );
    if (isDuplicated) {
      Swal.fire(
        'Error',
        'Ya existe un producto con ese nombre. Por favor, elija otro.',
        'error',
      );
      return;
    }

    // Preparar los datos del producto
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
    const token = localStorage.getItem('adminToken');
    if (!token) {
      Swal.fire(
        'Error',
        'No se encontró el token de autenticación. Por favor, inicia sesión.',
        'error',
      );
      window.location.href = '/loginAdm'; // Redirige al login si no hay token
      return;
    }

    try {
      let response;

      // Primero, editar o agregar el producto (dependiendo de si tiene un id)
      if (newProduct.id) {
        // Si estamos editando un producto, eliminamos la imagen antigua solo si hay una nueva imagen
        if (newProduct.newImages.length > 0 && newProduct.images.length > 0) {
          const imageId = newProduct.images[0].id; // Solo eliminamos la primera imagen

          // Eliminar la imagen anterior automáticamente
          const handleDeleteOldImage = async (imageId, token) => {
            const deleteUrl = `${import.meta.env.VITE_API_URL}/images/${imageId}`;
            try {
              await axios.delete(deleteUrl, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
              console.log('Imagen eliminada:', imageId);
            } catch (deleteError) {
              console.error(
                'Error al eliminar la imagen:',
                deleteError.response || deleteError,
              );
              Swal.fire(
                'Error',
                'Hubo un error al eliminar la imagen. Intenta nuevamente.',
                'error',
              );
            }
          };

          // Llamamos a la función de eliminación si hay una imagen nueva
          await handleDeleteOldImage(imageId, token);
        }

        // Proceder con la edición del producto
        try {
          let response;

          // Primero, intentamos editar el producto si tiene un ID
          if (newProduct.id) {
            response = await editarProducto(newProduct.id, productData);
            console.log('Respuesta al editar producto:', response); // Depuración

            if (response) {
              // Si la respuesta es exitosa, actualizamos la lista de productos
              setProducts(
                products.map((product) =>
                  product.id === newProduct.id ? response : product,
                ),
              );
              Swal.fire('Éxito', 'Producto editado correctamente.', 'success');
            } else {
              // Si no hubo respuesta o fue inválida
              Swal.fire(
                'Token Inválido',
                'Tu sesión ha expirado o el token es inválido. Por favor, inicia sesión nuevamente.',
                'warning',
              );
            }
          } else {
            // Si no tiene ID, agregamos un nuevo producto
            response = await agregarProducto(productData);
            console.log('Respuesta al agregar producto:', response); // Depuración

            if (response) {
              // Si la respuesta es exitosa, agregamos el nuevo producto a la lista
              setProducts([...products, response]);
              Swal.fire('Éxito', 'Producto agregado correctamente.', 'success');
            } else {
              // Si no hubo respuesta o fue inválida
              Swal.fire(
                'Error',
                'No se pudo agregar el producto. Inténtalo nuevamente.',
                'error',
              );
            }
          }
        } catch (error) {
          console.log('Error capturado:', error); // Depuración

          // Verifica si el error tiene una respuesta con status 403 (token expirado o inválido)
          if (error.response) {
            if (error.response.status === 403) {
              // Token expirado o inválido
              Swal.fire({
                icon: 'warning',
                title: 'Token Expirado o Inválido',
                text: 'Tu sesión ha expirado o el token es inválido. Por favor, inicia sesión nuevamente.',
              }).then(() => {
                localStorage.removeItem('adminToken'); // Eliminar el token inválido
                window.location.href = '/loginAdm'; // Redirigir al login
              });
            } else {
              // Manejo de otros códigos de error HTTP (ej. 500, 404)
              Swal.fire(
                'Error',
                `Error ${error.response.status}: ${error.response.data.message || 'Ocurrió un error.'}`,
                'error',
              );
            }
          } else {
            // Manejo de errores que no tienen una respuesta (por ejemplo, problemas de red)
            Swal.fire(
              'Error',
              'Hubo un problema de conexión o de red. Por favor, inténtalo nuevamente.',
              'error',
            );
          }
        }
      }

      // Subir nuevas imágenes si existen
      if (newProduct.newImages.length > 0) {
        for (let i = 0; i < newProduct.newImages.length; i++) {
          const formData = new FormData();
          formData.append('image', newProduct.newImages[i]);

          const uploadUrl = `${import.meta.env.VITE_API_URL}/images/product/${
            newProduct.id || response.id
          }`;

          try {
            const uploadResponse = await axios.post(uploadUrl, formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
              },
            });
            console.log('Imagen subida con éxito:', uploadResponse.data);
          } catch (uploadError) {
            console.error(
              'Error al cargar la imagen:',
              uploadError.response || uploadError,
            );
            Swal.fire(
              'Error',
              'Hubo un error al subir la imagen. Intenta nuevamente.',
              'error',
            );
          }
        }
      }

      handleCloseModal(); // Cerrar el modal
    } catch (error) {
      // Manejo de otros errores generales
      console.error(
        'Error al agregar o editar el producto:',
        error.response || error,
      );

      // Si el error es de tipo 403 (token expirado o inválido)
      if (error.response && error.response.status === 403) {
        Swal.fire({
          icon: 'warning',
          title: 'Token Expirado o Inválido',
          text: 'Tu sesión ha expirado o el token es inválido. Por favor, inicia sesión nuevamente.',
        }).then(() => {
          localStorage.removeItem('adminToken');
          window.location.href = '/loginAdm'; // Redirige al login
        });
      } else if (error.response && error.response.status === 400) {
        // Si el error es 400 (Bad Request), mostramos el mensaje de la API
        Swal.fire(
          'Error',
          error.response.data.message || 'Error de validación.',
          'error',
        );
      } else {
        // Error inesperado
        Swal.fire(
          'Error',
          'Ocurrió un error inesperado. Por favor, inténtalo nuevamente.',
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
            {newProduct.images.length > 0 && (
              <div className="mt-2">
                <h4>Imagen actual:</h4>
                <ul>
                  {newProduct.images.map((image, index) => {
                    const imageUrl = `${import.meta.env.VITE_IMAGES_URL}${image.url}`;
                    return (
                      <li key={index}>
                        <img
                          src={imageUrl}
                          alt={`Imagen ${index + 1}`}
                          className="w-32 h-32 object-cover mb-2" // Aquí ajustamos el ancho y el alto
                        />
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
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
            {productosInhabilitados
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((product, index) => (
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
