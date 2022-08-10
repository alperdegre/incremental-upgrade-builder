import logo from "./logo.svg";
import "./App.css";
import UpgradeButton from "./components/UpgradeButton";
import { useEffect, useState } from "react";
import initialUpgrades from "./data/upgrades.json";
import Modal from "./components/UI/Modal";
import UpgradeForm from "./components/UpgradeForm";

function App() {
  const [currentUpgrades, setCurrentUpgrades] = useState(initialUpgrades);
  const [minerCheckboxes, setMinerCheckboxes] = useState([
    true,
    true,
    true,
    true,
    true,
  ]);
  const [modalIsShown, setModalIsShown] = useState({
    shown: false,
    type: "new",
  });
  const [selectedUpgrade, setSelectedUpgrade] = useState({});

  const minerNames = ["Stone", "Iron", "Gold", "Emerald", "Diamond"];

  const minerTypeCheckedHandler = (position) => {
    setMinerCheckboxes((prev) => {
      const currentCheckboxes = minerCheckboxes.map((item, index) => {
        return index === position ? !item : item;
      });
      return currentCheckboxes;
    });
  };

  const hideModal = () => {
    setModalIsShown((prev) => {
      return { ...prev, shown: false };
    });
  };

  const newUpgradeHandler = (event) => {
    event.preventDefault();
    setModalIsShown({ shown: true, type: "new" });
    const newUpgrade = {
      id: currentUpgrades.length,
      name: "",
      description: "",
      cost: "",
      appliesTo: 0,
      amountRequired: "",
      type: "additive",
      coefficient: 0,
    };
    setSelectedUpgrade(newUpgrade);
  };

  const editUpgradeHandler = (id) => {
    setModalIsShown({ shown: true, type: "edit" });
    const upgrade = currentUpgrades.filter((upgrade) => {
      return upgrade.id === id;
    })[0];
    if (upgrade) {
      setSelectedUpgrade(upgrade);
    }
  };

  const deleteUpgradeHandler = (id) => {
    setModalIsShown({ shown: true, type: "delete" });
    const upgrade = currentUpgrades.filter((upgrade) => {
      return upgrade.id === id;
    })[0];
    if (upgrade) {
      setSelectedUpgrade(upgrade);
    }
  };

  const submitHandler = (newUpgrade) => {
    if (newUpgrade.id !== currentUpgrades.length) {
      setCurrentUpgrades((prev) => {
        const otherUpgrades = prev.filter((upg) => upg.id !== newUpgrade.id);
        return [...otherUpgrades, newUpgrade];
      });
    } else {
      setCurrentUpgrades((prev) => {
        return [...prev, newUpgrade];
      });
    }
    hideModal();
  };

  const exportJSONHandler = (event) => {
    event.preventDefault();
    const blob = new Blob([JSON.stringify(currentUpgrades)]);
    const a = document.createElement("a");
    const currentDate = new Date();
    const name = `upgrades-${currentDate.toLocaleString()}.json`;
    a.download = name;
    a.href = window.URL.createObjectURL(blob);
    const clickEvt = new MouseEvent("click", {
      view: window,
      bubbles: true,
      cancelable: true,
    });
    a.dispatchEvent(clickEvt);
    a.remove();
    saveCurrentUpgrades();
  };

  const commitUpgradeDeletionHandler = (event) => {
    event.preventDefault();
    const filteredUpgrades = currentUpgrades.filter((upgrade) => {
      return upgrade.id !== selectedUpgrade.id;
    });
    setCurrentUpgrades(filteredUpgrades);
    hideModal();
  };

  const initialUpgradesHandler = (event) => {
    event.preventDefault();
    setCurrentUpgrades(initialUpgrades);
  };

  const latestUpgradesHandler = (event) => {
    event.preventDefault();
    const latestUpgrades = JSON.parse(
      localStorage.getItem("incrementalUpgrades")
    );
    if (latestUpgrades) {
      setCurrentUpgrades(latestUpgrades);
    }
  };

  const saveCurrentUpgrades = () => {
    localStorage.setItem(
      "incrementalUpgrades",
      JSON.stringify(currentUpgrades)
    );
  };

  return (
    <>
      {modalIsShown.shown && (
        <Modal onClose={hideModal}>
          {modalIsShown.type === "delete" ? (
            <div className="modal__contents">
              <h2>DELETING UPGRADE</h2>
              <p>Are you sure?</p>
              <p>
                Deleting : <b>{selectedUpgrade.name}</b>
              </p>
              <div className="upgrade__buttonGroup">
                <button
                  type="button"
                  className="upgrade__button"
                  onClick={commitUpgradeDeletionHandler}
                >
                  DELETE
                </button>
                <button
                  type="button"
                  className="upgrade__button"
                  onClick={hideModal}
                >
                  CANCEL
                </button>
              </div>
            </div>
          ) : (
            <UpgradeForm
              modalType={modalIsShown.type}
              onHideModal={hideModal}
              upgrade={selectedUpgrade}
              totalUpgradeAmount={currentUpgrades.length}
              onSubmitChange={submitHandler}
            />
          )}
        </Modal>
      )}
      <div className="App">
        <h1>UPGRADE BUILDER</h1>
        <div>
          <button
            type="button"
            onClick={initialUpgradesHandler}
            className="upgrade__button"
          >
            Load Initial Upgrades
          </button>
          <button
            type="button"
            onClick={latestUpgradesHandler}
            className="upgrade__button"
          >
            Load Latest Upgrades
          </button>
        </div>
        <div>
          <button
            type="button"
            onClick={newUpgradeHandler}
            className="upgrade__button"
          >
            Add New Upgrade
          </button>
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
          <button
            type="button"
            onClick={exportJSONHandler}
            className="upgrade__button"
          >
            Export as JSON
          </button>
        </div>
        {currentUpgrades
          .filter((upgrade) => {
            return minerCheckboxes[upgrade.appliesTo] === true;
          })
          .sort((a, b) => a.amountRequired - b.amountRequired)
          .sort((a, b) => a.appliesTo - b.appliesTo)
          .map((upgrade) => {
            return (
              <UpgradeButton
                id={upgrade.id}
                name={upgrade.name}
                cost={upgrade.cost}
                description={upgrade.description}
                type={upgrade.type}
                amountRequired={upgrade.amountRequired}
                coefficient={upgrade.coefficient}
                onEditUprade={editUpgradeHandler}
                onDeleteUpgrade={deleteUpgradeHandler}
              />
            );
          })}
      </div>
    </>
  );
}

export default App;
