import React, {useState} from "react";
import {startCase} from 'lodash';
// components
import {Transition} from '@headlessui/react'
import moment from "moment";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {installCCMiner, restartStb} from "../../actions/ssh-stb";

const defaultProps = {
  ip: '192.168.x.x',
  name: 'hostname',
  mac: 'xx:xx:xx:xx:xx',
  temp: 72,
}

const CardSTB = (props) => {
  const [collapsed, setCollapsed] = useState(false)
  const {pm2Installing, logs} = useSelector(state => state.sshStb)
  const {
    name,
    ip,
    hashrate,
    netDev,
    lastUpdate,
    hostname,
    temp,
    pm2Status,
    nodeStatus,
    ccminerStatus,
    minerScript,
    workerName,
    ...etcProps
  } = props

  const dispatch = useDispatch()

  const installMiner = () => {
    dispatch(installCCMiner({id: etcProps._id}))
  }
  const restartStbClick = () => {
    dispatch(restartStb({id: etcProps._id}))
  }

  const isInstallingPm2 = pm2Installing && pm2Installing[name] && !pm2Installing[name].done
  const isInstalling = logs && logs[name] && !logs[name].done
  // const installationStatus = pm2Installing && pm2Installing[name]?.status || null
  const installationStatus = logs && logs[name]?.status || null
  return (
    <>
      <div
        className="relative flex flex-col min-w-0 break-words bg-white text-lightBlue-600 w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className="font-semibold text-base mb-1">
                {name}
              </h3>
              <label className="font-light text-base" style={{fontSize: 14}}>
                {ip}<br/>{(netDev || []).join(', ')}
              </label>
            </div>
            <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
              <h3 className="font-semibold text-xs text-base" style={{fontSize: 15}}>
                {hashrate}
              </h3>
              <label className={`font-light text-xs text-base font-bold ${temp >= 60 ? 'text-red-500' : ''}`}
                     style={{fontSize: 14}}>
                {temp}°C
              </label>
            </div>
          </div>
        </div>
        <div
          className={`block w-full overflow-x-auto ${lastUpdate ? `bg-blueGray-600` : 'bg-red-700'} text-white uppercase text-center`}>
          {lastUpdate ?
            <label style={{fontSize: 10}}>Last Update: {moment(lastUpdate).format("HH:mm:ss")}</label>
            : <label style={{fontSize: 10}}>OFFLINE</label>
          }
        </div>
        <div className="block w-full overflow-x-auto bg-white flex border-t border-solid justify-between">
          <button
            className="bg-blueGray-600 mr-1 text-white active:bg-lightBlue-300 font-bold uppercase text-xs py-2 px-4 flex-1 shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
            type="button"
            onClick={() => setCollapsed(!collapsed)}
          >
            {!collapsed ? 'Show' : 'Hide'} Detail
          </button>
          <Link
            className="bg-blueGray-600 text-white text-center active:bg-lightBlue-300 font-bold uppercase text-xs py-2 px-4  flex-1 shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
            to={`/admin/terminal/${etcProps._id}`}
          >
            Open Terminal
          </Link>
        </div>
        <div className="block w-full overflow-x-auto bg-lightBlue-200">
          {/* Projects table */}
          <Transition
            show={collapsed}
            appear={true}
            enter="transition-opacity duration-50"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-50"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="flex flex-wrap mt-4">
              {Object.keys(etcProps).map(key => (
                <div className="w-full lg:w-6/12 px-4" key={key}>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      {startCase(key)}
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      value={etcProps[key]}
                      readOnly
                    />
                  </div>
                </div>
              ))}
              <div className="w-full px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    CCMiner Status
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    value={ccminerStatus}
                    readOnly
                  />
                </div>
              </div>
              <div className="w-full px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Miner Script
                  </label>
                  <textarea
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    value={minerScript}
                    rows={5}
                    readOnly
                  />
                </div>
              </div>
              {((pm2Status === "NOT INSTALLED" || nodeStatus === "NOT INSTALLED") || true) &&
                <div className="w-full px-4">
                  <div className="relative w-full mb-3">
                    <button
                      className="w-full text-lightBlue-500 bg-white border border-solid border-lightBlue-500 hover:bg-lightBlue-500 hover:text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded outline-none focus:outline-none ease-linear transition-all duration-150"
                      type="button"
                      disabled={isInstalling}
                      onClick={installMiner}
                    >
                      <i className="fas fa-gear"></i> {installationStatus || `Setup & Apply Changes`}
                    </button>
                  </div>
                </div>}
              <div className="w-full px-4">
                <div className="relative w-full mb-3">
                  <button
                    className="w-full text-lightBlue-500 bg-white border border-solid border-lightBlue-500 hover:bg-lightBlue-500 hover:text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded outline-none focus:outline-none ease-linear transition-all duration-150"
                    type="button"
                    onClick={restartStbClick}
                  >
                    <i className="fas fa-gear"></i> Restart
                  </button>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </>
  );
}

CardSTB.defaultProps = defaultProps

export default CardSTB
