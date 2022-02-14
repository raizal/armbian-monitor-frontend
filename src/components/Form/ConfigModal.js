import Modal from 'react-modal'
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {hideModal} from "../../actions/config-modal";
import ConfigForm from "./ConfigForm";

const ConfigModal = () => {
  const { showing } = useSelector((state) => state.configModal)
  const dispatch = useDispatch()
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      padding: 0,
      transform: 'translate(-50%, -50%)',
      zIndex: 20
    },
    overlay: {
      zIndex: 200,
      backgroundColor: '#000c',
    }
  };

  return (
    <Modal
      isOpen={showing}
      onRequestClose={() => {
        dispatch(hideModal())
      }}
      contentLabel=""
      style={customStyles}
      shouldCloseOnOverlayClick={true}
    >
      <ConfigForm/>
    </Modal>
  )
}

export default ConfigModal
