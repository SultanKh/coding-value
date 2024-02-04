import { PRODUCTS } from "../data-mock";


export const ACTIONS = {
  ADD: 'ADD_PRODUCT',
  REMOVE: 'REMOVE_PRODUCT',
  UPDATE: 'UPDATE_PRODUCT'
}
const initialState = {
  products: PRODUCTS,
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_PRODUCT':
      const newItem = {
        ...action.payload,
        id: Math.floor(Math.random() * 10000),
        startDate: new Date(),
        image:
          'https://upload.wikimedia.org/wikipedia/commons/f/f9/Phoenicopterus_ruber_in_S%C3%A3o_Paulo_Zoo.jpg',
      };
      return {
        ...state,
        products: [newItem, ...state.products],
      };
    case 'REMOVE_PRODUCT':
      return {
        ...state,
        products: [
          ...state.products.filter((prod) => prod.id !== action.payload.id),
        ],
      };
    case 'UPDATE_PRODUCT':

      return {

        ...state,
        products: [
          ...state.products.map((item) => {
            if (item.id !== action.payload.id) {
              // This isn't the item we care about - keep it as-is
              return item;
            }
            // Otherwise, this is the one we want - return an updated value
            return {
              ...item,
              ...action.payload,
            };
          }),
        ],
      };

    default:
      return state;
  }
};

export default productsReducer;