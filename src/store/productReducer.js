import { authApi, productsApi } from '../api/api'

const SET = 'SET'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
const TOGGLE_TAB = 'TOGGLE_TAB'
const ADD_PRODUCT = 'ADD_PRODUCT'
const SET_TOKEN = 'SET_TOKEN'

const initialState = {
  productsDownload: [],
  productsCreate: [],
  isFetching: false,
  viewTab: 'download',
  token: ''
}

const productReducers = (state = initialState, action) => {
  switch (action.type) {
    case SET:
      return {
        ...state,
        productsDownload: [...action.download],
        productsCreate: [...action.create]
      }
    case TOGGLE_IS_FETCHING:
      return { ...state, isFetching: action.isFetching }
    case TOGGLE_TAB:
      return { ...state, viewTab: action.tab }
    case SET_TOKEN:
      return { ...state, token: action.token }
    case ADD_PRODUCT:
      return { ...state, productsCreate: action.sessionMass }
    default:
      return state
  }
}

const setProducts = (download, create) => ({ type: SET, download, create })
export const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching })
export const toggleTab = (tab) => ({ type: TOGGLE_TAB, tab })
export const setToken = (token) => ({ type: SET_TOKEN, token })
const addProductToState = (sessionMass) => ({ type: ADD_PRODUCT, sessionMass })

const sessionFromLS = () => JSON.parse(localStorage.getItem('session'))

export const getProducts = (count = 8) => {
  return async (dispatch) => {
    dispatch(toggleIsFetching(true))
    const download = await productsApi.getProducts(count)
    const create = sessionFromLS() || []
    dispatch(setProducts(download, create.slice(0, count)))
    dispatch(toggleIsFetching(false))
  }
}

const sendStateToLS = (dispatch, sessionMass) => {
  localStorage.session = JSON.stringify(sessionMass)
  sessionMass = JSON.parse(localStorage.getItem('session'))
  dispatch(addProductToState(sessionMass))
  dispatch(toggleIsFetching(false))
}

export const saveProductsOnLS = (formData) => {
  return async (dispatch, getState) => {
    dispatch(toggleIsFetching(true))
    const id = getState().products.productsCreate.length + 21
    const date = Date.now()
    const image = 'https://cn-exclusive.by/wp-content/uploads/2021/04/no-foto-2-1536x1024.jpg'
    const published = formData.published || false
    delete formData.published
    const product = { ...formData, image }
    const data = await productsApi.addProduct(product)
    const sessionMass = sessionFromLS() || []
    sessionMass.push({ ...data, date, published, id })
    sendStateToLS(dispatch, sessionMass)
  }
}

export const updateProduct = (formData, id) => {
  return async (dispatch, getState) => {
    dispatch(toggleIsFetching(true))
    const image = getState().products.productsCreate.find(item => item.id === id).image
    const date = Date.now()
    const published = formData.published
    delete formData.published
    const product = { ...formData, image }
    const data = await productsApi.updateProduct(product, id)
    const sessionMass = sessionFromLS()
    const products = sessionMass.map(item => {
      if (item.id === id) {
        return { ...item, ...data, date, published, id }
      }
      return item
    })
    sendStateToLS(dispatch, products)
  }
}

export const deleteProduct = (id) => {
  return async (dispatch) => {
    dispatch(toggleIsFetching(true))
    const data = await productsApi.deleteProduct(id)
    console.log(data)
    const sessionMass = sessionFromLS()
    sessionMass.splice(sessionMass.findIndex(item => item.id === id), 1)
    for (let index = id; index <= sessionMass.length; index++) {
      sessionMass[index - 1].id = index
    }
    sendStateToLS(dispatch, sessionMass)
  }
}

export const getToken = (profile) => {
  return async (dispatch) => {
    dispatch(toggleIsFetching(true))
    const data = await authApi.login(profile)
    dispatch(setToken(data))
    dispatch(toggleIsFetching(false))
  }
}

export default productReducers
