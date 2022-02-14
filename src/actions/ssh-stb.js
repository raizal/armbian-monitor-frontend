import { createSlice } from "@reduxjs/toolkit";

import socket from './socket'

const initialState = {
  list: [],
  scanning: false,
  pm2Installing: {},
  logs: {}
}

export const sshStbSlice = createSlice({
  name: 'ssh-stb',
  initialState,
  reducers: {
    updateData: (state, action) => {
      while(state.list.length > 0) {
        state.list.pop();
      }
      state.list.push(...(action.payload || []))
    },
    updateSingle: (state, action) => {
      // while(state.list.length > 0) {
      //   state.list.pop();
      // }
      // state.list.push(...(action.payload || []))
      console.log('UPDATE SINGLE : ', action)
      const stb = action.payload
      const index = state.list.map(item => item._id).indexOf(stb._id)
      if (index >= 0) {
        state.list[index] = {
          ...state.list[index],
          ...stb
        }
      } else {
        state.list.push(stb)
      }
    },
    sshScan: (state) => {
      socket.emit('web-client-send', {
        action: 'SCAN',
        payload: {}
      })
      // while(state.list.length > 0) {
      //   state.list.pop();
      // }
    },
    addStb: (state, action) => {
      console.log('ADD STB : ', action)
      if (action.payload) {
        state.list.push(action.payload)
      }
    },
    setScanningStatus: (state, action) => {
      state.scanning = action.payload
    },
    sortResult: (state) => {
      state.list = state.list.sort((a, b) => {
        if (a && b) return ('' + a.hostname).localeCompare(b.hostname)
        return 0
      })
    },
    installPm2: (state, action) => {
      const { id } = action.payload
      socket.emit('web-client-send', {
        action: 'INSTALL PM2',
        payload: {
          id
        }
      })
    },
    installPm2Done: (state, action) => {
      console.log(action)
      const { id, status, done } = action.payload
      state.pm2Installing[id] = {
        status: done ? null : status,
        done
      }
    },
    installLog: (state, action) => {
      console.log(action)
      const { id, status, done } = action.payload
      state.logs[id] = {
        status: done ? null : status,
        done
      }
      if (done) {
        delete state.logs[id]
      }
    },
    installCCMiner: (state, action) => {
      const { id } = action.payload
      socket.emit('web-client-send', {
        action: 'SETUP CCMINER',
        payload: {
          id
        }
      })
    },
    restartStb: (state, action) => {
      const { id } = action.payload
      socket.emit('web-client-send', {
        action: 'RESTART',
        payload: {
          id
        }
      })
    },
  }
})

export const { sshScan, addStb, setScanningStatus, sortResult, updateData, updateSingle, installPm2, installPm2Done, installLog, installCCMiner, restartStb } = sshStbSlice.actions

export default sshStbSlice.reducer
