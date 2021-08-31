const initialState = {
  products:[],
  product:null
};

const productReducers = (state = initialState,action) => {
    switch (action.type){
        case "SET_PRODUCTS":
            return {...state,products: action.payload}
        case "SET_SELECTED_PRODUCT":
            return {...state,product: action.payload}
        case "REMOVE_SELECTED_PRODUCT":
            return {...state,product: null}
        default:
            return state;
    }
};

export {productReducers}