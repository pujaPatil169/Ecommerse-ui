const BASE_URL = 'https://api.escuelajs.co/api/v1';

export const getProducts = async () => {
  try {
    const response = await fetch(`${BASE_URL}/products`);
    if (!response.ok) throw new Error('Failed to fetch products');
    console.log(response)
    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const getProductsByCategory = async (categoryId) => {
  try {
    const response = await fetch(`${BASE_URL}/categories/${categoryId}/products`);
    if (!response.ok) throw new Error('Failed to fetch category products');
    return await response.json();
  } catch (error) {
    console.error('Error fetching category products:', error);
    throw error;
  }
};

export const getCategories = async () => {
  try {
    const response = await fetch(`${BASE_URL}/categories`);
    if (!response.ok) throw new Error('Failed to fetch categories');
    return await response.json();
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

export const getProductById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/products/${id}`);
    if (!response.ok) throw new Error('Failed to fetch product');
    return await response.json();
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};
