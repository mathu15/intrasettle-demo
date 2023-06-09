import React, { useState } from "react";

import { TabMenu } from "primereact/tabmenu";
import CBMint from "./CBHome/CBHomeIsuue/CBMint";
import CBBonds from "./CBHome/CBHomeIsuue/CBBonds";
import CBDCStatus from "./CBHome/CBHomeIsuue/CBDCStatus";
import CBDCMint from "./CBHome/CBHomeIsuue/CBDCMint";
import CBDCAssets from "./CBHome/CBHomeIsuue/CBDCAssets";
import CBHolding from "./CBHome/CBHomeIsuue/CBHolding";
import CBTransfer from "./CBHome/CBHomeIsuue/CBTransfer";
import { useToken } from "../App/useToken";

const CBHome = ({ data, setData }) => {
  const [activeone, setActiveone] = useState(0);
  const [activetwo, setActivetwo] = useState(0);
  const [activethree, setActivethree] = useState(0);

  const usetoken = new useToken();

  const [user, setUser] = useState(usetoken.getUser());

  const DisplayOne = () => {
    if (activeone === 0) {
      return <CBMint data={data} setData={setData} />;
    }
    if (activeone === 1) {
      return <CBTransfer data={data} setData={setData} />;
    }
  };
  const DisplayTwo = () => {
    if (activetwo === 0) {
      return <CBDCAssets data={data} setData={setData} user={user} />;
    } else if (activetwo === 1) {
      return <CBHolding data={data} setData={setData} user={user} />;
    }
  };
  const DisplayThree = () => {
    if (activethree === 0) {
      return <CBDCMint data={data} setData={setData} />;
    } else if (activethree === 1) {
      return <CBDCStatus data={data} setData={setData} />;
    }
  };

  const wizardItems = [
    {
      label: "MINT CBDC ",
      icon: "pi text-2xl pi-fw pi-sort-amount-up-alt",
    },
    {
      label: "CBDC TRANSFER",
      icon: "pi text-2xl pi-fw pi-sort-amount-up-alt",
    },
  ];

  const dataItems = [
    /*{
      label: "MINTABLE CBDC ASSETS",
      icon: "pi text-2xl pi-fw pi-dollar",
    }, */
    {
      label: "LEDGER CBDC ",
      icon: "pi text-2xl pi-fw pi-sun",
    },
    {
      label: "HOLDINGS",
      icon: "pi text-2xl pi-fw pi-sun",
    },
  ];

  const dataStates = [
    {
      label: "MINT TRANSACTIONS",
      icon: "pi text-2xl pi-fw pi-user",
    },
    {
      label: "LEDGER TRANSACTIONS",
      icon: "pi text-2xl pi-fw pi-user",
    },
  ];

  return (
    <>
      <div className="grid p-fluid p-5">
        <div className="row-12  col-6 md:col-6 p-5">
          <div className="card card-w-title border-1 border-100 h-full">
            <TabMenu
              model={wizardItems}
              activeIndex={activeone}
              onTabChange={(e) => setActiveone(e.index)}
              id={wizardItems.id}
              style={{ fontSize: "1.2rem" }}
            />
            {DisplayOne()}
          </div>
        </div>
        <div className="row-12  col-12 md:col-6 p-5">
          <div className="card card-w-title border-1 border-100 ">
            <TabMenu
              model={dataItems}
              id={dataItems.id}
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
            id={dataStates.id}
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

export default CBHome;
