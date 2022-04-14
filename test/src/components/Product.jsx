import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {deleteProduct} from "../redux/action/getProductAction";
import ConfirmModal from "./modals/confirmModal/confirmModal";
import "./ProductStyles.css";

const Product = ({value, setCurrentItem, handleOpen,currentDate}) => {
    const [confirmModal, setConfirmModal] = useState(false);
    const {id, imageUrl, title, name,description,date} = value;
    const dispatch = useDispatch()
    const hendleDelete = () => {
        dispatch(deleteProduct(id))
        setConfirmModal(false)
    }
    const handleModal = () => {
        setCurrentItem(value);
        handleOpen();
    }
    return (
        <div className="product-container">
            <div className="content-container">
                <div className="img-container">
                    <img src={imageUrl}></img>
                </div>
                <div className="title-container">
                    <h2>{title}</h2>
                </div>
                <div>
                    <p>{name}</p>
                    <p>{description}</p>
                    <p>{date}</p>
                </div>
                <div className="btnContainer">
                    <button onClick={handleModal}>Edit</button>
                    <button onClick={()=>setConfirmModal(true)}>Delete</button>
                </div>
           </div>
           {confirmModal && <ConfirmModal onSubmit={hendleDelete} onCancel={()=>setConfirmModal(false)} />}
        </div>
    )
}

export default Product;