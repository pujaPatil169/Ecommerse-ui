const BASE_URL = 'https://api.escuelajs.co/api/v1';

const orderApi = {
  async createOrder(orderData) {
    const response = await fetch(`${BASE_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(orderData)
    });

    if (!response.ok) {
      throw new Error('Failed to create order');
    }

    return await response.json();
  },

  async getOrder(orderId) {
    const response = await fetch(`${BASE_URL}/orders/${orderId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch order');
    }

    return await response.json();
  },

  async getOrders() {
    const response = await fetch(`${BASE_URL}/orders`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch orders');
    }

    return await response.json();
  }
};

export default orderApi;
