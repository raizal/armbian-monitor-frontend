import React, {useState} from "react";

// components
import CardSTB from "../../components/Cards/CardSTB";
import {useSelector} from "react-redux";
import CardTable from "../../components/Cards/CardTable";
import CardTableRow from "../../components/Cards/CardTableRow";
import ConfigModal from "../../components/Form/ConfigModal";

const titles = [
  {
    name: 'name',
    title: 'Device Name'
  },
  {
    name: 'ip',
    title: 'IP'
  },
  {
    name: 'temp',
    title: 'Temp (°C)'
  },
  {
    name: 'hashrate',
    title: 'Hashrate'
  },
  {
    name: 'status',
    title: 'Status'
  },
]

export default function Dashboard() {
  const { list } = useSelector((state) => state.sshStb)


  // return (
  //   <CardTable
  //     titles={titles.map(item => item.title)}
  //     content={list.map((stb, index) => <CardTableRow
  //       {...stb}
  //       color={index % 2 === 0 ? 'light' : 'dark'}
  //     />)}
  //   />
  // )
  return (
    <>
      <ConfigModal/>
      <div className="flex flex-wrap mt-4">
        {(list || []).map(stb => (
          <div className="w-full 2xl:w-6/12 xl:w-3/12 md:w-4/12 px-4">
            <CardSTB
              key={stb.name}
              {...stb}
            />
          </div>
        ))}
      </div>
    </>
  );
}
