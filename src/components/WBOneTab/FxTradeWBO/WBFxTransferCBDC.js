import React, { useRef, useState } from "react";

import { Steps } from "primereact/steps";
import { Button } from "primereact/button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import InformationSubmitted from "../../CBtabmenu/CBHome/CBDCManager/DefCBDCType/InformationSubmitted";

import { IssuanceServiceWBFx } from "./issuanceServiceWBFx";
import WBOFxSelecAsset from "./WBOFxTransfer/WBOFxSelecAsset";
import WBOFxEnterAmount from "./WBOFxTransfer/WBOFxEnterAmount";
import WBOFxSelectExRate from "./WBOFxTransfer/WBOFxSelectExRate";
import WBOFxConfirmTransfer from "./WBOFxTransfer/WBOFxConfirmTransfer";
import WBOFxSelecFromAcc from "./WBOFxTransfer/WBOFxSelecFromAcc";
import WBOFxSelecToAcc from "./WBOFxTransfer/WBOFxSelecToAcc";
const WBOFxTransferCBDC = () => {
  //curent page for  steps is set to default index 0
  const [activeIndex, setActiveIndex] = useState(0);

  //initial state fo user input
  const [data, setData] = useState({
    assetid: "",
    assetid1: "",
    decimal: 2,
    notary: "",
    amount: 0,
    total: 25000000,
    remaining: 25000000,
    option: "",
    access: true,
    select: "",
    accesconrol: "",
    confirm: "",
    transvalue: "",
    maxvalue: 10000000,
    minvalue: "",
    displayvalue: "",
    fromaccount: "",
    toaccount: "",
  });
  const [data1, setData1] = useState({
    assetid: "",
    assetid1: "",
    decimal: 2,
    notary: "",
    amount: 0,
    total: 25000000,
    remaining: 25000000,
    option: "",
    access: true,
    select: "",
    accesconrol: "",
    confirm: "",
    transvalue: "",
    maxvalue: 10000000,
    minvalue: "",
    displayvalue: "",
    fromaccount: "",
    toaccount: "",
  });

  //setting active index tab for steps pages
  const pageDisplay = () => {
    if (activeIndex === 0) {
      return <WBOFxSelecFromAcc data={data} setData={setData} />;
    } else if (activeIndex === 1) {
      return <WBOFxSelecToAcc data={data} setData={setData} />;
    } else if (activeIndex === 2) {
      return <WBOFxSelecAsset data={data} setData={setData} />;
    } else if (activeIndex === 3) {
      return <WBOFxEnterAmount data={data} setData={setData} />;
    } else if (activeIndex === 4) {
      return <WBOFxConfirmTransfer data={data} setData={setData} />;
    } else if (activeIndex === wizardItems.length) {
      return (
        <InformationSubmitted
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        />
      );
    }
  };

  const text = data.assetid.label;
  // const subscriber = data.notary.label;
  const myArray = text || text !== undefined ? text.split(",") : "";
  // const wholesale =
  //   subscriber || subscriber !== undefined ? subscriber.split(",") : "";
  // const account = 'CAC-SUB901-0001';
  const issuanceServiceWBFx = new IssuanceServiceWBFx();
  const transferassets = async () => {
    if (data.fromaccount.label === "Operation Account") {
      issuanceServiceWBFx.sendoperationtotrader(
        // data.fromaccount,
        // data.toaccount,
        data.amount,
        myArray[1],
        myArray[0]

        // wholesale[1],
        // account
      );
    } else {
      issuanceServiceWBFx.sendtradertooperation(
        // data.fromaccount,
        // data.toaccount,
        data.amount,
        myArray[1],
        myArray[0]

        // wholesale[1],
        // account
      );
    }
  };

  const showSuccess = () => {
    toast.success(
      `Successfully transfered ${data.amount} ${myArray[0]} form ${data.fromaccount.label} to ${data.toaccount.label}`,
      {
        // position: "top-right",
        // autoClose: 5000,
        // hideProgressBar: false,
        // closeOnClick: true,
        // pauseOnHover: true,
        // draggable: true,
        // progress: undefined,
        // theme: "colored",
        // theme: "dark",
      }
    );
  };

  const clickHandler = () => {
    showSuccess();
    setActiveIndex(wizardItems.length);
    transferassets();
    setData(data1);
  };

  const wizardItems = [
    { label: "From Account" },
    { label: "To Account" },
    { label: "Select Asset" },
    {
      label: "Enter Amount",
    },
    {
      label: "Confirm Transfer",
    },
  ];
  return (
    <div className="col-12 ">
      <div className="card border-1 border-100 bg-gray-800 card-w-title">
        {/* implementing steps */}

        <Steps
          model={wizardItems}
          activeIndex={activeIndex}
          onSelect={(e) => setActiveIndex(e.index)}
          readOnly={false}
          style={{ fontSize: "1.4rem" }}
          className="p-5 m-3 text-2xl"
        />
      </div>
      <div className="card justify-content-center align-items-center pb-6">
        {
          //display the steps pages Select Asset, Select Participant, Enter Amount, Confirm Transfer
          pageDisplay()
        }
      </div>
      <div className="p-5">
        <div className="flex align-items-center justify-content-between">
          <div className="w-6rem h-5rem text-white font-bold flex align-items-center justify-content-center   mr-3">
            <Button
              disabled={activeIndex === 0}
              onClick={() => {
                setActiveIndex((curPage) => curPage - 1);
              }}
              label="BACK"
              style={{
                display: activeIndex === wizardItems.length ? "none" : "block",
              }}
            />
          </div>
          <div className="w-6rem  text-white font-bold flex align-items-center justify-content-center   mr-3">
            <ToastContainer
              // position="top-right"
              // autoClose={5000}
              // hideProgressBar={false}
              // newestOnTop={false}
              // closeOnClick
              // rtl={false}
              // pauseOnFocusLoss
              // draggable
              // pauseOnHover
              // theme="colored"
              className="text-2xl"
              style={{ width: "70rem" }}
            />
            <Button
              onClick={() => {
                if (activeIndex === wizardItems.length) {
                  <InformationSubmitted
                    activeIndex={activeIndex}
                    setActiveIndex={setActiveIndex}
                  />;
                } else if (activeIndex === wizardItems.length - 1) {
                  clickHandler();
                } else {
                  setActiveIndex((curPage) => curPage + 1);
                }
              }}
              label={activeIndex === wizardItems.length - 1 ? "ISSUE" : "NEXT"}
              style={{
                display: activeIndex === wizardItems.length ? "none" : "block",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WBOFxTransferCBDC;
