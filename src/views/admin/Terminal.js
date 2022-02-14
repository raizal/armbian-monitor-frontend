import React, {useState} from "react";
import Terminal, { ColorMode, LineType } from 'react-terminal-ui';
import {useSelector} from "react-redux";

// components

export default function STBTerminal({ match }) {
  const [terminalLineData, setTerminalLineData] = useState([
    {type: LineType.Output, value: 'COMING SOON 🙏'},
    {type: LineType.Input, value: 'uname -a'},
    {type: LineType.Output, value: 'Linux stb203 5.1.0-aml-s905 #5.90 SMP PREEMPT Mon Jul 1 16:07:35 MSK 2019 aarch64 aarch64 aarch64 GNU/Linux'},
  ]);

  const { id, ip } = match.params
  const { list } = useSelector(state => state.sshStb)
  const stb = list.find(item => item.name === id)

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full px-4">
          <Terminal
            name={id}
            colorMode={ ColorMode.Dark }
            lineData={ terminalLineData }
            onInput={ terminalInput => console.log(`New terminal input received: '${ terminalInput }'`) }/>
        </div>
      </div>
    </>
  );
}
