import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ConfirmModal from "../components/modals/confirmModal/confirmModal";
import NewModal from "../components/modals/modal";
import Product from "../components/Product";
import useModal from "../customHooks/useModal";
import {productActions,getProducts} from "../redux/action/getProduct";
import "./styles.css";


// const MOCK = [
//     {
//         title: "First product",
//         text: "Some text",
//         photo: "https://www.thenewsolutions.org/wp-content/uploads/2019/10/bmw-logo-248C3D90E6-seeklogo.com_.png"
//     },
//     {
//         title: "First product",
//         text: "Some text",
//         photo: "https://www.thenewsolutions.org/wp-content/uploads/2019/10/bmw-logo-248C3D90E6-seeklogo.com_.png"
//     },
//     {
//         title: "First product",
//         text: "Some text",
//         photo: "https://www.thenewsolutions.org/wp-content/uploads/2019/10/bmw-logo-248C3D90E6-seeklogo.com_.png"
//     }
   
// ]

const ProductPage = () => {
    const [modal, handleOpen, handleClose] = useModal()
    // const [modal,setModal]= useState(false)
    const [confirmModal,setConfirmModal] = useState(false)
    const list = useSelector(state => state.productList.list )
    const dispatch = useDispatch();
    console.log("LIST",list )
    const handleSave = (value) => {
        // dispatch(productActions.addproduct(value))
        dispatch(productActions.postProduct(value))
        closeModal()
    }
    
    useEffect(()=>{
        dispatch(getProducts())
    },[])
    // const showModal = () => setModal(true);
    const showConfirmModal = () => setConfirmModal(true);
    const closeConfirmModal = () => setConfirmModal(!setConfirmModal)
    const closeModal = () =>{
        // setModal(!showModal)
        closeConfirmModal()
    } 
 
    return (
        <>
        {modal && <NewModal onOpen={handleOpen} onClose={handleClose} onSave={handleSave}  />}
        {/* {confirmModal && <ConfirmModal isOpen={showConfirmModal} onClose={handleClose} onDelete={closeModal}/> } */}
        <div className="btn-container">
            <button onClick={handleOpen}>Add Product</button>
        </div>
        <div className="products-container">
           {list.map((item)=>(
               <Product value={item} />
           )
            )}
        </div>
        </>
    )
}

export default ProductPage