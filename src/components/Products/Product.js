import React, { useEffect, useState } from 'react'
import '../../App.css'
import { Link, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { deleteProduct } from '../../store/productReducer'
import SweetAlert from 'react-bootstrap-sweetalert'

const Product = (props) => {
  const [product, setProduct] = useState({})
  const [del, setDel] = useState(false)
  const productId = Number(props.match.params.productId)

  useEffect(() => {
    if (productId > 20) setProduct(props.create.find(item => item.id === productId))
    else setProduct(props.download.find(item => item.id === productId))
  })

  const deleteProduct = () => {
    props.deleteProduct(productId)
  }

  if (!product) return <Redirect to='/products'/>

  return <div className='product__info_large'>
      <Link to="/products" className='btn__container_back'>
        <button className="waves-effect waves-light blue lighten-1 btn">Back</button>
      </Link>
      <div className='productImage__container_large'>
        <img src={product.image} alt='image' className='productImage'/>
      </div>
      <div className='product__description'>
        <span>{product.title}</span>
        <span>Category: {product.category}</span>
        <span>{product.description}</span>
        <span>{product.price}$</span>
      </div>
    {productId > 20 && <div className='btn__container_edit_delete'>
      <Link to={'/product/edit' + productId}>
        <button className="waves-effect waves-light blue lighten-1 btn">Edit</button>
      </Link>
     <div>
        <button className="waves-effect waves-light blue lighten-1 btn" onClick={() => setDel(true)}>Delete</button>
      </div>
    </div>}
    {del && <SweetAlert
      warning
      showCancel
      confirmBtnText="Yes, delete it!"
      confirmBtnBsStyle="danger"
      cancelBtnBsStyle="default"
      title="Are you sure?"
      onConfirm={() => deleteProduct()}
      onCancel={() => setDel(false)}
    >
      You will not be able to recover this product!
    </SweetAlert>
    }
  </div>
}

const mapStateToProps = (state) => {
  return {
    download: state.products.productsDownload,
    create: state.products.productsCreate
  }
}

export default compose(connect(mapStateToProps, { deleteProduct }), withRouter)(Product)
