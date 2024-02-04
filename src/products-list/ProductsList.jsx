
import ProductCard from '../product-card/ProductCard'
import { useDispatch, useSelector } from 'react-redux';

import './ProductsList.scss'
import { ACTIONS } from '../myStore/productsReducer';
import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

export default function ProductList({ searchText, sortMethod, onOpenProductDetails, handleDisableAdd }) {

    const { id } = useParams();
    const productLinkParam = id
    const storeList = useSelector(store => store.products)
    const dispatch = useDispatch()
    const [currentPage, setCurrentPage] = useState(1);

    const onRemoveHandler = (id) => {
        dispatch({ type: ACTIONS.REMOVE, payload: { id } })
    }


    const paginate = ({ selected }) => {
        setCurrentPage(selected + 1);
    };


    const filteredSection = useMemo(() => {
        const regexText = new RegExp(searchText);
        return storeList.filter(item => regexText.test(item.title.toLowerCase()) || regexText.test(item.description.toLowerCase()))
    }, [searchText, storeList])



    const sortedFilterdArray = useMemo(() => {
        if (sortMethod === 'lowest')
            return filteredSection.sort((a, b) => a.price - b.price)

        if (sortMethod === 'price')
            return filteredSection.sort((a, b) => b.price - a.price)

        if (sortMethod === 'asc')
            return filteredSection.sort((a, b) => a.title.localeCompare(b.title))

        if (sortMethod === 'date')
            return filteredSection.sort((a, b) => a.startDate - b.startDate)

        if (sortMethod === 'date_des')
            return filteredSection.sort((a, b) => b.startDate - a.startDate)

        return filteredSection
    }, [sortMethod, searchText, storeList, filteredSection])


    const indexOfLastPost = currentPage * 5;
    const indexOfFirstPost = indexOfLastPost - 5;
    const currentPosts = sortedFilterdArray.slice(indexOfFirstPost, indexOfLastPost);

    if (productLinkParam) {
        const paramProduct = storeList.filter(item => item.id === Number(productLinkParam))
        if (paramProduct.length === 0)
            return <h1>NO Products with such id</h1>
        else return <ProductCard {...paramProduct[0]} handleDisableAdd={handleDisableAdd} onRemoveHandler={onRemoveHandler} onOpenProductDetails={onOpenProductDetails} />
    }

    return <div className='ProductList'>
        {currentPosts && currentPosts.length > 0 ?
            <>
                {currentPosts.map(item => <ProductCard key={'prod.' + item.id} {...item} handleDisableAdd={handleDisableAdd} onRemoveHandler={onRemoveHandler} onOpenProductDetails={onOpenProductDetails} />)}
                <ReactPaginate
                    onPageChange={paginate}
                    pageCount={Math.ceil(filteredSection.length / 5)}
                    previousLabel={'Prev'}
                    nextLabel={'Next'}
                    containerClassName={'pagination'}
                    pageLinkClassName={'page-number'}
                    previousLinkClassName={'page-number'}
                    nextLinkClassName={'page-number'}
                    activeLinkClassName={'active'}
                />
            </>
            : <h1>No Products Available</h1>
        }


    </div>
}