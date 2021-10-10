import React from 'react'
import '../../App.css'
import { Link } from 'react-router-dom'

const ProductCard = (props) => {
  return <Link to={'/product/' + props.product.id} className='product__container'>
      <div className='productImage__container'>
        <img src={props.product.image} alt='image' className='productImage'/>
      </div>
      <div className='product__info_short'>
        <span>{props.product.title}</span>
        <span>{props.product.price}$</span>
      </div>
    </Link>
}

export default ProductCard
