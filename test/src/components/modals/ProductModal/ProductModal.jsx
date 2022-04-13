import React, { useState, useRef, useEffect, forwardRef } from "react";
import useModal from "../../../customHooks/useModal";
import {
  Modal,
  Form,
  Input,
  ButtonToolbar,
  Button,
  Uploader,
  Schema
} from "rsuite";
import { postProduct } from "../../../redux/action/getProductAction";
import "./styles.css"
import { useDispatch } from "react-redux";

const TextField = forwardRef((props, ref) => {
  const { name, label = null, accepter, className, ...rest } = props;
  return (
    <Form.Group controlId={name} ref={ref}>
      {label && <Form.ControlLabel>{label} </Form.ControlLabel>}
      <Form.Control
        name={name}
        accepter={accepter}
        className={className}
        {...rest}
      />
    </Form.Group>
  );
});

const Textarea = forwardRef((props, ref) => (
  <Input {...props} as="textarea" ref={ref} />
));

const { StringType, DateType } = Schema.Types;
const model = Schema.Model({
  title: StringType().isRequired("This field is required."),
  name: StringType().isRequired("This field is required."),
  count: StringType().isRequired("This field is required."),
});

const initialFormValue = {
    name:"",
    count:"",
    imageUrl:""
  }
const ProductModal = ({ onOpen, onSave, onClose, data=initialFormValue }) => {
  const formRef = useRef();
  const [formValue, setFormValue] = useState(data);
  const [avatar, setAvatar] = useState(null);
  const handleSubmit = () => {
    // if (!formRef.current.check()) {
    //   return;
    // }
    onClose();
    onSave(formValue);
  };
  const handleImg = (e) => {
    console.log(e.target.files[0]);
    if (e?.target?.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = function() {
        console.log('RESULT', reader.result)
        setFormValue({...formValue, imageUrl: reader.result})
      }
      const avatarBase = reader.readAsDataURL(file);
      console.log(avatarBase);
      setFormValue({...formValue, imageUrl: avatarBase})
    }
  }

  return (
    <Modal
      className="customize_newEventModal"
      open={onOpen}
      onClose={onClose}
      backdrop
    >
      <Modal.Header className="customize_closeIcon">
        <h1 className="title">Product details</h1>
      </Modal.Header>

      <Form
        ref={formRef}
        className="customize_newEventForm"
        onChange={setFormValue}
        formValue={formValue}
        model={model}
      >
        <TextField
          name="name"
          label="Title"
          className="custom_inputField"
          placeholder="Add Title"
        />
        <div className="name-container">
          <div className="deadlineDate">
            <TextField
              className="customize_time"
              name="count"
              label="Count"
              placeholder="Set number of product"
            />
          </div>
          {/* <Uploader
            action="http://localhost:3002/products/"
          >
            <button>
                Upload your photo
            </button>
          </Uploader> */}
         
          {/* <TextField
              className="customize_time"
              name="imageUrl"
              label="imageUrl"
              placeholder="Paste img Url"
            /> */}
          <div className="uploader-container">
          <label className="uploader" htmlFor='avatar'> Choose img</label>
          <input type='file' id='avatar' onChange={handleImg} />
          {avatar && <img src={avatar} alt='avatar'/>}
          </div>
        </div>
        <TextField
          accepter={Textarea}
          name="description"
          label="Description"
          className="custom_inputField"
          placeholder="Text"
          rows={5}
        />

        <ButtonToolbar className="footerBtn">
          <Button
            className="cancelBtn"
            appearance="default"
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button
            className="saveBtn"
            appearance="primary"
            onClick={handleSubmit}
          >
            Save
          </Button>
        </ButtonToolbar>
      </Form>
    </Modal>
  );
};
export default ProductModal;
