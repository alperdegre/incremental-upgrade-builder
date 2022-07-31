import React from "react";
import PropTypes from "prop-types";
import "./UpgradeButton.css";
import { formatNumber } from "../utils/utils";

const UpgradeButton = ({ id, name, cost, description, type, coefficient, onUpgradeBought }) => {

  const purchaseUpgradeHandler = (event) => {
    event.preventDefault();
    onUpgradeBought(id, cost);
  };

  return (
    <div
      type="button"
      className="upgrade__div"
    >
      <h3 className="upgrade__name">{name}</h3>
      <p className="upgrade__description">{description}</p>
      <p className="upgrade__cost">Cost: {formatNumber(cost, false, "standard")}</p>
      <p className="upgrade__type">Type: {type}</p>
      <p className="upgrade__coefficient">Coefficient: x{coefficient}</p>
      <button type="button" className="upgrade__button">EDIT</button>
      <button type="button" className="upgrade__button">DELETE</button>
    </div>
  );
};

UpgradeButton.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  cost: PropTypes.string,
  description: PropTypes.string,
  type: PropTypes.string,
  coefficient: PropTypes.string,
  onUpgradeBought: PropTypes.func,
};

export default UpgradeButton;
