import React, { useState, useRef,useEffect} from "react";
import { useDispatch } from "react-redux";
import useModal from "../../customHooks/useModal";
import { postProduct } from "../../redux/action/getProductAction";
import { Modal,Button,Form,Schema} from 'rsuite';
import "./style.css";


const { StringType, DateType } = Schema.Types;
const model = Schema.Model({
  name: StringType().isRequired("This field is required."),
  count: StringType().isRequired("This field is required."),
});

const initialFormValue = {
  name:"",
  count:"",
  imageUrl:""
}
const NewModal = ({onOpen,onClose,onSave,data=initialFormValue}) => {
  const [formValue, setFormValue] = useState(data);
  const dispatch = useDispatch();
  const [modal, handleOpen, handleClose] = useModal()
  const formRef = useRef();
  const handleSubmit = () => {
    handleClose()
    onClose();
    onSave(dispatch(postProduct(formValue)));
  };
   const handleChange = (event) => {setFormValue({...formValue, [event.target.name]: event.target.value})}
   return (
      <div className="modal-container">
        <Modal className="custom-modal" open={onOpen} onClose={onClose}>
          <Form ref={formRef} model={model} >
            <h4>Modal Title</h4>
            <div className="input-container">
              <label htmlFor="name"> Name</label>
              <input name="name" type="text" value={formValue.name} onChange={handleChange} />
              <label htmlFor="count"> Count</label>
              <input name="count" type="text" value={formValue.count} onChange={handleChange}/>
              <label htmlFor="img">Paste imgUrl</label>
              <input name="img" type="text" value={formValue.imageUrl} onChange={handleChange} />
              <div className="btnContainer">
                <button onClick={handleSubmit} appearance="primary">
                  Ok
                </button>
                <button onClick={onClose} appearance="subtle">
                  Cancel
                </button>
              </div>
            </div>
          </Form>
        </Modal>
      </div>
   )
}
export default NewModal;