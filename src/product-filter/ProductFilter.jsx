
import './ProductFilter.scss'
import ProductSort from '../product-sort/ProductSort'
import { useState } from 'react'
export default function ProductFilter({ setShowAddProduct, setFreeTextSearch, setSortMethod, sortMethod, disableAdd }) {

    const [AddMode, setAddMode] = useState(true)
    return <div className="ProductFilter">
        <div className='new-product'>
            <button disabled={disableAdd} onClick={() => { setShowAddProduct(); setAddMode(state => !state) }}>{AddMode ? '+ADD' : 'HIDE'}</button>
        </div>
        <div className='input-wrapper'>
            <input className='free-text' placeholder='search...' type='text' onChange={(e) => { setFreeTextSearch(e.target.value) }} />
        </div>

        <div className='product-sort'>

            <h2>Sort By</h2>
            <ProductSort setSortMethod={setSortMethod} sortMethod={sortMethod}/>
        </div>
    </div>
}