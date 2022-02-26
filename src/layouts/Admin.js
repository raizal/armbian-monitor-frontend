import React, {useEffect, useState} from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { ToastContainer } from 'react-toastify';

// components

import AdminNavbar from "components/Navbars/AdminNavbar.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";

// views

import Dashboard from "views/admin/Dashboard.js";
import Settings from "views/admin/Settings.js";
import {setIsMobile} from "../actions/responsive";
import {useDispatch} from "react-redux";
import ConfigModal from "../components/Form/ConfigModal";
import SetThreadModal from "../components/Form/SetThreadModal";
import SetHostnameModal from "../components/Form/SetHostnameModal";

export let isMobile = false

export default function Admin() {
  const dispatch = useDispatch()

  function handleWindowSizeChange() {
    isMobile = window.innerWidth <= 768;
    dispatch(setIsMobile(isMobile))
  }

  useEffect(() => {
    handleWindowSizeChange()
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    }
  }, []);

  return (
    <>
      <ToastContainer/>
      {/*<Sidebar />*/}
      <SetThreadModal/>
      <SetHostnameModal/>
      <div className="relative bg-blueGray-100 pt-24">
        {/* Header */}
        <AdminNavbar />
        {/*<HeaderStats />*/}
        <div className="px-4 md:px-5 mx-auto w-full md:m-auto">
          <Switch>
            <Route path="/" exact component={Dashboard} />
            {/*<Route path="/admin/maps" exact component={Maps} />*/}
            <Route path="/settings" exact component={Settings} />
            {/*<Route path="/admin/tables" exact component={Tables} />*/}
            {/*<Route path="/admin/terminal/:id" component={STBTerminal}/>*/}
            {/*<Redirect from="/admin" to="/admin/dashboard" />*/}
            {/*<Redirect from="/" to="/admin/dashboard" />*/}
          </Switch>
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}
