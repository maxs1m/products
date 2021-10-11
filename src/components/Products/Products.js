import React, { useEffect, useState } from 'react'
import '../../App.css'
import { connect } from 'react-redux'
import ProductCard from './ProductCard'
import { getProducts, toggleTab } from '../../store/productReducer'
import { Link } from 'react-router-dom'
import Preloader from '../Common/Preloader'

const Products = (props) => {
  const [products, setProducts] = useState([])
  const [release, setRelease] = useState(false)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('')
  const [option, setOption] = useState([])
  const [sort, setSort] = useState('')

  useEffect(() => {
    switch (props.tab) {
      case 'download':
        setProducts(props.download)
        break
      case 'create':
        setProducts(props.create.filter(item => item.published === release))
        break
    }
    setFilter('')
    setSort('')
  }, [props.tab, props.create])

  useEffect(() => {
    setOption((Array.from(new Set(products.map(item => item.category)))))
  }, [products])

  const toggleRelease = () => {
    setRelease(!release)
    setProducts(props.create.filter(item => item.published === !release))
  }

  const addSort = (params) => {
    const copy = Object.assign([], products)
    switch (params) {
      case 'priceUp':
        setProducts(copy.sort((prev, next) => prev.price - next.price))
        setSort('Price up')
        break
      case 'priceDown':
        setProducts(copy.sort((prev, next) => next.price - prev.price))
        setSort('Price down')
        break
      case 'titleUp':
        // eslint-disable-next-line array-callback-return
        setProducts(copy.sort((prev, next) => {
          if (prev.title < next.title) return -1
          if (prev.title > next.title) return 1
        }))
        setSort('Title up')
        break
      case 'titleDown':
        // eslint-disable-next-line array-callback-return
        setProducts(copy.sort((prev, next) => {
          if (prev.title < next.title) return 1
          if (prev.title > next.title) return -1
        }))
        setSort('Title down')
        break
    }
  }

  if (props.isFetching) return <Preloader/>

  return (<>
    <div className='products__container'>
      {products.length === 0 && <div>There are no products</div>}
      <div className='btn__container_switch'>
        <button
          className="waves-effect waves-light blue lighten-1 btn"
          onClick={() => props.toggleTab('download')}>
          Downloaded products
        </button>
        <button
          className="waves-effect waves-light blue lighten-1 btn"
          onClick={() => props.toggleTab('create')}>
          Created products
        </button>
        {props.tab === 'create' && <div className="switch">
          <label>
            Not published
            <input type="checkbox" onChange={toggleRelease}/>
              <span className="lever"/>
            Published
          </label>
        </div>}
      </div>
      <div className='search'>
        <input value={search}
               type="text"
               onChange={(event) => setSearch(event.target.value)}
               placeholder='Searching by title'/>
      </div>
      <div className='filter'>
        <select
          onChange={(event) => {
            setFilter(event.nativeEvent.target.value)
          }}
          value={filter}
          className="browser-default">
          <option value=''>Filter by</option>
          {option.map((option, index) =>
            <option key={index} value={option}>
              {option}
            </option>
          )}
        </select>
      </div>
      <div className='sort'>
        <select
          onChange={(event) => {
            addSort(event.nativeEvent.target.value)
          }}
          value={sort}
          className="browser-default">
          <option value='' disabled>Sort</option>
          <option value='titleUp'>Title up</option>
          <option value='titleDown'>Title down</option>
          <option value='priceUp'>Price up</option>
          <option value='priceDown'>Price down</option>
        </select>
      </div>
      <Link to='/product/create' className='btn__container_add'>
        <button className="waves-effect waves-light blue lighten-1 btn">Add Product</button>
      </Link>
      {products
        .filter(product => product.title.toLowerCase().indexOf(search.toLowerCase()) >= 0)
        .filter(product => product.category.toLowerCase().indexOf(filter.toLowerCase()) >= 0)
        .map(product => <ProductCard product={product} key={product.id}/>)}
      <div className='btn__container_count'>
        {(products.length !== 8 && (props.tab === 'download' || (props.tab === 'create' && props.create.length > 8))) &&
          <button className="waves-effect waves-light blue lighten-1 btn" onClick={() => props.getProducts()}>
            Download 8 items
          </button>
        }
        {(products.length !== 16 && (props.tab === 'download' || (props.tab === 'create' && props.create.length > 16))) &&
          <button className="waves-effect waves-light blue lighten-1 btn" onClick={() => props.getProducts(16)}>
            Download 16 items
          </button>
        }
        {(products.length !== 20 && (props.tab === 'download' || (props.tab === 'create' && props.create.length > 20))) &&
          <button className="waves-effect waves-light blue lighten-1 btn" onClick={() => props.getProducts(20)}>
            Download 20 items
          </button>
        }
      </div>
    </div>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    download: state.products.productsDownload,
    create: state.products.productsCreate,
    tab: state.products.viewTab,
    isFetching: state.products.isFetching
  }
}

export default connect(mapStateToProps, { getProducts, toggleTab })(Products)
