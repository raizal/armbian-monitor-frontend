import moment from "moment";

const INACTIVE_SECS = 150

export default (lastUpdate) => {
  const lastUpdateLocal = lastUpdate && moment(moment.utc(lastUpdate)).local()
  return lastUpdateLocal && Math.abs(lastUpdateLocal.diff(moment(), "s")) < INACTIVE_SECS
}

export const isSTBConnected = (lastRequest) => {
  return lastRequest && Math.abs(moment(lastRequest).diff(moment(), "s")) < INACTIVE_SECS
}
