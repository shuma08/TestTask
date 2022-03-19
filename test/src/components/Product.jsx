import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {productActions,deleteProduct} from "../redux/action/getProduct";
import NewModal from "./modals/modal";
import ConfirmModal from "./modals/confirmModal/confirmModal";
import useModal from "../customHooks/useModal";
import "./ProductStyles.css";

const Product = ({value}) => {
    const [modal, handleOpen, handleClose] = useModal()
    const [confirmModal,setConfirmModal] = useState(false);
    const {id} = value;
    const dispatch = useDispatch()
    const hendleDelete = () => {
        dispatch(deleteProduct(id))
        setConfirmModal(false)
        console.log("delete")
    }
    const handleSave = (value) => {
        dispatch(productActions.editProduct(value))
        // closeModal()
    }
    return (
        <div className="product-container">
            <div className="content-container">
            <div className="img-container">
                <img src={value?.imageUrl}></img>
            </div>
            <div>
                <h2>{value?.name}</h2>
            </div>
            <p>Number of items {value?.count}</p>
            <div className="btnContainer">
            <button onClick={handleOpen}>Edit</button>
            <button onClick={()=>setConfirmModal(true) } > Delete</button>
            </div>
           </div>
           {modal && <NewModal onOpen={handleOpen} data={value} onClose={handleClose} onSave={handleSave}  />}
           {confirmModal && <ConfirmModal onSubmit={hendleDelete} onCancel={()=>setConfirmModal(false)} />}
        </div>
    )
}

export default Product;