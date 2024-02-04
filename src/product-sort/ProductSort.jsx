
import './ProductSort.scss'
export default function ProductSort({ sortMethod, setSortMethod }) {
    return <div className="ProductSort">
        <select id="dropdown" value={sortMethod} onChange={e => setSortMethod(e.target.value)}>
            <option value="All">All</option>
            <option value="price">Price (High first)</option>
            <option value="lowest">Price (lowest first)</option>
            <option value="asc">Asc (a-b)</option>
            <option value="date">Date (start date)</option>
            <option value="date_des">Date (earliest)</option>
        </select>
        <div className="select-box">
            <span>{sortMethod ? sortMethod : 'Select an option'}</span>
            <i className="arrow-down"></i>
        </div>
    </div>
}