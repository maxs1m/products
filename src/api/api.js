import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://fakestoreapi.com/'
})

export const productsApi = {
  getProducts (count) {
    return instance.get(`products/?limit=${count}`).then(response => response.data)
  },

  addProduct (product) {
    return instance.post('products', { ...product }).then(response => response.data)
  },

  updateProduct (product, id) {
    return instance.put(`products/${id}`, { ...product }).then(response => response.data)
  },

  deleteProduct (id) {
    return instance.delete(`products/${id}`).then(response => response.data)
  }
}

export const authApi = {
  login (data) {
    return instance.post('auth/login', { ...data }).then(response => response.data)
  }
}
