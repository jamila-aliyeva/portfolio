import { message } from "antd";
import "./nonUser.scss";
const NonUserCard = ({
  id,
  username,
  firstName,
  lastName,
  changeRole,
  role,
}) => {
  const [messageApi, contextHolder] = message.useMessage();
  const key = "updatable";
  const openMessage = () => {
    messageApi.open({
      key,
      type: "loading",
      content: "Loading...",
    });
    setTimeout(() => {
      messageApi.open({
        key,
        type: "success",
        content: `${username} is now our client`,
        duration: 2,
      });
    }, 1000);
  };
  return (
    <div>
      <div>
        <h4>{username}</h4>
        <p>
          {firstName} {lastName}
        </p>
      </div>
      {contextHolder}
      <div onClick={openMessage}>
        <button onClick={() => changeRole(id)}>Add to user</button>
      </div>
    </div>
  );
};

export default NonUserCard;
