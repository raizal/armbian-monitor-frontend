import React from "react";
import PagesDropdown from "../Dropdowns/PagesDropdown";
import { sshScan } from '../../actions/ssh-stb'
import { showModal } from "../../actions/config-modal";
import {useDispatch, useSelector} from "react-redux";
import {Link, useHistory} from 'react-router-dom';
import packageJson from '../../../package.json'

export default function Navbar() {
  const dispatch = useDispatch()
  const { scanning } = useSelector((state) => state.sshStb)
  const { isMobile } = useSelector(state => state.responsive)
  const [ menuOpen, setMenuOpen ] = React.useState(false);
  const history = useHistory();

  return (
    <>
      {/* Navbar */}
      <nav
        className="fixed top-0 w-full z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4 bg-lightBlue-600 ">
        <div className="w-full mx-autp items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
          {/* Brand */}
          <div className="w-full relative flex justify-between lg:w-auto px-4 lg:static lg:block lg:justify-start">
            <a
              className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap text-white"
              href="#"
              onClick={() => {
                history.push("/")
                setMenuOpen(false)
              }}
            >
              STB MINERS MONITOR (<span className="font-bold">v{packageJson.version}</span>)
            </a>
            <button
              className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <i className="fas fa-bars"></i>
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center" +
              (menuOpen ? " flex" : " hidden")
            }
            id="example-navbar-info"
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              {/*<li className="nav-item">*/}
              {/*  <PagesDropdown/>*/}
              {/*</li>*/}
              <li className="nav-item">
                <a
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    // if (!isMobile) {
                    //   dispatch(showModal())
                    // } else {
                    history.push('/settings')
                    // }
                    setMenuOpen(false)
                  }}
                >
                  Settings
                </a>
              </li>
            </ul>
          </div>
          {/*<ul className="flex flex-col lg:flex-row list-none lg:ml-auto mr-2">*/}
          {/*  <li className="flex items-center">*/}
          {/*    <button*/}
          {/*      className="px-1 py-1 mx-4"*/}
          {/*      onClick={(e) => {*/}
          {/*        if (!scanning) {*/}
          {/*          e.preventDefault()*/}
          {/*          dispatch(sshScan())*/}
          {/*        }*/}
          {/*      }}*/}
          {/*    >*/}
          {/*      <span*/}
          {/*        className={`${scanning ? 'text-white opacity-50' : 'text-white'} font-normal text-center text-base items-center justify-center flex flex-col`}>*/}
          {/*          <i className="fas fa-podcast"></i>*/}
          {/*          Scan*/}
          {/*      </span>*/}
          {/*    </button>*/}
          {/*  </li>*/}
          {/*</ul>*/}

          {/* Form */}
          {/*<form className="md:flex hidden flex-row flex-wrap items-center lg:ml-auto mr-3">*/}
          {/*  <div className="relative flex w-full flex-wrap items-stretch">*/}
          {/*    <span*/}
          {/*      className="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">*/}
          {/*      <i className="fas fa-search"></i>*/}
          {/*    </span>*/}
          {/*    <input*/}
          {/*      type="text"*/}
          {/*      placeholder="Search here..."*/}
          {/*      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full pl-10"*/}
          {/*    />*/}
          {/*  </div>*/}
          {/*</form>*/}
          {/* User */}
          {/*<ul className="flex-col md:flex-row list-none items-center hidden md:flex">*/}
          {/*  <UserDropdown />*/}
          {/*</ul>*/}
        </div>
      </nav>
      {/* End Navbar */}
    </>
  );
}
