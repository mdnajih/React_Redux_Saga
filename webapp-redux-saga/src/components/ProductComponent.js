import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {getApiData} from "../redux/saga/apiSaga";

export default function ProductComponent() {
    const products = useSelector((state)=>state.productRedux.products);
    const dispatch = useDispatch();

    return(
        <div className="row">

            {
                products.map((product,index) => {
                        const {id,image,title,price,category} = product
                        const selectHandler = () => {
                            let data = {
                                tcd:"GET_PRODUCT_BY_ID",
                                method:"GET",
                                tmg:{"id":id}
                            }
                            dispatch(getApiData(data))
                        };
                        return (
                            <div className="col col-sm-3 mt-4">
                                <Link className={`links`} to={{pathname:`/product/${id}`}} onClick={selectHandler}>
                                <div key={index} className="card mb-5">
                                    <div className="image">
                                        <img src={image}
                                             className="rounded mx-auto d-block"
                                             alt="..." style={{width:"150px",height:"200px"}}/>
                                    </div>
                                    <div className="card-body">
                                        <h5 className="card-title" style={{fontSize:"20px",height:"80px"}}>
                                            {`${title.substring(0,50)}...`}</h5>
                                        <h5>
                                            ${price}
                                        </h5>
                                        <p className="card-text">
                                            {category}
                                        </p>
                                    </div>
                                </div>
                                </Link>
                            </div>
                        )
                    }

                )
            }


        </div>
    )
}