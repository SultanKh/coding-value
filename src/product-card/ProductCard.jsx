

import './ProductCard.scss'
export default function ProductCard({ id, title, description, price, onRemoveHandler, onOpenProductDetails, handleDisableAdd }) {


    return <div className='ProductCard' >
        <div className="image">
            <img src="https://images.unsplash.com/photo-1532010940201-c31e6beacd39?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Card Flower" />
        </div>
        <div className="content" onClick={() => { onOpenProductDetails(id, title, description, price); handleDisableAdd(true) }}>
            <h2 className="title">{title}</h2>
            <p className="description">{description}</p>
            <span>{price} $</span>
        </div>
        <button className="button" onClick={() => onRemoveHandler(id)}>Remove</button>
    </div>
}