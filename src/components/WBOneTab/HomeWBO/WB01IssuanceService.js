import { useToken }  from '../../App/useToken';

const url = 'https://sailsg1.thebsv.tech';

const usetoken = new useToken();

const theuser = usetoken.getUser();


class WB01IssuanceService {

 sendsubscribertosubscriber(asset, subscriber1, subscriber2,  amount) {
  const payload = {
            method: 'POST',
	    headers: {
     'Authorization':  usetoken.getToken(),
     'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                asset: asset,
                subscriber1: subscriber1,
                subscriber2: subscriber2,
                amount: amount
            })
         };
    return fetch(
	    url + '/centralsettler/sendsubscribertosubscriber', payload).then(res => res.json());

  }

  sendsubscribertocentral(asset, subscriber, central,  amount) {
  const payload = {
            method: 'POST',
	    headers: {
     'Authorization':  usetoken.getToken(),
     'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                asset: asset,
                central: central,
                subscriber: subscriber,
                amount: amount
            })
         };
    return fetch(
	    url + '/centralbank/sendsubscribertocentral', payload).then(res => res.json());

  }

  getentityaccounts() {
 return fetch(url + '/centralbank/getaccountsofentity/' + theuser.entityid  ).then(res => res.json()); 
 }


  getcentralaccount() {
    return fetch(url + '/centralbank/getaccount/' + theuser.centralaccountnumber ).then(res => res.json());
  }

  getsubscriberaccount() {
    return fetch(url + '/centralbank/getaccount/' + theuser.subcentralaccountnumber  ).then(res => res.json());
  }

  getsubscribertransactions() {
    return fetch(url + '/centralbank/gettransactions/' + theuser.subcentralaccountnumber  ).then(res => res.json());
  }

  getentitybalance() {
    return fetch(url + '/centralbank/getbalance/' + theuser.entityaccountnumber ).then(res => res.json());
  }

  getsubscribebankbalance() {
    return fetch(url + '/centralbank/getbalance/'+theuser.subcentralaccountnumber  ).then(res => res.json());
  }



  getassets() {
 return fetch(url + '/centralbank/getentityassets/' + theuser.entityid  ).then(res => res.json()); 
 }

  mintasset(asset, centralaccount, mintamount) {
  const payload = {
            method: 'POST',
            body: JSON.stringify({
                asset: asset,
                operationaccount: centralaccount,
                amount: mintamount
            })
         };
    return fetch(url + '/centralbank/makeassetavailableincentralbank', payload).then(res => res.json());

  }

  getassets1() {
  const payload = {
            method: 'POST',
            body: JSON.stringify({
                entity: 'test',
            })
         };
    return fetch(url + '/centralbank/getassets', payload).then(res => res.json());

  }

   getsubscribers() {
      return fetch(url + '/centralbank/getsubscribers/ENT-CEN-0901').then(res => res.json()); 
   }


   getCentralToSubscriber() {
  const payload = {
            method: 'POST',
            body: JSON.stringify({
                entity: 'test',
		asset: 'test',
                amount: 'test',
                fromaccount: 'test',
                toaccount: 'test',
            })
         };
    return fetch(url + '/centralbank/sendcentraltosubscriber', payload).then(res => res.json());

  }


}

export { WB01IssuanceService };


