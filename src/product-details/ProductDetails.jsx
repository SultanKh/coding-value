
import { useEffect, useState } from 'react'
import './ProductDetails.scss'
import { useDispatch } from 'react-redux'
import { ACTIONS } from '../myStore/productsReducer'
import { isNumber, validateName } from '../utlis/validations'
export default function ProductDetails({ updateId, itemTitle, itemDescription, itemPrice, handleAfterUpdate, handleDisableAdd }) {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')


    useEffect(() => {
        itemTitle && setTitle(itemTitle)
        itemDescription && setDescription(itemDescription)
        itemPrice && setPrice(itemPrice)
    }, [updateId, itemTitle, itemDescription, itemPrice])


    const [disableButton, setDisableButton] = useState(false)


    useEffect(() => {
        const isValid = isNumber(price) && Number(price) > 0
        const isTitleValid = title && title.length > 0 && validateName(title)
        const isTextAreaValid = description && description.length > 0
        setDisableButton(!isValid || !isTitleValid || !isTextAreaValid)
    }, [title, description, price])


    const dispatch = useDispatch()
    const addProductToList = (title, description, price) => {
        dispatch({ type: ACTIONS.ADD, payload: { title, description, price } })
        setTitle('')
        setDescription('')
        setPrice('')
        handleAfterUpdate()
    }

    const updateItem = (updateId, title, description, price) => {
        dispatch({ type: ACTIONS.UPDATE, payload: { id: updateId, title, description, price } })
        setTitle('')
        setDescription('')
        setPrice('')
        handleAfterUpdate()
    }

    const handleOnClick = () => {

        updateId ? updateItem(updateId, title, description, price)
            : addProductToList(title, description, price)

        handleDisableAdd(false)
    }

    return <div className='ProductDetails'>
        <h2 className='title'>Product Details</h2>

        <div className='image'>
            <img src="https://images.unsplash.com/photo-1532010940201-c31e6beacd39?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="a flower display" />
        </div>
        <div className='input-name'>
            <h3>Title</h3>
            <input className='input-name' type='text' value={title} onChange={e => setTitle(e.target.value)} />
        </div>
        <div className='input-desc'>
            <h3>Description:</h3>
            <textarea id="description" name="story" rows="5" cols="33" placeholder='...' value={description} onChange={e => setDescription(e.target.value)} />
        </div>

        <div className='input-price'>
            <h3>price:</h3>

            <input id="price" type='text' placeholder='0:00' name="price" value={price} onChange={e => setPrice(e.target.value)} />
            <i>$</i>
        </div>

        <div className='product-price'>
            <button disabled={disableButton} onClick={() => handleOnClick()}>SAVE</button>
        </div>

    </div>
}