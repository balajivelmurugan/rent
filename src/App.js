import "./App.css";
import { MdMenu } from "react-icons/md";
import React, { useState } from "react";

function App() {
  const [from, setFrom] = useState(""); // Example value
  const [to, setTo] = useState(""); // Example value
  const [unitsConsumed, setUnitsConsumed] = useState(""); // Calculate units consumed
  const [amount, setAmount] = useState(""); // Example value, can be calculated based on units consumed
  const ratePerUnit = 6; // Example rate per unit, can be fetched from an API or state
  const [rent, setRent] = useState(""); // Example rent value, can be fetched from an API or state
  const [maintenance, setMaintenance] = useState(""); // Example maintenance value, can be fetched from an API or state
  const [total, setTotal] = useState(""); // Example total value, can be calculated based on rent and maintenance 

  const handleToChange = (e) => {
    const newTo = Number(e.target.value);
    setTo(newTo);
    const uc = newTo - from;
    console.log(uc);
    if (uc > 0) {
      setUnitsConsumed(uc);
      setAmount(uc * ratePerUnit);
    }
  };
  return (
    <div className="App">
      <header className="App-header">
        <MdMenu className="icon"></MdMenu>
        <h2>Rent</h2>
      </header>
      <main>
        <section className="EB"></section>
        <section className="rent-details">
          <div className="row">
            <label>Reading From</label>
            <input
              type="number"
              value={from}
              onChange={(e) => setFrom(Number(e.target.value))}
            ></input>
          </div>

          <div className="row">
            <label>Reading To</label>
            <input type="number" value={to} onChange={handleToChange}></input>
          </div>

          <div className="row">
            <label>Units consumed</label>
            <input type="number" value={unitsConsumed} disabled></input>
          </div>

          <div className="row">
            <label>Amount</label>
            <input type="number" value={amount} disabled></input>
          </div>

          <div className="row">
            <label>Rent</label>
            <input
              type="number"
              value={rent}
              onChange={(e) => setRent(Number(e.target.value))}
            ></input>
          </div>

          <div className="row">
            <label>Maintenance</label>
            <input
              type="number"
              value={maintenance}
              onChange={(e) => setMaintenance(Number(e.target.value))}
            ></input>
          </div>
        </section>
        <footer>
          <div className="row action">
            <div className="row action-items">
              <button onClick={() => {
                setFrom("");
                setTo("");
                setUnitsConsumed("");
                setAmount("");
                setRent("");
                setMaintenance("");
                setTotal("");
              }}>Reset</button>
              <button onClick={() => setTotal(+amount + +rent + +maintenance)}>Calculate</button>
            </div>
            <span className="total">
              <h2>{total}</h2>
            </span>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App;
