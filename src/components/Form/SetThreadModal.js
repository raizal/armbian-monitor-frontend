import {hideModal} from "../../actions/config-modal";
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {submitSetting, submitSettingAndApply} from "../../actions/config";
import {useHistory} from "react-router-dom";
import Modal from "react-modal";


const SetThreadForm = ({ threads, id='STB NAME' }) => {
  const dispatch = useDispatch()
  const history = useHistory();

  const [threadsValue, setThread] = useState(threads)

  const submit = (e) => {
    e.preventDefault()
    dispatch(submitSettingAndApply({
      id,
      config: {
        [`${id}-threads`]: threadsValue
      }
    }))
    dispatch(hideModal())
  }

  const onChangeHandler = event => {
    const {name, value} = event.target
    switch (name) {
      case 'threads':
        setThread(value)
        break
    }
  }

  return (
    <form onSubmit={submit}>
      <div className="relative flex flex-col min-w-0 break-words w-full shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="flex-auto px-4 pt-8 pb-6 pt-0">
          <h6 className="text-blueGray-400 text-sm mt-3 mb-6 px-3 font-bold uppercase">
            {id}
          </h6>
          <div className="flex flex-wrap">
            <div className="w-full px-4">
              <div className="relative w-full">
                <label
                  className="block text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  CPU Threads
                </label>
                <input
                  type="number"
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  value={threadsValue}
                  name="threads"
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

const SetThreadModal = () => {
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
    id, value, showing
  } = configGeneral

  console.log(configGeneral)

  return (
    <Modal
      isOpen={showing === 'threads'}
      onRequestClose={() => {
        dispatch(hideModal())
      }}
      contentLabel=""
      style={customStyles}
      shouldCloseOnOverlayClick={true}
    >
      <SetThreadForm
        id={id}
        threads={value}
      />
    </Modal>
  )
}

export default SetThreadModal
