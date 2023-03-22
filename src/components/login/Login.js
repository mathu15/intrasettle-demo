import React, { useState, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import { Link, Route, useHistory } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { useToken } from "../App/useToken";
import { LoginService } from "./LoginService";
import { Button } from "primereact/button";

export default function Login({ setToken }) {
  const [email, setEmail] = useState();

  const [password, setPassword] = useState();

  const [centralbanks, setCentralbanks] = useState([]);
  const [centralbank, setCentralbank] = useState({});

  const [error, setError] = useState("");

  const [role, setRole] = useState("");

  const [organization, setOrganization] = useState("");

  const usetoken = new useToken();
  const history = useHistory();

  const roles = ["Central bank"];

  const loginservice = new LoginService();

  useEffect(() => {
    setEmail(centralbank.email);
  }, [centralbank]);

  useEffect(() => {
    getcentralbanks();
  }, []);

  const login = async () => {
    try {
      const tokendata = await loginservice.loginUser({
        email,

        password,
      });

      if (tokendata.token) {
        usetoken.saveToken(tokendata);
        await refresh();
        //tokendata = await loginservice.getlatestuser();
        //usetoken.saveToken(tokendata);

        //usetoken.getToken();
        setError("Login success");
        //history.push('/central-bank/'+usetoken.getUser().marker)
        history.push("/central-bank/");
      } else {
        setError("Login failed");
      }
    } catch (err) {
      setError("Login failed " + err);
    }
  };

  const refresh = async () => {
    const tokendata = await loginservice.getlatestuser();
    if (tokendata.token) {
      usetoken.saveToken(tokendata);
    }
  };

  const register = async () => {
    try {
      const tokendata = await loginservice.registerUser({
        email,

        password,
        role,
        organization,
      });

      if (tokendata.token) {
        usetoken.setToken(tokendata);
        setError("Login success");
        history.push("/central-bank");
      } else {
        setError("Login failed");
      }
    } catch (err) {
      setError("Login failed");
    }
  };

  const update = async () => {
    try {
      const tokendata = await loginservice.updateUser(
        {
          email,

          password,
          role,
          organization,
        },
        usetoken.getToken()
      );
    } catch (err) {
      setError("Update failed " + err);
    }
  };

  const configure = async () => {
    try {
      const tokendata = await loginservice.configureEntity(usetoken.getToken());
    } catch (err) {
      setError("Update failed " + err);
    }
  };

  const getcentralbanks = async () => {
    try {
      const tokendata = await loginservice.getcentralbanks();
      console.log(tokendata);
      setCentralbanks(tokendata);
    } catch (err) {
      setError("Update failed " + err);
    }
  };

  return (
    <div className="grid justify-content-center">
      <div className="col-12 md:col-6">
        <Link to="/">
          <img
            className="h-8rem w-full p-3"
            src={"images/intrasettle_White.svg"}
            alt="logo"
          />
        </Link>
        <div className="card p-fluid">
          <h5 className="text-3xl text-center">CENTRAL BANK LOGIN</h5>
          <div className="field text-2xl">
            <label htmlFor="cbank">Choose central bank</label>

            <Dropdown
              id="cbank"
              optionLabel="organization"
              value={centralbank}
              options={centralbanks}
              onChange={(e) => {
                setCentralbank(e.target.value);
              }}
              placeholder="Select a central bank"
              className="text-2xl"
            />
          </div>
          <div className="field text-2xl">
            <label htmlFor="email1">Email</label>

            <InputText
              id="email1"
              type="email"
              value={centralbank.email}
              // placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="field text-2xl">
            <label htmlFor="password">Password</label>

            <InputText
              id="password"
              type="password"
              // placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="field text-2xl">
            <label htmlFor="organization">Organiztion</label>

            <InputText
              type="text"
              id="organization"
              // placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="field text-2xl">
            <label htmlFor="role">Role</label>

            <Dropdown
              value={role}
              options={roles}
              onChange={(e) => setRole(e.target.value)}
              placeholder="Select a Role"
              id="role"
              className="text-2xl"
            />
          </div>
        </div>
        <div className="field text-2xl">
          {/* Status: */}
          <span className="text-pink-500">{error}</span>
          <div className="flex  align-items-center  justify-content-center">
            {/* <label> */}
            <Button
              label="Login"
              onClick={() => login()}
              className=" m-3 text-2xl"
            />
            <Button
              label="Register"
              onClick={() => register()}
              className=" m-3 text-2xl"
            />
            <Button
              label="Update"
              onClick={() => update()}
              className=" m-3 text-2xl"
            />
            {/* </label> */}
          </div>
        </div>
      </div>
    </div>
  );
}
