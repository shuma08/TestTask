import React, { useState } from "react";
import { Modal,Button,Form} from 'rsuite';
import "./style.css";

const initialFormValue = {
  name:"",
  count:0,
  imageUrl:""
}
const NewModal = ({onOpen,onClose,onSave,data=initialFormValue}) => {
  //  const [formValue, setFormValue] = useState({
  //      name:"",
  //      count:0,
  //      imageUrl:""
  //  })
   const [formValue, setFormValue] = useState(data);

   const handleSubmit = () => {
       onSave(formValue)
       onClose()
       console.log(formValue)
   }
  const handleChange = (event) => {setFormValue({...formValue, [event.target.name]: event.target.value})}

   return (
      <div className="modal-container">
         <Modal className="custom-modal" open={onOpen} onClose={onClose}>
        <h4>Modal Title</h4>
        <div className="input-container">
          <label for="name"> Name</label>
          <input name="name" type="text" value={formValue.name} onChange={handleChange} />
          <label for="count"> Count</label>
          <input name="count" type="text" value={formValue.count} onChange={handleChange}/>
          <label for="img">Paste imgUrl</label>
          <input name="img" type="text" value={formValue.imageUrl} onChange={handleChange} />
        </div>
         <div className="btnContainer">
         <button onClick={handleSubmit} appearance="primary">
            Ok
          </button>
          <button onClick={onClose} appearance="subtle">
            Cancel
          </button>
         </div>
      </Modal>
    </div>
   )
}
export default NewModal;