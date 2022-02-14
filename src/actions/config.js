import {createSlice} from "@reduxjs/toolkit";
import socket from "./socket";
import {toast} from "react-toastify";

export const ActivePool = {
  zergpool: 'zergpool',
  luckpool: 'luckpool'
}

export const LuckpoolMode = {
  default: 'default',
  hybrid: 'hybrid'
}

const initialState = {
  refreshInterval: 2,
  segments: '192.168.1,192.168.2',
  activePool: ActivePool.luckpool,
  wallet: '',
  algo: 'verus',
  password: 'x',
  server: '',
  threads: 4,

  submitting: false,
  submitResultFlashMessage: ''
}

const slice = createSlice({
  name: 'general-config',
  initialState,
  reducers: {
    saveSettingFromServer: (state, action) => {
      action.payload.forEach(setting => {
        const { name: key, value } = setting
          state[key] = value
      })
    },
    submitSetting: (state, action) => {
      state.submitting = true
      const { payload } = action
      console.log(payload)
      socket.emit('web-client-send', {
        action: 'SAVE SETTING',
        payload
      })
    },
    loadSetting: (state) => {
      socket.emit('web-client-send', {
        action: 'LOAD SETTING',
        payload: {}
      })
    },
    submitDone: (state, action) => {
      state.submitting = false
      const { success } = action.payload
      if (success) {
        toast.info('Config tersimpan! 👍', {
          position: "bottom-center",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
        });
      } else {
        toast.error('Terjadi kesalahan! 😟', {
          position: "bottom-center",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
        });
      }
    },
    clearMessage: (state) => {
      state.submitting = false
      state.submitResultFlashMessage = ''
    }
  }
})

export const { saveSettingFromServer, loadSetting, submitSetting, clearMessage, submitDone } = slice.actions

export default slice.reducer
