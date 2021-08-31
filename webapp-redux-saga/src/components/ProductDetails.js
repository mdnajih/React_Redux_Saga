import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {removeSelectedProduct} from "../redux/action/productsAction";

export default function ProductDetails(){
    const product = useSelector((state)=>state.productRedux.product);
    const dispatch = useDispatch();

    const {image,title,category,price,description} = !!product?product:"...Loading";

    useEffect(()=>{
        return ()=>{dispatch(removeSelectedProduct())}
    },[])
    return(
        <div className="container mt-5">
            <div className="row" >
                <div className="col col-6 px-5" >
                    <img src={image} alt="..." style={{width:"400px",height:"600px"}}/>
                </div>
                <div className="col">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title" style={{fontSize:"20px"}}>
                                {title}</h5>
                            <p className="card-text">
                                {description}
                            </p>
                            <h5>
                                ${price}
                            </h5>
                            <p className="card-text">
                                {category}
                            </p>
                            <button type="button" className="btn btn-primary btn-rounded">
                                <i className="fa fa-shopping-cart" aria-hidden="true" style={{paddingRight:"3px"}}/>
                                Add to Cart</button>
                            <button type="button" className="btn btn-warning btn-rounded">
                                Buy Now</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}