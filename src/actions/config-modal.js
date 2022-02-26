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

const initialStateHostnameThreadModal = {
  value: null,
  showing: null,
  id: null
}

export const sliceThreadModal = createSlice({
  name: 'config-modal',
  initialState: initialStateHostnameThreadModal,
  reducers: {
    showModal: (state, action) => {
      const { type, value, id } = action.payload
      state.showing = type
      state.value = value
      state.id = id
    },
    hideModal: state => {
      state.value = null
      state.id = null
      state.showing = null
    }
  }
})

export const { showModal, hideModal } = sliceThreadModal.actions

export default sliceThreadModal.reducer
