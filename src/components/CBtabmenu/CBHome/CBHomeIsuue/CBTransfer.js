import React, { useEffect, useState } from "react";

import { IssuanceService } from '../IssuanceService';

import { Steps } from "primereact/steps";
import { Button } from "primereact/button";

import InformationSubmitted from "../CBDCManager/DefCBDCType/InformationSubmitted";
import SelectAssetCBTrans from "./CBTransfer/SelectAssetCBTrans";
import SelectParticipantCBTrans from "./CBTransfer/SelectParticipantCBTrans";
import EnterAmountCBTrans from "./CBTransfer/EnterAmountCBTrans";
import ConfirmTransferCBTrans from "./CBTransfer/ConfirmTransferCBTrans";

const CBTransfer = () => {
  //curent page for  steps is set to default index 0
  const [activeIndex, setActiveIndex] = useState(0);

  //initial state fo user input
  const [data, setData] = useState({
    asset: "",
    decimal: 2,
    notary: "",
    participant: "",
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
  });

    const [tokenuser, setTokenuser] = useState(false);
    const [updateasset, setUpdateasset] = useState('');
    const [participant, setParticipant] = useState('');
    const [assets, setAssets] = useState([]);
    const [centralbalance, setCentralbalance] = useState([]);
    const [subscribers, setSubscribers] = useState([]);
    const [centralaccount, setCentralaccount] = useState({});


   const issuanceService = new IssuanceService();

   useEffect(() => {

        issuanceService.getcentralaccount().then(data => {
          setCentralaccount(data);
        });

        issuanceService.getassets().then(data => {

            var xx = data.map(function (value) {
                  return { label: value.issuetype ,
                         id: value.id, entityid: value.entityid,
                         issueaccountnumber : value.issueaccountnumber,
                         assetid : value.assetid,
                         issuetype : value.issuetype,
                         amount : value.amount
                         };
            });

            setAssets(xx)

          });

        issuanceService.getcentralbalance().then(data => {

            var xx = data.balance.map(function (value) {
                  return { label: value.issuetype ,
                         issuetype : value.issuetype,
                         amount : value.amount
                         };
            });

            setCentralbalance(xx);

          });

/*

          issuanceService.getsubscribers().then(data => {

            var subscribers = data[0].subscribers;
            var xx = subscribers.map(function (value) {
                  return { label: value.subscribername,
                        id : value.id,
                        accountholder : value.accountholder,
                        accountnumber : value.accountnumber,
                        entityid: value.entityid };
            });
            setSubscribers(xx)

          });
*/

     issuanceService.getsubscriberaccounts().then(data => {

            var subscribers = data.centralaccounts;
            var xx = subscribers.map(function (value) {
                  return { label: value.accountnumber,
                        id : value.id,
                        accountholder : value.accountholder,
                        accountnumber : value.accountnumber,
                         };
            });
            setSubscribers(xx)

          });


     
    }, []); //

    useEffect(() => {
     var selectedasset = centralbalance.filter(function (val) {
       if(val.label === data.asset.label) return val;
     });

    if(selectedasset.length > 0) {
    console.log(selectedasset[0]);
      setData({...data, maxvalue:   selectedasset[0].amount } );
     }

    }, [updateasset]); //

     const sendasset =  async () => {

     console.log("sending");
     var selectedasset = assets.filter(function (val) {
       if(val.label === data.asset.label) return val;
     });

    if(selectedasset.length > 0) {
    console.log(selectedasset[0]);

    var selectedparticipant = subscribers.filter(function(val) {

       if(val.label === data.participant.label) return val;

    });

     issuanceService.sendcentraltosubscriber(selectedasset[0], centralaccount.accountnumber , selectedparticipant[0].accountnumber, data.amount);
     }

   }



  // const url =
  // datas.id? "https://thebsv.tech/centralbank/getassets/" + datas.id:
  // "https://thebsv.tech/centralbank/createcentralasset";
  //     "https://thebsv.tech/centralbank/makeassetavailableincentralbank";
  //   fetch(url, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json; charset-UTF-8",
  //     },
  //     body: JSON.stringify(datas),
  //   })
  //     .then((response) => response.json())
  //     .then((response) => {
  //       console.log(response);
  //       alert("success");
  //       setDatas(response);
  //     })

  //     .catch((e) => {
  //       console.log("e", e);
  //     });
  // };
  // console.log(datas);

  //setting active index tab for steps pages
  const pageDisplay = () => {
    if (activeIndex === 0) {
      return <SelectAssetCBTrans data={data} setData={setData}  centralbalance={centralbalance} setUpdateasset={setUpdateasset}  />;
    } else if (activeIndex === 1) {
      return <SelectParticipantCBTrans data={data} setData={setData}  subscribers = {subscribers}  />;
    } else if (activeIndex === 2) {
      return <EnterAmountCBTrans data={data} setData={setData} />;
    } else if (activeIndex === 3) {
      return <ConfirmTransferCBTrans data={data} setData={setData} />;
    } else if (activeIndex === wizardItems.length) {
      return (
        <InformationSubmitted
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        />
      );
    }
  };

  const wizardItems = [
    { label: "Select Asset" },
    {
      label: "Select Participant",
    },
    {
      label: "Enter Amount",
    },
    {
      label: "Confirm Transfer",
    },
  ];
  return (
    <div className="col-12 ">
      <div className="card card-w-title">
        {/* implementing steps */}

        <Steps
          model={wizardItems}
          activeIndex={activeIndex}
          onSelect={(e) => setActiveIndex(e.index)}
          readOnly={false}
          style={{ fontSize: "1.4rem" }}
          className="p-5 m-3 text-3xl"
        />
      </div>
      <div className="card justify-content-center align-items-center pb-6">
        {
          //display the steps pages SelectAsset, SelectPaticipant, EnterAmount, ConfirmIssuance
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
            <Button
              onClick={() => {
                if( activeIndex === (wizardItems.length -1)) {
                  sendasset();
                }

                if (activeIndex === wizardItems.length) {
                } else {
                     
                  setActiveIndex((curPage) => curPage + 1);
                }
              }}
              label={activeIndex === wizardItems.length - 1 ? "TRANSFER" : "NEXT"}
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

export default CBTransfer;
