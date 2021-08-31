const setProducts = (products) =>{
    return{
        type:"SET_PRODUCTS",
        payload:products
    }
}

const setSelectedProduct = (product) =>{
    return{
        type:"SET_SELECTED_PRODUCT",
        payload:product
    }
}

const removeSelectedProduct = () =>{
    return{
        type:"REMOVE_SELECTED_PRODUCT"
    }
}

export {setProducts,setSelectedProduct,removeSelectedProduct}