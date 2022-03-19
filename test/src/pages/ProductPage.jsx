import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ConfirmModal from "../components/modals/confirmModal/confirmModal";
import NewModal from "../components/modals/modal";
import ProductModal from "../components/modals/ProductModal/ProductModal";
import Product from "../components/Product";
import useModal from "../customHooks/useModal";
import {productActions,getProducts} from "../redux/action/getProductAction";
import "./styles.css";

const ProductPage = () => {
    const [modal, handleOpen, handleClose] = useModal()
    const [confirmModal,setConfirmModal] = useState(false)
    const list = useSelector(state => state.productList.list )
    const dispatch = useDispatch();
    const handleSave = () => {
        closeModal()
    }
    
    useEffect(()=>{
        dispatch(getProducts())
    },[])
    const closeConfirmModal = () => setConfirmModal(!setConfirmModal)
    const closeModal = () => closeConfirmModal()
 
    return (
        <>
        {modal && <ProductModal onOpen={handleOpen} onClose={handleClose} onSave={handleSave}/>}
        <div className="btn-container">
            <button onClick={handleOpen}>Add Product</button>
        </div>
        <div className="products-container">
           {list.map((item)=>(
               <Product key={item.id} value={item} />
           )
            )}
        </div>
        </>
    )
}

export default ProductPage