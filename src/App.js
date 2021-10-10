import './App.css'
import React, { useEffect } from 'react'
import 'materialize-css/dist/css/materialize.min.css'
import { Redirect, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { getProducts } from './store/productReducer'
import Products from './components/Products/Products'
import Product from './components/Products/Product'
import ProductCreate from './components/Products/ProductCreate'
import ProductUpdate from './components/Products/ProductUpdate'
import Auth from './components/Auth/Auth'

function App (props) {
  useEffect(() => {
    props.getProducts()
  }, [])

  if (!props.token) return <Auth/>

  return (
    <div className="App">
      <Switch>
        <Route exact path='/'>
          <Redirect to='/products'/>
        </Route>
        <Route path='/products'>
          <Products />
        </Route>
        <Route exact path='/product/create'>
          <ProductCreate />
        </Route>
        <Route exact path='/product/edit:productId?'>
          <ProductUpdate />
        </Route>
        <Route path='/product/:productId?'>
         <Product />
        </Route>
        <Route path='*'>
          <div>404 not Found</div>
        </Route>
      </Switch>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    download: state.products.productsDownload,
    create: state.products.productsCreate,
    token: state.products.token
  }
}

export default connect(mapStateToProps, { getProducts })(App)
