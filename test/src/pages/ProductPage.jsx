import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ConfirmModal from "../components/modals/confirmModal/confirmModal";
import ProductModal from "../components/modals/ProductModal/ProductModal";
import Product from "../components/Product";
import useModal from "../customHooks/useModal";
import {productActions,getProducts, postProduct, editProduct} from "../redux/action/getProductAction";
import "./styles.css";

const ProductPage = () => {
    const dispatch = useDispatch();
    const [confirmModal, setConfirmModal] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const [search, setSearch] = useState("");
    const list = useSelector(state => state.productList.list );
    const [modal, handleOpen, handleClose] = useModal();
    const handleSave = (value) => {
        dispatch(postProduct(value))
        setConfirmModal(!setConfirmModal);
    }
    const handleEdit = (data) => dispatch(editProduct(data));
    const handleSearch = (e) => setSearch(e.target.value);
    
    useEffect(()=>{
        dispatch(getProducts())
    },[]);
 
    return (
        <>
            {modal && <ProductModal
                onOpen={handleOpen}
                data={currentItem}
                onClose={handleClose}
                onSave={currentItem ? handleEdit : handleSave}
            />}
            <div className="btn-container">
                <button onClick={handleOpen}>Add Product</button>
            </div>
            <div className="search-container">
                <input type="text" placeholder="Search" onChange={handleSearch} />
            </div>
            <div className="products-container">
                {list.filter((item) => {
                    if (search === "" || item.name.toLowerCase().includes(search.toLowerCase())) {
                        return item;
                    }
                }).map((item)=>(
                    <Product
                        key={item.id}
                        value={item}
                        setCurrentItem={setCurrentItem}
                        handleOpen={handleOpen}
                    />
                ))}
            </div>
        </>
    )
}

export default ProductPage