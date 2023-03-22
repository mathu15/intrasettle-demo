import React, { useRef, useEffect, useState } from "react";

import { WB01IssuanceService } from './WB01IssuanceService';


import { Steps } from "primereact/steps";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

import InformationSubmitted from "../../CBtabmenu/CBHome/CBDCManager/DefCBDCType/InformationSubmitted";
import WBOTSelectAsset from "./WBOTransfer/WBOTSelecAsset";
import WBOTSelectParticipant from "./WBOTransfer/WBOTSelectParticipant";
import WBOTEnterAmount from "./WBOTransfer/WBOTEnterAmount";
import WBOTConfirmTransfer from "./WBOTransfer/WBOTConfirmTransfer";

const WBOTransferCBDC = () => {
  //curent page for  steps is set to default index 0
  const [activeIndex, setActiveIndex] = useState(0);
  const toast = useRef(null);
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
    const [subscriberbalance, setSubscriberbalance] = useState([]);
    const [entityaccounts, setEntityaccounts] = useState([]);
    const [centralaccount, setCentralaccount] = useState({});
    const [subscriberaccount, setSubscriberaccount] = useState({});


   const issuanceService = new WB01IssuanceService();

    useEffect(() => {

        issuanceService.getsubscriberaccount().then(data => {
          setSubscriberaccount(data);
        });

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

        issuanceService.getsubscribebankbalance().then(data => {

            var xx = data.balance.map(function (value) {
                  return { label: value.issuetype ,
                         issuetype : value.issuetype,
                         amount : value.amount
                         };
            });

            setSubscriberbalance(xx);

          });


  issuanceService.getentityaccounts().then(async (data)  => {

            var subscribers = data.centralaccounts;
            var xx = subscribers.map(function (value) {
                  return { label: value.accountnumber,
                        id : value.id,
                        accountholder : value.accountholder,
                        accountnumber : value.accountnumber,
                         };
            });

        var thesubaccount = await issuanceService.getsubscriberaccount();

     var allowedlist = xx.filter(function (val) {
       if(val.accountnumber != thesubaccount.accountnumber  ) return val;
     });

            setEntityaccounts(allowedlist);


          });



    }, []); //

      useEffect(() => {
     var selectedasset = subscriberbalance.filter(function (val) {
       if(val.label === data.asset.label) return val;
     });

    if(selectedasset.length > 0) {
    console.log(selectedasset[0]);
      setData({...data, maxvalue:   selectedasset[0].amount } );
     }

    }, [updateasset]); //

     const sendassetcentral =  async () => {

     console.log("sending");
     var selectedasset = assets.filter(function (val) {
       if(val.label === data.asset.label) return val;
     });

    if(selectedasset.length > 0) {
    console.log(selectedasset[0]);

    var selectedparticipant = entityaccounts.filter(function(val) {

       if(val.label === data.participant.label) return val;

    });

      if(selectedparticipant[0].accountholder == 'central') {
        issuanceService.sendsubscribertocentral(selectedasset[0], subscriberaccount, selectedparticipant[0] ,  data.amount);
     } else {
        issuanceService.sendsubscribertosubscriber(selectedasset[0], subscriberaccount, selectedparticipant[0] ,  data.amount);
     }



     }

   }



  //setting active index tab for steps pages
  const pageDisplay = () => {
    if (activeIndex === 0) {
      return <WBOTSelectAsset data={data} setData={setData}  subscriberbalance={subscriberbalance} setUpdateasset={setUpdateasset} />;
    } else if (activeIndex === 1) {
      return <WBOTSelectParticipant data={data} setData={setData} entityaccounts={entityaccounts} />;
    } else if (activeIndex === 2) {
      return <WBOTEnterAmount data={data} setData={setData} />;
    } else if (activeIndex === 3) {
      return <WBOTConfirmTransfer data={data} setData={setData} />;
    } else if (activeIndex === wizardItems.length) {
      return (
        <InformationSubmitted
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        />
      );
    }
  };

  const accept = () => {
    toast.current.show({
      severity: "info",
      summary: "Confirmed",
      detail: "You have accepted",
      life: 3000,
    });
    // InformationSubmitted();
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
            <Toast ref={toast} />
            <Button
              onClick={() => {
                if (activeIndex === (wizardItems.length-1)) {
                  sendassetcentral(); 
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

export default WBOTransferCBDC;
