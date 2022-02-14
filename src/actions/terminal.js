import {createSlice} from "@reduxjs/toolkit";

const initialState = {
}

const slice = createSlice({
  name: 'terminal',
  initialState,
  reducers: {
    sendCommand: (state, action) => {
    },
    receiveResult: (state, action) => {
    }
  }
})

export const { setIsMobile } = slice.actions

export default slice.reducer
