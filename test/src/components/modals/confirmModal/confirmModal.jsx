import React from "react";
import "./style.css";
const ConfirmModal = ({onSubmit,onCancel})=> {

    return(
       <div className="confirm-modal-container">
         <h4>Are you sure ?</h4>
         <div className="btnContainer">
          <button onClick={onSubmit}>Delete</button>
          <button onClick={onCancel}>Cancel</button>
         </div>
       </div>
    )
}
export default ConfirmModal;