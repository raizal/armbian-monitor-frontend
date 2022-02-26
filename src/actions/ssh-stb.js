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
    refreshList: (state) => {
      while(state.list.length > 0) {
        state.list.pop();
      }
      socket.emit('web-client-send', {
        action: 'REFRESH',
        payload: {}
      })
    },
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
      const stb = action.payload
      const index = state.list.findIndex(item => item._id === stb._id)
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
    removeStb: (state, action) => {
      const {
        id
      } = action.payload
      const index = state.list.findIndex(item => item._id === id)
      if (index >= 0) {
        state.list.splice(index, 1)
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
      // console.log(state.list.map(stb => stb._id))
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
    installCCMinerMulti: (state, action) => {
      const { ids } = action.payload
      socket.emit('web-client-send', {
        action: 'SETUP CCMINER',
        payload: {
          ids
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
    restartMultiStb: (state, action) => {
      const { ids } = action.payload
      socket.emit('web-client-send', {
        action: 'RESTART',
        payload: {
          ids
        }
      })
    },
    stopMiningMulti: (state, action) => {
      const { ids } = action.payload
      socket.emit('web-client-send', {
        action: 'STOP MINER',
        payload: {
          ids
        }
      })
    },
  }
})

export const { refreshList, sshScan, addStb, setScanningStatus, sortResult, updateData, updateSingle, removeStb, installPm2Done, installLog, installCCMiner, restartStb, restartMultiStb, installCCMinerMulti, stopMiningMulti } = sshStbSlice.actions

export default sshStbSlice.reducer
