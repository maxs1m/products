import React, { useState } from 'react'
import { Field, Form } from 'react-final-form'
import { composeValidators, maxLength, minLength, requiredField } from '../../utilites/validators'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { saveProductsOnLS } from '../../store/productReducer'
import Preloader from '../Common/Preloader'
import '../../App.css'

const ProductCreate = (props) => {
  const [save, setSave] = useState(false)

  const onSubmit = (profile) => {
    props.saveProductsOnLS(profile)
    setSave(true)
  }

  if (save && !props.isFetching) return <Redirect to='/products'/>

  return <> {(props.isFetching
    ? <Preloader/>
    : <div className='productAdd__container'>
    <Link to="/products" className='btn__container_back'>
      <button className="waves-effect waves-light blue lighten-1 btn">Back</button>
    </Link>
    <Form
      onSubmit={onSubmit}
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
  </div>
  )}</>
}

const mapStateToProps = (state) => {
  return {
    isFetching: state.products.isFetching
  }
}

export default connect(mapStateToProps, { saveProductsOnLS })(ProductCreate)
