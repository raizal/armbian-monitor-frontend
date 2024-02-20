import React from "react";

// components
import {Td, Th, Tr} from 'react-super-responsive-table';
import moment from "moment";
import {useDispatch, useSelector} from "react-redux";
import {installCCMiner, restartStb, shutdownMulti} from "../../actions/ssh-stb";
import isMiningActive, {isSTBConnected} from "../../utils/is-mining-active";
import extractMinerScript from "../../utils/extract-miner-script";
import TableDropdown from "../Dropdowns/TableDropdown";
import {hideModal, showModal} from "../../actions/config-modal";

const CardTableRow = ({
  color, _id,
  name, mac, os, netDev, temp,
  hashrate, workerName, nodeInstalled, pm2Installed,
  ccminerInstalled, skywireInstalled, ip,
  shares, diff, lastUpdate, lastRequest, cpuLoad, ips = [],
  ccminerStatus,
  minerScript, hideDetail = false
}) => {
  const {logs} = useSelector(state => state.sshStb)

  const miningActive = isMiningActive({ ccminerStatus })
  const minerConnected = isSTBConnected(lastRequest)

  const dispatch = useDispatch()

  const installMiner = () => {
    dispatch(installCCMiner({id: _id}))
  }

  const restartStbClick = () => {
    window.confirm("Apakah Anda yakin dengan ini?") && dispatch(restartStb({id: _id}))
  }

  const shutdownSTBClick = () => {
    window.confirm("Apakah Anda yakin dengan ini?") && dispatch(shutdownMulti({
      ids: [_id]
    }))
  }

  const lastRequestFromNow = lastRequest === 0 ? '' : moment(lastRequest).fromNow()
  const lastRequestFormatted = lastRequest === 0 ? 'offline' : moment(lastRequest).format("DD-MM-YYYY HH:mm:ss")

  const lastUpdateFormatted = lastUpdate === 0 ? 'offline' : moment(lastUpdate).format("DD-MM-YYYY HH:mm:ss")

  const isInstalling = logs && logs[name] && !logs[name].done
  // const installationStatus = pm2Installing && pm2Installing[name]?.status || null
  const installationStatus = logs && logs[name]?.status || null

  const minerInfo = extractMinerScript(minerScript)

  return (
    <>
      <Tr className={`border-solid border-t border-blueGray-200`}>
        <Th
          className="xs:w-full border-t-0  align-middle border-l-0 text-left border-r-0 text-xs whitespace-nowrap p-4">
          <div className="flex flex-col">
            <label
              className={"lg:ml-3 font-bold my-auto mx-auto"}
            >
              <i
                className={`fas fa-circle text-${miningActive && minerConnected ? 'emerald' : (minerConnected ? 'orange' : 'red')}-500 mr-2`}></i>{name}
            </label>
            {!hideDetail && <>
              <label
                className="my-auto mx-auto pt-2 leading-normal lg:ml-3 font-normal "
              >
                {lastRequestFromNow}
              </label>
              <label
                className=" my-auto mx-auto leading-normal lg:ml-3 font-normal"
              >
                {lastRequestFormatted}
              </label>
            </>}
          </div>
        </Th>
        <Td className="border-t-0 px-6  align-middle border-l-0 text-left border-r-0 text-xs whitespace-nowrap p-4">
          <div className="flex flex-col">
            <label
              className="lg:w-10 py-1"
            >
              {ips.join('; ')}
            </label>
            {!hideDetail && <>
              <label
                className="lg:w-10 py-1"
              >
                {netDev.join('; ')}
              </label>
              {mac.map(item => (
                <label
                  className="lg:w-10 py-1 "
                >
                  {item}
                </label>
              ))}
            </>}
          </div>
        </Td>
        <Td
          className="border-t-0 px-6 max-w-210-px align-middle border-l-0 text-left border-r-0 text-xs whitespace-nowrap p-4">
          <div className="flex flex-col">
            <label
              className={`lg:w-10 pt-2 pb-2 ${temp >= 60 ? 'text-red-500 font-bold' : 'font-bold text-emerald-500'}`}
            >
              {temp}°C
            </label>
            <span
              className="lg:w-10 break-all py-1"
            >
              {cpuLoad}
            </span>
          </div>
        </Td>
        <Td
          className="border-t-0 px-6 w-210-px font-bold align-middle border-l-0 text-left border-r-0 text-xs whitespace-nowrap p-4">
          <div className="flex flex-col">
            <label
              className={`lg:w-10 pt-2 pb-2`}
            >
              {minerInfo.workerName}
            </label>
          </div>
        </Td>
        <Td className="border-t-0 px-6 align-middle border-l-0 text-left border-r-0 text-xs whitespace-nowrap p-4">
          <div className="flex flex-col">
            <label
              className="lg:w-10 font-bold ease-linear transition-all duration-150"
            >
              {hashrate}
            </label>
            {!hideDetail && <>
              <label
                className="lg:w-10 pt-2 pb-2 leading-normal"
              >
                Diff: {diff} | Shares: {shares}
              </label>
            </>}
          </div>
        </Td>
        <Td
          className="border-t-0 px-6 w-210-px font-bold align-middle border-l-0 text-left border-r-0 text-xs whitespace-nowrap p-4">
          <div className="flex flex-col">
            <label
              className={`lg:w-10 pt-2 pb-2`}
            >
              {lastUpdateFormatted}
            </label>
          </div>
        </Td>
        <Td style={{width: "150px"}}
            className="border-t-0 px-6  align-middle border-l-0 text-left border-r-0 text-xs whitespace-nowrap p-4">
          <div className="flex flex-col flex-wrap items-center" style={{ gap: "8px", minWidth: "150px" }}>
            {/*<TableDropdown/>*/}
            <button
              className="text-lightBlue-500 max-w-210-px bg-white border border-solid border-lightBlue-500 hover:bg-lightBlue-500 hover:text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-2 py-2 rounded outline-none focus:outline-none ease-linear transition-all duration-150"
              type="button"

              disabled={isInstalling}
              onClick={installMiner}
            >
              <i className="fas fa-cog"></i> {`Config & Run Miner`}
            </button>
            <button
              className="text-lightBlue-500 max-w-210-px bg-white border border-solid border-lightBlue-500 hover:bg-lightBlue-500 hover:text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-2 py-2 rounded outline-none focus:outline-none ease-linear transition-all duration-150"
              type="button"

              onClick={restartStbClick}
            >
              <i className="fas fa-power-off"></i> Reboot
            </button>
            <button
              className="text-lightBlue-500 max-w-210-px bg-white border border-solid border-lightBlue-500 hover:bg-lightBlue-500 hover:text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-2 py-2 rounded outline-none focus:outline-none ease-linear transition-all duration-150"
              type="button"

              onClick={shutdownSTBClick}
            >
              <i className="fas fa-power-off"></i> Shutdown
            </button>
            <button
              className="text-lightBlue-500 max-w-210-px bg-white border border-solid border-lightBlue-500 hover:bg-lightBlue-500 hover:text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-2 py-2 rounded outline-none focus:outline-none ease-linear transition-all duration-150"
              type="button"

              onClick={() => {
                dispatch(showModal({
                  type: 'threads',
                  value: minerInfo.threads,
                  id: _id
                }))
              }}
            >
              <i className="fas fa-microchip"></i> Set Thread
            </button>
            <button
              className="text-lightBlue-500 max-w-210-px bg-white border border-solid border-lightBlue-500 hover:bg-lightBlue-500 hover:text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-2 py-2 rounded outline-none focus:outline-none ease-linear transition-all duration-150"
              type="button"
              onClick={() => {
                dispatch(showModal({
                  type: 'hostname',
                  value: minerInfo.threads,
                  id: name
                }))
              }}

            >
              <i className="fas fa-network-wired"></i> Set Hostname
            </button>
            <button
              className="text-lightBlue-500 max-w-210-px bg-white border border-solid border-lightBlue-500 hover:bg-lightBlue-500 hover:text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-2 py-2 rounded outline-none focus:outline-none ease-linear transition-all duration-150"
              type="button"
              onClick={() => {
                dispatch(showModal({
                  type: 'logviewer',
                  id: name
                }))
              }}
            >
              <i className="fas fa-network-wired"></i> View Log
            </button>
          </div>
        </Td>
      </Tr>
      {!hideDetail && <Tr>
        <Td colSpan={6}
            className={`border-solid border-t items-center text-center text-xs align-middle leading-none py-2 leading-snug`}>
          {minerScript}
        </Td>
      </Tr>}
      {isInstalling && <Tr>
        <Td colSpan={6}
            className={`border-solid border-t items-center text-center text-xs align-middle leading-none py-2 leading-snug`}>
          {installationStatus}
        </Td>
      </Tr>}
    </>
  );
}

export default CardTableRow
