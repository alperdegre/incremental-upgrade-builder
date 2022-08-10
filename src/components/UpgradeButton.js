import React from "react";
import PropTypes from "prop-types";
import "./UpgradeButton.css";
import { formatNumber } from "../utils/utils";

const UpgradeButton = ({ id, name, cost, description, type, amountRequired, coefficient, onEditUprade, onDeleteUpgrade }) => {

  const editUpgradeHandler = (event) => {
    event.preventDefault();
    onEditUprade(id);
  };

  const deleteUpgradeHandler = (event) => {
    event.preventDefault();
    onDeleteUpgrade(id);
  };

  return (
    <div
      type="button"
      className="upgrade__div"
    >
      <h3 className="upgrade__name">{name}</h3>
      <p className="upgrade__description">{description}</p>
      <p className="upgrade__amount">Req. Amount: {amountRequired}</p>
      <p className="upgrade__cost">Cost: {formatNumber(cost, false, "standard")}</p>
      <p className="upgrade__type">Type: {type}</p>
      <p className="upgrade__coefficient">Coefficient: x{coefficient}</p>
      <button type="button" className="upgrade__button" onClick={editUpgradeHandler}>EDIT</button>
      <button type="button" className="upgrade__button" onClick={deleteUpgradeHandler}>DELETE</button>
    </div>
  );
};

UpgradeButton.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  cost: PropTypes.string,
  description: PropTypes.string,
  type: PropTypes.string,
  amountRequired: PropTypes.string,
  coefficient: PropTypes.number,
  onEditUprade: PropTypes.func,
  onDeleteUpgrade: PropTypes.func,
};

export default UpgradeButton;
