import { createSlice } from "@reduxjs/toolkit";
import moment from 'moment';
import socket from './socket'
import {isArray} from "lodash";

const initialState = {
  list: [],
  scanning: false,
  pm2Installing: {},
  logs: {},
  stbLogs: [],
  sort: 'hostname',
  order: 'asc'
}

const sortSTB = ({ list, sort, order }) => {
  return list.sort((a, b) => {
    if (a && b) {
      let param1, param2
      switch (sort) {        
        case 'speed':
          param1 = parseFloat(a.hashrate.replace(' kH/s', '')) || 0
          param2 = parseFloat(b.hashrate.replace(' kH/s', '')) || 0
          break
        case 'lastUpdate':
          param1 = moment(a.lastUpdate)
          param2 = moment(b.lastUpdate)
          break
        case 'ip':
          param1 = a.ips.join('; ')
          param2 = b.ips.join('; ')
          break
        case 'cpu':
          param1 = a.temp
          param2 = b.temp
          break
        case 'hostname':
        default:
          param1 = a.hostname
          param2 = b.hostname
          break
      }

      if (sort === 'cpu' || sort === 'speed' || sort === 'lastUpdate') {
        if (order === 'asc') return param1 - param2
        return param2 - param1
      } else {
        if (order === 'asc') return param1.localeCompare(param2)
        return param2.localeCompare(param1)
      }

    }
    return 0
  })
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

    setOrder: (state, action) => {
      state.order = action.payload
    },
    setSort: (state, action) => {
      state.sort = action.payload
    },
    sortResult: (state) => {
      const { list, sort, order } = state
      state.list = sortSTB({
        list, sort, order
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
    rebootMulti: (state, action) => {
      const { ids } = action.payload
      socket.emit('web-client-send', {
        action: 'RESTART',
        payload: {
          ids
        }
      })
    },
    shutdownMulti: (state, action) => {
      const { ids } = action.payload
      socket.emit('web-client-send', {
        action: 'SHUTDOWN',
        payload: {
          ids
        }
      })
    },
    getLog: (state, action) => {
      const { id } = action.payload
      socket.emit('web-client-send', {
        action: 'SHOW LOG',
        payload: {
          id
        }
      })
      return {
        ...state,
        stbLogs: []
      }
    },
    stbLog: (state, action) => {
      const logs = action.payload
      console.log(logs)
      return {
        ...state,
        stbLogs: isArray(logs) ? logs.sort((a, b) => a.timestamp - b.timestamp) : logs
      }
    },
  }
})

export const { refreshList, sshScan, addStb, setScanningStatus, sortResult, updateData, updateSingle, removeStb, installPm2Done, installLog, installCCMiner,
  restartStb, restartMultiStb, installCCMinerMulti, stopMiningMulti, rebootMulti, shutdownMulti, getLog, stbLog, setOrder, setSort } = sshStbSlice.actions

export default sshStbSlice.reducer
