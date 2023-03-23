import React, { useState } from "react";

import { TabMenu } from "primereact/tabmenu";

import WBTransferCBDC from "./HomeWBO/WBTransferCBDC";
import WBRequestDVP from "./HomeWBO/WBRequestDVP";
import WBCBDCAssets from "./HomeWBO/WBCBDCAssets";
import WBBonds from "./HomeWBO/WBBonds";
import WBCbdcStates from "./HomeWBO/WBCbdcStates";
import WBMAC from "./HomeWBO/WBMAC";

const WBOHome = ({ data, setData }) => {
  const [activeone, setActiveone] = useState(0);
  const [activetwo, setActivetwo] = useState(0);
  const [activethree, setActivethree] = useState(0);

  const DisplayOne = () => {
    if (activeone === 0) {
      return <WBTransferCBDC data={data} setData={setData} />;
    } else if (activeone === 1) {
      return <WBRequestDVP data={data} setData={setData} />;
    }
  };
  const DisplayTwo = () => {
    if (activetwo === 0) {
      return <WBCBDCAssets data={data} setData={setData} />;
    } else if (activetwo === 1) {
      return <WBBonds data={data} setData={setData} />;
    }
  };
  const DisplayThree = () => {
    if (activethree === 0) {
      return <WBCbdcStates data={data} setData={setData} />;
    } else if (activethree === 1) {
      return <WBMAC data={data} setData={setData} />;
    }
  };

  const wizardItems = [
    {
      label: "TRANSFER CBDC",
      icon: "pi pi-fw pi-arrow-right-arrow-left",
    },
/*
    {
      label: "REQUEST DVP",
      icon: "pi pi-fw pi-arrows-alt",
    },
*/
  ];

  const dataItems = [
    {
      label: "CBDC ASSETS",
      icon: "pi pi-fw pi-dollar",
    },
/*
    {
      label: "BONDS",
      icon: "pi pi-fw pi-sun",
    },
*/
  ];

  const dataStates = [
    {
      label: "CBDC TRANSACTIONS",
      icon: "pi pi-fw pi-user",
    },
/*
    {
      label: "MEMBER ACCESS STATES",
      icon: "pi pi-fw pi-user",
    },
*/
  ];

  return (
    <>
      <div className="grid p-fluid p-5">
        <div className="row-12  col-6 md:col-6 p-5">
          <div className="  card card-w-title border-1 border-100  ">
            <TabMenu
              model={wizardItems}
              activeIndex={activeone}
              onTabChange={(e) => setActiveone(e.index)}
              style={{ fontSize: "1.2rem" }}
            />
            {DisplayOne()}
          </div>
        </div>
        <div className="row-12  col-12 md:col-6 p-5">
          <div className=" card card-w-title border-1 border-100 ">
            <TabMenu
              model={dataItems}
              activeIndex={activetwo}
              onTabChange={(e) => setActivetwo(e.index)}
              style={{ fontSize: "1.2rem" }}
            />
            {DisplayTwo()}
          </div>
        </div>
      </div>
      <div className="row-12  col-12  p-6">
        <div className="card card-w-title border-1 border-100 ">
          <TabMenu
            model={dataStates}
            activeIndex={activethree}
            onTabChange={(e) => setActivethree(e.index)}
            style={{ fontSize: "1.2rem" }}
          />
          {DisplayThree()}
        </div>
      </div>
    </>
  );
};

export default WBOHome;
