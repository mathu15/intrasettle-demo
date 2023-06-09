import React from "react";
import { InputNumber } from "primereact/inputnumber";

//enter the maximum transaction value to be transfered
const WBOTEnterAmount = ({ data, setData }) => {
  console.log("data", data);
  return (
    <div className="text-center text-2xl">
      <div className="flex-column align-items-center justify-content-center">
        <div className="flex-column align-items-center border-bottom-1 surface-border surface-overlay w-full mt-5">
          <p className=" text-center text-2xl font-bold text-blue-300 mr-3">
            Maximum transaction value with this asset {data.maxvalue}
          </p>
          <InputNumber
            id="amount"
            value={data.amount}
            onChange={(e) => setData({ ...data, amount: e.value })}
            showButtons
            mode="decimal"
            min={0}
            max={10000000}
            style={{ height: "5rem", fontSize: "2.0rem" }}
            className="p-2"
          ></InputNumber>
          <label style={{ fontSize: "2.0rem" }} htmlFor="amount">
            Amount
          </label>
        </div>
      </div>
    </div>
  );
};

export default WBOTEnterAmount;
