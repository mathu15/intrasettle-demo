import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";
import { IssuanceService } from "../IssuanceService";

const urlname = "https://sailsg1.thebsv.tech";

// page for displaying chaertdata
const CBDCHoldings = ({ data1, setData1, user }) => {
  // initail value for chart data

  const [data, setData] = useState();
  // {
  //   labels: ["Digital_$_Frank", "Digital_Euro"],
  //   datasets: [
  //     {
  //       data: [10000.0, 16000.0],
  //       backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
  //       hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
  //     },
  //   ],
  // }
  const [amount, setAmount] = useState([]);
  const [issuetype, setIssuetype] = useState([]);
  const issuanceservice = new IssuanceService();

  useEffect(() => {
    //fetch data from api
    const fetchData = async () => {
      const dataset1 = [];
      const dataset2 = [];
      /*
      const url = urlname + "/centralbank/getbalance/"+ user.entityaccountnumber ;

      const dataset1 = [];
      const dataset2 = [];
      await fetch(url)
      */
      issuanceservice
        .getentitybalance()
        .then((res) => {
          console.log("ress", res);
          for (const val of res.balance) {
            dataset1.push(val.amount);
            dataset2.push(val.issuetype);
          }
          setData({
            labels: dataset2,
            datasets: [
              {
                data: dataset1,
                backgroundColor: ["#1569BB", "#00C6AE", "#36A2EB", "#6B7280"],
                hoverBackgroundColor: [
                  "#1a85ed",
                  "#00f7d9",
                  "#4bb3fa",
                  "#7f8694",
                ],
              },
            ],
          });
          setAmount(dataset1);
          setIssuetype(dataset2);
          console.log("arrData", dataset1, dataset2);
        })
        .catch((e) => {
          console.log("error", e);
        });
    };

    fetchData();
  }, []);
  const [lightOptions] = useState({
    indexAxis: "x",
    elements: {
      doughnut: {
        borderWidth: 2,
      },
    },
    plugins: {
      legend: {
        position: "right",
        labels: {
          color: "#eee",
        },
      },
      title: {
        display: true,
        text: "",
        color: "#eee",
      },
    },
  });

  // const dataset3 = [];

  // for (const val of data) {
  //   dataset3.push(val.amount);
  // }

  // console.log(dataset3);
  const value = amount.reduce((a, b) => a + b, 0);
  console.log(value);
  return (
    <>
      <div className="grid-column ">
        <div className="grid justify-content-around">
          <div className=" col-12 lg:col-6 xl:col-3">
            <div className=" border-1 border-100 bg-gray-800 card mt-6 text-center">
              <div className=" text-900 text-center font-medium text-2xl mb-3">
                BANK
              </div>
              {issuetype.map((cdata, index) => (
                <div className="list-disc">
                  <li className="text-2xl pb-2" key={index}>
                    {cdata}{" "}
                  </li>
                </div>
              ))}
            </div>
          </div>
          <div className="col-12 lg:col-6 xl:col-3">
            <div className="card mb-0 mt-6 border-1 border-100 bg-gray-800   text-center">
              <div className="text-900 font-medium  text-center text-2xl mb-3">
                CBDC HOLDINGS
              </div>
              {amount.map((cdata, index) => (
                <div className="list-disc">
                  <li className="text-2xl pb-2" key={index}>
                    {cdata}{" "}
                  </li>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="col-12 ">
        <div className="card flex flex-column align-items-center">
          <Chart
            type="doughnut"
            data={data}
            options={lightOptions}
            style={{
              position: "relative",
              width: "30%",
              justifyContent: "center",
            }}
          />
        </div>
      </div>
    </>
  );
};

export default CBDCHoldings;
