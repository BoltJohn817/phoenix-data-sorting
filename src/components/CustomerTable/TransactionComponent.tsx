import "./TransactionComponent.scss";
import { formatCurrency } from "../../helper/finance";

const TransactionComponent = ({
  inValue,
  outValue,
}: {
  inValue: number;
  outValue: number;
}) => {
  return (
    <div className="transaction-container">
      <div className="text-out">{formatCurrency(outValue)}</div>
      <div className="text-in">{formatCurrency(inValue)}</div>
    </div>
  );
};

export default TransactionComponent;
