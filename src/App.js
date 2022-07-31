import logo from "./logo.svg";
import "./App.css";
import UpgradeButton from "./components/UpgradeButton";
import { useEffect, useState } from "react";
import currentUpgrades from "./data/upgrades.json";

function App() {
  const [minerCheckboxes, setMinerCheckboxes] = useState([
    true,
    true,
    true,
    true,
    true,
  ]);
  const minerNames = ["Stone", "Iron", "Gold", "Emerald", "Diamond"];

  const minerTypeCheckedHandler = (position) => {
    setMinerCheckboxes((prev) => {
      const currentCheckboxes = minerCheckboxes.map((item, index) => {
        return index === position ? !item : item;
      });
      return currentCheckboxes;
    });
  };
  console.log(currentUpgrades);

  return (
    <div className="App">
      <h1>UPGRADE BUILDER</h1>
      <div>
        <button type="button">Add New Upgrade</button>
        <span> Show: </span>
        {minerCheckboxes.map((miner, index) => {
          return (
            <label>
              <input
                type={"checkbox"}
                onChange={() => minerTypeCheckedHandler(index)}
                value={minerCheckboxes[index]}
                defaultChecked
              />
              {minerNames[index]}
            </label>
          );
        })}
      </div>
      {currentUpgrades.filter((upgrade) => {
        return minerCheckboxes[upgrade.appliesTo] === true;
      }).map((upgrade) => {
        return <UpgradeButton
          id={upgrade.id}
          name={upgrade.name}
          cost={upgrade.cost}
          description={upgrade.description}
          type={upgrade.type}
          coefficient={upgrade.coefficient}
        />;
      })}
    </div>
  );
}

export default App;
