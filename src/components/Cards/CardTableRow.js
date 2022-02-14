import React from "react";
import PropTypes from "prop-types";

// components


export default function CardTableRow({
  color,
  name, mac, os, netDev, temp,
  hashrate, workerName, nodeInstalled, pm2Installed,
  ccminerInstalled, skywireInstalled, ip
}) {
  return (
    <tr className={"border-solid border-blueGray-600"}>
      <th className="border-t-0 px-6  align-middle border-l-0 text-left border-r-0 text-xs whitespace-nowrap p-4">
        <label
          className={"ml-3 font-bold my-auto"}
        >
          {hashrate !== 'n/a' ? <i className="fas fa-circle text-emerald-500 mr-2"></i> : <i className="fas fa-circle text-red-500 mr-2"></i>}{name}
        </label>
      </th>
      <td className="border-t-0 px-6  align-middle border-l-0 text-left border-r-0 text-xs whitespace-nowrap p-4">
        <div className="flex flex-col">
          <label
            className="w-10 h-5"
          >
            {ip}
          </label>
          {netDev.map(net => (
            <label
              className="w-10"
            >
              {net}
            </label>
          ))}
          {mac.map(item => (
            <label
              className="w-10 h-5 "
            >
              {item}
            </label>
          ))}
        </div>
      </td>
      <td className="border-t-0 px-6 align-middle border-l-0 text-left border-r-0 text-xs whitespace-nowrap p-4">
        <label
          className={`w-10 h-5 ${temp >= 60 ? 'text-red-500 font-bold' : ''}`}
        >
          {temp}°C
        </label>
      </td>
      <td className="border-t-0 px-6  align-middle border-l-0 text-left border-r-0 text-xs whitespace-nowrap p-4">
        <div className="flex flex-col">
          <label
            className="w-10 h-5"
          >
            {hashrate}
          </label>
          <label
            className="w-10 h-5"
          >
            Nama worker: {workerName}
          </label>
        </div>
      </td>
      <td className="border-t-0 px-6  align-middle border-l-0 text-left border-r-0 text-xs whitespace-nowrap p-4">
        <div className="flex flex-col">
          <label
            className="w-10 h-5 "
          >
            <i className={`fas fa-circle text-${nodeInstalled === 'INSTALLED' ? 'emerald' : 'red'}-500 mr-2`}></i>
            Node: {nodeInstalled}
          </label>
          <label
            className="w-10 h-5 "
          >
            <i className={`fas fa-circle text-${pm2Installed === 'INSTALLED' ? 'emerald' : 'red'}-500 mr-2`}></i>
            PM2: {pm2Installed}
          </label>
          <label
            className="w-10 h-5 "
          >
            <i className={`fas fa-circle text-${ccminerInstalled === 'RUNNING' ? 'emerald' : (ccminerInstalled === 'INSTALLED' ? 'orange' : 'red')}-500 mr-2`}></i>
            CCMiner: {ccminerInstalled}
          </label>
          <label
            className="w-10 h-5 "
          >
            <i className={`fas fa-circle text-${skywireInstalled === 'RUNNING' ? 'emerald' : (skywireInstalled === 'INSTALLED' ? 'orange' : 'red')}-500 mr-2`}></i>
            Skywire: {skywireInstalled}
          </label>
        </div>
      </td>
    </tr>
  );
}
