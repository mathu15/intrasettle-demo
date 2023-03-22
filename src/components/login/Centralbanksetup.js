import React, { useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { Route, useHistory } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

import { useToken } from "../App/useToken";
import { LoginService } from "./LoginService";

export default function Centralbanksetup({ setToken }) {
  const Entityinfo = {
    email: "",
    username: "",
    urlname: "",
    role: "",
    organization: "",
    accountid: "",
    entityaccountnumber: "",
    centralaccountnumber: "",
    entityemail: "",
    entityname: "",
    systemid: "",
    issuerid: "",
    funderid: "",
    entityid: "",
    marker: "",
  };

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [entryinfo, setEntryinfo] = useState(Entityinfo);
  const [entityinfo, setEntityinfo] = useState(Entityinfo);

  const [error, setError] = useState("");

  const [role, setRole] = useState("");

  const [organization, setOrganization] = useState("");

  const history = useHistory();

  const roles = ["Central bank", "Wholesale bank", "Exchange"];

  const loginservice = new LoginService();
  const usetoken = new useToken();

  const login = async () => {
    try {
      const tokendata = await loginservice.loginUser({
        email,

        password,
      });

      if (tokendata.token) {
        usetoken.saveToken(tokendata);
        setEntityinfo(tokendata.user);

        setError("Login success");
        //        history.push('/central-bank')
      } else {
        setError("Login failed");
      }
    } catch (err) {
      setError("Login failed");
    }
  };
  const getdata = async () => {
    const tokendata = await loginservice.getlatestuser();
    if (tokendata.token) {
      usetoken.saveToken(tokendata);
      setEntityinfo(tokendata.user);
    }
  };

  const update = async () => {
    try {
      console.log(entityinfo);

      const tokendata = await loginservice.updateUser(
        entityinfo,
        usetoken.getToken()
      );
    } catch (err) {
      setError("Update failed " + err);
    }
  };

  const configaccount = async () => {
    try {
      const accounts = await loginservice.cbconfigcentralaccounts();
    } catch (err) {
      setError("config account failed " + err);
    }
  };

  return (
    <div className="col-12 ">
      <div className="card p-fluid">
        <h5 className="text-3xl text-center">Central Bank Configure</h5>
        <div className="formgrid grid">
          <div className="field col text-2xl">
            <label htmlFor="entityemail">
              Entity email: {entityinfo.entityemail}
            </label>
            <InputText
              id="entityemail"
              type="email"
              onChange={(e) =>
                setEntityinfo({ ...entityinfo, entityemail: e.target.value })
              }
            />
          </div>
          <div className="field col text-2xl">
            <label htmlFor="urlname">URL name: {entityinfo.urlname}</label>
            <InputText
              id="urlname"
              type="text"
              onChange={(e) =>
                setEntityinfo({ ...entityinfo, urlname: e.target.value })
              }
            />
          </div>
        </div>
        <div className="formgrid grid">
          <div className="field col text-2xl">
            <label htmlFor="entityid">Entity id {entityinfo.entityid}</label>
            <InputText
              id="entityid"
              type="text"
              onChange={(e) =>
                setEntityinfo({ ...entityinfo, entityid: e.target.value })
              }
            />
          </div>
          <div className="field col text-2xl">
            <label htmlFor="enaccnumber">
              Entity account number {entityinfo.entityaccountnumber}
            </label>
            <InputText
              id="enaccnumber"
              type="text"
              onChange={(e) =>
                setEntityinfo({
                  ...entityinfo,
                  entityaccountnumber: e.target.value,
                })
              }
            />
          </div>
        </div>
        <div className="formgrid grid">
          <div className="field col text-2xl">
            <label htmlFor="cenaccnumber">
              Central account number {entityinfo.centralaccountnumber}
            </label>
            <InputText
              id="cenaccnumber"
              type="text"
              onChange={(e) =>
                setEntityinfo({
                  ...entityinfo,
                  centralaccountnumber: e.target.value,
                })
              }
            />
          </div>
          <div className="field col text-2xl">
            <label htmlFor="issuerid">Issuerid : {entityinfo.issuerid}</label>
            <InputText
              id="issuerid"
              type="text"
              onChange={(e) =>
                setEntityinfo({ ...entityinfo, issuerid: e.target.value })
              }
            />
          </div>
        </div>
        <div className="formgrid grid">
          <div className="field col text-2xl">
            <label htmlFor="funderid">Funderid : {entityinfo.funderid}</label>
            <InputText
              id="funderid"
              type="text"
              onChange={(e) =>
                setEntityinfo({ ...entityinfo, funderid: e.target.value })
              }
            />
          </div>
          <div className="field col text-2xl">
            <label htmlFor="systemid">Systemid : {entityinfo.systemid}</label>
            <InputText
              id="systemid"
              type="text"
              onChange={(e) =>
                setEntityinfo({ ...entityinfo, systemid: e.target.value })
              }
            />
          </div>
        </div>
        <div className="formgrid grid">
          <div className="field col text-2xl">
            <label htmlFor="entityname">
              Entity name : {entityinfo.entityname}
            </label>
            <InputText
              id="entityname"
              type="text"
              onChange={(e) =>
                setEntityinfo({ ...entityinfo, entityname: e.target.value })
              }
            />
          </div>
          <div className="field col text-2xl">
            <label htmlFor="centraladdress">
              Central address : {entityinfo.centraladdress}
            </label>
            <InputText
              id="centraladdress"
              type="text"
              onChange={(e) =>
                setEntityinfo({ ...entityinfo, centraladdress: e.target.value })
              }
            />
          </div>
        </div>
        <div className="formgrid grid">
          <div className="field col text-2xl">
            <label htmlFor="entitycode">
              Entity code : {entityinfo.entitycode}
            </label>
            <InputText
              id="entitycode"
              type="text"
              onChange={(e) =>
                setEntityinfo({ ...entityinfo, entitycode: e.target.value })
              }
            />
          </div>
          <div className="field col text-2xl">
            <label htmlFor="entityaddress">
              Entity address : {entityinfo.entityaddress}
            </label>
            <InputText
              id="entityaddress"
              type="text"
              onChange={(e) =>
                setEntityinfo({ ...entityinfo, entityaddress: e.target.value })
              }
            />
          </div>
        </div>
        <div className="formgrid grid">
          <div className="field col text-2xl">
            <label htmlFor="centraladdress">
              Central address : {entityinfo.centraladdress}
            </label>
            <InputText
              id="centraladdress"
              type="text"
              onChange={(e) =>
                setEntityinfo({ ...entityinfo, centraladdress: e.target.value })
              }
            />
          </div>
          <div className="field col text-2xl">
            <label htmlFor="marker">Marker : {entityinfo.marker}</label>
            <InputText
              id="marker"
              type="text"
              onChange={(e) =>
                setEntityinfo({ ...entityinfo, marker: e.target.value })
              }
            />
          </div>
        </div>
        <div className="formgrid grid">
          <div className="field col text-2xl">
            <label htmlFor="organization">
              Organization : {entityinfo.organization}
            </label>
            <InputText
              id="organization"
              type="text"
              onChange={(e) =>
                setEntityinfo({ ...entityinfo, organization: e.target.value })
              }
            />
          </div>
          <div className="field col text-2xl">
            <label htmlFor="role">Role : {entityinfo.role}</label>
            <Dropdown
              id="role"
              type="text"
              onChange={(e) =>
                setEntityinfo({ ...entityinfo, role: e.target.value })
              }
            />
          </div>
        </div>
        <div className="field text-2xl">
          {/* Status:  */}
          <span className="text-pink-500">{error}</span>
          <div className="flex  align-items-center  justify-content-between">
            {/* <label> */}
            <Button
              label="Update"
              onClick={() => update()}
              className=" m-3 text-2xl"
            />
            <Button
              label="GetData"
              onClick={() => getdata()}
              className=" m-3 text-2xl"
            />
            <Button
              label="ConfigAccount"
              onClick={() => configaccount()}
              className=" m-3 text-2xl"
            />
            {/* </label> */}
          </div>
        </div>
      </div>
    </div>

    // <div className="login-wrapper">
    //   <h1>Central bank configure </h1>

    //   <label>
    //     <p>Entity email {entityinfo.entityemail}</p>

    //     <input
    //       type="text"
    //       placeholder="entityemail"
    //       onChange={(e) =>
    //         setEntityinfo({ ...entityinfo, entityemail: e.target.value })
    //       }
    //     />
    //   </label>

    //   <label>
    //     <p>URL name {entityinfo.urlname}</p>

    //     <input
    //       type="text"
    //       placeholder="urlname"
    //       onChange={(e) =>
    //         setEntityinfo({ ...entityinfo, urlname: e.target.value })
    //       }
    //     />
    //   </label>

    //   <label>
    //     <p>Entity id {entityinfo.entityid}</p>

    //     <input
    //       type="text"
    //       placeholder="entityid"
    //       onChange={(e) =>
    //         setEntityinfo({ ...entityinfo, entityid: e.target.value })
    //       }
    //     />
    //   </label>

    //   <label>
    //     <p>Entity account number {entityinfo.entityaccountnumber}</p>

    //     <input
    //       type="text"
    //       placeholder="entityaccountnumber"
    //       onChange={(e) =>
    //         setEntityinfo({
    //           ...entityinfo,
    //           entityaccountnumber: e.target.value,
    //         })
    //       }
    //     />
    //   </label>

    //   <label>
    //     <p>Central account number {entityinfo.centralaccountnumber}</p>

    //     <input
    //       type="text"
    //       placeholder="centralaccountnumber"
    //       onChange={(e) =>
    //         setEntityinfo({
    //           ...entityinfo,
    //           centralaccountnumber: e.target.value,
    //         })
    //       }
    //     />
    //   </label>

    //   <label>
    //     <p> Issuerid : {entityinfo.issuerid} </p>

    //     <input
    //       type="text"
    //       placeholder="issuerid"
    //       onChange={(e) =>
    //         setEntityinfo({ ...entityinfo, issuerid: e.target.value })
    //       }
    //     />
    //   </label>

    //   <label>
    //     <p> Funderid : {entityinfo.funderid} </p>

    //     <input
    //       type="text"
    //       placeholder="funderid"
    //       onChange={(e) =>
    //         setEntityinfo({ ...entityinfo, funderid: e.target.value })
    //       }
    //     />
    //   </label>

    //   <label>
    //     <p> Systemid : {entityinfo.systemid} </p>

    //     <input
    //       type="text"
    //       placeholder="systemid"
    //       onChange={(e) =>
    //         setEntityinfo({ ...entityinfo, systemid: e.target.value })
    //       }
    //     />
    //   </label>

    //   <label>
    //     <p>Entity name : {entityinfo.entityname}</p>

    //     <input
    //       type="text"
    //       placeholder="entityname"
    //       onChange={(e) =>
    //         setEntityinfo({ ...entityinfo, entityname: e.target.value })
    //       }
    //     />
    //   </label>

    //   <label>
    //     <p>Marker : {entityinfo.marker}</p>

    //     <input
    //       type="text"
    //       placeholder="marker"
    //       onChange={(e) =>
    //         setEntityinfo({ ...entityinfo, marker: e.target.value })
    //       }
    //     />
    //   </label>

    //   <div>
    //     <label>
    //       <p>Organization : {entityinfo.organization}</p>
    //       <input
    //         type="text"
    //         placeholder="Organization"
    //         onChange={(e) =>
    //           setEntityinfo({ ...entityinfo, organization: e.target.value })
    //         }
    //       />
    //     </label>
    //   </div>
    //   <div>
    //     <label>
    //       <p>Role : {entityinfo.role}</p>
    //       <Dropdown
    //         value={role}
    //         options={roles}
    //         onChange={(e) =>
    //           setEntityinfo({ ...entityinfo, role: e.target.value })
    //         }
    //         placeholder="Select a Role"
    //       />
    //     </label>
    //   </div>
    //   <div>
    //     <label>
    //       <p>Status</p>
    //       {error}
    //     </label>
    //   </div>
    //   <div>
    //     <label>
    //       <button onClick={() => update()}>Update</button>
    //       <button onClick={() => getdata()}>Getdata</button>
    //       <button onClick={() => configaccount()}> Configaccount</button>
    //     </label>
    //   </div>
    // </div>
  );
}
