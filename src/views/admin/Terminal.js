import React, {useCallback, useEffect, useMemo, useState} from "react";
import Terminal, {ColorMode, TerminalInput, TerminalOutput} from 'react-terminal-ui';
import {useSelector} from "react-redux";
import socket from "../../actions/socket";

// components

export default function STBTerminal({ match }) {
  const { id } = match.params
  const { list } = useSelector((state) => state.sshStb)

  const current = useMemo(() => {
    return list.find((item) => item && item._id === id)
  }, [list, id]);

  const [terminalLineData, setTerminalLineData] = useState([]);

  useEffect(() => {
    if (!current) {
      return;
    }
    const event = `terminal-${current.hostname}`;
    socket.on(event, ({result}) => {
      setTerminalLineData([
        ...terminalLineData,
        <TerminalOutput>{result}</TerminalOutput>
      ])
    });
    return () => {
      socket.off(event);
    }
  }, [current, terminalLineData]);

  const send = useCallback((cmd) => {
    if (!current) {
      return;
    }
    if (cmd === 'clear') {
      setTerminalLineData([]);
      return;
    }
    console.log('SEND ', cmd);
    setTerminalLineData([
      ...terminalLineData,
      <TerminalInput>{cmd}</TerminalInput>
    ]);
    socket.emit('web-client-send', {
      action: 'CMD',
      payload: {
        command: cmd,
        id: current._id,
      }
    })
  }, [current, terminalLineData]);

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full px-4 h-[100vh]">
          <Terminal
            name={current ? current.hostname : 'connecting...'}
            colorMode={ ColorMode.Dark }
            onInput={send}>
            {terminalLineData}
          </Terminal>
        </div>
      </div>
    </>
  );
}
