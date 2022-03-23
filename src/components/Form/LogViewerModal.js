import {hideModal} from "../../actions/config-modal";
import React, {useEffect, useMemo, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {submitSetHostname, submitSetting} from "../../actions/config";
import {useHistory} from "react-router-dom";
import Modal from "react-modal";
import sshStb, {getLog, refreshList, removeStb} from "../../actions/ssh-stb";
import moment from "moment";

const View = ({ id='STB NAME' }) => {
  const dispatch = useDispatch()
  const textArea = useRef()

  const submit = (e) => {
    if (e) e.preventDefault()
    dispatch(getLog({
      id
    }))
    // dispatch(submitSetHostname({
    //   hostname,
    //   id
    // }))
    // dispatch(refreshList())
    // dispatch(hideModal())
  }

  const { stbLogs } = useSelector(state => state.sshStb)

  const logs = useMemo(() => {
    const result = (stbLogs || []).map(log => `[${moment(log.timestamp).format("DD-MM-YYYY HH:mm:ss")}] ${log.log}`).join('\n')
    console.log({
      result
    })
    return result
  }, [stbLogs])

  useEffect(() => {
    const area = textArea.current
    area.scrollTop = area.scrollHeight
  }, [logs])

  useEffect(() => {
    submit()
  }, [])

  return (
    <form onSubmit={submit}>
      <div className="relative flex flex-col min-w-0 break-words w-full shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="flex-auto px-4 pt-8 pb-6 pt-0">
          <div className="flex flex-wrap mt-6">
            <div className="w-full px-4">
              <div className="relative w-full">
                <textarea readOnly className="w-full" rows={20} value={logs} ref={textArea}/>
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-t mb-0 pb-4">
          <div className="flex justify-end bg flex-row items-center mr-4 pr-4">
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
              Reload
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}

const LogViewerModal = () => {
  const dispatch = useDispatch()
  const customStyles = {
    content: {
      bottom: 'auto',
      padding: 0,
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

  return showing === 'logviewer' && (
    <Modal
      isOpen={showing === 'logviewer'}
      onRequestClose={() => {
        dispatch(hideModal())
      }}
      contentLabel=""
      style={customStyles}
      shouldCloseOnOverlayClick={true}
    >
      <View
        id={id}
      />
    </Modal>
  )
}

export default LogViewerModal
