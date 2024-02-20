import React from "react";
import PropTypes from "prop-types";

// components

import TableDropdown from "components/Dropdowns/TableDropdown.js";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';

const DEFAULT_TITLES = [
  "Project",
  "Budget",
  "Status",
  "Users",
  "Completion",
  " "
]

export default function CardTable({ color, content, sort = 'hostname', order = 'asc', onHeaderClick = () => {} }) {
  const orderIcon = order ? <i className={`fas fa-angle-${order === 'asc' ? 'up' : 'down'} border-blueGray-100 ml-4`}></i> : null
  return (
    <>
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
          (color === "light" ? "bg-white" : "bg-lightBlue-900 text-white")
        }
      >
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <Table className="items-center w-full bg-transparent border-collapse">
            <Thead>
              <Tr>
                <Th
                  style={{
                    width: '150px'
                  }}
                  onClick={() => onHeaderClick('hostname', order === 'asc' ? 'desc' : 'asc')}
                  className={
                    "cursor-pointer px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  STB {sort === 'hostname' && orderIcon}
                </Th>
                <Th
                  style={{
                    width: '200px'
                  }}
                  onClick={() => onHeaderClick('ip', order === 'asc' ? 'desc' : 'asc')}
                  className={
                    "cursor-pointer px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Net Info {sort === 'ip' && orderIcon}
                </Th>
                <Th
                  className={
                    "cursor-pointer px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                  onClick={() => onHeaderClick('cpu', order === 'asc' ? 'desc' : 'asc')}
                >
                  CPU {sort === 'cpu' && orderIcon}
                </Th>
                <Th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Workername
                </Th>
                <Th
                  className={
                    "cursor-pointer px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                  onClick={() => onHeaderClick('speed', order === 'asc' ? 'desc' : 'asc')}
                >
                  Speed  {sort === 'speed' && orderIcon}
                </Th>
                <Th
                  className={
                    "cursor-pointer px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                  onClick={() => onHeaderClick('lastUpdate', order === 'asc' ? 'desc' : 'asc')}
                >
                  Last Share  {sort === 'lastUpdate' && orderIcon}
                </Th>
                <Th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Actions
                </Th>
              </Tr>
            </Thead>
            <Tbody>
            {content}
            </Tbody>
          </Table>
        </div>
      </div>
    </>
  );
}

CardTable.defaultProps = {
  color: "light",
};

CardTable.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
