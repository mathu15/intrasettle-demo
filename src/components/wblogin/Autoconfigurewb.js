import React, { useState, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Route, useHistory } from "react-router-dom";

import { useToken } from "../App/useToken";
import { LoginService } from "../login/LoginService";

export default function Autoconfigurewb({ setToken }) {
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
  const [centralbank, setCentralbank] = useState({});

  const [centralbanks, setCentralbanks] = useState([]);

  const history = useHistory();

  const roles = ["Wholesale bank"];

  const loginservice = new LoginService();
  const usetoken = new useToken();

  useEffect(() => {
    loginservice.getcentralbanks().then((data) => {
      if (data) {
        setCentralbanks(data);
      }
    });
  }, []);

  const login = async () => {
    try {
      const tokendata = await loginservice.loginUser({
        email,

        password,
      });

      if (tokendata.token) {
        usetoken.saveToken(tokendata);

        console.log("testing");
        console.log(tokendata.user);

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

  const autoconfigure = async () => {
    try {
      console.log(entityinfo);
      if (!centralbank) alert("Select central bank");

      const tokendata = await loginservice.configurewbentity(
        entityinfo,
        centralbank
      );

      const accounts = await loginservice.wbconfigcentralaccounts();
    } catch (err) {
      setError("Update failed " + err);
    }
  };

  return (
    <div className="col-12 ">
      <div className="card p-fluid">
        <h5 className="text-3xl text-center">Wholesale Bank AutoConfigure </h5>

        <div className="field text-2xl">
          <label htmlFor="subentityemail1">
            Sub Entity email: {entityinfo.subentityemail}
          </label>

          <InputText
            id="subentityemail1"
            type="email"
            // placeholder="subentityemail"

            onChange={(e) =>
              setEntityinfo({ ...entityinfo, subentityemail: e.target.value })
            }
          />
        </div>
        <div className="field text-2xl">
          <label htmlFor="entityemail1">
            Entity email: {entityinfo.entityemail}
          </label>

          <InputText
            id="entityemail1"
            type="email"
            // placeholder="entityemail"

            onChange={(e) =>
              setEntityinfo({ ...entityinfo, subentityemail: e.target.value })
            }
          />
        </div>
        <div className="field text-2xl">
          <label htmlFor="urlname">URL name: {entityinfo.urlname}</label>

          <InputText
            type="text"
            id="urlname"
            // placeholder="URL Name"
            onChange={(e) =>
              setEntityinfo({ ...entityinfo, urlname: e.target.value })
            }
          />
        </div>
        <div className="field text-2xl">
          <label htmlFor="entityname">
            Entity name: {entityinfo.entityname}
          </label>

          <InputText
            type="text"
            id="entityname"
            // placeholder="entityname"
            onChange={(e) =>
              setEntityinfo({ ...entityinfo, entityname: e.target.value })
            }
          />
        </div>
        <div className="field text-2xl">
          <label htmlFor="organization">
            Organization: {entityinfo.organization}
          </label>

          <InputText
            type="text"
            id="organization"
            // placeholder="email"
            onChange={(e) =>
              setEntityinfo({ ...entityinfo, organization: e.target.value })
            }
          />
        </div>

        <div className="field text-2xl">
          <label htmlFor="role">Role: {entityinfo.role}</label>

          <Dropdown
            value={role}
            options={roles}
            onChange={(e) =>
              setEntityinfo({ ...entityinfo, role: e.target.value })
            }
            placeholder="Select a Role"
            id="role"
            className="text-2xl"
          />
        </div>
        <div className="field text-2xl">
          <label htmlFor="role">Central Bank</label>

          <Dropdown
            optionLabel="entityname"
            value={centralbank}
            options={centralbanks}
            onChange={(e) => setCentralbank(e.target.value)}
            placeholder="Select centralbank"
          />
        </div>
      </div>
      <div className="field text-2xl">
        {/* Status:  */}
        <span className="text-pink-500">{error}</span>
        <div className="flex  align-items-center  justify-content-between">
          {/* <label>  */}
          <Button
            label="AutoConfigure"
            onClick={() => autoconfigure()}
            className=" m-3 text-2xl"
          />
          <Button
            label="GetData"
            onClick={() => getdata()()}
            className=" m-3 text-2xl"
          />

          {/* </label> */}
        </div>
      </div>
    </div>
  );
}
