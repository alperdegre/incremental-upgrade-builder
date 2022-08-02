import React, { useState } from "react";

const UpgradeForm = ({ modalType, onHideModal, upgrade, totalUpgradeAmount, onSubmitChange }) => {
  const [currentId, setCurrentId] = useState(upgrade ? upgrade.id : totalUpgradeAmount);
  const [nameInput, setNameInput] = useState(upgrade.name ? upgrade.name : "");
  const [descriptionInput, setDescriptionInput] = useState(
    upgrade.description ? upgrade.description : ""
  );
  const [costInput, setCostInput] = useState(upgrade.cost ? upgrade.cost : "");
  const [typeInput, setTypeInput] = useState(upgrade.type ? upgrade.type : "");
  const [amountInput, setAmountInput] = useState(upgrade.amountRequired ? upgrade.amountRequired : "");
  const [minerInput, setMinerInput] = useState(
    upgrade.appliesTo ? upgrade.appliesTo : 0
  );
  const [coefficientInput, setCoefficientInput] = useState(
    upgrade.coefficient ? upgrade.coefficient : ""
  );

  const inputChangeHandler = (event) => {
    switch (event.target.id) {
      case "name":
        setNameInput(event.target.value);
        break;
      case "description":
        setDescriptionInput(event.target.value);
        break;
      case "cost":
        setCostInput(event.target.value);
        break;
      case "type":
        setTypeInput(event.target.value);
        break;
      case "coefficient":
        setCoefficientInput(event.target.value);
        break;
      case "miner":
        setMinerInput(event.target.value);
        break;
      case "amount":
        setAmountInput(event.target.value);
        break;
      default:
        break;
    }
  };

  const submitChangeHandler = (event) => {
    event.preventDefault();
    const newUpgrade = {
      id: currentId,
      name: nameInput,
      description: descriptionInput,
      cost: costInput,
      appliesTo: +minerInput,
      amountRequired: amountInput,
      type: typeInput,
      coefficient: +coefficientInput,
    };
    onSubmitChange(newUpgrade);
  };

  return (
    <>
      <h2 className="modal__title">{modalType.toUpperCase()} UPGRADE</h2>
      <form className="modal__formContents" onSubmit={submitChangeHandler}>
      <div className="upgrade__inputGroup">
          <label htmlFor="name">Id:</label>
          <span>{currentId}</span>
        </div>
        <div className="upgrade__inputGroup">
          <label htmlFor="name">Name:</label>
          <input
            type={"text"}
            id="name"
            className="modal__input"
            value={nameInput}
            onChange={inputChangeHandler}
          />
        </div>
        <div className="upgrade__inputGroup">
          <label htmlFor="description">Description:</label>
          <input
            type={"text"}
            id="description"
            className="modal__input"
            value={descriptionInput}
            onChange={inputChangeHandler}
          />
        </div>
        <div className="upgrade__inputGroup">
          <label htmlFor="miner">Applies To:</label>
          <select value={minerInput} id="miner" onChange={inputChangeHandler}>
            <option value={"0"}>Stone</option>
            <option value={"1"}>Iron</option>
            <option value={"2"}>Gold</option>
            <option value={"3"}>Emerald</option>
            <option value={"4"}>Diamond</option>
          </select>
        </div>
        <div className="upgrade__inputGroup">
          <label htmlFor="amount">Amount Required:</label>
          <input
            type={"text"}
            id="amount"
            className="modal__input"
            value={amountInput}
            onChange={inputChangeHandler}
          />
        </div>
        <div className="upgrade__inputGroup">
          <label htmlFor="cost">Cost:</label>
          <input
            type={"text"}
            id="cost"
            className="modal__input"
            value={costInput}
            onChange={inputChangeHandler}
          />
        </div>
        <div className="upgrade__inputGroup">
          <label htmlFor="type">Type:</label>
          <select value={typeInput} id="type" onChange={inputChangeHandler}>
            <option value={"additive"}>Additive</option>
            <option value={"multiplicative"}>Multiplicative</option>
          </select>
        </div>
        <div className="upgrade__inputGroup">
          <label htmlFor="coefficient">Coefficient:</label>
          <input
            type={"text"}
            id="coefficient"
            className="modal__input"
            value={coefficientInput}
            onChange={inputChangeHandler}
          />
        </div>
        <div className="upgrade__inputGroup mt-1">
          <button type="submit" className="upgrade__button">
            APPLY
          </button>
          <button
            type="submit"
            className="upgrade__button"
            onClick={onHideModal}
          >
            CANCEL
          </button>
        </div>
      </form>
    </>
  );
};

export default UpgradeForm;
