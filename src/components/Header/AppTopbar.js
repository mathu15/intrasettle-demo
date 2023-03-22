import React, { useState } from "react";

import { Link, NavLink, Route, useHistory } from "react-router-dom";
import { BsBank, BsGlobe2 } from "react-icons/bs";
import { useToken } from "../App/useToken";
import classNames from "classnames";

export const AppTopbar = (props) => {
  const history = useHistory();
  const usetoken = new useToken();
  const [user, setUser] = useState(usetoken.getUser());

  const Redirectnonconfigured = () => {
    if (!user || user.marker == "") {
      alert("The system is not configured");
      history.push("/");
    }
  };
  return (
    <div className="layout-topbar flex justify-content-between">
      <Link to="/" className="layout-topbar-logo">
        <img
          className="h-4rem"
          src={"images/intrasettle_White.svg"}
          alt="intrasettle"
        />

        {/* <span>Deployer</span> */}
      </Link>

      <div className="flex pr-8">
        <div>
          <BsGlobe2 className="text-3xl mr-3 text-blue-500" />
          <span className="text-2xl">
            The {user.organization} , Powered by Intrasettle
          </span>
        </div>
      </div>
      {/* <button
        type="button"
        className="p-link layout-topbar-menu-button layout-topbar-button"
        onClick={props.onMobileTopbarMenuClick}
      >
        <i className="pi pi-ellipsis-v" />
      </button> */}

      {/* <ul
        className={classNames("layout-topbar-menu lg:flex origin-top", {
          "layout-topbar-menu-mobile-active": props.mobileTopbarMenuActive,
        })}
      > */}
      <div>
        <NavLink to="/">
          <span className="text-xl">LOGOUT</span>
        </NavLink>
        <button
          className="p-link layout-topbar-button"
          // onClick={props.onMobileSubTopbarMenuClick}
        >
          <i className=" pi pi-power-off text-2xl" />
          {/* <span>Logout</span> */}
        </button>
      </div>
      {/* </ul> */}
    </div>
  );
};
