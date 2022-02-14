import { configureStore } from '@reduxjs/toolkit'

import sshStb from '../actions/ssh-stb'
import configModal from '../actions/config-modal'
import responsive from '../actions/responsive'
import configGeneral from "../actions/config";

export default configureStore({
  reducer: {
    sshStb,
    configModal,
    responsive,
    configGeneral
  },
})