import { createSlice } from "@reduxjs/toolkit";
import {isMobile} from "../layouts/Admin";

const initialState = {
  showing: false
}

export const slice = createSlice({
  name: 'config-modal',
  initialState,
  reducers: {
    showModal: (state, action) => {
      state.showing = true
    },
    hideModal: state => {
      state.showing = false
      if (isMobile) {
        setInterval(() => {
          window.location.href = '/admin/dashboard'
        }, 1000)
      }
    },
    setShowModal: (state, action) => {
      state.showing = action.payload
    }
  }
})

export const { showModal, hideModal, setShowModal } = slice.actions

export default slice.reducer
