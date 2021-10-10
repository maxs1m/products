import React from 'react'
import { Field, Form } from 'react-final-form'
import { requiredField } from '../../utilites/validators'
import { connect } from 'react-redux'
import { getToken } from '../../store/productReducer'
import '../../App.css'

const Auth = (props) => {
  const onSubmit = (data) => {
    props.getToken(data)
  }

  return <div className='productAdd__container'>
      <Form
      onSubmit={onSubmit}
      initialValues={{
        username: 'johnd',
        password: 'm38rmF$'
      }}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <div className='productAdd__title'><p>Please login to see products</p> <p>(only this values)</p></div>
          <Field name="username" validate={requiredField}>
            {({ input, meta }) => (
              <div className='form__box'>
                <input {...input} type="text" placeholder='Enter name'/>
                {meta.error && meta.touched && <span className='form__error'>{meta.error}</span>}
              </div>
            )}
          </Field>
          <Field name="password" validate={requiredField}>
            {({ input, meta }) => (
              <div className='form__box'>
                <input {...input} type="password" placeholder='Enter password'/>
                {meta.error && meta.touched && <span className='form__error'>{meta.error}</span>}
              </div>
            )}
          </Field>
          <div className='form__btn'>
            <button className="waves-effect waves-light blue lighten-1 btn" type='submit'>Login</button>
          </div>
        </form>
      )}
    />
  </div>
}

export default connect(null, { getToken })(Auth)
