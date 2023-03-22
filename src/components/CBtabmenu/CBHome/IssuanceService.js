import { useToken } from "../../App/useToken";
import { useState } from "react";

const url = "https://sailsg1.thebsv.tech";

const usetoken = new useToken();

const theuser = usetoken.getUser();

class IssuanceService {
  findaccountowner(accountowners, acct) {
    var subacct = accountowners.filter((xx) => {
      if (xx.subcentralaccountnumber == acct) return true;
    });

    var accountname;
    if (subacct.length == 0) {
      var gg = accountowners.filter((xx) => {
        if (xx.centralaccountnumber == acct || xx.entityaccountnumber == acct)
          return true;
      });

      accountname = gg[0] ? gg[0].organization : "NA";
    } else {
      accountname = subacct[0].organization;
    }
    return accountname;
  }

  getuser() {
    return usetoken.getUser();
  }

  sendcentraltosubscriber(
    asset,
    centralaccount = 0,
    subscriberaccount = 0,
    amount
  ) {
    const payload = {
      method: "POST",
      headers: {
        Authorization: usetoken.getToken(),
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        asset: asset,
        subscriberaccount: subscriberaccount,
        centralaccount: centralaccount,
        amount: amount,
      }),
    };
    return fetch(url + "/centralbank/sendcentraltosubscriber", payload)
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        alert("success");
      });
  }

  getentitybalance() {
    const payload = { headers: { Authentication: usetoken.getToken() } };
    return fetch(
      url + "/getbalance/" + theuser.entityaccountnumber,
      payload
    ).then((res) => res.json());
  }

  getcentralaccount() {
    return fetch(
      url + "/centralbank/getaccount/" + theuser.centralaccountnumber
    ).then((res) => res.json());
  }

  // meant to send from entity account to ledger account
  mintasset(asset, entityaccount = 0, centralaccount = 0, mintamount) {
    const payload = {
      method: "POST",
      headers: {
        Authorization: usetoken.getToken(),
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        asset: asset,
        entityaccount: entityaccount,
        centralaccount: centralaccount,
        amount: mintamount,
      }),
    };
    return fetch(url + "/centralbank/makeassetavailableincentralbank", payload)
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        alert("success");
      });
  }

  centralasset(assetid, centralaccount, mintamount) {
    const payload = {
      method: "POST",
      body: JSON.stringify({
        centralentity: {
          entityid: "ENT-CEN-0901",
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
        console.log(response);
        alert("success");
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
    return fetch(url + "/centralbank/entitymintasset", payload)
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        alert("success");
      })
      .catch((e) => {
        console.log("e", e);
      });
  }

  getassets() {
    return fetch(url + "/centralbank/getentityassets/" + theuser.entityid).then(
      (res) => res.json()
    );
  }

  getentityaccount() {
    return fetch(
      url + "/centralbank/getaccount/" + theuser.entityaccountnumber
    ).then((res) => res.json());
  }

  getcentralaccount() {
    return fetch(
      url + "/centralbank/getaccount/" + theuser.centralaccountnumber
    ).then((res) => res.json());
  }

  getentitytransactions() {
    return fetch(
      url + "/centralbank/gettransactions/" + theuser.entityaccountnumber
    ).then((res) => res.json());
  }

  getentitybalance() {
    return fetch(
      url + "/centralbank/getbalance/" + theuser.entityaccountnumber
    ).then((res) => res.json());
  }

  getcentraltransactions() {
    return fetch(
      url + "/centralbank/gettransactions/" + theuser.centralaccountnumber
    ).then((res) => res.json());
  }

  getcentralbalance() {
    return fetch(
      url + "/centralbank/getbalance/" + theuser.centralaccountnumber
    ).then((res) => res.json());
  }

  getsubscriberaccounts() {
    return fetch(
      url + "/centralbank/getsubscriberaccounts/" + theuser.entityid
    ).then((res) => res.json());
  }

  getsubscribers() {
    return fetch(url + "/centralbank/getsubscribers/" + theuser.entityid).then(
      (res) => res.json()
    );
  }

  getaccountowners() {
    return fetch(url + "/centralbank/getaccountowners/").then((res) =>
      res.json()
    );
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
    return fetch(url + "/centralbank/sendcentraltosubscriber", payload).then(
      (res) => res.json()
    );
  }
}

export { IssuanceService };
