const url = "https://sailsg1.thebsv.tech/";
class IssuanceServiceWBOB {
  sendcentraltosubscriber(assetid, assetname, participant, amount) {
    const payload = {
      method: "POST",
      body: JSON.stringify({
        asset: {
          assetid: assetid,
          issuetype: assetname,
        },
        amount: amount,
        central: {
          accountholder: "central",
          accountnumber: "CAC-CEN901-0001",
        },
        subscriber: {
          accountholder: "subscriber",
          accountnumber: participant,
        },
      }),
    };
    return fetch(
      url + "/centralbank/sendcentraltosubscriber",
      payload
    )
      .then((res) => res.json())
      .then((response) => {
        // alert("success");
        console.log(response);
      })
      .catch((e) => {
        console.log("e", e);
      });
  }
  sendsubscribertosubscriber(assetid, assetname, participant, amount) {
    const payload = {
      method: "POST",
      body: JSON.stringify({
        asset: {
          assetid: assetid,
          issuetype: assetname,
        },
        amount: amount,
        subscriber1: {
          accountholder: "subscriber",
          accountnumber: "CAC-SUB901-0001",
        },
        subscriber2: {
          accountholder: "subscriber",
          accountnumber: participant,
        },
      }),
    };
    return fetch(
      url + "/centralsettler/sendsubscribertosubscriber",
      payload
    )
      .then((res) => res.json())
      .then((response) => {
        // alert("success");
        console.log(response);
      })
      .catch((e) => {
        console.log("e", e);
      });
  }

  getcentralaccount() {
    return fetch(url + "/centralbank/getcentralaccount").then(
      (res) => res.json()
    );
  }

  mintasset(assetid, centralaccount, mintamount) {
    const payload = {
      method: "POST",
      body: JSON.stringify({
        asset: {
          assetid: assetid,
          issuetype: centralaccount,
        },
        amount: mintamount,
      }),
    };
    return fetch(url + "/centralbank/mintasset", payload)
      .then((res) => res.json())
      .then((response) => {
        // alert("success");
        console.log(response);
      })
      .catch((e) => {
        console.log("e", e);
      });
  }

  centralasset(assetid, centralaccount, mintamount) {
    const payload = {
      method: "POST",
      body: JSON.stringify({
        centralentity: {
          entityid: "CAC-ENT901-0001",
        },
        issue: {
          enityname: "Asset authority",
          assetid: assetid,
          issuetype: "Cash_BINR",
          issuer: "BBI",
          contract: "I promise to pay the bearer 1 Rs ",
          amount: mintamount,
        },
      }),
    };
    return fetch(url + "/centralbank/createcentralasset", payload)
      .then((res) => res.json())
      .then((response) => {
        // alert("success");
        // toast.success("success");
        console.log(response);
      })
      .catch((e) => {
        console.log("e", e);
      });
  }

  entitymintasset(asset, centralaccount, mintamount) {
    const payload = {
      method: "POST",
      body: JSON.stringify({
        asset: {
          assetid: asset,
          issuetype: centralaccount,
        },
        amount: mintamount,
      }),
    };

    return fetch( url + "/centralbank/entitymintasset", payload)
      .then((res) => res.json())
      .then((response) => {
        // alert("success");
        // toast.success("transfered");
        console.log(response);
      })
      .catch((e) => {
        console.log("e", e);
      });
  }

  placebuyorder(price, amount) {
    const payload = {
      method: "POST",
      body: JSON.stringify({
        pairname: "Digital_USD-Digital_INR",
        side: "buyside",
        price: price,
        amount: amount,
        traderaccount: {
          accountholder: "subscriber",
          accountnumber: "CAC-SUB901-0001",
        },
        firstissuetype: "Digital_USD",
        secondissuetype: "Digital_INR",
      }),
    };

    return fetch(url + "/exchange/createorder", payload)
      .then((res) => res.json())
      .then((response) => {
        // alert("success");
        // toast.success("transfered");
        console.log(response);
      })
      .catch((e) => {
        console.log("e", e);
      });
  }


  placesellorder(price, amount) {
    const payload = {
      method: "POST",
      body: JSON.stringify({
        pairname: "Digital_USD-Digital_INR",
        side: "sellside",
        price: price,
        amount: amount,
        traderaccount: {
          accountholder: "subscriber",
          accountnumber: "CAC-SUB901-0001",
        },
        firstissuetype: "Digital_USD",
        secondissuetype: "Digital_INR",
      }),
    };

    return fetch( url + "/exchange/createorder", payload)
      .then((res) => res.json())
      .then((response) => {
        // alert("success");
        // toast.success("transfered");
        console.log(response);
      })
      .catch((e) => {
        console.log("e", e);
      });
  }

  makeassetavailble(assetid, centralaccount, mintamount) {
    const payload = {
      asset: {
        assetid: assetid,
        issuetype: "Cash_BINR",
      },
      amount: mintamount,
      operationaccount: {
        accountholder: "central",
        accountnumber: "CAC-CEN901-0001",
      },
    };
    return fetch(
      url + "/centralbank/makeassetavailableincentralbank",
      payload
    )
      .then((res) => res.json())
      .then((response) => {
        alert("success");
        // toast.success("success");
        console.log(response);
      })
      .catch((e) => {
        console.log("e", e);
      });
  }

  getassets() {
    const payload = {
      method: "POST",
      body: JSON.stringify({
        entity: "test",
      }),
    };
    return fetch(url + "/centralbank/getassets", payload).then(
      (res) => res.json()
    );
  }

  getsubscribers() {
    const payload = {
      method: "POST",
      body: JSON.stringify({
        entity: "test",
      }),
    };
    return fetch(
      url + "/centralbank/getsubscribers",
      payload
    ).then((res) => res.json());
  }

  getCentralToSubscriber() {
    const payload = {
      method: "POST",
      body: JSON.stringify({
        entity: "test",
        asset: "test",
        amount: "test",
        fromaccount: "test",
        toaccount: "test",
      }),
    };
    return fetch(
      url + "/centralbank/sendcentraltosubscriber",
      payload
    ).then((res) => res.json());
  }

  // get api for fx rates

  fetchexchangerates() {
    return fetch("https://api.exchangerate.host/latest?base=USD").then((res) =>
      res.json()
    );
  }
}

export { IssuanceServiceWBOB };
