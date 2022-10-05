import "./StatusComponent.scss";

const StatusComponent = ({ status }: { status: string }) => (
  <div className="status-container">
    <div className="status-text">{status}</div>
    <div className={`status-icon ${status}`}></div>
  </div>
);

export default StatusComponent;
