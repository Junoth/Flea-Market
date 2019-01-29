import { GET_ITEM, GET_CURRENT_ITEMS, GET_ITEMS, GET_AMOUNT, GET_PAGE } from '../actions/types';

const initialState = {
  item: {},
  currentitems: [],
  items: [],
  amount: 1,
  page: 1
};

export default function itemReducers(state = initialState, action) {
  switch(action.type) {
    case GET_ITEM:
      return {
        ...state,
        item: action.payload
      }
    case GET_CURRENT_ITEMS:
      return {
        ...state,
        currentitems: action.payload
      }
    case GET_ITEMS:
      return {
        ...state,
        items: action.payload
      }
    case GET_AMOUNT:
      return {
        ...state,
        amount: action.payload
      }
    case GET_PAGE:
      return {
        ...state,
        page: action.payload
      }
    default:
      return state;
  }
}

