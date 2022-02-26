import {hideModal} from "../../actions/config-modal";
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {ActivePool, LuckpoolMode, submitDone, submitSetting} from "../../actions/config";
import {useHistory} from "react-router-dom";

const ConfigForm = () => {
  const dispatch = useDispatch()
  const history = useHistory();

  const {
    refreshInterval,
    segments,
    activePool,
    wallet,
    server,
    password,
    algo,
    threads,
    workername
  } = useSelector(state => state.configGeneral)

  const [intervalValue, setInterval] = useState(refreshInterval)

  const [segmentsValue, setSegments] = useState(segments)

  const [activePoolValue, setActivePool] = useState(!!!activePool || ActivePool.luckpool)

  const [walletValue, setWallet] = useState(wallet)
  const [serverValue, setServer] = useState(server)
  const [passwordValue, setPassword] = useState(password)
  const [algoValue, setAlgo] = useState(algo)
  const [threadsValue, setThreads] = useState(threads)

  const [workernameValue, setWorkername] = useState(workername)

  const minerScript = (`/root/ccminer/ccminer -a ${algoValue} -o ${serverValue} -u ${walletValue}.$workername ${password?.length > 0 ? '-p' : ''} ${passwordValue} -t ${threadsValue}`)

  const submit = (e) => {
    e.preventDefault()
    dispatch(submitSetting({
      refreshInterval: intervalValue,
      segments: segmentsValue,

      wallet: walletValue,
      server: serverValue,
      password: passwordValue,
      algo: algoValue,
      threads: threadsValue,
      workername: workernameValue
    }))
  }

  const onChangeHandler = event => {
    const {name, value} = event.target
    switch (name) {
      case 'wallet':
        setWallet(value)
        break
      case 'algo':
        setAlgo(value)
      case 'password':
        setPassword(value)
        break
      case 'threads':
        setThreads(value)
        break
      case 'server':
        setServer(value)
        break
      case 'interval':
        setInterval(value)
        break
      case 'segments':
        setSegments(value)
        break
      case 'activepool':
        setActivePool(value)
        break
      case 'workername':
        setWorkername(value)
        break
      // case 'usernameSsh':
      //   setUsernameSsh(value)
      //   break
      // case 'passwordSsh':
      //   setPasswordSsh(value)
      //   break
    }
  }

  return (
    <form onSubmit={submit}>
      <div className="relative flex flex-col min-w-0 break-words w-full shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">Setting</h6>
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
            General Setting
          </h6>
          <div className="flex flex-wrap">
            <div className="w-full px-4 mb-4">
              <div className="relative w-full mb-3">
                <label
                  className="block text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Workername
                </label>
                <div className="mt-2 py-2">
                  <label className="inline-flex items-center mr-4">
                    <input type="radio" className="form-radio" onChange={onChangeHandler} name="workername"
                           value="hostname" checked={workernameValue === 'hostname'}/>
                    <span className="ml-2">Use hostname</span>
                  </label>
                  <label className="inline-flex items-center ml-6">
                    <input type="radio" className="form-radio" onChange={onChangeHandler} name="workername"
                           value="all-for-one" checked={workernameValue === 'all-for-one'}/>
                    <span className="ml-2">Single workername</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Update Interval (dalam detik)
                </label>
                <input
                  type="number"
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  value={intervalValue}
                  name="interval"
                  onChange={onChangeHandler}
                />
              </div>
            </div>
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  IP Segment (pisahkan dengan koma)
                </label>
                <input
                  type="text"
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  value={segmentsValue}
                  name="segments"
                  onChange={onChangeHandler}
                />
              </div>
            </div>
          </div>
          <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
            Miner Setting
          </h6>
          <div className="flex flex-wrap">

            <div className="w-full px-4 lg:w-6/12 ">
              <div className="relative w-full mb-3">
                <label
                  className="block text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Server(-o)
                </label>
                <input
                  type="text"
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  value={serverValue}
                  name="server"
                  onChange={onChangeHandler}
                />
              </div>
            </div>
            <div className="w-full px-4 lg:w-6/12 ">
              <div className="relative w-full mb-3">
                <label
                  className="block text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Algo(-a)
                </label>
                <input
                  type="text"
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  value={algoValue}
                  name="algo"
                  onChange={onChangeHandler}
                />
              </div>
            </div>
            <div className="w-full px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Wallet(-u)
                </label>
                <input
                  type="text"
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  value={walletValue}
                  name="wallet"
                  onChange={onChangeHandler}
                />
              </div>
            </div>
            <div className="w-full lg:w-6/12 px-4 ">
              <div className="relative w-full mb-3">
                <label
                  className="block text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Password(-p)
                </label>
                <input
                  type="text"
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  value={passwordValue}
                  name="password"
                  onChange={onChangeHandler}
                />
              </div>
            </div>
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Jumlah CPU Threads(-t)
                </label>
                <input
                  type="number"
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  value={threadsValue}
                  name="threads"
                  onChange={onChangeHandler}
                />
              </div>
            </div>
            <div className="w-full px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Generated Miner Script
                </label>
                <textarea
                  type="text"
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  value={minerScript}
                  name="script"
                  readOnly={true}
                  onChange={onChangeHandler}
                />
              </div>
            </div>
          </div>

          {/*<hr className="mt-6 border-b-1 border-blueGray-300"/>*/}

          {/*<h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">*/}
          {/*  Zergpool Setting*/}
          {/*</h6>*/}
          {/*<div className="flex flex-wrap">*/}
          {/*  <div className="w-full lg:w-12/12 px-4">*/}
          {/*    <div className="relative w-full mb-3 text-center">*/}
          {/*      <span className="text-blueGray-500 text-sm mt-3 mb-6 font-semibold uppercase">Coming Soon</span>*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*</div>*/}
        </div>
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-end">
            <button
              className="text-red-500 background-transparent font-bold uppercase px-4 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={() => {
                dispatch(hideModal())
                history.goBack()
              }}
            >
              Close
            </button>
            <button
              className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-4 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="submit"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default ConfigForm
