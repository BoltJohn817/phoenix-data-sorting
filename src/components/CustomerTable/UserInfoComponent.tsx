import "./UserInfoComponent.scss";

const UserInfoComponent = ({
  email,
  userName,
  avatar,
}: {
  email: string;
  userName: string;
  avatar: string;
}) => {
  return (
    <div className="user-info-container">
      <div
        className="user-avatar"
        style={{
          backgroundImage: `url("${avatar}")`,
        }}
      ></div>
      <div className="user-info">
        <div className="user-name">{userName}</div>
        <div className="user-email">{email}</div>
      </div>
    </div>
  );
};

export default UserInfoComponent;
