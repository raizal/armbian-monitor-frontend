import React, {useCallback, useEffect, useMemo, useState} from "react";

// components
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import {useDispatch, useSelector} from "react-redux";
import CardTable from "../../components/Cards/CardTable";
import CardTableRow from "../../components/Cards/CardTableRow";
import CardStats from "../../components/Cards/CardStats";
import _ from 'lodash'
import isMiningActive, {isHashrateValid, isSTBConnected} from "../../utils/is-mining-active";
import {
  installCCMinerMulti,
  rebootMulti,
  setOrder, setSort,
  shutdownMulti, sortResult,
  sshScan,
  stopMiningMulti
} from "../../actions/ssh-stb";

export default function Dashboard() {
  const dispatch = useDispatch()

  const { list, scanning, sort, order } = useSelector((state) => state.sshStb)

  const [status, setStatus] = useState('all')

  const [prefix, setPrefix] = useState('')

  const [showDetail, setShowDetail] = useState(false)

  const [debouncedState, setDebouncedState] = useState("");

  const handleChange = (event) => {
    setPrefix(event.target.value);
    debounceSearch(event.target.value);
  };

  const statusFilterChange = (event) => {
    setStatus(event.target.value)
  }

  const debounceSearch = useCallback(
    _.debounce((_searchVal) => {
      setDebouncedState(_searchVal);
      // send the server request here
    }, 700),
    []
  );

  const debounceSort = useCallback(
    _.debounce(() => {
      dispatch(sortResult())
      // send the server request here
    }, 300),
    []
  );

  const tableHeaderClick = (_sort, _order) => {
    if (_order !== order) dispatch(setOrder(_order))
    if (sort !== _sort) dispatch(setSort(_sort))
    debounceSort()
  }

  const shownList = useMemo(() => list.filter(stb => {
    const miningActive = isMiningActive(stb)
    const reachable = isSTBConnected(stb.lastRequest)
    let shouldGet = true

    if (status !== 'all') {
      switch (status) {
        case 'offline':
          shouldGet = !reachable
          break
        case 'running':
          shouldGet = miningActive && reachable
          break
        case 'idle':
          shouldGet = !miningActive && reachable
          break
      }
    }
    return stb.name.indexOf(debouncedState) === 0 && shouldGet
  }), [list, status, debouncedState])

  const deadStb = useMemo(() => shownList.filter(stb => {
    return !isSTBConnected(stb.lastRequest)
  }).length, [shownList])

  const idleStb = useMemo(() => shownList.filter(stb => {
    const miningActive = isMiningActive(stb)
    const reachable = isSTBConnected(stb.lastRequest)

    return !miningActive && reachable
  }).length, [shownList])
  // const groups = groupingIds(list.map(item => item._id))
  // console.log({ groups })

  const hashrateList = useMemo(() => shownList.map(stb => stb.hashrate === 'n/a' || !isMiningActive(stb) || !isHashrateValid(stb.lastUpdate) ? 0 : parseInt(stb.hashrate.split(' ')[0])), [shownList])

  const totalHashrate = useMemo(() => hashrateList.reduce((a, b) => a+b, 0) / 1000, [hashrateList])
  const averageHashrate = useMemo(() => totalHashrate / (shownList.length - deadStb) * 1000 || 0, [deadStb, shownList, totalHashrate])
  const minHashrate = useMemo(() => _.min(hashrateList.filter(hash => hash > 0)) || 0, [hashrateList])
  const maxHashrate = useMemo(() => _.max(hashrateList) || 0, [hashrateList])

  const temps = useMemo(() => shownList.map(stb => stb.temp), [shownList])
  const totalTemp = temps.reduce((a, b) => a+b, 0) || 0
  const avgTemp = totalTemp / shownList.length || 0
  const minTemp = useMemo(() => _.min(temps) || 0, [temps])
  const maxTemp = useMemo(() => _.max(temps) || 0, [temps])

  return (
    <>
      <div className="flex flex-wrap mt-4 mb-8">
        <div className="w-full md:w-4/12 px-1">
          <CardStats
            statSubtitle={"STB"}
            statTitle={`${shownList.length-deadStb-idleStb}/${shownList.length}`}
            statArrow={""}
            statIconName={"fas fa-laptop-code"}
            statIconColor={'bg-lightBlue-500'}
            statPercent={`Offline : ${deadStb}`}
            statPercentColor={""}
            statDescripiron={`| Idle : ${idleStb}`}
          />
        </div>
        <div className="w-full md:w-4/12 px-1">
          <CardStats
            statSubtitle={"Hashrate"}
            statTitle={`${totalHashrate} Mhs`}
            statArrow={""}
            statIconName={"fas fa-tachometer-alt"}
            statIconColor={'bg-orange-500'}
            statPercent={`Avg: ${averageHashrate.toFixed(0)} Khs`}
            statPercentColor={""}
            statDescripiron={`| Max: ${maxHashrate} Khs | Min: ${minHashrate} Khs`}
          />
        </div>
        <div className="w-full md:w-4/12 px-1">
          <CardStats
            statSubtitle={"Avg Temperature"}
            statTitle={`${avgTemp.toFixed(2)} °C`}
            statArrow={""}
            statIconName={"fas fa-thermometer-half"}
            statIconColor={'bg-red-500'}
            statPercent={`Min: ${minTemp} °C`}
            statPercentColor={""}
            statDescripiron={`Max: ${maxTemp} °C`}
          />
        </div>
      </div>

      <div className={"flex md:flex-row flex-col mb-4 mt-12"} style={{ justifyContent: 'flex-end' }}>
        <div className={'flex flex-row flex-wrap flex-1 mb-2 mt-2'} style={{ gap: '5px', alignItems: 'center' }}>
          <button
            style={{
              minHeight: '32px'
            }}
            onClick={() => {
              if (!scanning) {
                dispatch(sshScan())
              }
            }}
            disabled={scanning}
            className={`${scanning ? 'bg-lightBlue-500 text-white' : 'bg-transparent text-lightBlue-500'} border border-solid border-lightBlue-500 hover:bg-lightBlue-500 hover:text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-2 rounded outline-none focus:outline-none mr-1 ease-linear transition-all duration-150`}
            type="button">
            {scanning ? 'SCANNING' : 'START SCANS'}
          </button>
          <button
            style={{
              minHeight: '32px'
            }}
            onClick={() => {
              window.confirm("Apakah Anda yakin dengan ini?") && dispatch(stopMiningMulti({
                ids: list.map(stb => stb._id)
              }))
            }}
            className="text-lightBlue-500 bg-transparent border border-solid border-lightBlue-500 hover:bg-lightBlue-500 hover:text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-2 rounded outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
            type="button">
            Stop Mining
          </button>
          <button
            style={{
              minHeight: '32px'
            }}
            onClick={() => {
              window.confirm("Apakah Anda yakin dengan ini?") && dispatch(rebootMulti({
                ids: list.map(stb => stb._id)
              }))
            }}
            className="text-lightBlue-500 bg-transparent border border-solid border-lightBlue-500 hover:bg-lightBlue-500 hover:text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-2 rounded outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
            type="button">
            Reboot All
          </button>
          <button
            style={{
              minHeight: '32px'
            }}
            onClick={() => {
              window.confirm("Apakah Anda yakin dengan ini?") && dispatch(shutdownMulti({
                ids: list.map(stb => stb._id)
              }))
            }}
            className="text-lightBlue-500 bg-transparent border border-solid border-lightBlue-500 hover:bg-lightBlue-500 hover:text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-2 rounded outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
            type="button">
            Shutdown All
          </button>
          <button
            style={{
              minHeight: '32px'
            }}
            onClick={() => {
              dispatch(installCCMinerMulti({
                ids: list.map(stb => stb._id)
              }))
            }}
            className="text-lightBlue-500 bg-transparent border border-solid border-lightBlue-500 hover:bg-lightBlue-500 hover:text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-2 rounded outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
            type="button">
            Auto Config & Start All
          </button>
          <button
            style={{
              minHeight: '32px'
            }}
            onClick={() => setShowDetail(!showDetail)}
            className="text-lightBlue-500 bg-transparent border border-solid border-lightBlue-500 hover:bg-lightBlue-500 hover:text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-2 rounded outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
            type="button">
            {showDetail ? 'Detail' : 'Simple'}
          </button>
        </div>

      </div>
      <div className="w-full mb-2 flex md:flex-row flex-col">
        <div className="xl:w-3/12 md:w-4/12 w-full mb-2 mt-2" style={{ alignSelf: 'center' }}>
          <select onChange={statusFilterChange} className="font-normal leading-normal mt-0 w-full text-lightBlue-800 border-blueGray-200">
            <option value="all" className="font-normal leading-normal" selected={status === 'all'}>Semua</option>
            <option value="running" className="font-normal leading-normal" selected={status === 'running'}>Running</option>
            <option value="idle" className="font-normal leading-normal" selected={status === 'idle'}>Idle</option>
            <option value="offline" className="font-normal leading-normal" selected={status === 'offline'}>Offline</option>
          </select>
        </div>
        <div className="xs:hidden flex-1"></div>
        <div className="w-full md:w-4/12 mb-2 mt-2">
          <div className="relative w-full">
            <input
              type="text"
              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white text-sm shadow w-full ease-linear transition-all duration-150"
              value={prefix}
              placeholder="Search..."
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <CardTable
        onHeaderClick={tableHeaderClick}
        sort={sort}
        order={order}
        content={shownList.map((stb, index) => <CardTableRow
          {...stb}
          hideDetail={!showDetail}
          key={`${stb.name}-${index}`}
          color={index % 2 === 0 ? 'light' : 'dark'}
        />)}
      />
    </>
  )

  // return (
  //   <Table>
  //     <Thead>
  //       <Tr>
  //         {titles.map(item => <Th className="border-solid border-2 px-2" style={{
  //           textAlign: 'left',
  //           paddingTop: 5,
  //           paddingBottom: 5
  //         }} key={item.title}>{item.title}</Th>)}
  //       </Tr>
  //     </Thead>
  //     <Tbody>
  //       {list.map((stb, index) => <Tr key={`row-${index}`}>
  //         {titles.map(key => <Td className="border-solid border-2 px-2 py-2">{stb[key.name]}</Td>)}
  //       </Tr>)}
  //     </Tbody>
  //   </Table>
  // );

  // return (
  //   <>
  //     <div><span>
  //       {list.length} STB
  //     </span></div>
  //     <div className="flex flex-wrap mt-4">
  //       {(list || []).map(stb => (
  //         <div className="w-full 2xl:w-6/12 xl:w-3/12 md:w-4/12 px-4">
  //           <CardSTB
  //             key={stb.name}
  //             {...stb}
  //           />
  //         </div>
  //       ))}
  //     </div>
  //   </>
  // );
}
