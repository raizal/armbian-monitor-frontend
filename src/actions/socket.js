import {io} from "socket.io-client";

import store from '../store'
import {addStb, installLog, installPm2Done, setScanningStatus, sortResult, updateData, updateSingle} from './ssh-stb'
import {saveSettingFromServer, submitDone} from "./config";
import {hideModal} from "./config-modal";

const socket = io();

socket.on("connect", () => {
  console.log(socket.id);
  socket.emit('web-client-register', {})
});

socket.on('web-client-receive', (message) => {
  console.log(message)

  const {action} = message
  switch (action) {
    case 'SCAN': {
      const {result} = message
      store.dispatch(addStb(result))
    }
      break
    case 'SCANNING': {
      store.dispatch(setScanningStatus(true))
    }
      break
    case 'SCAN-DONE': {
      store.dispatch(setScanningStatus(false))
      store.dispatch(sortResult())
    }
      break
    case "UPDATE": {
      const {result} = message
      store.dispatch(updateData(result))
    }
      break
    case "UPDATE SINGLE": {
      const {result} = message
      store.dispatch(updateSingle(result))
      store.dispatch(sortResult())
    }
      break
    case "LOAD SETTING": {
      console.log('PROCESS CONFIGS FROM SERVER : ', message)
      const {result} = message
      store.dispatch(saveSettingFromServer(result))
    }
      break
    case "SAVE SETTING": {
      console.log(message)
      const {result} = message
      store.dispatch(submitDone({
        success: result
      }))
      store.dispatch(hideModal())
    }
      break
    case 'INSTALL PM2': {
      console.log(message)
      const {result} = message
      store.dispatch(installPm2Done(result))
    }
    break
    case 'INSTALL LOG': {
      console.log(message)
      const {result} = message
      store.dispatch(installLog(result))
    }
      break
  }
})

console.log("socket connected : ", socket.connected)

export default socket
