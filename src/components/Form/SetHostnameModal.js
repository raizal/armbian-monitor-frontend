import {hideModal} from "../../actions/config-modal";
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {submitSetHostname, submitSetting} from "../../actions/config";
import {useHistory} from "react-router-dom";
import Modal from "react-modal";
import {refreshList, removeStb} from "../../actions/ssh-stb";

const SetHostnameForm = ({ id='STB NAME' }) => {
  const dispatch = useDispatch()
  const history = useHistory();

  const [hostname, setHostname] = useState(id)

  const submit = (e) => {
    e.preventDefault()
    dispatch(submitSetHostname({
      hostname,
      id
    }))
    dispatch(refreshList())
    dispatch(hideModal())
    window.location.reload()
  }

  const onChangeHandler = event => {
    const {name, value} = event.target
    setHostname(value)
  }

  return (
    <form onSubmit={submit}>
      <div className="relative flex flex-col min-w-0 break-words w-full shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="flex-auto px-4 pt-8 pb-6 pt-0">
          <div className="flex flex-wrap mt-6">
            <div className="w-full px-4">
              <div className="relative w-full">
                <label
                  className="block text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Set Hostname
                </label>
                <input
                  type="text"
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  value={hostname}
                  name="hostname"
                  onChange={onChangeHandler}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-t mb-0 pb-4">
          <div className="flex justify-center bg flex-row items-center">
            <button
              className="text-red-500 background-transparent font-bold uppercase px-4 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={() => {
                dispatch(hideModal())
              }}
            >
              Close
            </button>
            <button
              className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-4 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="submit"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}

const SetHostnameModal = () => {
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


  const configGeneral = useSelector(state => state.configModal)

  const {
    id, showing
  } = configGeneral

  return (
    <Modal
      isOpen={showing === 'hostname'}
      onRequestClose={() => {
        dispatch(hideModal())
      }}
      contentLabel=""
      style={customStyles}
      shouldCloseOnOverlayClick={true}
    >
      <SetHostnameForm
        id={id}
      />
    </Modal>
  )
}

export default SetHostnameModal
