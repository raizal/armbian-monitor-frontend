import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  isMobile: false
}

const slice = createSlice({
  name: 'responsive',
  initialState,
  reducers: {
    setIsMobile: (state, action) => {
      state.isMobile = action.payload
    }
  }
})

export const { setIsMobile } = slice.actions

export default slice.reducer
