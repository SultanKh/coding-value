import { useState } from 'react';
import './App.scss';
import ProductDetails from './product-details/ProductDetails';
import ProductFilter from './product-filter/ProductFilter';
import ProductList from './products-list/ProductsList';

function App() {
  const [showAddProduct, setShowAddProduct] = useState(false)
  const [freeTextSearch, setFreeTextSearch] = useState('')
  const [sortMethod, setSortMethod] = useState('')
  const [updateValues, setUpdateValue] = useState()
  const [disableAdd, setDisableAdd] = useState(false)

  const onOpenProductDetails = (id, title, description, price) => {
    setShowAddProduct(true)
    setUpdateValue({ updateId: id, itemTitle: title, itemDescription: description, itemPrice: price })
  }



  const handleAfterUpdate = () => {
    setShowAddProduct(false)
    setUpdateValue(undefined)
  }

  const handleShowAddProduct = () => {
    if(showAddProduct && updateValues){
      setUpdateValue(undefined)
      setShowAddProduct(true)
    }
    else setShowAddProduct(state => !state)

  }

  const handleDisableAdd = (boolean) => {
    setDisableAdd(state => boolean)
  }
  return (
    <div className="App">
      <header className="App-header">
        Sultan Khalaily 050 2570 160
      </header>


      <div className='wrapper-2-columns'>
        <div className='left-column'>

          <div className='filter-section'>
            <ProductFilter disableAdd={disableAdd} setShowAddProduct={() => handleShowAddProduct()} setFreeTextSearch={setFreeTextSearch} setSortMethod={setSortMethod} sortMethod={sortMethod} />
          </div>
          <div className='product-list'>
            <ProductList searchText={freeTextSearch} onOpenProductDetails={onOpenProductDetails} sortMethod={sortMethod} handleDisableAdd={handleDisableAdd}/>
          </div>
        </div>
        <div className='right-column'>
          {showAddProduct ? updateValues ? <ProductDetails {...updateValues} handleAfterUpdate={handleAfterUpdate} handleDisableAdd={handleDisableAdd}/> : <ProductDetails handleAfterUpdate={handleAfterUpdate} handleDisableAdd={handleDisableAdd} /> : ''}
        </div>
      </div>
    </div>
  );
}

export default App;
