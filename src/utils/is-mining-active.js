import moment from "moment";

const INACTIVE_SECS = 150

export const isHashrateValid = (lastUpdate) => {
  const lastUpdateLocal = lastUpdate && moment(lastUpdate)
  return lastUpdateLocal && Math.abs(lastUpdateLocal.diff(moment(), "s")) < INACTIVE_SECS
}

export default (stb) => {
  return stb && stb.ccminerStatus === 'RUNNING'
}

export const isSTBConnected = (lastRequest) => {
  return lastRequest && Math.abs(moment(lastRequest).diff(moment(), "s")) < INACTIVE_SECS
}
