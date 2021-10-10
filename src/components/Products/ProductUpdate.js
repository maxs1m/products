import React, { useEffect, useState } from 'react'
import { Field, Form } from 'react-final-form'
import { composeValidators, maxLength, minLength, requiredField } from '../../utilites/validators'
import { Link, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { updateProduct } from '../../store/productReducer'
import { compose } from 'redux'
import SweetAlert from 'react-bootstrap-sweetalert'
import Preloader from '../Common/Preloader'
import '../../App.css'

const ProductUpdate = (props) => {
  const [save, setSave] = useState(false)
  const [alert, setAlert] = useState(false)
  const [product, setProduct] = useState({})
  const productId = Number(props.match.params.productId)

  useEffect(() => {
    setProduct(props.create.find(item => item.id === productId))
  }, [])

  const onSubmit = (data) => {
    setProduct(data)
    setAlert(true)
  }

  if (save && !props.isFetching) return <Redirect to={'/product/' + productId}/>

  return <> {(props.isFetching
    ? <Preloader/>
    : <div className='productAdd__container'>
    <Link to={'/product/' + productId} className='btn__container_back'>
      <button className="waves-effect waves-light blue lighten-1 btn">Back</button>
    </Link>
    <Form
      onSubmit={onSubmit}
      initialValues={{
        ...product
      }}
      render={(props) => (
        <form onSubmit={props.handleSubmit} className='form'>
          <div className='productAdd__title'>Add product</div>
          <Field name="title" validate={composeValidators(requiredField, maxLength(30), minLength(2))}>
            {({ input, meta }) => (
              <div className='form__box'>
                <label className='form__label'>Title</label>
                <input {...input} type="text" placeholder='Enter title'/>
                {meta.error && meta.touched && <span className='form__error'>{meta.error}</span>}
              </div>
            )}
          </Field>
          <Field name="description" validate={composeValidators(requiredField, maxLength(300), minLength(10))}>
            {({ input, meta }) => (
              <div className='form__box'>
                <label className='form__label'>Description</label>
                <input {...input} type="text" placeholder='Enter description'/>
                {meta.error && meta.touched && <span className='form__error'>{meta.error}</span>}
              </div>
            )}
          </Field>
          <Field name="category" validate={composeValidators(requiredField, maxLength(30), minLength(2))}>
            {({ input, meta }) => (
              <div className='form__box'>
                <label className='form__label'>Category</label>
                <input {...input} type="text" placeholder='Enter category'/>
                {meta.error && meta.touched && <span className='form__error'>{meta.error}</span>}
              </div>
            )}
          </Field>
          <Field name="price" validate={requiredField}>
            {({ input, meta }) => (
              <div className='form__box'>
                <label className='form__label'>Price</label>
                <input {...input} type="number" placeholder='Enter price'/>
                {meta.error && meta.touched && <span className='form__error'>{meta.error}</span>}
              </div>
            )}
          </Field>
          <Field name='published' type="checkbox">
            {({ input }) => (
              <div className='form__box'>
                <label className='form__label'>
                  <input {...input} type="checkbox"/>
                  <span>Published</span>
                </label>
              </div>)}
          </Field>
          <div className='form__btn'>
            <button className="waves-effect waves-light blue lighten-1 btn" type='submit'>Submit</button>
          </div>
        </form>
      )}
    />
    {alert && <SweetAlert
      warning
      showCancel
      confirmBtnText="Yes"
      confirmBtnBsStyle="primary"
      cancelBtnBsStyle="default"
      title="Are you sure?"
      onConfirm={() => {
        props.updateProduct(product, productId)
        setSave(true)
      }}
      onCancel={() => setAlert(false)}
    >
      Do you want to save the changes?
    </SweetAlert>}
  </div>
  )} </>
}

const mapStateToProps = (state) => {
  return {
    create: state.products.productsCreate,
    isFetching: state.products.isFetching
  }
}

export default compose(connect(mapStateToProps, { updateProduct }), withRouter)(ProductUpdate)
