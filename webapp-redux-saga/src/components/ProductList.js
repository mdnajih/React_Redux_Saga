import React, {useEffect} from "react";
import ProductComponent from "./ProductComponent";
import {useDispatch, useSelector} from "react-redux";
import {getApiData} from "../redux/saga/apiSaga";

export default function ProductList() {
    const products = useSelector((state)=>state.productRedux.products);
    const dispatch = useDispatch();

    useEffect(()=>{
        let data = {
            tcd:"GET_PRODUCTS",
            method:"GET"
        }
        dispatch(getApiData(data))
    },[])

    return(
        <div className="container">
            <ProductComponent/>
        </div>
    )
}